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

suite("getScopeParsingResult: storage_var", () => {
  test("should get `ERC20_name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(
      text,
      "storage_var"
    );

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopeLines![0]
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
        attributeName: "storage_var",
        functionName: "ERC20_name",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Returns the name of the token" }],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            { name: "name", type: "felt", desc: "The name of the token" },
          ],
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
      { desc: "Returns the name of the token" },
      { returns: "name(felt): The name of the token" },
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
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     text,
  //     "storage_var"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 1;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
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
  //       attributeName: "storage_var",
  //       functionName: "ERC20_symbol",
  //       functionSignature: {
  //         implicitArgs: null,
  //         explicitArgs: null,
  //         returns: [{ name: "symbol", type: "felt" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           { name: "", type: "", desc: "Returns the symbol of the token" },
  //         ],
  //         implicitArgs: null,
  //         explicitArgs: null,
  //         returns: [
  //           { name: "symbol", type: "felt", desc: "The symbol of the token" },
  //         ],
  //         raises: null,
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line].text
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
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     text,
  //     "storage_var"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 2;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
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
  //       attributeName: "storage_var",
  //       functionName: "ERC20_decimals",
  //       functionSignature: {
  //         implicitArgs: null,
  //         explicitArgs: null,
  //         returns: [{ name: "decimals", type: "Uint256" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Returns the number of decimals of the token",
  //           },
  //         ],
  //         implicitArgs: null,
  //         explicitArgs: null,
  //         returns: [
  //           {
  //             name: "decimals",
  //             type: "Uint256",
  //             desc: "The number of decimals of the token",
  //           },
  //         ],
  //         raises: null,
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line].text
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
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     text,
  //     "storage_var"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 3;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
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
  //       attributeName: "storage_var",
  //       functionName: "ERC20_total_supply",
  //       functionSignature: {
  //         implicitArgs: null,
  //         explicitArgs: null,
  //         returns: [{ name: "total_supply", type: "Uint256" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Returns total amount of tokens in existence",
  //           },
  //         ],
  //         implicitArgs: null,
  //         explicitArgs: null,
  //         returns: [
  //           {
  //             name: "total_supply",
  //             type: "Uint256",
  //             desc: "The total amount of tokens in existence",
  //           },
  //         ],
  //         raises: null,
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line].text
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
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     text,
  //     "storage_var"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 4;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
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
  //       attributeName: "storage_var",
  //       functionName: "ERC20_balances",
  //       functionSignature: {
  //         implicitArgs: null,
  //         explicitArgs: [{ name: "account", type: "felt" }],
  //         returns: [{ name: "balance", type: "Uint256" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Returns the amount of tokens owned by an account",
  //           },
  //         ],
  //         implicitArgs: null,
  //         explicitArgs: [
  //           {
  //             name: "account",
  //             type: "felt",
  //             desc: "The address of the account",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "balance",
  //             type: "Uint256",
  //             desc: "The amount of tokens owned by an account",
  //           },
  //         ],
  //         raises: null,
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line].text
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

  // test("5", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(
  //     text,
  //     "storage_var"
  //   );

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const line = 5;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopeLines![line]
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
  //       attributeName: "storage_var",
  //       functionName: "ERC20_allowances",
  //       functionSignature: {
  //         implicitArgs: null,
  //         explicitArgs: [
  //           { name: "owner", type: "felt" },
  //           { name: "spender", type: "felt" },
  //         ],
  //         returns: [{ name: "allowance", type: "Uint256" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Store the amount of tokens that an owner is allowed to delegate to a spender",
  //           },
  //         ],
  //         implicitArgs: null,
  //         explicitArgs: [
  //           { name: "owner", type: "felt", desc: "The address of the owner" },
  //           {
  //             name: "spender",
  //             type: "felt",
  //             desc: "The address of the spender",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "allowance",
  //             type: "Uint256",
  //             desc: "The amount of tokens that an owner is allowed to delegate to a spender",
  //           },
  //         ],
  //         raises: null,
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![line].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![line].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![line].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![line].text
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

  // test("6", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/library.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(text, "event");

  //   const line = 6;

  //   assert.equal(functionScopeLines![line], null);
  // });
});
