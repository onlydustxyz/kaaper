import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentReturnsParser from "../../../../lib/parser/function-comment-new/returns";
import CairoParser from "../../../../lib/CairoParser";

suite("function-comment: constructor: returns", () => {
  test("parse line 12", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(
      text,
      "constructor"
    );
    const functionScope = functionScopes![0];
    const functionCommentScope =
      CairoParser.parseCommentLinesWithMatchAll(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    const returnsParser = new FunctionCommentReturnsParser(functionCommentText);

    const line = 12;
    const functionCommentLine = functionCommentScope!.text[line];

    assert.equal(
      "# Returns:",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    returnsParser.setStartScope(functionCommentLine);

    assert.equal(functionCommentLine, returnsParser.startLine);

    const resultLineParsing =
      returnsParser.parseCommentLine(functionCommentLine);

    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(
      false,
      returnsParser.isEndScope(functionCommentLine),
      `failed to get end scope line ${line}`
    );
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  // test("parse line 13", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const returnsParser = new FunctionCommentReturnsParser();
  //   returnsParser.setStartScope(functionCommentScope![12]);

  //   const line = 13;
  //   assert.equal("#   None", functionCommentScope![line].trim(), `check line ${line}`);
  //   assert.notEqual(functionCommentScope![line], returnsParser.startLine);
  //   const isEndScope = returnsParser.isEndScope(functionCommentScope![line]);
  //   assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

  //   assert.equal(
  //     true,
  //     returnsParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = returnsParser.parseCommentLine(
  //     functionCommentScope![line]
  //   );

  //   const targetLineParsing = null;
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );
  // });

  // test("parse line 14", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const returnsParser = new FunctionCommentReturnsParser();
  //   returnsParser.setStartScope(functionCommentScope![12]);

  //   const line = 14;
  //   assert.equal("# Raises:", functionCommentScope![line].trim(), `check line ${line}`);
  //   assert.notEqual(functionCommentScope![line], returnsParser.startLine);
  //   assert.equal(
  //     true,
  //     returnsParser.isEndScope(functionCommentScope![line]),
  //     `failed to get end scope line ${line}`
  //   );
  //   returnsParser.setEndScope(functionCommentScope![line]);

  //   assert.equal(
  //     false,
  //     returnsParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = returnsParser.parseCommentLine(
  //     functionCommentScope![line]
  //   );

  //   assert.deepEqual(
  //     null,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );
  // });

  // test("parse whole scope", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const returnsParser = new FunctionCommentReturnsParser();

  //   const targetLineParsing = null;
  //   const resultLineParsing = returnsParser.parseCommentLines(functionCommentScope!);

  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing on whole scope`
  //   );
  // });
});
