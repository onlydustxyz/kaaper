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
  test("should get `6` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");
    assert.equal(functionScopes!.length, 6);

    const resultScope = CairoParser.getScopeParsingResult(text, "storage_var");
    assert.equal(resultScope!.length, 6);
  });
  test("should get `ERC20_name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines

    const scopeNumber = 0;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
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
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
              charIndex: { start: 22, end: 51 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 75, end: 108 },
            },
          ],
          raises: null,
          charIndex: { start: 1306, end: 1414 },
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(
      text,
      "storage_var"
    )![scopeNumber];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

    const { charIndex, ...parsingOutputWithoutCharIndex } =
      parsingOutput[0].functionComment;

    var commentParsingResult = [];

    for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
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

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc: 
    #   Returns the name of the token
    # Returns:
    #   name(felt): The name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_symbol` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
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
        functionName: "ERC20_symbol",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "symbol", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the symbol of the token",
              charIndex: { start: 22, end: 53 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 77, end: 114 },
            },
          ],
          raises: null,
          charIndex: { start: 1472, end: 1586 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const { charIndex, ...parsingOutputWithoutCharIndex } =
      parsingOutput[0].functionComment;

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    var commentParsingResult = [];

    for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
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
      { returns: "symbol(felt): The symbol of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc: 
    #   Returns the symbol of the token
    # Returns:
    #   symbol(felt): The symbol of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_decimals` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
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
        functionName: "ERC20_decimals",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "decimals", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the number of decimals of the token",
              charIndex: { start: 22, end: 65 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "Uint256",
              desc: "The number of decimals of the token",
              charIndex: { start: 89, end: 143 },
            },
          ],
          raises: null,
          charIndex: { start: 1651, end: 1794 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const { charIndex, ...parsingOutputWithoutCharIndex } =
      parsingOutput[0].functionComment;

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    var commentParsingResult = [];

    for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
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
      { desc: "Returns the number of decimals of the token" },
      { returns: "decimals(Uint256): The number of decimals of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc: 
    #   Returns the number of decimals of the token
    # Returns:
    #   decimals(Uint256): The number of decimals of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_total_supply` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
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
        functionName: "ERC20_total_supply",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "total_supply", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns total amount of tokens in existence",
              charIndex: { start: 22, end: 65 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "total_supply",
              type: "Uint256",
              desc: "The total amount of tokens in existence",
              charIndex: { start: 89, end: 151 },
            },
          ],
          raises: null,
          charIndex: { start: 1913, end: 2064 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
    const { charIndex, ...parsingOutputWithoutCharIndex } =
      parsingOutput[0].functionComment;

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    var commentParsingResult = [];

    for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
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
      { desc: "Returns total amount of tokens in existence" },
      {
        returns:
          "total_supply(Uint256): The total amount of tokens in existence",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc: 
    #   Returns total amount of tokens in existence
    # Returns:
    #   total_supply(Uint256): The total amount of tokens in existence`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_balances` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
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
        functionName: "ERC20_balances",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [{ name: "account", type: "felt" }],
          returns: [{ name: "balance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the amount of tokens owned by an account",
              charIndex: { start: 22, end: 70 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the account",
              charIndex: { start: 100, end: 141 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "The amount of tokens owned by an account",
              charIndex: { start: 165, end: 223 },
            },
          ],
          raises: null,
          charIndex: { start: 2142, end: 2365 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const { charIndex, ...parsingOutputWithoutCharIndex } =
      parsingOutput[0].functionComment;

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    var commentParsingResult = [];

    for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
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
      { desc: "Returns the amount of tokens owned by an account" },
      { explicitArgs: "account(felt): The address of the account" },
      { returns: "balance(Uint256): The amount of tokens owned by an account" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc: 
    #   Returns the amount of tokens owned by an account
    # Explicit args:
    #   account(felt): The address of the account
    # Returns:
    #   balance(Uint256): The amount of tokens owned by an account`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });

  test("should get `ERC20_allowances` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "storage_var");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 5;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber]
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
        functionName: "ERC20_allowances",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
          ],
          returns: [{ name: "allowance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Store the amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 22, end: 98 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "The address of the owner",
              charIndex: { start: 128, end: 165 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "The address of the spender",
              charIndex: { start: 174, end: 215 },
            },
          ],
          returns: [
            {
              name: "allowance",
              type: "Uint256",
              desc: "The amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 239, end: 329 },
            },
          ],
          raises: null,
          charIndex: { start: 2461, end: 2790 },
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopes![scopeNumber].text
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopes![scopeNumber].text
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopes![scopeNumber].text
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopes![scopeNumber].text
          ),
          returns: functionSignatureParser.getReturns(
            functionScopes![scopeNumber].text
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");
    const { charIndex, ...parsingOutputWithoutCharIndex } =
      parsingOutput[0].functionComment;

    var commentParsingResult = [];

    for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
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
      {
        desc: "Store the amount of tokens that an owner is allowed to delegate to a spender",
      },
      { explicitArgs: "owner(felt): The address of the owner" },
      { explicitArgs: "spender(felt): The address of the spender" },
      {
        returns:
          "allowance(Uint256): The amount of tokens that an owner is allowed to delegate to a spender",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
    # Desc: 
    #   Store the amount of tokens that an owner is allowed to delegate to a spender
    # Explicit args:
    #   owner(felt): The address of the owner
    #   spender(felt): The address of the spender
    # Returns:
    #   allowance(Uint256): The amount of tokens that an owner is allowed to delegate to a spender`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
