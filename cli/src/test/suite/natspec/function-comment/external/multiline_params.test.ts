import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser, {CairoNatspecParser} from "../../../../../../../core/lib/CairoParser";
import NatspecCommentParamsParser from "../../../../../../../core/lib/parser/function-comment/natspec/params";

suite("Natspec - function-comment: constructor: multiline_params", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20Custom.cairo"
  );
  test("parse line 1", () => {
    const lineNumber = 1;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    assert.equal(
      "// @param recipient the address of ERC20",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );
    paramsParser.setStartScope(functionCommentLine);

    const functionCommentParsing =
      paramsParser.parseCommentLine(functionCommentLine)!.functionComment;

    const isEndScope = paramsParser.isEndScope(functionCommentLine);

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "recipient",
      type: "",
      desc: "the address of ERC20",
      charIndex: {
        start: 61,
        end: 81,
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
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);
    paramsParser.setStartScope(functionCommentScope!.text[1]);

    assert.equal(
      "// recipient",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    const functionCommentParsing =
      paramsParser.parseCommentLine(functionCommentLine)!.functionComment;

    assert.equal("\n// @param recipient the address of ERC20", paramsParser.startLine);
    assert.notEqual(lineNumber, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );

    const targetLineParsing = {
      name: "",
      type: "",
      desc: "recipient",
      charIndex: {
        start: 85,
        end: 94,
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
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentLine: string = functionCommentScope!.text[lineNumber];
    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    paramsParser.setStartScope(functionCommentScope!.text[1]);

    assert.equal(
      "// @param amount the amount of ERC20 transfer",
      functionCommentLine.trim(),
      `check line ${lineNumber}`
    );

    assert.equal("\n// @param recipient the address of ERC20", paramsParser.startLine);
    assert.notEqual(lineNumber, paramsParser.startLine);
    const isEndScope = paramsParser.isEndScope(functionCommentLine);
    assert.equal(
      false,
      isEndScope,
      `failed to get end scope line ${lineNumber}`
    );

    assert.equal(
      true,
      paramsParser.runningScope,
      `failed to get running scope line ${lineNumber}`
    );
  });


  test("parse whole comment", () => {
    const scopeNumber = 0;
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    const functionScope = functionScopes![scopeNumber];
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const paramsParser = new NatspecCommentParamsParser(functionCommentText);

    const functionCommentParsing = paramsParser.parseCommentLines(
      functionCommentScope!.text
    );

    const targetLineParsing = [
      {
        name: "recipient",
        type: "",
        desc: "the address of ERC20\nrecipient",
        charIndex: {start: 61, end: 94},
      },
      {
        name: "amount",
        type: "",
        desc: "the amount of ERC20 transfer",
        charIndex: {
          end: 140,
          start: 112,
        },
      }
    ];

    assert.deepEqual(
      targetLineParsing,
      functionCommentParsing,
      "failed to get functionCommentParsing"
    );
  });
});
