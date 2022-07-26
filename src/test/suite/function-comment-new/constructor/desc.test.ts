import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import FunctionCommentDescParser from "../../../../lib/parser/function-comment-new/desc";
import CairoParser from "../../../../lib/CairoParser";

suite("function-comment-new: constructor: desc", () => {
  test("parse line 0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const lineNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(
      text,
      "constructor"
    );
    const functionScope = functionScopes![lineNumber];
    const functionCommentScope =
      CairoParser.parseCommentLinesWithMatchAll(functionScope)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const descParser = new FunctionCommentDescParser(functionCommentText);

    const functionCommentLines = descParser.parseCommentLines(
      functionCommentScope!.text
    );

    assert.equal(
      "# Desc:",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    descParser.setStartScope(functionCommentLine);

    const resultLineParsing = descParser.parseCommentLine(functionCommentLine);
    const isEndScope = descParser.isEndScope(functionCommentLine);

    assert.equal(
      true,
      descParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
    );
  });

  test("parse line 1", () => {
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

    const lineNumber = 1;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const descParser = new FunctionCommentDescParser(functionCommentText);
    descParser.setStartScope(functionCommentScope!.text[0]);

    assert.equal(
      "#   Initialize the contract",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    const isEndScope = descParser.isEndScope(functionCommentLine);

    assert.equal(
      true,
      descParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    const resultLineParsing = descParser.parseCommentLine(functionCommentLine);
    const targetLineParsing = {
      name: "",
      type: "",
      desc: "Initialize the contract",
      charIndex: {
        start: 12,
        end: 44,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
    );
  });

  test("parse line 2", () => {
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

    const lineNumber = 2;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const descParser = new FunctionCommentDescParser(functionCommentText);
    descParser.setStartScope(functionCommentScope!.text[0]);

    assert.equal(
      "# Implicit args:",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    assert.equal("\n    # Desc:", descParser.startLine);
    assert.notEqual(lineNumber, descParser.startLine);
    const isEndScope = descParser.isEndScope(functionCommentLine);
    assert.equal(
      true,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    descParser.setEndScope(functionCommentLine);

    assert.equal(
      false,
      descParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );

    const resultLineParsing = descParser.parseCommentLine(functionCommentLine);

    assert.deepEqual(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
    );
  });

  test("parse whole comment", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(
      text,
      "constructor"
    );
    const functionScope = functionScopes![scopeNumber];
    const functionCommentScope =
      CairoParser.parseCommentLinesWithMatchAll(functionScope)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const descParser = new FunctionCommentDescParser(functionCommentText);

    const commentLineParsing = descParser.parseCommentLines(
      functionCommentScope!.text
    );

    const functionCommentStart = functionCommentScope!.start;

    const descCommentStart = commentLineParsing![0].charIndex.start;
    const descCommentEnd = commentLineParsing![0].charIndex.end;

    const targetLineParsing = [
      {
        name: "",
        type: "",
        desc: "Initialize the contract",
        charIndex: { start: 12, end: 44 },
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      commentLineParsing,
      "failed to get resultLineParsing"
    );

    var functionCommentReference = "";
    for (let i = descCommentStart; i < descCommentEnd; i++) {
      functionCommentReference += functionCommentText.at(i);
    }

    var wholeFileReference = "";
    for (
      let i = functionCommentStart + descCommentStart;
      i < functionCommentStart + descCommentEnd;
      i++
    ) {
      wholeFileReference += text.at(i);
    }

    assert.equal(
      functionCommentReference,
      wholeFileReference,
      "failed to get whole file reference"
    );
  });
});
