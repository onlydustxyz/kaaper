import CLI from "../../lib/cli";
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
            start: 349,
            end: 360,
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
            start: 1251,
            end: 1255,
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
            start: 7250,
            end: 7267,
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
            start: 640,
            end: 648,
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
            start: 1391,
            end: 1403,
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
            start: 2872,
            end: 2883,
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
            start: 4968,
            end: 4973,
          },
        },
        errorSource: "explicitArgs",
      },
    ];
    assert.deepEqual(target, result);
  });
});
