import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import CairoParser from "../../../lib/CairoParser";

suite("function-signature: constructor", () => {
  test("ERC20: get attribute name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const constructorText = CairoParser.parseFunctionScope(text, "constructor");

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const attributeName = functionSignatureParser.getAttributeName(
      constructorText![0].text
    );
    assert.equal("constructor", attributeName, "failed to get attribute name");
  });
  test("ERC20: get function name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const constructorText = CairoParser.parseFunctionScope(text, "constructor");

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const functionName = functionSignatureParser.getFunctionName(
      constructorText![0].text
    );
    assert.equal("constructor", functionName, "failed to get attribute name");
  });

  test("ERC20: get implicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const constructorText = CairoParser.parseFunctionScope(text, "constructor");

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const implicitArgs = functionSignatureParser.getImplicitArgs(
      constructorText![0].text
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
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const constructorText = CairoParser.parseFunctionScope(text, "constructor");

    const functionSignatureParser = new FunctionSignatureRegexParser();
    const explicitArgs = functionSignatureParser.getExplicitArgs(
      constructorText![0].text
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
