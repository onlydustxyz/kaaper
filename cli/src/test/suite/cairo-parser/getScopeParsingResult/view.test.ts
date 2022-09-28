import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: view", () => {
  test("should get `6` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    assert.equal(functionScopes!.length, 6, "failed to parse");

    const resultScope = CairoParser.getScopeParsingResult(text, "view");
    assert.equal(resultScope!.length, 6);
  });
  test("should get `name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    const scopeNumber = 0;
    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "name",
          charIndex: { start: 1341, end: 1345 },
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
              charIndex: { start: 23, end: 52 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 84, end: 102 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 112, end: 138 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 148, end: 163 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 189, end: 218 },
            },
          ],
          raises: null,
          charIndex: { start: 1430, end: 1648 },
        },
      },
    ];
    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
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
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "name(felt): name of the token" },
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
    //   name(felt): name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `symbol` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "symbol",
          charIndex: { start: 1714, end: 1720 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "symbol", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the symbol of the token",
              charIndex: { start: 23, end: 54 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 86, end: 104 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 114, end: 140 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 150, end: 165 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 191, end: 224 },
            },
          ],
          raises: null,
          charIndex: { start: 1807, end: 2031 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the symbol of the token" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "symbol(felt): symbol of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the symbol of the token
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Returns:
    //   symbol(felt): symbol of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `totalSupply` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "totalSupply",
          charIndex: { start: 2103, end: 2114 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "totalSupply", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the total supply of the token",
              charIndex: { start: 23, end: 60 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 92, end: 110 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 120, end: 146 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 156, end: 171 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "totalSupply",
              type: "Uint256",
              desc: "total supply of the token",
              charIndex: { start: 197, end: 244 },
            },
          ],
          raises: null,
          charIndex: { start: 2215, end: 2459 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the total supply of the token" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "totalSupply(Uint256): total supply of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the total supply of the token
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Returns:
    //   totalSupply(Uint256): total supply of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `decimals` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "decimals",
          charIndex: { start: 2556, end: 2564 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "decimals", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the decimals of the token",
              charIndex: { start: 23, end: 56 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 88, end: 106 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 116, end: 142 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 152, end: 167 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "felt",
              desc: "decimals of the token",
              charIndex: { start: 193, end: 230 },
            },
          ],
          raises: null,
          charIndex: { start: 2659, end: 2889 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the decimals of the token" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "decimals(felt): decimals of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the decimals of the token
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Returns:
    //   decimals(felt): decimals of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `balanceOf` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "balanceOf",
          charIndex: { start: 2968, end: 2977 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [{ name: "account", type: "felt" }],
          returns: [{ name: "balance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the balance of the account",
              charIndex: { start: 23, end: 57 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 89, end: 107 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 117, end: 143 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 153, end: 168 },
            },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "account to query balance for",
              charIndex: { start: 200, end: 243 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "the balance of the account",
              charIndex: { start: 269, end: 313 },
            },
          ],
          raises: null,
          charIndex: { start: 3087, end: 3400 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the balance of the account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "account(felt): account to query balance for" },
      { returns: "balance(Uint256): the balance of the account" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the balance of the account
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   account(felt): account to query balance for
    // Returns:
    //   balance(Uint256): the balance of the account`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `allowance` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 5;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: {
          name: "allowance",
          charIndex: { start: 3494, end: 3503 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
          ],
          returns: [{ name: "remaining", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the amount of remaining tokens allowed to be spent by the spender",
              charIndex: { start: 23, end: 96 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 128, end: 146 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 156, end: 182 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 192, end: 207 },
            },
          ],
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of owner of the tokens",
              charIndex: { start: 239, end: 286 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of spender (delegated account) of the tokens",
              charIndex: { start: 296, end: 367 },
            },
          ],
          returns: [
            {
              name: "remaining",
              type: "Uint256",
              desc: "the amount of remaining tokens allowed to be spent by the spender",
              charIndex: { start: 393, end: 478 },
            },
          ],
          raises: null,
          charIndex: { start: 3628, end: 4106 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
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
        desc: "Returns the amount of remaining tokens allowed to be spent by the spender",
      },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "owner(felt): the address of owner of the tokens" },
      {
        explicitArgs:
          "spender(felt): the address of spender (delegated account) of the tokens",
      },
      {
        returns:
          "remaining(Uint256): the amount of remaining tokens allowed to be spent by the spender",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the amount of remaining tokens allowed to be spent by the spender
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   owner(felt): the address of owner of the tokens
    //   spender(felt): the address of spender (delegated account) of the tokens
    // Returns:
    //   remaining(Uint256): the amount of remaining tokens allowed to be spent by the spender`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
