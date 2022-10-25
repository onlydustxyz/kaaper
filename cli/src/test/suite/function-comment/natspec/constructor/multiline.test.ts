import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser from "../../../../../../../core/lib/CairoParser";
import NatspecCommentNoticeParser from "../../../../../../../core/lib/parser/function-comment/natspec/notice";

suite.skip("function-comment: constructor: notice", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("parse line 1", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text)!;
    const lineNumber = 1;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);
    noticeParser.setStartScope(functionCommentScope!.text[0]);

    assert.equal(
      "// This is the following line of the notice.",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
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

    const functionCommentParsing =
      noticeParser.parseCommentLine(functionCommentLine)!.functionComment;
    const targetLineParsing = {
      name: "",
      type: "",
      desc: "This is the following line of the notice.",
      charIndex: {
        start: 43,
        end: 84,
      },
    };
    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });
});