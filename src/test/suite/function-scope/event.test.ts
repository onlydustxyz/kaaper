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

suite("integration-test: event", () => {
  test("0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "event");

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
          desc: [
            { name: "", type: "", desc: "Emit event when a transfer is made" },
          ],
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
          returns: functionSignatureParser.getReturns(
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

  test("1", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "event");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 1;
    const commentLines = CairoParser.parseCommentLines(
      functionScopeLines![line]
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
        attributeName: "event",
        functionName: "Approval",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
            { name: "value", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Emit event when a delegation is made",
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of the owner",
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of the spender",
            },
            {
              name: "value",
              type: "Uint256",
              desc: "the amount of tokens approved for the spender",
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
          functionScopeLines![line].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![line].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![line].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![line].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![line].text
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

  test("2", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "event");

    const line = 2;

    assert.equal(functionScopeLines![line], null);
  });
});
