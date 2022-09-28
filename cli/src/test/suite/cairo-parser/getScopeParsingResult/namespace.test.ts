import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: namespace", () => {
  test("should get `5` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    assert.equal(functionScopes!.length, 5, "failed to parse");

    const resultScope = CairoParser.getScopeParsingResult(text, "namespace");
    assert.equal(resultScope!.length, 5, "failed to parse");
  });

  test("should get `constructor` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Comment parsing
    // parse comment lines
    const scopeNumber = 0;

    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "constructor",
          charIndex: { start: 2827, end: 2838 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "name", type: "felt" },
            { name: "symbol", type: "felt" },
            { name: "multiplier", type: "felt" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initializes the contract with the given name, symbol, and decimals",
              charIndex: { start: 31, end: 97 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 137, end: 155 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 169, end: 195 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 209, end: 224 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 264, end: 297 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 311, end: 348 },
            },
            {
              name: "multiplier",
              type: "felt",
              desc: "The multiplier of the token",
              charIndex: { start: 362, end: 407 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 2963, end: 3370 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
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
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "name(felt): The name of the token" },
      {
        explicitArgs: "symbol(felt): The symbol of the token",
      },
      {
        explicitArgs: "multiplier(felt): The multiplier of the token",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
        // Desc:
        //   Initializes the contract with the given name, symbol, and decimals
        // Implicit args:
        //   syscall_ptr(felt*)
        //   pedersen_ptr(HashBuiltin*)
        //   range_check_ptr
        // Explicit args:
        //   name(felt): The name of the token
        //   symbol(felt): The symbol of the token
        //   multiplier(felt): The multiplier of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "name",
          charIndex: { start: 3677, end: 3681 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
            },
          ],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
              charIndex: { start: 31, end: 60 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 100, end: 118 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 132, end: 158 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 172, end: 187 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 221, end: 254 },
            },
          ],
          raises: null,
          charIndex: { start: 3766, end: 4020 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
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
        desc: "Returns the name of the token",
      },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "name(felt): The name of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
        // Desc:
        //   Returns the name of the token
        // Implicit args:
        //   syscall_ptr(felt*)
        //   pedersen_ptr(HashBuiltin*)
        //   range_check_ptr
        // Returns:
        //   name(felt): The name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `transfer_from` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "transfer_from",
          charIndex: { start: 4101, end: 4114 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "sender", type: "felt" },
            { name: "recipient", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Transfers tokens from one account to another",
              charIndex: { start: 31, end: 75 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 115, end: 133 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 147, end: 173 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 187, end: 202 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "The address of the sender",
              charIndex: { start: 242, end: 281 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 295, end: 340 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be transferred",
              charIndex: { start: 354, end: 409 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 4249, end: 4658 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Transfers tokens from one account to another" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "sender(felt): The address of the sender" },
      { explicitArgs: "recipient(felt): The address of the recipient" },
      {
        explicitArgs: "amount(Uint256): The amount of tokens to be transferred",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
        // Desc:
        //   Transfers tokens from one account to another
        // Implicit args:
        //   syscall_ptr(felt*)
        //   pedersen_ptr(HashBuiltin*)
        //   range_check_ptr
        // Explicit args:
        //   sender(felt): The address of the sender
        //   recipient(felt): The address of the recipient
        //   amount(Uint256): The amount of tokens to be transferred`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `_mint` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace internal",
        functionName: {
          name: "_mint",
          charIndex: { start: 4938, end: 4943 },
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
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Mints tokens to an account",
              charIndex: { start: 31, end: 57 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 97, end: 115 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 129, end: 155 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 169, end: 184 },
            },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 224, end: 269 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be minted",
              charIndex: { start: 283, end: 333 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 5058, end: 5429 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Mints tokens to an account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "recipient(felt): The address of the recipient" },
      { explicitArgs: "amount(Uint256): The amount of tokens to be minted" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
        // Desc:
        //   Mints tokens to an account
        // Implicit args:
        //   syscall_ptr(felt*)
        //   pedersen_ptr(HashBuiltin*)
        //   range_check_ptr
        // Explicit args:
        //   recipient(felt): The address of the recipient
        //   amount(Uint256): The amount of tokens to be minted
        // Returns:
        //   None`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `_burn` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
    )!;

    const parsingTarget = [
      {
        attributeName: "namespace internal",
        functionName: {
          name: "_burn",
          charIndex: { start: 6348, end: 6353 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "account", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Burns tokens from an account",
              charIndex: { start: 31, end: 59 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 99, end: 117 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 131, end: 157 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 171, end: 186 },
            },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 226, end: 269 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be burned",
              charIndex: { start: 283, end: 333 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 6472, end: 6805 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Burns tokens from an account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "account(felt): The address of the recipient" },
      { explicitArgs: "amount(Uint256): The amount of tokens to be burned" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
        // Desc:
        //   Burns tokens from an account
        // Implicit args:
        //   syscall_ptr(felt*)
        //   pedersen_ptr(HashBuiltin*)
        //   range_check_ptr
        // Explicit args:
        //   account(felt): The address of the recipient
        //   amount(Uint256): The amount of tokens to be burned`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
