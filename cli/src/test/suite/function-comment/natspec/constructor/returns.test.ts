import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentReturnsParser from "../../../../../../../core/lib/parser/function-comment/returns";
import CairoParser from "../../../../../../../core/lib/CairoParser";
import NatspecCommentReturnsParser from "../../../../../../../core/lib/parser/function-comment/natspec/returns";

suite("function-comment: constructor: returns", () => {

  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );

  test("parse whole scope", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];
    const functionCommentScope = CairoParser.parseNatspecDocumentation(functionScope, text);

    const functionCommentText = functionCommentScope!.text.join("");
    const returnsParser = new NatspecCommentReturnsParser(functionCommentText);

    const targetLineParsing = null;
    const resultLineParsing = returnsParser.parseCommentLines(
      functionCommentScope!.text
    );

    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing on whole scope`
    );
  });
});
