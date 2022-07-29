import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../lib/CairoParser";
import FunctionCommentDescParser from "../../../lib/parser/function-comment-new/desc";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment-new/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment-new/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment-new/returns";
import FunctionCommentRaisesParser from "../../../lib/parser/function-comment-new/raises";

suite("getScopeParsingResult: external", () => {
  test("should get `transfer` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    const functionScope = functionScopes![0];

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;

    const functionCommentText: string = functionCommentScope!.text.join("");

    const functionCommentDescParser = new FunctionCommentDescParser(
      functionCommentScope
    );
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser(functionCommentScope);
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser(functionCommentText);
    const functionCommentReturnsParser = new FunctionCommentReturnsParser(
      functionCommentScope
    );
    const functionCommentRaisesParser = new FunctionCommentRaisesParser(
      functionCommentScope
    );

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: "transfer",
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
          desc: [{ name: "", type: "", desc: "Perform transfer to recipient" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
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

    // assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

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
    console.log("EXTERNAL");
    // iteratate for commentParsingResult
    // assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
    for (const parsingR of commentParsingResult) {
      for (const [key, value] of Object.entries(parsingR)) {
        console.log(`${key}: ${value}`);
      }
    }
  });

  // test("1", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopes = CairoParser.parseFunctionScope(text, "external");

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 1;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![line]
  //   )!.text;

  //   const functionCommentDescParser = new FunctionCommentDescParser();
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser();
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser();
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser();
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser();

  //   const parsingTarget = [
  //     {
  //       attributeName: "external",
  //       functionName: "transferFrom",
  //       functionSignature: {
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*" },
  //           { name: "range_check_ptr", type: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "sender", type: "felt" },
  //           { name: "recipient", type: "felt" },
  //           { name: "amount", type: "Uint256" },
  //         ],
  //         returns: [{ name: "success", type: "felt" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Perform transfer from sender to recipient with allowance",
  //           },
  //         ],
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*", desc: "" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //           { name: "range_check_ptr", type: "", desc: "" },
  //         ],
  //         explicitArgs: [
  //           {
  //             name: "sender",
  //             type: "felt",
  //             desc: "the address of ERC20 sender",
  //           },
  //           {
  //             name: "recipient",
  //             type: "felt",
  //             desc: "the address of ERC20 recipient",
  //           },
  //           {
  //             name: "amount",
  //             type: "Uint256",
  //             desc: "the amount of ERC20 transfer",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "success",
  //             type: "felt",
  //             desc: "1 if transfer was successful, 0 otherwise",
  //           },
  //         ],
  //         raises: [
  //           { name: "amount", type: "", desc: "amount is not a valid Uint256" },
  //           {
  //             name: "sender",
  //             type: "",
  //             desc: "cannot transfer from the zero address",
  //           },
  //           {
  //             name: "amount",
  //             type: "",
  //             desc: "transfer amount exceeds balance",
  //           },
  //         ],
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopes![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopes![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopes![line].text
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(functionCommentScope!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(functionCommentScope!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });

  // test("2", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopes = CairoParser.parseFunctionScope(text, "external");

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 2;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![line]
  //   )!.text;

  //   const functionCommentDescParser = new FunctionCommentDescParser();
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser();
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser();
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser();
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser();

  //   const parsingTarget = [
  //     {
  //       attributeName: "external",
  //       functionName: "approve",
  //       functionSignature: {
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*" },
  //           { name: "range_check_ptr", type: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "spender", type: "felt" },
  //           { name: "amount", type: "Uint256" },
  //         ],
  //         returns: [{ name: "success", type: "felt" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Approve spender to spend amount of tokens",
  //           },
  //         ],
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*", desc: "" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //           { name: "range_check_ptr", type: "", desc: "" },
  //         ],
  //         explicitArgs: [
  //           {
  //             name: "spender",
  //             type: "felt",
  //             desc: "the address of ERC20 spender",
  //           },
  //           {
  //             name: "amount",
  //             type: "Uint256",
  //             desc: "the amount of ERC20 token to approve",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "success",
  //             type: "felt",
  //             desc: "1 if approve was successful, 0 otherwise",
  //           },
  //         ],
  //         raises: [
  //           { name: "amount", type: "", desc: "amount is not a valid Uint256" },
  //           {
  //             name: "spender",
  //             type: "",
  //             desc: "cannot approve to the zero address",
  //           },
  //         ],
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopes![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopes![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopes![line].text
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(functionCommentScope!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(functionCommentScope!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });

  // test("3", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopes = CairoParser.parseFunctionScope(text, "external");

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 3;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![line]
  //   )!.text;

  //   const functionCommentDescParser = new FunctionCommentDescParser();
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser();
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser();
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser();
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser();

  //   const parsingTarget = [
  //     {
  //       attributeName: "external",
  //       functionName: "increaseAllowance",
  //       functionSignature: {
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*" },
  //           { name: "range_check_ptr", type: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "spender", type: "felt" },
  //           { name: "added_value", type: "Uint256" },
  //         ],
  //         returns: [{ name: "success", type: "felt" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Increase allowance of spender by added_value",
  //           },
  //         ],
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*", desc: "" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //           { name: "range_check_ptr", type: "", desc: "" },
  //         ],
  //         explicitArgs: [
  //           {
  //             name: "spender",
  //             type: "felt",
  //             desc: "the address of ERC20 spender",
  //           },
  //           {
  //             name: "added_value",
  //             type: "Uint256",
  //             desc: "the amount of ERC20 token to increase allowance",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "success",
  //             type: "felt",
  //             desc: "1 if increase allowance was successful, 0 otherwise",
  //           },
  //         ],
  //         raises: [
  //           {
  //             name: "added_value",
  //             type: "",
  //             desc: "added_value is not a valid Uint256",
  //           },
  //           {
  //             name: "spender",
  //             type: "",
  //             desc: "cannot increase allowance to the zero address",
  //           },
  //         ],
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopes![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopes![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopes![line].text
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(functionCommentScope!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(functionCommentScope!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });

  // test("4", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopes = CairoParser.parseFunctionScope(text, "external");

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 4;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![line]
  //   )!.text;

  //   const functionCommentDescParser = new FunctionCommentDescParser();
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser();
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser();
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser();
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser();

  //   const parsingTarget = [
  //     {
  //       attributeName: "external",
  //       functionName: "decreaseAllowance",
  //       functionSignature: {
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*" },
  //           { name: "range_check_ptr", type: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "spender", type: "felt" },
  //           { name: "subtracted_value", type: "Uint256" },
  //         ],
  //         returns: [{ name: "success", type: "felt" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Decrease allowance of spender by subtracted_value",
  //           },
  //         ],
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*", desc: "" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //           { name: "range_check_ptr", type: "", desc: "" },
  //         ],
  //         explicitArgs: [
  //           {
  //             name: "spender",
  //             type: "felt",
  //             desc: "the address of ERC20 spender",
  //           },
  //           {
  //             name: "subtracted_value",
  //             type: "Uint256",
  //             desc: "the amount of ERC20 token to decrease allowance",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "success",
  //             type: "felt",
  //             desc: "1 if decrease allowance was successful, 0 otherwise",
  //           },
  //         ],
  //         raises: [
  //           {
  //             name: "subtracted_value",
  //             type: "",
  //             desc: "subtracted_value is not a valid Uint256",
  //           },
  //           {
  //             name: "spender",
  //             type: "",
  //             desc: "cannot decrease allowance to the zero address",
  //           },
  //         ],
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopes![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopes![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopes![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopes![line].text
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(functionCommentScope!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           functionCommentScope!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(functionCommentScope!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });
});
