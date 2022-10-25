import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser, {CairoNatspecParser} from "../../../../../../../core/lib/CairoParser";
import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "../../../cairo-parser/getScopeParsingResult/utils";

suite("Natspec - getScopeParsingResult: constructor", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/ERC20.cairo"
  );
  test("should get `1` for the length of function scope", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");

    assert.equal(functionScopes!.length, 1);
  });
  test("should get `constructor` function scope", () => {

    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoNatspecParser.parseCommentLines(functionScope, false, text);

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 592,
            end: 603,
          },
        },
        functionSignature: {
          implicitArgs: [
            {name: "syscall_ptr", type: "felt*"},
            {name: "pedersen_ptr", type: "HashBuiltin*"},
            {name: "range_check_ptr", type: ""},
          ],
          explicitArgs: [
            {name: "name", type: "felt"},
            {name: "symbol", type: "felt"},
            {name: "decimals", type: "felt"},
            {name: "initial_supply", type: "Uint256"},
            {name: "recipient", type: "felt"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: {start: 11, end: 34},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "name",
              type: "",
              desc: "name of the token",
              charIndex: { start: 50, end: 67 },
            },
            {
              name: "symbol",
              type: "",
              desc: "symbol of the token",
              charIndex: { start: 85, end: 104 },
            },
            {
              name: "decimals",
              type: "",
              desc: "floating point of the token",
              charIndex: { start: 124, end: 151 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "amount of initial supply of the token",
              charIndex: { start: 177, end: 214 },
            },
            {
              name: "recipient",
              type: "",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 235, end: 281 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 292, end: 573}, //FIXME
        },
      },
    ];

    const parsingResult = CairoNatspecParser.getScopeParsingResult(
      text,
      "constructor"
    )![0];

    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope!,
      parsingResult
    );

    const textTarget = [
      {desc: "Initialize the contract"},
      {explicitArgs: "name of the token"},
      {explicitArgs: "symbol of the token"},
      {explicitArgs: "floating point of the token"},
      {
        explicitArgs:
          "amount of initial supply of the token",
      },
      {
        explicitArgs:
          "the address of recipient of the initial supply",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget =
`// @notice Initialize the contract
// @param name name of the token
// @param symbol symbol of the token
// @param decimals floating point of the token
// @param initial_supply amount of initial supply of the token
// @param recipient the address of recipient of the initial supply`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get all `constructor` function scopes", () => {
    const text = fs.readFileSync(pathFile, "utf8");

    const parsingOutput = CairoNatspecParser.getScopeParsingResult(
      text,
      "constructor"
    );

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 592,
            end: 603,
          },
        },
        functionSignature: {
          implicitArgs: [
            {name: "syscall_ptr", type: "felt*"},
            {name: "pedersen_ptr", type: "HashBuiltin*"},
            {name: "range_check_ptr", type: ""},
          ],
          explicitArgs: [
            {name: "name", type: "felt"},
            {name: "symbol", type: "felt"},
            {name: "decimals", type: "felt"},
            {name: "initial_supply", type: "Uint256"},
            {name: "recipient", type: "felt"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: {start: 11, end: 34},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "name",
              type: "",
              desc: "name of the token",
              charIndex: { start: 50, end: 67 },
            },
            {
              name: "symbol",
              type: "",
              desc: "symbol of the token",
              charIndex: { start: 85, end: 104 },
            },
            {
              name: "decimals",
              type: "",
              desc: "floating point of the token",
              charIndex: { start: 124, end: 151 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "amount of initial supply of the token",
              charIndex: { start: 177, end: 214 },
            },
            {
              name: "recipient",
              type: "",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 235, end: 281 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 292, end: 573}, //FIXME
        },
      },
    ];


    assert.deepEqual(parsingOutput, parsingTarget, "failed to parse");
  });
});
