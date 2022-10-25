import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser, {CairoNatspecParser} from "../../../../../../../core/lib/CairoParser";
import NatspecCommentNoticeParser from "../../../../../../../core/lib/parser/function-comment/natspec/notice";

suite("Natspec - function-comment: constructor: multiline_notice", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20Custom.cairo"
  );
  test("parse line 0", () => {
    const lineNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope,false,text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);

    assert.equal(
      "// @notice Returns the name of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    noticeParser.setStartScope(functionCommentLine);

    const functionCommentParsing =
      noticeParser.parseCommentLine(functionCommentLine)!.functionComment;

    const isEndScope = noticeParser.isEndScope(functionCommentLine);

    assert.equal(
      true,
      noticeParser.runningScope,
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
      desc: "Returns the name of the token",
      charIndex: {
        start: 11,
        end: 40,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });


  test("parse line 1", () => {
    const lineNumber = 1;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope,false,text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);

    noticeParser.setStartScope(functionCommentScope!.text[0]);

    assert.equal(
      "// The notice continues on a second line.",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    const functionCommentParsing =
      noticeParser.parseCommentLine(functionCommentLine)!.functionComment;

    assert.equal("// @notice Returns the name of the token", noticeParser.startLine);
    assert.notEqual(lineNumber, noticeParser.startLine);
    const isEndScope = noticeParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    assert.equal(
      true,
      noticeParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "",
      type: "",
      desc: "The notice continues on a second line.",
      charIndex: {
        start: 44,
        end: 82,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("parse line 2", () => {
    const lineNumber = 2;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope,false,text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);

    noticeParser.setStartScope(functionCommentScope!.text[0]);

    assert.equal(
      "// @dev a custom dev tag",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    assert.equal("// @notice Returns the name of the token", noticeParser.startLine);
    assert.notEqual(lineNumber, noticeParser.startLine);
    const isEndScope = noticeParser.isEndScope(functionCommentLine);
    assert.equal(
      true,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    noticeParser.setEndScope(functionCommentLine);

    assert.equal(
      false,
      noticeParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
  });


  test("parse whole comment", () => {
    const scopeNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeNumber];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope,false,text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);

    const functionCommentParsing = noticeParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "",
        type: "",
        desc: "Returns the name of the token\nThe notice continues on a second line.",
        charIndex: { start: 11, end: 82 },
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});
