import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentExplicitArgsParser from "../../../../../../../core/lib/parser/function-comment/explicit-args";
import CairoParser from "../../../../../../../core/lib/CairoParser";
import NatspecCommentParamsParser from "../../../../../../../core/lib/parser/function-comment/natspec/params";

suite("function-comment: constructor: params", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("parse line 1", () => {

    const lineNumber = 1;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    assert.equal(
      "// @param name name of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    paramsParser.setStartScope(functionCommentLine);

    assert.equal(functionCommentLine, paramsParser.startLine);

    const resultLineParsing = paramsParser.parseCommentLine(
      functionCommentLine
    )!.functionComment;

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    assert.equal(
      false,
      paramsParser.isEndScope(functionCommentLine),
      `failed to get end scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "name",
      type: "",
      desc: "name of the token",
      charIndex: {
        start: 50,
        end: 67,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${functionCommentLine}`
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
    assert.equal("name of the token", functionCommentReference);

  });

  test("parse line 2", () => {
    const lineNumber = 2;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentScope!.text[1]);

    assert.equal(
      "// @param symbol symbol of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${lineNumber}`);

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    const resultLineParsing = paramsParser.parseCommentLine(
      functionCommentLine
    )!.functionComment;

    const targetLineParsing = {
      name: "symbol",
      type: "",
      desc: "symbol of the token",
      charIndex: {
        start: 85,
        end: 104,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
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
    assert.equal("symbol of the token", functionCommentReference);
  });

  test("parse line 3", () => {
    const lineNumber = 3;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentScope!.text[1]);

    assert.equal(
      "// @param decimals floating point of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${lineNumber}`);

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    const resultLineParsing = paramsParser.parseCommentLine(
      functionCommentLine
    )!.functionComment;

    const targetLineParsing = {
      name: "decimals",
      type: "",
      desc: "floating point of the token",
      charIndex: {
        start: 124,
        end: 151,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
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
      "floating point of the token",
      functionCommentReference
    );
  });

  test("parse line 4", () => {
    const lineNumber = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentScope!.text[1]);

    assert.equal(
      "// @param initial_supply amount of initial supply of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${lineNumber}`);

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    const resultLineParsing = paramsParser.parseCommentLine(
      functionCommentLine
    )!.functionComment;

    const targetLineParsing = {
      name: "initial_supply",
      type: "",
      desc: "amount of initial supply of the token",
      charIndex: {
        start: 177,
        end: 214,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
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
      "amount of initial supply of the token",
      functionCommentReference
    );
  });

  test("parse line 5", () => {
    const lineNumber = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentScope!.text[1]);

    assert.equal(
      "// @param recipient the address of recipient of the initial supply",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(false, isEndScope, `failed to get end scope line ${lineNumber}`);

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    const resultLineParsing = paramsParser.parseCommentLine(
      functionCommentLine
    )!.functionComment;

    const targetLineParsing = {
      name: "recipient",
      type: "",
      desc: "the address of recipient of the initial supply",
      charIndex: {
        start: 235,
        end: 281,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
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
      "the address of recipient of the initial supply",
      functionCommentReference
    );
  });

  test("parse line 6", () => {
    const lineNumber = 6;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentScope!.text[1]);

    const resultLineParsing = paramsParser.parseCommentLine(
      functionCommentLine
    );

    assert(!functionCommentLine);
    assert.notEqual(functionCommentLine, paramsParser.startLine);
    assert.equal(
      true,
      paramsParser.isEndScope(functionCommentLine),
      `failed to get end scope line ${lineNumber}`
    );
    paramsParser.setEndScope(functionCommentLine);

    assert.equal(
      false,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );

    assert.deepEqual(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
    );
  });

  test("parse whole scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    const targetLineParsing = [
      {
        name: "name",
        type: "",
        desc: "name of the token",
        charIndex: { start: 50, end: 67 },
      },
      {
        name: "symbol",
        type: "",
        desc: "symbol of the token",
        charIndex: { start: 85, end: 104 },
      },
      {
        name: "decimals",
        type: "",
        desc: "floating point of the token",
        charIndex: { start: 124, end: 151 },
      },
      {
        name: "initial_supply",
        type: "",
        desc: "amount of initial supply of the token",
        charIndex: { start: 177, end: 214 },
      },
      {
        name: "recipient",
        type: "",
        desc: "the address of recipient of the initial supply",
        charIndex: { start: 235, end: 281 },
      },
    ];

    const resultLineParsing = paramsParser.parseCommentLines(
      functionCommentScope!.text
    );

    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing on whole scope`
    );
  });
});
