import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/main";
import FunctionCommentDescParser from "../../../lib/parser/function-comment/desc";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment/returns";
import FunctionCommentRaisesParser from "../../../lib/parser/function-comment/raises";

suite("integration-test: event", () => {
  test("0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/library.cairo"
    );

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(
      pathFile,
      "event"
    );

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const commentLines = CairoParser.parseCommentLines(functionScopeLines![0]);

    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

    const parsingTarget = [
      {
        attributeName: "event",
        functionName: "Transfer",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "from_", type: "felt" },
            { name: "to", type: "felt" },
            { name: "value", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Emit event when a transfer is made" }],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "from_",
              type: "felt",
              desc: "The address of the sender",
            },
            {
              name: "to",
              type: "felt",
              desc: "The address of the receiver",
            },
            {
              name: "value",
              type: "Uint256",
              desc: "The amount of tokens transferred",
            },
          ],
          returns: null,
          raises: null,
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![0]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![0]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![0]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![0]
          ),
          returns: functionSignatureParser.getReturns(functionScopeLines![0]),
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

  // test("1", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testAssets/ERC20.cairo"
  //   );

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     pathFile,
  //     "external"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 1;
  //   const commentLines = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
  //   );

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
  //         functionScopeLines![line]
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line]
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line]
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(commentLines!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(commentLines!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });

  // test("2", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testAssets/ERC20.cairo"
  //   );

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     pathFile,
  //     "external"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 2;
  //   const commentLines = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
  //   );

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
  //         functionScopeLines![line]
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line]
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line]
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(commentLines!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(commentLines!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });

  // test("3", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testAssets/ERC20.cairo"
  //   );

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     pathFile,
  //     "external"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 3;
  //   const commentLines = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
  //   );

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
  //         functionScopeLines![line]
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line]
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line]
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(commentLines!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(commentLines!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });

  // test("4", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testAssets/ERC20.cairo"
  //   );

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     pathFile,
  //     "external"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 4;
  //   const commentLines = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
  //   );

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
  //         functionScopeLines![line]
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line]
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line]
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line]
  //         ),
  //       },
  //       functionComment: {
  //         desc: functionCommentDescParser.parseCommentLines(commentLines!),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           commentLines!
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(commentLines!),
  //       },
  //     },
  //   ];

  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });
});
