import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../lib/CairoParser";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import FunctionCommentDescParser from "../../../lib/parser/function-comment-new/desc";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment-new/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment-new/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment-new/returns";
import FunctionCommentRaisesParser from "../../../lib/parser/function-comment-new/raises";

suite("getScopeParsingResult: constructor", () => {
  test("should get `1` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");

    assert.equal(functionScopes!.length, 1);
  });
  test("should get `constructor` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
    const functionScope = functionScopes![0];

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(functionScope);

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
        attributeName: "constructor",
        functionName: "constructor",
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
              charIndex: { start: 21, end: 44 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 74, end: 92 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 101, end: 127 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 136, end: 151 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 181, end: 210 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 219, end: 252 },
            },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
              charIndex: { start: 261, end: 307 },
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
              charIndex: { start: 316, end: 378 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 387, end: 450 },
            },
          ],
          returns: null,
          raises: [
            {
              name: "decimals",
              type: "",
              desc: "decimals exceed 2^8",
              charIndex: { start: 501, end: 530 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
              charIndex: { start: 539, end: 581 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "not valid Uint256",
              charIndex: { start: 590, end: 623 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "mint overflow",
              charIndex: { start: 632, end: 661 },
            },
          ],
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
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
    var commentParsingResult = [];

    for (let [key, values] of Object.entries(
      parsingOutput[0].functionComment
    )) {
      if (values) {
        for (const value of values) {
          const charIndex = value.charIndex;
          var char = "";
          for (
            let i = functionCommentScope!.start + charIndex.start;
            i < functionCommentScope!.start + charIndex.end;
            i++
          ) {
            char += text.at(i);
          }
          const commentParsing = {
            [key]: char,
          };
          commentParsingResult.push(commentParsing);
        }
      }
    }
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
  });

  test("should get all `constructor` function scopes", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    const parsingOutput = CairoParser.getScopeParsingResult(
      text,
      "constructor"
    );

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: "constructor",
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
              charIndex: { start: 21, end: 44 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 74, end: 92 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 101, end: 127 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 136, end: 151 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 181, end: 210 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 219, end: 252 },
            },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
              charIndex: { start: 261, end: 307 },
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
              charIndex: { start: 316, end: 378 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 387, end: 450 },
            },
          ],
          returns: null,
          raises: [
            {
              name: "decimals",
              type: "",
              desc: "decimals exceed 2^8",
              charIndex: { start: 501, end: 530 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
              charIndex: { start: 539, end: 581 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "not valid Uint256",
              charIndex: { start: 590, end: 623 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "mint overflow",
              charIndex: { start: 632, end: 661 },
            },
          ],
          charIndex: { start: 526, end: 1187 },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const charIndex = parsingOutput![0].functionComment.charIndex;
    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc:
    #   Initialize the contract
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   name(felt): name of the token
    #   symbol(felt): symbol of the token
    #   decimals(Uint256): floating point of the token
    #   initial_supply(Uint256): amount of initial supply of the token
    #   recipient(felt): the address of recipient of the initial supply
    # Returns:
    #   None
    # Raises:
    #   decimals: decimals exceed 2^8
    #   recipient: cannot mint to the zero address
    #   initial_supply: not valid Uint256
    #   initial_supply: mint overflow`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
