import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import {CairoNatspecParser} from "../../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "../../../cairo-parser/getScopeParsingResult/utils";

suite("Natspec - getScopeParsingResult: namespace", () => {
  const pathFile = path.resolve(
    __dirname,
    "../../../../../../../../testContracts/ERC20Natspec/library.cairo"
  );
  test("should get `5` for the length of function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoNatspecParser.parseNamespaceScopes(text);
    assert.equal(functionScopes!.length, 5, "failed to parse");

    const resultScope = CairoNatspecParser.getScopeParsingResult(text, "namespace");
    assert.equal(resultScope!.length, 5, "failed to parse");
  });

  test("should get `constructor` function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoNatspecParser.parseNamespaceScopes(text);

    // Comment parsing
    // parse comment lines
    const scopeNumber = 0;

    const functionCommentScope = CairoNatspecParser.parseCommentLines(
      functionScopes![scopeNumber],
      true,
      text
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "constructor",
          charIndex: {start: 2794, end: 2805},
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
            {name: "multiplier", type: "felt"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initializes the contract with the given name, symbol, and decimals",
              charIndex: {start: 15, end: 81},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "name",
              type: "",
              desc: "The name of the token",
              charIndex: {start: 101, end: 122},
            },
            {
              name: "symbol",
              type: "",
              desc: "The symbol of the token",
              charIndex: {start: 144, end: 167},
            },
            {
              name: "multiplier",
              type: "",
              desc: "The multiplier of the token",
              charIndex: {start: 193, end: 220},
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 2564, end: 2784},
        },
      },
    ];

    const parsingResult = CairoNatspecParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
      ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      {
        desc: "Initializes the contract with the given name, symbol, and decimals",
      },
      {explicitArgs: "The name of the token"},
      {
        explicitArgs: "The symbol of the token",
      },
      {
        explicitArgs: "The multiplier of the token",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget =
      `    // @notice Initializes the contract with the given name, symbol, and decimals
    // @param name The name of the token
    // @param symbol The symbol of the token
    // @param multiplier The multiplier of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `_mint` function scope", () => {
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoNatspecParser.parseNamespaceScopes(text);

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoNatspecParser.parseCommentLines(
      functionScopes![scopeNumber],
      true,
      text
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace internal",
        functionName: {
          name: "_mint",
          charIndex: {start: 4292, end: 4297},
        },
        functionSignature: {
          implicitArgs: [
            {name: "syscall_ptr", type: "felt*"},
            {name: "pedersen_ptr", type: "HashBuiltin*"},
            {name: "range_check_ptr", type: ""},
          ],
          explicitArgs: [
            {name: "recipient", type: "felt"},
            {name: "amount", type: "Uint256"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Mints tokens to an account",
              charIndex: {start: 15, end: 41},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "recipient",
              type: "",
              desc: "The address of the recipient",
              charIndex: {start: 66, end: 94},
            },
            {
              name: "amount",
              type: "",
              desc: "The amount of tokens to be minted",
              charIndex: {start: 116, end: 149},
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 4133, end: 4282},
        },
      },
    ];

    const parsingResult = CairoNatspecParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
      ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      {desc: "Mints tokens to an account"},
      {explicitArgs: "The address of the recipient"},
      {explicitArgs: "The amount of tokens to be minted"},
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget =
`    // @notice Mints tokens to an account
    // @param recipient The address of the recipient
    // @param amount The amount of tokens to be minted`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

});
