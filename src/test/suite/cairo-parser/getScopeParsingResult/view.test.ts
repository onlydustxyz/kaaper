import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../lib/CairoParser";
import FunctionCommentDescParser from "../../../../lib/parser/function-comment/desc";
import FunctionSignatureRegexParser from "../../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../../lib/parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../../lib/parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "../../../../lib/parser/function-comment/returns";
import FunctionCommentRaisesParser from "../../../../lib/parser/function-comment/raises";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: view", () => {
  test("should get `6` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
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
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    const scopeNumber = 0;

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;
    const functionCommentText: string = functionCommentScope!.text.join("");

    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentText
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentText);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentText
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentText
    );

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "name",
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
              charIndex: { start: 21, end: 50 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 80, end: 98 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 107, end: 133 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 181, end: 210 },
            },
          ],
          raises: null,
          charIndex: { start: 1413, end: 1623 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![0].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![0].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![0].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![0].text
          ),
          returns: functionSignatureParser.getReturns(functionScopes![0].text),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(
            functionCommentScope!.text
          ),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          raises: functionCommentRaisesParser.parseCommentLines(
            functionCommentScope!.text
          ),
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
    # Desc:
    #   Returns the name of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   name(felt): name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `symbol` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const functionCommentText: string = functionCommentScope!.text.join("");

    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentText
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentText);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentText
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentText
    );

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "symbol",
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
              charIndex: { start: 21, end: 52 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 82, end: 100 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 109, end: 135 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 144, end: 159 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 183, end: 216 },
            },
          ],
          raises: null,
          charIndex: { start: 1783, end: 1999 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
          ),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(
            functionCommentScope!.text
          ),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          raises: functionCommentRaisesParser.parseCommentLines(
            functionCommentScope!.text
          ),
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
    # Desc:
    #   Returns the symbol of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   symbol(felt): symbol of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `totalSupply` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;
    const functionCommentText: string = functionCommentScope!.text.join("");

    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentText
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentText);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentText
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentText
    );

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "totalSupply",
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
              charIndex: { start: 21, end: 58 },
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
              charIndex: { start: 115, end: 141 },
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
              name: "totalSupply",
              type: "Uint256",
              desc: "total supply of the token",
              charIndex: { start: 189, end: 236 },
            },
          ],
          raises: null,
          charIndex: { start: 2184, end: 2420 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
          ),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(
            functionCommentScope!.text
          ),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          raises: functionCommentRaisesParser.parseCommentLines(
            functionCommentScope!.text
          ),
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
    # Desc:
    #   Returns the total supply of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   totalSupply(Uint256): total supply of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `decimals` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;
    const functionCommentText: string = functionCommentScope!.text.join("");
    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentText
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentText);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentText
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentText
    );

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "decimals",
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
              charIndex: { start: 21, end: 54 },
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
              charIndex: { start: 111, end: 137 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 146, end: 161 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "felt",
              desc: "decimals of the token",
              charIndex: { start: 185, end: 222 },
            },
          ],
          raises: null,
          charIndex: { start: 2622, end: 2844 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
          ),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(
            functionCommentScope!.text
          ),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          raises: functionCommentRaisesParser.parseCommentLines(
            functionCommentScope!.text
          ),
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
    # Desc:
    #   Returns the decimals of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   decimals(felt): decimals of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `balanceOf` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const functionCommentText: string = functionCommentScope!.text.join("");

    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentText
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentText);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentText
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentText
    );

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "balanceOf",
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
              charIndex: { start: 21, end: 55 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 85, end: 103 },
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
              charIndex: { start: 147, end: 162 },
            },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "account to query balance for",
              charIndex: { start: 192, end: 235 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "the balance of the account",
              charIndex: { start: 259, end: 303 },
            },
          ],
          raises: null,
          charIndex: { start: 3044, end: 3347 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
          ),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(
            functionCommentScope!.text
          ),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          raises: functionCommentRaisesParser.parseCommentLines(
            functionCommentScope!.text
          ),
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
    # Desc:
    #   Returns the balance of the account
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   account(felt): account to query balance for
    # Returns:
    #   balance(Uint256): the balance of the account`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `allowance` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 5;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentText
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentText);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentText
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentText
    );

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "allowance",
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
              charIndex: { start: 21, end: 94 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 124, end: 142 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 151, end: 177 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 186, end: 201 },
            },
          ],
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of owner of the tokens",
              charIndex: { start: 231, end: 278 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of spender (delegated account) of the tokens",
              charIndex: { start: 287, end: 358 },
            },
          ],
          returns: [
            {
              name: "remaining",
              type: "Uint256",
              desc: "the amount of remaining tokens allowed to be spent by the spender",
              charIndex: { start: 382, end: 467 },
            },
          ],
          raises: null,
          charIndex: { start: 3579, end: 4046 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
          ),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(
            functionCommentScope!.text
          ),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            functionCommentScope!.text
          ),
          raises: functionCommentRaisesParser.parseCommentLines(
            functionCommentScope!.text
          ),
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "view")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
    # Desc:
    #   Returns the amount of remaining tokens allowed to be spent by the spender
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   owner(felt): the address of owner of the tokens
    #   spender(felt): the address of spender (delegated account) of the tokens
    # Returns:
    #   remaining(Uint256): the amount of remaining tokens allowed to be spent by the spender`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
