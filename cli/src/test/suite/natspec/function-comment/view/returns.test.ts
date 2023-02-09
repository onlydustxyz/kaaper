import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser, { CairoNatspecParser } from "../../../../../../../core/lib/CairoParser";
import NatspecCommentParamsParser from "../../../../../../../core/lib/parser/function-comment/natspec/params";
import NatspecCommentReturnsParser from "../../../../../../../core/lib/parser/function-comment/natspec/returns";


suite("function-comment: view - name returns", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  const scopeLine = 0;


  test("should parse correctly the returns for name()", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const lineNumber = 1;
    const functionCommentText: string = functionCommentScope!.text.join("");
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);

    const commentLineParsing = returnsParser.parseCommentLines(
      functionCommentScope!.text
    );

    returnsParser.setStartScope(functionCommentLine);

    assert.equal(
      "// @return name Name of the token",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.equal(functionCommentLine, returnsParser.startLine);
    const isEndScope = returnsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${returnsParser}`
    );
    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope lineNumber ${returnsParser}`
    );
    const resultLineParsing =
      returnsParser.parseCommentLine(functionCommentLine)!.functionComment;

    const targetLineParsing = {
      name: "name",
      type: "",
      desc: "Name of the token",
      charIndex: {
        start: 57,
        end: 74,
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
      "Name of the token",
      functionCommentReference
    );

    test("should've get the whole scope", () => {

      const functionCommentText: string = functionCommentScope!.text.join("");
      const paramsParser = new NatspecCommentParamsParser(functionCommentText);


      const functionCommentParsing = paramsParser.parseCommentLines(
        functionCommentScope!.text
      );

      const targetLineParsing = [{
        name: "account",
        type: "",
        desc: "account to query balance for",
        charIndex: {
          start: 63,
          end: 91,
        },
      }];

      assert.deepEqual(
        targetLineParsing,
        functionCommentParsing,
        "failed to get functionCommentParsing"
      );
    });

  });
});

suite("function-comment: view - symbol returns", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  const scopeLine = 1;


  test("should parse correctly the returns for symbol()", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const lineNumber = 1;
    const functionCommentText: string = functionCommentScope!.text.join("");
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);

    const commentLineParsing = returnsParser.parseCommentLines(
      functionCommentScope!.text
    );

    returnsParser.setStartScope(functionCommentLine);

    assert.equal(
      "// @return symbol Symbol of the token",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.equal(functionCommentLine, returnsParser.startLine);
    const isEndScope = returnsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${returnsParser}`
    );
    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope lineNumber ${returnsParser}`
    );
    const resultLineParsing =
      returnsParser.parseCommentLine(functionCommentLine)!.functionComment;

    const targetLineParsing = {
      name: "symbol",
      type: "",
      desc: "Symbol of the token",
      charIndex: {
        start: 61,
        end: 80,
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
      "Symbol of the token",
      functionCommentReference
    );


  });
});

suite("function-comment: view - totalSupply returns", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  const scopeLine = 2;


  test("should parse correctly the returns for totalSupply()", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const lineNumber = 1;
    const functionCommentText: string = functionCommentScope!.text.join("");
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);

    const commentLineParsing = returnsParser.parseCommentLines(
      functionCommentScope!.text
    );

    returnsParser.setStartScope(functionCommentLine);

    assert.equal(
      "// @return totalSupply Total supply of the token",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.equal(functionCommentLine, returnsParser.startLine);
    const isEndScope = returnsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${returnsParser}`
    );
    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope lineNumber ${returnsParser}`
    );
    const resultLineParsing =
      returnsParser.parseCommentLine(functionCommentLine)!.functionComment;

    const targetLineParsing = {
      name: "totalSupply",
      type: "",
      desc: "Total supply of the token",
      charIndex: {
        start: 72,
        end: 97,
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
      "Total supply of the token",
      functionCommentReference
    );

  });
});