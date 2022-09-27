import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentExplicitArgsParser from "../../../../../../core/lib/parser//function-comment/explicit-args";
import CairoParser from "../../../../../../core/lib/CairoParser";

suite("function-comment: constructor: explicit-args", () => {
  test("parse line 6", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![0]
    )!.text;
    const functionCommentText = functionCommentScope!.join("");

    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const line = 6;
    assert.equal(
      "// Explicit args:",
      functionCommentScope![line].trim(),
      `check line ${line}`
    );
    explicitArgsParser.setStartScope(functionCommentScope![line]);

    assert.equal(functionCommentScope![line], explicitArgsParser.startLine);

    const resultLineParsing = explicitArgsParser.parseCommentLine(
      functionCommentScope![line]
    );

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(
      false,
      explicitArgsParser.isEndScope(functionCommentScope![line]),
      `failed to get end scope line ${line}`
    );
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse line 7", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const line = 7;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "//   name(felt): name of the token",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "name",
      type: "felt",
      desc: "name of the token",
      charIndex: {
        start: 189,
        end: 218,
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
    assert.equal("name(felt): name of the token", functionCommentReference);
  });

  test("parse line 8", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const line = 8;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "//   symbol(felt): symbol of the token",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "symbol",
      type: "felt",
      desc: "symbol of the token",
      charIndex: {
        start: 228,
        end: 261,
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
    assert.equal("symbol(felt): symbol of the token", functionCommentReference);
  });

  test("parse line 9", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const line = 9;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "//   decimals(Uint256): floating point of the token",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "decimals",
      type: "Uint256",
      desc: "floating point of the token",
      charIndex: {
        start: 271,
        end: 317,
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
    assert.equal(
      "decimals(Uint256): floating point of the token",
      functionCommentReference
    );
  });

  test("parse line 10", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const line = 10;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "//   initial_supply(Uint256): amount of initial supply of the token",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "initial_supply",
      type: "Uint256",
      desc: "amount of initial supply of the token",
      charIndex: {
        start: 327,
        end: 389,
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
    assert.equal(
      "initial_supply(Uint256): amount of initial supply of the token",
      functionCommentReference
    );
  });

  test("parse line 11", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const line = 11;
    const functionCommentLine = functionCommentScope!.text[line];
    assert.equal(
      "//   recipient(felt): the address of recipient of the initial supply",
      functionCommentLine.trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "recipient",
      type: "felt",
      desc: "the address of recipient of the initial supply",
      charIndex: {
        start: 399,
        end: 462,
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
    assert.equal(
      "recipient(felt): the address of recipient of the initial supply",
      functionCommentReference
    );
  });

  test("parse line 12", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![0]
    )!.text;
    const functionCommentText = functionCommentScope!.join("\n");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope![6]);

    const line = 12;
    assert.equal(
      "// Returns:",
      functionCommentScope![line].trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentScope![line], explicitArgsParser.startLine);
    assert.equal(
      true,
      explicitArgsParser.isEndScope(functionCommentScope![line]),
      `failed to get end scope line ${line}`
    );
    explicitArgsParser.setEndScope(functionCommentScope![line]);

    assert.equal(
      false,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing = explicitArgsParser.parseCommentLine(
      functionCommentScope![line]
    );

    assert.deepEqual(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse whole scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![0]
    )!.text;
    const functionCommentText = functionCommentScope!.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const targetLineParsing = [
      {
        name: "name",
        type: "felt",
        desc: "name of the token",
        charIndex: { start: 189, end: 218 },
      },
      {
        name: "symbol",
        type: "felt",
        desc: "symbol of the token",
        charIndex: { start: 228, end: 261 },
      },
      {
        name: "decimals",
        type: "Uint256",
        desc: "floating point of the token",
        charIndex: { start: 271, end: 317 },
      },
      {
        name: "initial_supply",
        type: "Uint256",
        desc: "amount of initial supply of the token",
        charIndex: { start: 327, end: 389 },
      },
      {
        name: "recipient",
        type: "felt",
        desc: "the address of recipient of the initial supply",
        charIndex: { start: 399, end: 462 },
      },
    ];
    const resultLineParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!
    );

    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing on whole scope`
    );
  });
});
