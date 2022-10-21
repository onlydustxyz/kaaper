import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser from "../../../../../../../core/lib/CairoParser";
import NatspecCommentNoticeParser from "../../../../../../../core/lib/parser/function-comment/natspec/notice";

suite("function-comment: view: notice", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("parse line 0", () => {

    const lineNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![lineNumber];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);


    assert.equal(
      "// @notice Returns the name of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    noticeParser.setStartScope(functionCommentLine);
    const commentLineParsing = noticeParser.parseCommentLine(functionCommentLine);
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
        end: 41,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      commentLineParsing,
      `failed to get resultLineParsing line ${lineNumber}`
    );

    const descCommentStart = commentLineParsing!.charIndex.start;
    const descCommentEnd = commentLineParsing!.charIndex.end;

    var functionCommentReference = "";
    for (let i = descCommentStart; i < descCommentEnd; i++) {
      functionCommentReference += functionCommentText.at(i);
    }

    var wholeFileReference = "";
    const functionCommentStart = functionCommentScope!.start;
    for (
      let i = functionCommentStart + descCommentStart;
      i < functionCommentStart + descCommentEnd;
      i++
    ) {
      wholeFileReference += text.at(i);
    }


    assert.equal(
      functionCommentReference,
      wholeFileReference,
      "failed to get whole file reference"
    );

  });

  test("parse line 1", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const lineNumber = 1;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");

    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);
    noticeParser.setStartScope(functionCommentScope!.text[0]);


    assert.equal(
      "// @returns the name of the token",
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
      true,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

  });

  test("parse whole comment", () => {
    const scopeNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeNumber];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope,text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const noticeParser = new NatspecCommentNoticeParser(functionCommentText);

    const commentLineParsing = noticeParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "",
        type: "",
        desc: "Returns the name of the token",
        charIndex: {
          start: 11,
          end: 41,
        },
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      commentLineParsing,
      "failed to get resultLineParsing"
    );
  });
});
