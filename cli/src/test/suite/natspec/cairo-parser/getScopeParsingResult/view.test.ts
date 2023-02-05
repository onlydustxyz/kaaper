import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser, { CairoNatspecParser } from "../../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "../../../cairo-parser/getScopeParsingResult/utils";

suite("Natspec - getScopeParsingResult: view", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("should get `6` for the length of function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoNatspecParser.parseFunctionScope(text, "view");

    assert.equal(functionScopes!.length, 6, "failed to parse");

    const resultScope = CairoNatspecParser.getScopeParsingResult(text, "view");
    assert.equal(resultScope!.length, 6);
  });
  test("should get `name` function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoNatspecParser.parseFunctionScope(text, "view");

    const scopeNumber = 0;
    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoNatspecParser.parseCommentLines(
      functionScopes![scopeNumber], false, text
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "name",
          charIndex: { start: 970, end: 974 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
              charIndex: { start: 11, end: 40 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "",
              type: "",
              desc: "name of the token",
              charIndex: { start: 53, end: 70 },
            },
          ],
          raises: null,
          charIndex: { start: 888, end: 958 },
        },
      },
    ];
    const parsingResult = CairoNatspecParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the name of the token" },
      { returns: "name of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget =
      `// @notice Returns the name of the token
// @return name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

});
