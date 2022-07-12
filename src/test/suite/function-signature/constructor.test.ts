import * as assert from "assert";
import * as path from "path";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import CairoParser from "../../../lib/main";

suite("function-signature: constructor", () => {
  test("ERC20: get attribute name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/ERC20.cairo"
    );
    const constructorText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const attributeName = functionSignatureParser.getAttributeName(
      constructorText![0]
    );
    assert.equal("constructor", attributeName, "failed to get attribute name");
  });
  test("ERC20: get function name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/ERC20.cairo"
    );
    const constructorText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const functionName = functionSignatureParser.getFunctionName(
      constructorText![0]
    );
    assert.equal("constructor", functionName, "failed to get attribute name");
  });

  test("ERC20: get implicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/ERC20.cairo"
    );
    const constructorText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const implicitArgs = functionSignatureParser.getImplicitArgs(
      constructorText![0]
    );
    const targetImplicitArgs = [
      { name: "syscall_ptr", type: "felt*" },
      { name: "pedersen_ptr", type: "HashBuiltin*" },
      { name: "range_check_ptr", type: "" },
    ];
    assert.deepEqual(
      targetImplicitArgs,
      implicitArgs,
      "failed to get implicit args"
    );
  });

  test("ERC20: get explicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/ERC20.cairo"
    );
    const constructorText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const explicitArgs = functionSignatureParser.getExplicitArgs(
      constructorText![0]
    );
    const targetExplicitArgs = [
      { name: "name", type: "felt" },
      { name: "symbol", type: "felt" },
      { name: "decimals", type: "Uint256" },
      { name: "initial_supply", type: "Uint256" },
      { name: "recipient", type: "felt" },
    ];
    assert.deepEqual(
      targetExplicitArgs,
      explicitArgs,
      "failed to get explicit args"
    );
  });

});
