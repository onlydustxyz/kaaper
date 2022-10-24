import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentExplicitArgsParser from "../../../../../../../core/lib/parser/function-comment/explicit-args";
import CairoParser from "../../../../../../../core/lib/CairoParser";
import NatspecCommentNoticeParser from "../../../../../../../core/lib/parser/function-comment/natspec/notice";
import NatspecCommentParamsParser from "../../../../../../../core/lib/parser/function-comment/natspec/params";


suite("function-comment: view - name", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );

  test("doesn't have params on `name` method", () => {

    const scopeLine = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    const commentLineParsing = paramsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view - symbol", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("doesn't have params on `symbol` method", () => {

    const scopeLine = 1;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    const commentLineParsing = paramsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view - totalSupply", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("doesn't have params on `totalSupply` method", () => {
    const scopeLine = 2;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    const commentLineParsing = paramsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view - decimals", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("doesn't have explicit args on `decimals` method", () => {
    const scopeLine = 3;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeLine];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    const commentLineParsing = paramsParser.parseCommentLines(
      functionCommentScope!.text
    );
    assert.equal(null, commentLineParsing);
  });
});

suite("function-comment: view: balanceOf", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );

  const scopeLine = 4;
  const text = fs.readFileSync(pathFile, "utf8");
  const functionScopes = CairoParser.parseFunctionScope(text, "view");
  const functionScope = functionScopes![scopeLine];
  const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

  test("should start with account on line 1", () => {

    const lineNumber = 1;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    paramsParser.setStartScope(functionCommentLine);

    assert.equal(
      "// @param account account to query balance for",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.equal(functionCommentLine, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );
    console.log(paramsParser)
    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );
    const resultLineParsing =
      paramsParser.parseCommentLine(functionCommentLine)!.functionComment;

    const targetLineParsing = {
      name: "account",
      type: "",
      desc: "account to query balance for",
      charIndex: {
        start: 64,
        end: 92,
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
      "account to query balance for",
      functionCommentReference
    );
  });

  test("should end on lineNumber 2", () => {

    const lineNumber = 2;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentLine);

    assert.equal(
      "// @returns the balance of the account",
      functionCommentLine.trim(),
      `check lineNumber ${lineNumber}`
    );
    assert.notEqual(lineNumber, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(
      true,
      isEndScope,
      `failed to get end scope lineNumber ${lineNumber}`
    );

    assert.equal(
      false,
      paramsParser.runningScope,
      `failed to get running scope lineNumber ${lineNumber}`
    );

    const functionCommentParsing =
      paramsParser.parseCommentLine(functionCommentLine);

    assert.equal(
      null,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

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
        start: 64,
        end: 92,
      },
    }];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});
