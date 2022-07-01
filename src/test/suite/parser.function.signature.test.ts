import * as assert from "assert";
import * as path from "path";
import FunctionSignatureParser from "../../lib/parser/functionsignature";
import CairoParser from "../../lib/main";

suite("scope: constructor", () => {
  test("get attribute name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    const constructorParser = new CairoParser(pathFile, "constructor");
    const constructorText = constructorParser.parseFunctionScope();
    const functionSignatureParser = new FunctionSignatureParser();
    const attributeName = functionSignatureParser.getAttributeName(constructorText)
    assert.equal("constructor", attributeName, "failed to get attribute name");
  });
  test("get function name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const constructorText = constructorParser.parseFunctionScope();
    const functionSignatureParser = new FunctionSignatureParser();
    const functionName = functionSignatureParser.getFunctionName(constructorText)
    assert.equal("constructor", functionName, "failed to get attribute name");
  });

  test("get implicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const constructorText = constructorParser.parseFunctionScope();
    const functionSignatureParser = new FunctionSignatureParser();
    const implicitArgs = functionSignatureParser.getImplicitArgs(constructorText)
    const targetArgs = new Map();
    targetArgs.set("syscall_ptr", "felt*");
    targetArgs.set("pedersen_ptr", "HashBuiltin*");
    targetArgs.set("range_check_ptr", "");

    // TODO: refactor this, somehow the two Maps are not equal but if we unpack it they are equal
    const targetArgsIter = targetArgs.values();
    const implicitArgsIter = implicitArgs.values();
    assert.equal(
      targetArgs.size,
      implicitArgs.size,
      "failed to get implicit args"
    );
    for (let i = 0; i < targetArgs.size; i++) {
      assert.equal(
        targetArgsIter.next().value,
        implicitArgsIter.next().value,
        "failed to get explicit args"
      );
    }
  });

  test("get explicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const constructorText = constructorParser.parseFunctionScope();
    const functionSignatureParser = new FunctionSignatureParser();
    const explicitArgs = functionSignatureParser.getExplicitArgs(constructorText)
    const targetArgs = new Map();
    targetArgs.set("name", "felt");
    targetArgs.set("symbol", "felt");
    targetArgs.set("decimals", "Uint256");
    targetArgs.set("initial_supply", "Uint256");
    targetArgs.set("recipient", "felt");
    // TODO: refactor this, somehow the two Maps are not equal but if we unpack it they are equal
    const targetArgsIter = targetArgs.values();
    const explicitArgsIter = explicitArgs.values();
    assert.equal(
      targetArgs.size,
      explicitArgs.size,
      "failed to get implicit args"
    );
    for (let i = 0; i < targetArgs.size; i++) {
      assert.equal(
        targetArgsIter.next().value,
        explicitArgsIter.next().value,
        "failed to get explicit args"
      );
    }
  });
});
