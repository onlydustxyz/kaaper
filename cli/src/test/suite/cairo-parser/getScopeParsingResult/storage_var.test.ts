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
          charIndex: { start: 1276, end: 1286 },
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
              charIndex: { start: 22, end: 51 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 75, end: 108 },
            },
          ],
          raises: null,
          charIndex: { start: 1306, end: 1414 },
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
    # Desc: 
    #   Returns the name of the token
    # Returns:
    #   name(felt): The name of the token`;

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
          charIndex: { start: 1438, end: 1450 },
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
              charIndex: { start: 22, end: 53 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 77, end: 114 },
            },
          ],
          raises: null,
          charIndex: { start: 1472, end: 1586 },
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
    # Desc: 
    #   Returns the symbol of the token
    # Returns:
    #   symbol(felt): The symbol of the token`;

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
          charIndex: { start: 1610, end: 1624 },
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
              charIndex: { start: 22, end: 65 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "Uint256",
              desc: "The number of decimals of the token",
              charIndex: { start: 89, end: 143 },
            },
          ],
          raises: null,
          charIndex: { start: 1651, end: 1794 },
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
    # Desc: 
    #   Returns the number of decimals of the token
    # Returns:
    #   decimals(Uint256): The number of decimals of the token`;

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
          charIndex: { start: 1864, end: 1882 },
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
              charIndex: { start: 22, end: 65 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "total_supply",
              type: "Uint256",
              desc: "The total amount of tokens in existence",
              charIndex: { start: 89, end: 151 },
            },
          ],
          raises: null,
          charIndex: { start: 1913, end: 2064 },
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
    # Desc: 
    #   Returns total amount of tokens in existence
    # Returns:
    #   total_supply(Uint256): The total amount of tokens in existence`;

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
          charIndex: { start: 2088, end: 2102 },
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
              charIndex: { start: 22, end: 70 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the account",
              charIndex: { start: 100, end: 141 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "The amount of tokens owned by an account",
              charIndex: { start: 165, end: 223 },
            },
          ],
          raises: null,
          charIndex: { start: 2142, end: 2365 },
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
    # Desc: 
    #   Returns the amount of tokens owned by an account
    # Explicit args:
    #   account(felt): The address of the account
    # Returns:
    #   balance(Uint256): The amount of tokens owned by an account`;

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
          charIndex: { start: 2389, end: 2405 },
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
              charIndex: { start: 22, end: 98 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "The address of the owner",
              charIndex: { start: 128, end: 165 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "The address of the spender",
              charIndex: { start: 174, end: 215 },
            },
          ],
          returns: [
            {
              name: "allowance",
              type: "Uint256",
              desc: "The amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 239, end: 329 },
            },
          ],
          raises: null,
          charIndex: { start: 2461, end: 2790 },
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
    # Desc: 
    #   Store the amount of tokens that an owner is allowed to delegate to a spender
    # Explicit args:
    #   owner(felt): The address of the owner
    #   spender(felt): The address of the spender
    # Returns:
    #   allowance(Uint256): The amount of tokens that an owner is allowed to delegate to a spender`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
