import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";

import CairoParser from "../../../../../../core/lib/CairoParser";
import {
  yieldFunctionCommentPartsFromCharIndex,
  yieldWholeFunctionCommentStringFromCharIndex,
} from "./utils";

suite("getScopeParsingResult: constructor", () => {
  test("should get `1` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");

    assert.equal(functionScopes!.length, 1);
  });
  test("should get `constructor` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 351,
            end: 362,
          },
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
            { name: "decimals", type: "Uint256" },
            { name: "initial_supply", type: "Uint256" },
            { name: "recipient", type: "felt" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: { start: 23, end: 46 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 78, end: 96 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 106, end: 132 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 189, end: 218 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 228, end: 261 },
            },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
              charIndex: { start: 271, end: 317 },
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
              charIndex: { start: 327, end: 389 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 399, end: 462 },
            },
          ],
          returns: null,
          raises: [
            {
              name: "decimals",
              type: "",
              desc: "decimals exceed 2^8",
              charIndex: { start: 517, end: 546 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
              charIndex: { start: 556, end: 598 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "not valid Uint256",
              charIndex: { start: 608, end: 641 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "mint overflow",
              charIndex: { start: 651, end: 680 },
            },
          ],
          charIndex: { start: 522, end: 1202 },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(
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
      { desc: "Initialize the contract" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "name(felt): name of the token" },
      { explicitArgs: "symbol(felt): symbol of the token" },
      { explicitArgs: "decimals(Uint256): floating point of the token" },
      {
        explicitArgs:
          "initial_supply(Uint256): amount of initial supply of the token",
      },
      {
        explicitArgs:
          "recipient(felt): the address of recipient of the initial supply",
      },
      { raises: "decimals: decimals exceed 2^8" },
      { raises: "recipient: cannot mint to the zero address" },
      { raises: "initial_supply: not valid Uint256" },
      { raises: "initial_supply: mint overflow" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    const functionCommentParsingResult =
      yieldWholeFunctionCommentStringFromCharIndex(text, parsingResult);

    const functionCommentTarget = `
    // Desc:
    //   Initialize the contract
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Explicit args:
    //   name(felt): name of the token
    //   symbol(felt): symbol of the token
    //   decimals(Uint256): floating point of the token
    //   initial_supply(Uint256): amount of initial supply of the token
    //   recipient(felt): the address of recipient of the initial supply
    // Returns:
    //   None
    // Raises:
    //   decimals: decimals exceed 2^8
    //   recipient: cannot mint to the zero address
    //   initial_supply: not valid Uint256
    //   initial_supply: mint overflow`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get all `constructor` function scopes", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    const parsingOutput = CairoParser.getScopeParsingResult(
      text,
      "constructor"
    );

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 351,
            end: 362,
          },
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
            { name: "decimals", type: "Uint256" },
            { name: "initial_supply", type: "Uint256" },
            { name: "recipient", type: "felt" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: { start: 23, end: 46 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 78, end: 96 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 106, end: 132 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 189, end: 218 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 228, end: 261 },
            },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
              charIndex: { start: 271, end: 317 },
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
              charIndex: { start: 327, end: 389 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 399, end: 462 },
            },
          ],
          returns: null,
          raises: [
            {
              name: "decimals",
              type: "",
              desc: "decimals exceed 2^8",
              charIndex: { start: 517, end: 546 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
              charIndex: { start: 556, end: 598 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "not valid Uint256",
              charIndex: { start: 608, end: 641 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "mint overflow",
              charIndex: { start: 651, end: 680 },
            },
          ],
          charIndex: { start: 522, end: 1202 },
        },
      },
    ];

    assert.deepEqual(parsingOutput, parsingTarget, "failed to parse");
  });
});
