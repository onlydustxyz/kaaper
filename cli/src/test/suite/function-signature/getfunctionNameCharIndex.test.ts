import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionSignatureRegexParser from "../../../../../core/lib/parser/function-signature/regex";
import CairoParser from "../../../../../core/lib/CairoParser";

import { CharIndex } from "../../../../../core/lib/types";
import { yieldStringFromCharIndex } from "./utils";

suite("getFunctionNameCharIndex: ERC20.cairo", () => {
  test("should get proper function name `constructor`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const scopeNumber = 0;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `constructor`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });

  test("should get proper function name `name`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const scopeNumber = 0;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `name`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });

  test("should get proper function name `symbol`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const scopeNumber = 1;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `symbol`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });
});

suite("getFunctionNameCharIndex: library.cairo", () => {
  test("should get proper function name `constructor`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const scopeNumber = 0;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope, true);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `constructor`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });

  test("should get proper function name `constructor`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const scopeNumber = 1;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope, true);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `name`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });

  test("should get proper function name `transfer_from`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const scopeNumber = 2;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope, true);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `transfer_from`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });

  test("should get proper function name `_mint`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const scopeNumber = 3;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope, true);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `_mint`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });

  test("should get proper function name `_burn`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const scopeNumber = 4;
    const functionScope = functionScopes![scopeNumber];
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const charIndex: CharIndex =
      functionSignatureParser.getFunctionNameCharIndex(functionScope, true);
    const stringFromCharIndex = yieldStringFromCharIndex(text, charIndex);
    const targetImplicitArgs = `_burn`;
    assert.equal(stringFromCharIndex, targetImplicitArgs);
  });
});
