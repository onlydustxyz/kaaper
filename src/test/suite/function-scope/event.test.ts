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

suite("integration-test: event", () => {
  test("should get `Transfer` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "event");
    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();
    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![0]
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
            {
              name: "",
              type: "",
              desc: "Emit event when a transfer is made",
              charIndex: { start: 22, end: 56 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "from_",
              type: "felt",
              desc: "The address of the sender",
              charIndex: { start: 86, end: 124 },
            },
            {
              name: "to",
              type: "felt",
              desc: "The address of the receiver",
              charIndex: { start: 133, end: 170 },
            },
            {
              name: "value",
              type: "Uint256",
              desc: "The amount of tokens transferred",
              charIndex: { start: 179, end: 227 },
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
          const www = {
            [key]: char,
          };
          commentParsingResult.push(www);
        }
      }
    }
    const textTarget = [
      { desc: "Emit event when a transfer is made" },
      { explicitArgs: "from_(felt): The address of the sender" },
      { explicitArgs: "to(felt): The address of the receiver" },
      { explicitArgs: "value(Uint256): The amount of tokens transferred" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });
  // test("1", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   // parse whole scope
  //   const functionScopes = CairoParser.parseFunctionScope(text, "event");
  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();
  //   // Comment parsing
  //   // parse comment lines
  //   const line = 1;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopes![line]
  //   )!;
  //   const functionCommentText: string = functionCommentScope!.text.join("");
  //   const functionCommentDescParser = new FunctionCommentDescParser(functionCommentText);
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser(functionCommentText);
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser(functionCommentText);
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser(functionCommentText);
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser(functionCommentText);
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
  //         desc: functionCommentDescParser.parseCommentLines(functionCommentScope!.text),
  //         implicitArgs: functionCommentImplicitArgsParser.parseCommentLines(
  //           functionCommentScope!.text
  //         ),
  //         explicitArgs: functionCommentExplicitArgsParser.parseCommentLines(
  //           functionCommentScope!.text
  //         ),
  //         returns: functionCommentReturnsParser.parseCommentLines(
  //           functionCommentScope!.text
  //         ),
  //         raises: functionCommentRaisesParser.parseCommentLines(functionCommentScope!.text),
  //       },
  //     },
  //   ];
  //   assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
  // });
  // test("2", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   // parse whole scope
  //   const functionScopes = CairoParser.parseFunctionScope(text, "event");
  //   const line = 2;
  //   assert.equal(functionScopes![line], null);
  // });
});
