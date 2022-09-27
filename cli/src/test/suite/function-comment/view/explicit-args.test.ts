import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentExplicitArgsParser from "../../../../../../core/lib/parser/function-comment/explicit-args";
import CairoParser from "../../../../../../core/lib/CairoParser";

suite("function-comment: view - name", () => {
  test("doesn't have explicit args on `name` method", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];

    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const commentLineParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view - symbol", () => {
  test("doesn't have explicit args on `symbol` method", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 1;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];

    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");

    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const commentLineParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view - totalSupply", () => {
  test("doesn't have explicit args on `totalSupply` method", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 2;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];

    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");

    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const commentLineParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view - decimals", () => {
  test("doesn't have explicit args on `decimals` method", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 3;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];

    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");

    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const commentLineParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view: balanceOf", () => {
  test("should've started on lineNumber 6", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 6;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "// Explicit args:",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.equal(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );

    const functionCommentParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    assert.equal(
      null,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("should've found account(felt)", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 7;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "//   account(felt): account to query balance for",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "account",
      type: "felt",
      desc: "account to query balance for",
      charIndex: {
        start: 200,
        end: 243,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing lineNumber ${lineNumber}`
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
      "account(felt): account to query balance for",
      functionCommentReference
    );
  });

  test("should've ended on lineNumber 8", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 8;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "// Returns:",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.notEqual(lineNumber, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      true,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    explicitArgsParser.setEndScope(functionCommentLine);

    assert.equal(
      false,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );

    const functionCommentParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    assert.equal(
      null,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("should've get the whole scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const functionCommentParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "account",
        type: "felt",
        desc: "account to query balance for",
        charIndex: {
          start: 200,
          end: 243,
        },
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});

suite("function-comment: view: allowance", () => {
  test("should've started on lineNumber 6", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 6;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "// Explicit args:",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.equal(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );

    const functionCommentParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    assert.equal(
      null,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("should've found owner(felt)", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 7;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "//   owner(felt): the address of owner of the tokens",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "owner",
      type: "felt",
      desc: "the address of owner of the tokens",
      charIndex: {
        start: 239,
        end: 286,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing lineNumber ${lineNumber}`
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
      "owner(felt): the address of owner of the tokens",
      functionCommentReference
    );
  });

  test("should've found spender(felt)", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 8;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "//   spender(felt): the address of spender (delegated account) of the tokens",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );
    const resultLineParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    const targetLineParsing = {
      name: "spender",
      type: "felt",
      desc: "the address of spender (delegated account) of the tokens",
      charIndex: {
        start: 296,
        end: 367,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing lineNumber ${lineNumber}`
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
      "spender(felt): the address of spender (delegated account) of the tokens",
      functionCommentReference
    );
  });

  test("should've ended on lineNumber 9", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );
    explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

    const lineNumber = 9;
    const functionCommentLine = functionCommentScope!.text[lineNumber];
    assert.equal(
      "// Returns:",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.notEqual(lineNumber, explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
    assert.equal(
      true,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    explicitArgsParser.setEndScope(functionCommentLine);

    assert.equal(
      false,
      explicitArgsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );

    const functionCommentParsing =
      explicitArgsParser.parseCommentLine(functionCommentLine);

    assert.equal(
      null,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("should've get the whole scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);
    const functionCommentText = functionCommentScope!.text.join("");
    const explicitArgsParser = new FunctionCommentExplicitArgsParser(
      functionCommentText
    );

    const functionCommentParsing = explicitArgsParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "owner",
        type: "felt",
        desc: "the address of owner of the tokens",
        charIndex: {
          start: 239,
          end: 286,
        },
      },
      {
        name: "spender",
        type: "felt",
        desc: "the address of spender (delegated account) of the tokens",
        charIndex: {
          start: 296,
          end: 367,
        },
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});
