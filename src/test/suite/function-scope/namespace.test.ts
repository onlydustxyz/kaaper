import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/CairoParser";
import FunctionCommentDescParser from "../../../lib/parser/function-comment/desc";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment/returns";
import FunctionCommentRaisesParser from "../../../lib/parser/function-comment/raises";

suite("integration-test: namespace", () => {
  test("namespace ERC20", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );

    // parse whole scope
    const functionScopeLines = CairoParser.getNamespaceScopes(pathFile);
    const namespace = functionScopeLines![0].namespace;

    const text = functionScopeLines![0].text;
    const match = text!.match(
      /func\s+\w+{[\w\s:*,]*}\([\w\s:*,]*\)\s*-?>?\s*\(?[\w\s:*,]*\)?:\s+[#\s\w:,\(\)*]+/gm
    );

    const line = 0;
    const functionScope = match![line];

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const commentLines = CairoParser.parseCommentLines(functionScope);

    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

    const parsingTarget = [
      {
        attributeName: "namespace ERC20",
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
            { name: "multiplier", type: "felt" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initializes the contract with the given name, symbol, and decimals",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            { name: "name", type: "felt", desc: "The name of the token" },
            { name: "symbol", type: "felt", desc: "The symbol of the token" },
            {
              name: "multiplier",
              type: "felt",
              desc: "The multiplier of the token",
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
          functionScope,
          namespace
        ),
        functionName: functionSignatureParser.getFunctionName(functionScope),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(functionScope),
          explicitArgs: functionSignatureParser.getExplicitArgs(functionScope),
          returns: functionSignatureParser.getReturns(functionScope),
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
});
