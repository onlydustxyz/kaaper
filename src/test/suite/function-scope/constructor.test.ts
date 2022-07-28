import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../lib/CairoParser";
import FunctionCommentDescParser from "../../../lib/parser/function-comment/desc";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment/returns";
import FunctionCommentRaisesParser from "../../../lib/parser/function-comment/raises";

suite("integration-test: constructor", () => {
  test("0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(
      text,
      "constructor"
    );

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const commentLines = CairoParser.parseCommentLines(
      functionScopeLines![0]
    )!.text;

    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

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
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Initialize the contract" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            { name: "name", type: "felt", desc: "name of the token" },
            { name: "symbol", type: "felt", desc: "symbol of the token" },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
            },
          ],
          returns: null,
          raises: [
            { name: "decimals", type: "", desc: "decimals exceed 2^8" },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
            },
            { name: "initial_supply", type: "", desc: "not valid Uint256" },
            { name: "initial_supply", type: "", desc: "mint overflow" },
          ],
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![0].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![0].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![0].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![0].text
          ),
        },
        functionComment: {
          desc: functionCommentDescParser.parseCommentLines(commentLines!),
          implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
            commentLines!
          ),
          explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
            commentLines!
          ),
          returns: functionCommentReturnsParser.parseCommentLines(
            commentLines!
          ),
          raises: functionCommentRaisesParser.parseCommentLines(commentLines!),
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  });

  // test("using match all", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );

  //   const text = fs.readFileSync(pathFile, "utf8");
  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScopeWithMatchAll(
  //     text,
  //     "constructor"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   const functionCommentLines = CairoParser.parseCommentLinesWithMatchAll(
  //     functionScopeLines![0].text
  //   );
  //   // var temp = ""
  //   // const start = functionCommentLines!.start;
  //   // const end = functionCommentLines!.end;
  //   // for (let i = start; i < end; i++) {
  //   //   temp += text[i];
  //   // }
  //   // assert.equal(functionCommentLines!.start, 526);
  //   // assert.equal(functionCommentLines!.end, 1187);

  //   const commentLines = functionCommentLines!.text;

  //   const functionCommentDescParser = new FunctionCommentDescParser();
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser();
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser();
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser();
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser();

  //   const parsingTarget = [
  //     {
  //       attributeName: "constructor",
  //       functionName: "constructor",
  //       functionSignature: {
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*" },
  //           { name: "range_check_ptr", type: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "name", type: "felt" },
  //           { name: "symbol", type: "felt" },
  //           { name: "decimals", type: "Uint256" },
  //           { name: "initial_supply", type: "Uint256" },
  //           { name: "recipient", type: "felt" },
  //         ],
  //       },
  //       functionComment: {
  //         desc: [{ name: "", type: "", desc: "Initialize the contract" }],
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*", desc: "" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //           { name: "range_check_ptr", type: "", desc: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "name", type: "felt", desc: "name of the token" },
  //           { name: "symbol", type: "felt", desc: "symbol of the token" },
  //           {
  //             name: "decimals",
  //             type: "Uint256",
  //             desc: "floating point of the token",
  //           },
  //           {
  //             name: "initial_supply",
  //             type: "Uint256",
  //             desc: "amount of initial supply of the token",
  //           },
  //           {
  //             name: "recipient",
  //             type: "felt",
  //             desc: "the address of recipient of the initial supply",
  //           },
  //         ],
  //         returns: null,
  //         raises: [
  //           { name: "decimals", type: "", desc: "decimals exceed 2^8" },
  //           {
  //             name: "recipient",
  //             type: "",
  //             desc: "cannot mint to the zero address",
  //           },
  //           { name: "initial_supply", type: "", desc: "not valid Uint256" },
  //           { name: "initial_supply", type: "", desc: "mint overflow" },
  //         ],
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![0].text.text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![0].text.text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![0].text.text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![0].text.text
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(commentLines),
  //         implicitArgs:
  //           functionCommentImplicitArgsParser.parseCommentLines(commentLines),
  //         explicitArgs:
  //           functionCommentExplicitArgsParser.parseCommentLines(commentLines),
  //         returns: functionCommentReturnsParser.parseCommentLines(commentLines),
  //         raises: functionCommentRaisesParser.parseCommentLines(commentLines),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });
});
