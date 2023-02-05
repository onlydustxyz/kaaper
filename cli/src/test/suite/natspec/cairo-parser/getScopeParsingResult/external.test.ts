import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser, { CairoNatspecParser } from "../../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "../../../cairo-parser/getScopeParsingResult/utils";

suite("Natspec - getScopeParsingResult: external", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("should get `5` for the length of function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoNatspecParser.parseFunctionScope(text, "external");
    //FIXME add other external functions
    assert.equal(functionScopes!.length, 5, "failed to parse");

    const resultScope = CairoNatspecParser.getScopeParsingResult(text, "external");
    assert.equal(resultScope!.length, 5);
  });

  test("should get `transfer` function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoNatspecParser.parseFunctionScope(text, "external");

    const scopeNumber = 0;
    const functionScope = functionScopes![scopeNumber];

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text)!;
    const parsingTarget = [
      {
        attributeName: "external",
        functionName: {
          name: "transfer",
          charIndex: { start: 3009, end: 3017 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "recipient", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer to recipient",
              charIndex: { start: 11, end: 40 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "recipient",
              type: "",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 61, end: 91 },
            },
            {
              name: "amount",
              type: "",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 109, end: 137 },
            },
          ],
          returns: [
            {
              name: "",
              type: "",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 150, end: 191 },
            },
          ],
          raises: null,
          charIndex: { start: 2802, end: 2993 },
        },
      },
    ];
    const parsingResult = CairoNatspecParser.getScopeParsingResult(text, "external")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Perform transfer to recipient" },
      { explicitArgs: "the address of ERC20 recipient" },
      { explicitArgs: "the amount of ERC20 transfer" },
      {
        returns: "1 if transfer was successful, 0 otherwise",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget =
      `// @notice Perform transfer to recipient
// @param recipient the address of ERC20 recipient
// @param amount the amount of ERC20 transfer
// @return 1 if transfer was successful, 0 otherwise`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

});
