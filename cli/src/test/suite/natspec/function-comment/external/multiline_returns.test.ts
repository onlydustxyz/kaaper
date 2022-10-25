import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser, {CairoNatspecParser} from "../../../../../../../core/lib/CairoParser";
import NatspecCommentReturnsParser from "../../../../../../../core/lib/parser/function-comment/natspec/returns";

suite("Natspec - function-comment: constructor: multiline_params", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20Custom.cairo"
  );
  test("parse line 4", () => {
    const lineNumber = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);

    assert.equal(
      "// @returns 1 if transfer was successful,",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    returnsParser.setStartScope(functionCommentLine);

    const functionCommentParsing =
      returnsParser.parseCommentLine(functionCommentLine)!.functionComment;

    const isEndScope = returnsParser.isEndScope(functionCommentLine);

    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "",
      type: "",
      desc: "1 if transfer was successful,",
      charIndex: {
        start: 153,
        end: 182,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });


  test("parse line 5", () => {
    const lineNumber = 5;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);
    returnsParser.setStartScope(functionCommentScope!.text[4]);

    assert.equal(
      "// 0 otherwise",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    const functionCommentParsing =
      returnsParser.parseCommentLine(functionCommentLine)!.functionComment;

    assert.equal("\n// @returns 1 if transfer was successful,", returnsParser.startLine);
    assert.notEqual(lineNumber, returnsParser.startLine);
    const isEndScope = returnsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "",
      type: "",
      desc: "0 otherwise",
      charIndex: {
        start: 186,
        end: 197,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("parse whole comment", () => {
    const scopeNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![scopeNumber];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);

    const functionCommentParsing = returnsParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "",
        type: "",
        desc: "1 if transfer was successful,\n0 otherwise",
        charIndex: {start: 153, end: 197},
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});
