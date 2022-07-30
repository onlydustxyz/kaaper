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

suite("getScopeParsingResult: view", () => {
  test("should get `name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

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
        attributeName: "view",
        functionName: "name",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Returns the name of the token" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "name", type: "felt", desc: "name of the token" }],
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
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "name(felt): name of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `symbol` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopeLines![scopeNumber]
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
        attributeName: "view",
        functionName: "symbol",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "symbol", type: "felt" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the symbol of the token" },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            { name: "symbol", type: "felt", desc: "symbol of the token" },
          ],
          raises: null,
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![scopeNumber].text
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
      { desc: "Returns the symbol of the token" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "symbol(felt): symbol of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `totalSupply` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopeLines![scopeNumber]
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
        attributeName: "view",
        functionName: "totalSupply",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "totalSupply", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the total supply of the token",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "totalSupply",
              type: "Uint256",
              desc: "total supply of the token",
            },
          ],
          raises: null,
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![scopeNumber].text
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
      { desc: "Returns the total supply of the token" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "totalSupply(Uint256): total supply of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `decimals` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopeLines![scopeNumber]
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
        attributeName: "view",
        functionName: "decimals",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "decimals", type: "felt" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the decimals of the token" },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            { name: "decimals", type: "felt", desc: "decimals of the token" },
          ],
          raises: null,
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![scopeNumber].text
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
      { desc: "Returns the decimals of the token" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "decimals(felt): decimals of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `balanceOf` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopeLines![scopeNumber]
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
        attributeName: "view",
        functionName: "balanceOf",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [{ name: "account", type: "felt" }],
          returns: [{ name: "balance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the balance of the account" },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "account to query balance for",
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "the balance of the account",
            },
          ],
          raises: null,
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![scopeNumber].text
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
      { desc: "Returns the balance of the account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "account(felt): account to query balance for" },
      { returns: "balance(Uint256): the balance of the account" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  // test("5", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");

  //   // parse whole scope
  //   const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

  //   // Function signature parsing
  //   const functionSignatureParser = new FunctionSignatureRegexParser();

  //   // Comment parsing
  //   // parse comment lines
  //   const scopeNumber = 5;
  //   const functionCommentScope = CairoParser.parseCommentLines(
  //     functionScopeLines![scopeNumber]
  //   )!.text;
  //   console.log(functionCommentScope);
  //   const functionCommentDescParser = new FunctionCommentDescParser();
  //   const functionCommentImplicitArgsParser =
  //     new FunctionCommentImplicitArgsParser();
  //   const functionCommentExplicitArgsParser =
  //     new FunctionCommentExplicitArgsParser();
  //   const functionCommentReturnsParser = new FunctionCommentReturnsParser();
  //   const functionCommentRaisesParser = new FunctionCommentRaisesParser();

  //   const parsingTarget = [
  //     {
  //       attributeName: "view",
  //       functionName: "allowance",
  //       functionSignature: {
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*" },
  //           { name: "range_check_ptr", type: "" },
  //         ],
  //         explicitArgs: [
  //           { name: "owner", type: "felt" },
  //           { name: "spender", type: "felt" },
  //         ],
  //         returns: [{ name: "remaining", type: "Uint256" }],
  //       },
  //       functionComment: {
  //         desc: [
  //           {
  //             name: "",
  //             type: "",
  //             desc: "Returns the amount of remaining tokens allowed to be spent by the spender",
  //           },
  //         ],
  //         implicitArgs: [
  //           { name: "syscall_ptr", type: "felt*", desc: "" },
  //           { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //           { name: "range_check_ptr", type: "", desc: "" },
  //         ],
  //         explicitArgs: [
  //           {
  //             name: "owner",
  //             type: "felt",
  //             desc: "the address of owner of the tokens",
  //           },
  //           {
  //             name: "spender",
  //             type: "felt",
  //             desc: "the address of spender (delegated account) of the tokens",
  //           },
  //         ],
  //         returns: [
  //           {
  //             name: "remaining",
  //             type: "Uint256",
  //             desc: "the amount of remaining tokens allowed to be spent by the spender",
  //           },
  //         ],
  //         raises: null,
  //       },
  //     },
  //   ];

  //   var parsingOutput = [
  //     {
  //       attributeName: functionSignatureParser.getAttributeName(
  //         functionScopeLines![scopeNumber].text
  //       ),
  //       functionName: functionSignatureParser.getFunctionName(
  //         functionScopeLines![scopeNumber].text
  //       ),
  //       functionSignature: {
  //         implicitArgs: functionSignatureParser.getImplicitArgs(
  //           functionScopeLines![scopeNumber].text
  //         ),
  //         explicitArgs: functionSignatureParser.getExplicitArgs(
  //           functionScopeLines![scopeNumber].text
  //         ),
  //         returns: functionSignatureParser.getReturns(
  //           functionScopeLines![scopeNumber].text
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
