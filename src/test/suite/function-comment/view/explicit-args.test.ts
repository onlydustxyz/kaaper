import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentExplicitArgsParser from "../../../../lib/parser/function-comment-new/explicit-args";
import CairoParser from "../../../../lib/CairoParser";

suite("function-comment: view - name", () => {
  test("doesn't have explicit args on `name` method", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    // console.log(functionScope.text);
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    console.log(functionCommentText);

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
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const scopeLine = 1;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];

    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;
    const functionCommentText = functionCommentScope!.text.join("");
    console.log(functionCommentText);

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
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
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
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
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
  test("should've not start yet on lineNumber 6", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
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
      "# Explicit args:",
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

  test("should've found explicit args on `balanceOf` methods", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
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
      "#   account(felt): account to query balance for",
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
        start: 192,
        end: 235,
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

  // test("parse lineNumber 7", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionScope = functionScopes![0];
  //   const functionCommentScope = CairoParser.parseCommentLines(functionScope);
  //   const functionCommentText = functionCommentScope!.text.join("");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );
  //   explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

  //   const lineNumber = 7;
  //   const functionCommentLine = functionCommentScope!.text[lineNumber];
  //   assert.equal(
  //     "#   name(felt): name of the token",
  //     functionCommentLine.trim(),
  //     `check lineNumber ${lineNumber}`
  //   );
  //   assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
  //   const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
  //   assert.equal(false, isEndScope, `failed to get end scope lineNumber ${lineNumber}`);

  //   assert.equal(
  //     true,
  //     explicitArgsParser.runningScope,
  //     `failed to get running scope lineNumber ${lineNumber}`
  //   );
  //   const resultLineParsing =
  //     explicitArgsParser.parseCommentLine(functionCommentLine);

  //   const targetLineParsing = {
  //     name: "name",
  //     type: "felt",
  //     desc: "name of the token",
  //     charIndex: {
  //       start: 181,
  //       end: 219,
  //     },
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing lineNumber ${lineNumber}`
  //   );

  //   var functionCommentReference = "";
  //   const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
  //   const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
  //   for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
  //     functionCommentReference += functionCommentText[i];
  //   }

  //   var wholeFileReference = "";
  //   const functionCommentStart = functionCommentScope!.start;
  //   for (
  //     var i = functionCommentStart + explicitArgsCommentStart;
  //     i < functionCommentStart + explicitArgsCommentEnd;
  //     i++
  //   ) {
  //     wholeFileReference += text[i];
  //   }
  //   assert.equal(functionCommentReference, wholeFileReference);
  // });

  // test("parse lineNumber 8", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionScope = functionScopes![0];
  //   const functionCommentScope = CairoParser.parseCommentLines(functionScope);
  //   const functionCommentText = functionCommentScope!.text.join("");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );
  //   explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

  //   const lineNumber = 8;
  //   const functionCommentLine = functionCommentScope!.text[lineNumber];
  //   assert.equal(
  //     "#   symbol(felt): symbol of the token",
  //     functionCommentLine.trim(),
  //     `check lineNumber ${lineNumber}`
  //   );
  //   assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
  //   const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
  //   assert.equal(false, isEndScope, `failed to get end scope lineNumber ${lineNumber}`);

  //   assert.equal(
  //     true,
  //     explicitArgsParser.runningScope,
  //     `failed to get running scope lineNumber ${lineNumber}`
  //   );
  //   const resultLineParsing =
  //     explicitArgsParser.parseCommentLine(functionCommentLine);

  //   const targetLineParsing = {
  //     name: "symbol",
  //     type: "felt",
  //     desc: "symbol of the token",
  //     charIndex: {
  //       start: 219,
  //       end: 261,
  //     },
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing lineNumber ${lineNumber}`
  //   );

  //   var functionCommentReference = "";
  //   const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
  //   const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
  //   for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
  //     functionCommentReference += functionCommentText[i];
  //   }

  //   var wholeFileReference = "";
  //   const functionCommentStart = functionCommentScope!.start;
  //   for (
  //     var i = functionCommentStart + explicitArgsCommentStart;
  //     i < functionCommentStart + explicitArgsCommentEnd;
  //     i++
  //   ) {
  //     wholeFileReference += text[i];
  //   }
  //   assert.equal(functionCommentReference, wholeFileReference);
  // });

  // test("parse lineNumber 9", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionScope = functionScopes![0];
  //   const functionCommentScope = CairoParser.parseCommentLines(functionScope);
  //   const functionCommentText = functionCommentScope!.text.join("");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );
  //   explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

  //   const lineNumber = 9;
  //   const functionCommentLine = functionCommentScope!.text[lineNumber];
  //   assert.equal(
  //     "#   decimals(Uint256): floating point of the token",
  //     functionCommentLine.trim(),
  //     `check lineNumber ${lineNumber}`
  //   );
  //   assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
  //   const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
  //   assert.equal(false, isEndScope, `failed to get end scope lineNumber ${lineNumber}`);

  //   assert.equal(
  //     true,
  //     explicitArgsParser.runningScope,
  //     `failed to get running scope lineNumber ${lineNumber}`
  //   );
  //   const resultLineParsing =
  //     explicitArgsParser.parseCommentLine(functionCommentLine);

  //   const targetLineParsing = {
  //     name: "decimals",
  //     type: "Uint256",
  //     desc: "floating point of the token",
  //     charIndex: {
  //       start: 261,
  //       end: 316,
  //     },
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing lineNumber ${lineNumber}`
  //   );

  //   var functionCommentReference = "";
  //   const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
  //   const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
  //   for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
  //     functionCommentReference += functionCommentText[i];
  //   }

  //   var wholeFileReference = "";
  //   const functionCommentStart = functionCommentScope!.start;
  //   for (
  //     var i = functionCommentStart + explicitArgsCommentStart;
  //     i < functionCommentStart + explicitArgsCommentEnd;
  //     i++
  //   ) {
  //     wholeFileReference += text[i];
  //   }
  //   assert.equal(functionCommentReference, wholeFileReference);
  // });

  // test("parse lineNumber 10", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionScope = functionScopes![0];
  //   const functionCommentScope = CairoParser.parseCommentLines(functionScope);
  //   const functionCommentText = functionCommentScope!.text.join("");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );
  //   explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

  //   const lineNumber = 10;
  //   const functionCommentLine = functionCommentScope!.text[lineNumber];
  //   assert.equal(
  //     "#   initial_supply(Uint256): amount of initial supply of the token",
  //     functionCommentLine.trim(),
  //     `check lineNumber ${lineNumber}`
  //   );
  //   assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
  //   const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
  //   assert.equal(false, isEndScope, `failed to get end scope lineNumber ${lineNumber}`);

  //   assert.equal(
  //     true,
  //     explicitArgsParser.runningScope,
  //     `failed to get running scope lineNumber ${lineNumber}`
  //   );
  //   const resultLineParsing =
  //     explicitArgsParser.parseCommentLine(functionCommentLine);

  //   const targetLineParsing = {
  //     name: "initial_supply",
  //     type: "Uint256",
  //     desc: "amount of initial supply of the token",
  //     charIndex: {
  //       start: 316,
  //       end: 387,
  //     },
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing lineNumber ${lineNumber}`
  //   );

  //   var functionCommentReference = "";
  //   const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
  //   const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
  //   for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
  //     functionCommentReference += functionCommentText[i];
  //   }

  //   var wholeFileReference = "";
  //   const functionCommentStart = functionCommentScope!.start;
  //   for (
  //     var i = functionCommentStart + explicitArgsCommentStart;
  //     i < functionCommentStart + explicitArgsCommentEnd;
  //     i++
  //   ) {
  //     wholeFileReference += text[i];
  //   }
  //   assert.equal(functionCommentReference, wholeFileReference);
  // });

  // test("parse lineNumber 11", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionScope = functionScopes![0];
  //   const functionCommentScope = CairoParser.parseCommentLines(functionScope);
  //   const functionCommentText = functionCommentScope!.text.join("");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );
  //   explicitArgsParser.setStartScope(functionCommentScope!.text[6]);

  //   const lineNumber = 11;
  //   const functionCommentLine = functionCommentScope!.text[lineNumber];
  //   assert.equal(
  //     "#   recipient(felt): the address of recipient of the initial supply",
  //     functionCommentLine.trim(),
  //     `check lineNumber ${lineNumber}`
  //   );
  //   assert.notEqual(functionCommentLine, explicitArgsParser.startLine);
  //   const isEndScope = explicitArgsParser.isEndScope(functionCommentLine);
  //   assert.equal(false, isEndScope, `failed to get end scope lineNumber ${lineNumber}`);

  //   assert.equal(
  //     true,
  //     explicitArgsParser.runningScope,
  //     `failed to get running scope lineNumber ${lineNumber}`
  //   );
  //   const resultLineParsing =
  //     explicitArgsParser.parseCommentLine(functionCommentLine);

  //   const targetLineParsing = {
  //     name: "recipient",
  //     type: "felt",
  //     desc: "the address of recipient of the initial supply",
  //     charIndex: {
  //       start: 387,
  //       end: 459,
  //     },
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing lineNumber ${lineNumber}`
  //   );

  //   var functionCommentReference = "";
  //   const explicitArgsCommentStart = resultLineParsing!.charIndex.start;
  //   const explicitArgsCommentEnd = resultLineParsing!.charIndex.end;
  //   for (var i = explicitArgsCommentStart; i < explicitArgsCommentEnd; i++) {
  //     functionCommentReference += functionCommentText[i];
  //   }

  //   var wholeFileReference = "";
  //   const functionCommentStart = functionCommentScope!.start;
  //   for (
  //     var i = functionCommentStart + explicitArgsCommentStart;
  //     i < functionCommentStart + explicitArgsCommentEnd;
  //     i++
  //   ) {
  //     wholeFileReference += text[i];
  //   }
  //   assert.equal(functionCommentReference, wholeFileReference);
  // });

  // test("parse lineNumber 12", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![0]
  //   )!.text;
  //   const functionCommentText = functionCommentScope!.join("\n");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );
  //   explicitArgsParser.setStartScope(functionCommentScope![6]);

  //   const lineNumber = 12;
  //   assert.equal(
  //     "# Returns:",
  //     functionCommentScope![lineNumber].trim(),
  //     `check lineNumber ${lineNumber}`
  //   );
  //   assert.notEqual(functionCommentScope![lineNumber], explicitArgsParser.startLine);
  //   assert.equal(
  //     true,
  //     explicitArgsParser.isEndScope(functionCommentScope![lineNumber]),
  //     `failed to get end scope lineNumber ${lineNumber}`
  //   );
  //   explicitArgsParser.setEndScope(functionCommentScope![lineNumber]);

  //   assert.equal(
  //     false,
  //     explicitArgsParser.runningScope,
  //     `failed to get running scope lineNumber ${lineNumber}`
  //   );
  //   const resultLineParsing = explicitArgsParser.parseCommentLine(
  //     functionCommentScope![lineNumber]
  //   );

  //   assert.deepEqual(
  //     null,
  //     resultLineParsing,
  //     `failed to get resultLineParsing lineNumber ${lineNumber}`
  //   );
  // });

  // test("parse whole scope", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![0]
  //   )!.text;
  //   const functionCommentText = functionCommentScope!.join("");
  //   const explicitArgsParser = new FunctionCommentExplicitArgsParser(
  //     functionCommentText
  //   );

  //   const targetLineParsing = [
  //     {
  //       name: "name",
  //       type: "felt",
  //       desc: "name of the token",
  //       charIndex: { start: 181, end: 219 },
  //     },
  //     {
  //       name: "symbol",
  //       type: "felt",
  //       desc: "symbol of the token",
  //       charIndex: { start: 219, end: 261 },
  //     },
  //     {
  //       name: "decimals",
  //       type: "Uint256",
  //       desc: "floating point of the token",
  //       charIndex: { start: 261, end: 316 },
  //     },
  //     {
  //       name: "initial_supply",
  //       type: "Uint256",
  //       desc: "amount of initial supply of the token",
  //       charIndex: { start: 316, end: 387 },
  //     },
  //     {
  //       name: "recipient",
  //       type: "felt",
  //       desc: "the address of recipient of the initial supply",
  //       charIndex: { start: 387, end: 459 },
  //     },
  //   ];
  //   const resultLineParsing = explicitArgsParser.parseCommentLines(
  //     functionCommentScope!
  //   );

  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing on whole scope`
  //   );
  // });
});
