import CLI from "../../lib/cli";
import * as assert from "assert";

suite("generateContractsDocs", () => {
  test("dump all", () => {
    const cli = new CLI("testContracts/");

    cli.generateContractsDocs("docs/all/", false);
  });

  test("only comment", () => {
    const cli = new CLI("testContracts/");

    cli.generateContractsDocs("docs/comment_only/", true);
  });
});

suite("getNonCompliantCommentFunction", () => {
  test("compliant", () => {
    const cli = new CLI("testContracts/ERC20Compliant/");

    const result = cli.getNonCompliantCommentFunction();
    assert.deepEqual(null, result);
  });

  test("non compliant", () => {
    const cli = new CLI("testContracts/ERC20NonCompliant/");
    const result = cli.getNonCompliantCommentFunction();
    const target = [
      {
        filePath: "testContracts/ERC20NonCompliant/ERC20.cairo",
        attributeName: "constructor",
        functionName: "constructor",
        errorSource: ["implicitArgs", "explicitArgs"],
      },
    ];
    assert.deepEqual(target, result);
  });
});
