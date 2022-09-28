import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: storage_var", () => {
  test("should get `6` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");
    assert.equal(functionScopes!.length, 6);

    const resultScope = CairoParser.getScopeParsingResult(text, "storage_var");
    assert.equal(resultScope!.length, 6);
  });
  test("should get `ERC20_name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    const scopeNumber = 0;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_name",
          charIndex: { start: 1285, end: 1295 },
        },
        functionSignature: {
          implicitArgs: null,
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
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 78, end: 111 },
            },
          ],
          raises: null,
          charIndex: { start: 1315, end: 1426 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the name of the token" },
      { returns: "name(felt): The name of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the name of the token
    // Returns:
    //   name(felt): The name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_symbol` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_symbol",
          charIndex: { start: 1448, end: 1460 },
        },
        functionSignature: {
          implicitArgs: null,
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
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 80, end: 117 },
            },
          ],
          raises: null,
          charIndex: { start: 1482, end: 1599 },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingTarget, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];

    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the symbol of the token" },
      { returns: "symbol(felt): The symbol of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the symbol of the token
    // Returns:
    //   symbol(felt): The symbol of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_decimals` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_decimals",
          charIndex: { start: 1621, end: 1635 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "decimals", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the number of decimals of the token",
              charIndex: { start: 23, end: 66 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "Uint256",
              desc: "The number of decimals of the token",
              charIndex: { start: 92, end: 146 },
            },
          ],
          raises: null,
          charIndex: { start: 1662, end: 1808 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the number of decimals of the token" },
      { returns: "decimals(Uint256): The number of decimals of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the number of decimals of the token
    // Returns:
    //   decimals(Uint256): The number of decimals of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_total_supply` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_total_supply",
          charIndex: { start: 1830, end: 1848 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "total_supply", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns total amount of tokens in existence",
              charIndex: { start: 23, end: 66 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "total_supply",
              type: "Uint256",
              desc: "The total amount of tokens in existence",
              charIndex: { start: 92, end: 154 },
            },
          ],
          raises: null,
          charIndex: { start: 1879, end: 2033 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns total amount of tokens in existence" },
      {
        returns:
          "total_supply(Uint256): The total amount of tokens in existence",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns total amount of tokens in existence
    // Returns:
    //   total_supply(Uint256): The total amount of tokens in existence`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_balances` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_balances",
          charIndex: { start: 2055, end: 2069 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [{ name: "account", type: "felt" }],
          returns: [{ name: "balance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the amount of tokens owned by an account",
              charIndex: { start: 23, end: 71 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the account",
              charIndex: { start: 103, end: 144 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "The amount of tokens owned by an account",
              charIndex: { start: 170, end: 228 },
            },
          ],
          raises: null,
          charIndex: { start: 2108, end: 2336 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Returns the amount of tokens owned by an account" },
      { explicitArgs: "account(felt): The address of the account" },
      { returns: "balance(Uint256): The amount of tokens owned by an account" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Returns the amount of tokens owned by an account
    // Explicit args:
    //   account(felt): The address of the account
    // Returns:
    //   balance(Uint256): The amount of tokens owned by an account`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_allowances` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 5;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_allowances",
          charIndex: { start: 2358, end: 2374 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
          ],
          returns: [{ name: "allowance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Store the amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 23, end: 99 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "The address of the owner",
              charIndex: { start: 131, end: 168 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "The address of the spender",
              charIndex: { start: 178, end: 219 },
            },
          ],
          returns: [
            {
              name: "allowance",
              type: "Uint256",
              desc: "The amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 245, end: 335 },
            },
          ],
          raises: null,
          charIndex: { start: 2428, end: 2763 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      {
        desc: "Store the amount of tokens that an owner is allowed to delegate to a spender",
      },
      { explicitArgs: "owner(felt): The address of the owner" },
      { explicitArgs: "spender(felt): The address of the spender" },
      {
        returns:
          "allowance(Uint256): The amount of tokens that an owner is allowed to delegate to a spender",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Store the amount of tokens that an owner is allowed to delegate to a spender
    // Explicit args:
    //   owner(felt): The address of the owner
    //   spender(felt): The address of the spender
    // Returns:
    //   allowance(Uint256): The amount of tokens that an owner is allowed to delegate to a spender`;

    assert.deepEqual(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
