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
      "storage_var"
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
        attributeName: "storage_var",
        functionName: "ERC20_name",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the name of the token" },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "name", type: "felt", desc: "The name of the token" }],
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
  //     "../../../../testAssets/library.cairo"
  //   );

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     pathFile,
  //     "event"
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
  //       attributeName: "event",
  //       functionName: "Approval",
  //       functionSignature: {
  //         implicitArgs: null,
  //         explicitArgs: [
  //           { name: "owner", type: "felt" },
  //           { name: "spender", type: "felt" },
  //           { name: "value", type: "Uint256" },
  //         ],
  //         returns: null,
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Emit event when a delegation is made",
  //           },
  //         ],
  //         implicitArgs: null,
  //         explicitArgs: [
  //           {
  //             name: "owner",
  //             type: "felt",
  //             desc: "the address of the owner",
  //           },
  //           {
  //             name: "spender",
  //             type: "felt",
  //             desc: "the address of the spender",
  //           },
  //           {
  //             name: "value",
  //             type: "Uint256",
  //             desc: "the amount of tokens approved for the spender",
  //           },
  //         ],
  //         returns: null,
  //         raises: null,
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
  //     "../../../../testAssets/library.cairo"
  //   );

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     pathFile,
  //     "event"
  //   );

  //   const line = 2;

  //   assert.equal(functionScopeLines![line], null);
  // });
});
