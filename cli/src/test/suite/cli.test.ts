import CLI from "../../../../core/lib/CLI";
import * as assert from "assert";

suite("generateContractsDocs", () => {
  test("dump all", () => {
    const cli = new CLI("testContracts/ERC20Compliant");

    cli.generateContractsDocs("docs/all/", false);
  });

  test("only comment", () => {
    const cli = new CLI("testContracts/ERC20Compliant");

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
        functionName: {
          name: "constructor",
          charIndex: {
            start: 351,
            end: 362,
          },
        },
        errorSource: ["implicitArgs", "explicitArgs"],
      },
      {
        filePath: "testContracts/ERC20NonCompliant/ERC20.cairo",
        attributeName: "view",
        functionName: {
          name: "name",
          charIndex: {
            start: 1267,
            end: 1271,
          },
        },
        errorSource: "returns",
      },
      {
        filePath: "testContracts/ERC20NonCompliant/ERC20.cairo",
        attributeName: "external",
        functionName: {
          name: "decreaseAllowance",
          charIndex: {
            start: 7295,
            end: 7312,
          },
        },
        errorSource: "returns",
      },
      {
        filePath: "testContracts/ERC20NonCompliant/library.cairo",
        attributeName: "event",
        functionName: {
          name: "Transfer",
          charIndex: {
            start: 645,
            end: 653,
          },
        },
        errorSource: "explicitArgs",
      },
      {
        filePath: "testContracts/ERC20NonCompliant/library.cairo",
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_symbol",
          charIndex: {
            start: 1400,
            end: 1412,
          },
        },
        errorSource: "explicitArgs",
      },
      {
        filePath: "testContracts/ERC20NonCompliant/library.cairo",
        attributeName: "namespace ERC20",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 2848,
            end: 2859,
          },
        },
        errorSource: ["implicitArgs", "explicitArgs"],
      },
      {
        filePath: "testContracts/ERC20NonCompliant/library.cairo",
        attributeName: "namespace internal",
        functionName: {
          name: "_mint",
          charIndex: {
            start: 4959,
            end: 4964,
          },
        },
        errorSource: "explicitArgs",
      },
    ];
    assert.deepEqual(result, target);
  });
});
