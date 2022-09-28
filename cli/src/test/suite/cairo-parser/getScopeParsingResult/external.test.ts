import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../../../core/lib/CairoParser";

import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: external", () => {
  test("should get `5` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    assert.equal(functionScopes!.length, 5, "failed to parse");

    const resultScope = CairoParser.getScopeParsingResult(text, "external");
    assert.equal(resultScope!.length, 5);
  });

  test("should get `transfer` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    const scopeNumber = 0;
    const functionScope = functionScopes![scopeNumber];

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: {
          name: "transfer",
          charIndex: { start: 4234, end: 4242 },
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
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 195, end: 242 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 252, end: 297 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 323, end: 379 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 404, end: 441 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
              charIndex: { start: 451, end: 497 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 507, end: 546 },
            },
          ],
          charIndex: { start: 4368, end: 4914 },
        },
      },
    ];
    const parsingResult = CairoParser.getScopeParsingResult(text, "external")![
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
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "recipient(felt): the address of ERC20 recipient" },
      { explicitArgs: "amount(Uint256): the amount of ERC20 transfer" },
      {
        returns: "success(felt): 1 if transfer was successful, 0 otherwise",
      },
      { raises: "amount: amount is not a valid Uint256" },
      { raises: "recipient: cannot transfer to the zero address" },
      { raises: "amount: transfer amount exceeds balance" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Perform transfer to recipient
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   recipient(felt): the address of ERC20 recipient
    //   amount(Uint256): the amount of ERC20 transfer
    // Returns:
    //   success(felt): 1 if transfer was successful, 0 otherwise
    // Raises:
    //   amount: amount is not a valid Uint256
    //   recipient: cannot transfer to the zero address
    //   amount: transfer amount exceeds balance`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `transferFrom` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: {
          name: "transferFrom",
          charIndex: { start: 4992, end: 5004 },
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
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer from sender to recipient with allowance",
              charIndex: { start: 23, end: 79 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 111, end: 129 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 139, end: 165 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 175, end: 190 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "the address of ERC20 sender",
              charIndex: { start: 222, end: 263 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 273, end: 320 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 330, end: 375 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 401, end: 457 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 482, end: 519 },
            },
            {
              name: "sender",
              type: "",
              desc: "cannot transfer from the zero address",
              charIndex: { start: 529, end: 574 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 584, end: 623 },
            },
          ],
          charIndex: { start: 5144, end: 5767 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "external")![
      scopeNumber
    ];

    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Perform transfer from sender to recipient with allowance" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "sender(felt): the address of ERC20 sender" },
      { explicitArgs: "recipient(felt): the address of ERC20 recipient" },
      { explicitArgs: "amount(Uint256): the amount of ERC20 transfer" },
      { returns: "success(felt): 1 if transfer was successful, 0 otherwise" },
      { raises: "amount: amount is not a valid Uint256" },
      { raises: "sender: cannot transfer from the zero address" },
      { raises: "amount: transfer amount exceeds balance" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Perform transfer from sender to recipient with allowance
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   sender(felt): the address of ERC20 sender
    //   recipient(felt): the address of ERC20 recipient
    //   amount(Uint256): the amount of ERC20 transfer
    // Returns:
    //   success(felt): 1 if transfer was successful, 0 otherwise
    // Raises:
    //   amount: amount is not a valid Uint256
    //   sender: cannot transfer from the zero address
    //   amount: transfer amount exceeds balance`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `approve` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: {
          name: "approve",
          charIndex: { start: 5858, end: 5865 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Approve spender to spend amount of tokens",
              charIndex: { start: 23, end: 64 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 96, end: 114 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 124, end: 150 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 160, end: 175 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 207, end: 250 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 token to approve",
              charIndex: { start: 260, end: 313 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if approve was successful, 0 otherwise",
              charIndex: { start: 339, end: 394 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 419, end: 456 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot approve to the zero address",
              charIndex: { start: 466, end: 509 },
            },
          ],
          charIndex: { start: 5989, end: 6498 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "external")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Approve spender to spend amount of tokens" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "spender(felt): the address of ERC20 spender" },
      { explicitArgs: "amount(Uint256): the amount of ERC20 token to approve" },
      { returns: "success(felt): 1 if approve was successful, 0 otherwise" },
      { raises: "amount: amount is not a valid Uint256" },
      { raises: "spender: cannot approve to the zero address" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Approve spender to spend amount of tokens
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   spender(felt): the address of ERC20 spender
    //   amount(Uint256): the amount of ERC20 token to approve
    // Returns:
    //   success(felt): 1 if approve was successful, 0 otherwise
    // Raises:
    //   amount: amount is not a valid Uint256
    //   spender: cannot approve to the zero address`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `increaseAllowance` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: {
          name: "increaseAllowance",
          charIndex: { start: 6574, end: 6591 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "added_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Increase allowance of spender by added_value",
              charIndex: { start: 23, end: 67 },
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
              charIndex: { start: 127, end: 153 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 163, end: 178 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 210, end: 253 },
            },
            {
              name: "added_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to increase allowance",
              charIndex: { start: 263, end: 332 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if increase allowance was successful, 0 otherwise",
              charIndex: { start: 358, end: 424 },
            },
          ],
          raises: [
            {
              name: "added_value",
              type: "",
              desc: "added_value is not a valid Uint256",
              charIndex: { start: 449, end: 496 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot increase allowance to the zero address",
              charIndex: { start: 506, end: 560 },
            },
          ],
          charIndex: { start: 6720, end: 7280 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "external")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Increase allowance of spender by added_value" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "spender(felt): the address of ERC20 spender" },
      {
        explicitArgs:
          "added_value(Uint256): the amount of ERC20 token to increase allowance",
      },
      {
        returns:
          "success(felt): 1 if increase allowance was successful, 0 otherwise",
      },
      { raises: "added_value: added_value is not a valid Uint256" },
      { raises: "spender: cannot increase allowance to the zero address" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Increase allowance of spender by added_value
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   spender(felt): the address of ERC20 spender
    //   added_value(Uint256): the amount of ERC20 token to increase allowance
    // Returns:
    //   success(felt): 1 if increase allowance was successful, 0 otherwise
    // Raises:
    //   added_value: added_value is not a valid Uint256
    //   spender: cannot increase allowance to the zero address`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `decreaseAllowance` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
    )!;

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: {
          name: "decreaseAllowance",
          charIndex: { start: 7372, end: 7389 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "subtracted_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Decrease allowance of spender by subtracted_value",
              charIndex: { start: 23, end: 72 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 104, end: 122 },
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
              charIndex: { start: 168, end: 183 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 215, end: 258 },
            },
            {
              name: "subtracted_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to decrease allowance",
              charIndex: { start: 268, end: 342 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if decrease allowance was successful, 0 otherwise",
              charIndex: { start: 368, end: 434 },
            },
          ],
          raises: [
            {
              name: "subtracted_value",
              type: "",
              desc: "subtracted_value is not a valid Uint256",
              charIndex: { start: 459, end: 516 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot decrease allowance to the zero address",
              charIndex: { start: 526, end: 580 },
            },
          ],
          charIndex: { start: 7523, end: 8103 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "external")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingTarget[0], "failed to parse");

    const commentParsingResult = yieldFunctionCommentPartsFromCharIndex(
      text,
      functionCommentScope,
      parsingResult
    );

    const textTarget = [
      { desc: "Decrease allowance of spender by subtracted_value" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "spender(felt): the address of ERC20 spender" },
      {
        explicitArgs:
          "subtracted_value(Uint256): the amount of ERC20 token to decrease allowance",
      },
      {
        returns:
          "success(felt): 1 if decrease allowance was successful, 0 otherwise",
      },
      { raises: "subtracted_value: subtracted_value is not a valid Uint256" },
      { raises: "spender: cannot decrease allowance to the zero address" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Decrease allowance of spender by subtracted_value
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   spender(felt): the address of ERC20 spender
    //   subtracted_value(Uint256): the amount of ERC20 token to decrease allowance
    // Returns:
    //   success(felt): 1 if decrease allowance was successful, 0 otherwise
    // Raises:
    //   subtracted_value: subtracted_value is not a valid Uint256
    //   spender: cannot decrease allowance to the zero address`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
