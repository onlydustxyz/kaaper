import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser, { CairoNatspecParser } from "../../../../../../../core/lib/CairoParser";
import NatspecCommentDevParser from "../../../../../../../core/lib/parser/function-comment/natspec/dev";

suite("Natspec - function-comment: constructor: multiline_dev", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20Custom.cairo"
  );
  test("parse line 2", () => {
    const lineNumber = 2;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const devParser = new NatspecCommentDevParser(functionCommentText);

    assert.equal(
      "// @dev a custom dev tag",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    devParser.setStartScope(functionCommentLine);

    const functionCommentParsing =
      devParser.parseCommentLine(functionCommentLine)!.functionComment;

    const isEndScope = devParser.isEndScope(functionCommentLine);

    assert.equal(
      true,
      devParser.runningScope,
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
      desc: "a custom dev tag",
      charIndex: {
        start: 91,
        end: 107,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });


  test("parse line 3", () => {
    const lineNumber = 3;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;
    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const devParser = new NatspecCommentDevParser(functionCommentText);

    devParser.setStartScope(functionCommentScope!.text[2]);

    assert.equal(
      "// that is also written in two lines.",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    const functionCommentParsing =
      devParser.parseCommentLine(functionCommentLine)!.functionComment;

    assert.equal("\n// @dev a custom dev tag", devParser.startLine);
    assert.notEqual(lineNumber, devParser.startLine);
    const isEndScope = devParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    assert.equal(
      true,
      devParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "",
      type: "",
      desc: "that is also written in two lines.",
      charIndex: {
        start: 111,
        end: 145,
      },
    };

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      `failed to get functionCommentParsing line ${lineNumber}`
    );
  });

  test("parse line 4", () => {
    const lineNumber = 4;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const devParser = new NatspecCommentDevParser(functionCommentText);

    devParser.setStartScope(functionCommentScope!.text[2]);

    assert.equal(
      "// @return name Name of the token",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    assert.equal("\n// @dev a custom dev tag", devParser.startLine);
    assert.notEqual(lineNumber, devParser.startLine);
    const isEndScope = devParser.isEndScope(functionCommentLine);
    assert.equal(
      true,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    devParser.setEndScope(functionCommentLine);

    assert.equal(
      false,
      devParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
  });


  test("parse whole comment", () => {
    const scopeNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "view");
    const functionScope = functionScopes![scopeNumber];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const devParser = new NatspecCommentDevParser(functionCommentText);

    const functionCommentParsing = devParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "",
        type: "",
        desc: "a custom dev tag\nthat is also written in two lines.",
        charIndex: { start: 91, end: 145 },
      },
    ];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});
