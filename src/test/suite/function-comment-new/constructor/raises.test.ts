import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentRaisesParser from "../../../../lib/parser/function-comment-new/raises";
import CairoParser from "../../../../lib/CairoParser";

suite("function-comment: constructor: raises", () => {
  test("parse line 14", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);

    const line = 14;
    const functionCommentLine = functionCommentScope!.text[line];

    assert.equal("# Raises:", functionCommentLine.trim(), `check line ${line}`);
    raisesParser.setStartScope(functionCommentLine);

    assert.equal(functionCommentLine, raisesParser.startLine);

    const resultLineParsing =
      raisesParser.parseCommentLine(functionCommentLine);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(
      false,
      raisesParser.isEndScope(functionCommentLine),
      `failed to get end scope line ${line}`
    );
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse line 15", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);
    raisesParser.setStartScope(functionCommentScope!.text[14]);

    const line = 15;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "#   decimals: decimals exceed 2^8",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      raisesParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "decimals",
      type: "",
      desc: "decimals exceed 2^8",
      charIndex: {
        start: 501,
        end: 530,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );

    var functionCommentReference = "";
    const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
    const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
    for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
      functionCommentReference += functionCommentText[i];
    }

    var wholeFileReference = "";
    const functionCommentStart = functionCommentScope!.start;
    for (
      var i = functionCommentStart + explicitArgsCommentStart;
      i < functionCommentStart + explicitArgsCommentEnd;
      i++
    ) {
      wholeFileReference += text[i];
    }
    assert.equal(functionCommentReference, wholeFileReference);
  });

  test("parse line 16", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);
    raisesParser.setStartScope(functionCommentScope!.text[14]);

    const line = 16;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "#   recipient: cannot mint to the zero address",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      raisesParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "recipient",
      type: "",
      desc: "cannot mint to the zero address",
      charIndex: {
        start: 539,
        end: 581,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );

    var functionCommentReference = "";
    const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
    const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
    for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
      functionCommentReference += functionCommentText[i];
    }

    var wholeFileReference = "";
    const functionCommentStart = functionCommentScope!.start;
    for (
      var i = functionCommentStart + explicitArgsCommentStart;
      i < functionCommentStart + explicitArgsCommentEnd;
      i++
    ) {
      wholeFileReference += text[i];
    }
    assert.equal(functionCommentReference, wholeFileReference);
  });

  test("parse line 17", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);
    raisesParser.setStartScope(functionCommentScope!.text[14]);

    const line = 17;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "#   initial_supply: not valid Uint256",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      raisesParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "initial_supply",
      type: "",
      desc: "not valid Uint256",
      charIndex: {
        start: 590,
        end: 623,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );

    var functionCommentReference = "";
    const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
    const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
    for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
      functionCommentReference += functionCommentText[i];
    }

    var wholeFileReference = "";
    const functionCommentStart = functionCommentScope!.start;
    for (
      var i = functionCommentStart + explicitArgsCommentStart;
      i < functionCommentStart + explicitArgsCommentEnd;
      i++
    ) {
      wholeFileReference += text[i];
    }
    assert.equal(functionCommentReference, wholeFileReference);
  });

  test("parse line 18", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);
    raisesParser.setStartScope(functionCommentScope!.text[14]);

    const line = 18;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "#   initial_supply: mint overflow",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      raisesParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "initial_supply",
      type: "",
      desc: "mint overflow",
      charIndex: {
        start: 632,
        end: 661,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );

    var functionCommentReference = "";
    const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
    const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
    for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
      functionCommentReference += functionCommentText[i];
    }

    var wholeFileReference = "";
    const functionCommentStart = functionCommentScope!.start;
    for (
      var i = functionCommentStart + explicitArgsCommentStart;
      i < functionCommentStart + explicitArgsCommentEnd;
      i++
    ) {
      wholeFileReference += text[i];
    }
    assert.equal(functionCommentReference, wholeFileReference);
  });

  test("parse whole scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![0]
    )!;
    const functionCommentText = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);

    const targetLineParsing = [
      {
        name: "decimals",
        type: "",
        desc: "decimals exceed 2^8",
        charIndex: { start: 501, end: 530 },
      },
      {
        name: "recipient",
        type: "",
        desc: "cannot mint to the zero address",
        charIndex: { start: 539, end: 581 },
      },
      {
        name: "initial_supply",
        type: "",
        desc: "not valid Uint256",
        charIndex: { start: 590, end: 623 },
      },
      {
        name: "initial_supply",
        type: "",
        desc: "mint overflow",
        charIndex: { start: 632, end: 661 },
      },
    ];
    const resultLineParsing = raisesParser.parseCommentLines(
      functionCommentScope!.text
    );

    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing on whole scope`
    );
  });
});
