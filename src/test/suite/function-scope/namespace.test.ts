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

suite("getScopeParsingResult: namespace", () => {
  test("should get `constructor` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 0;
    const functionScope = functionScopes![scopeNumber];

    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
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

    const parsingOutput = [
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
      {
        desc: "Initializes the contract with the given name, symbol, and decimals",
      },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "name(felt): The name of the token" },
      {
        explicitArgs: "symbol(felt): The symbol of the token",
      },
      {
        explicitArgs: "multiplier(felt): The multiplier of the token",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `name` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 1;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
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
        attributeName: "namespace ERC20",
        functionName: "name",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
            },
          ],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
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
              name: "name",
              type: "felt",
              desc: "The name of the token",
            },
          ],
          raises: null,
        },
      },
    ];

    const parsingOutput = [
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
      {
        desc: "Returns the name of the token",
      },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { returns: "name(felt): The name of the token" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `transfer_from` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 2;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
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
        attributeName: "namespace ERC20",
        functionName: "transfer_from",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "sender", type: "felt" },
            { name: "recipient", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Transfers tokens from one account to another",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            { name: "sender", type: "felt", desc: "The address of the sender" },
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be transferred",
            },
          ],
          returns: null,
          raises: null,
        },
      },
    ];

    const parsingOutput = [
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
      { desc: "Transfers tokens from one account to another" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "sender(felt): The address of the sender" },
      { explicitArgs: "recipient(felt): The address of the recipient" },
      {
        explicitArgs: "amount(Uint256): The amount of tokens to be transferred",
      },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `_mint` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 3;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
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
        attributeName: "namespace internal",
        functionName: "_mint",
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
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Mints tokens to an account",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be minted",
            },
          ],
          returns: null,
          raises: null,
        },
      },
    ];

    const parsingOutput = [
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
      { desc: "Mints tokens to an account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "recipient(felt): The address of the recipient" },
      { explicitArgs: "amount(Uint256): The amount of tokens to be minted" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `_burn` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const scopeNumber = 4;
    const functionCommentScope = CairoParser.parseCommentLines(
      functionScopes![scopeNumber],
      true
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
        attributeName: "namespace internal",
        functionName: "_burn",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "account", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Burns tokens from an account",
            },
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
              desc: "The address of the recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be burned",
            },
          ],
          returns: null,
          raises: null,
        },
      },
    ];

    const parsingOutput = [
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
      { desc: "Burns tokens from an account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "account(felt): The address of the recipient" },
      { explicitArgs: "amount(Uint256): The amount of tokens to be burned" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });
});
