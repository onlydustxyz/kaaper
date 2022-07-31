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
  test("should get `5` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    assert.equal(functionScopes!.length, 5, "failed to parse");

    const resultScope = CairoParser.getScopeParsingResult(text, "namespace");
    assert.equal(resultScope!.length, 5, "failed to parse");
  });

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
              charIndex: { start: 29, end: 95 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 133, end: 151 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 164, end: 190 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 203, end: 218 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 256, end: 289 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 302, end: 339 },
            },
            {
              name: "multiplier",
              type: "felt",
              desc: "The multiplier of the token",
              charIndex: { start: 352, end: 397 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 2992, end: 3389 },
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
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

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
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
              charIndex: { start: 29, end: 58 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 96, end: 114 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 127, end: 153 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 166, end: 181 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 213, end: 246 },
            },
          ],
          raises: null,
          charIndex: { start: 3782, end: 4028 },
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
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
      {
        desc: "Returns the name of the token",
      },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
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
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Returns:
        #   name(felt): The name of the token`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
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
              charIndex: { start: 29, end: 73 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 111, end: 129 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 142, end: 168 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 181, end: 196 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "The address of the sender",
              charIndex: { start: 234, end: 273 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 286, end: 331 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be transferred",
              charIndex: { start: 344, end: 399 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 4261, end: 4660 },
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
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

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
        # Desc:
        #   Transfers tokens from one account to another
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   sender(felt): The address of the sender
        #   recipient(felt): The address of the recipient
        #   amount(Uint256): The amount of tokens to be transferred`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
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
              charIndex: { start: 29, end: 55 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 93, end: 111 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 124, end: 150 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 163, end: 178 },
            },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 216, end: 261 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be minted",
              charIndex: { start: 274, end: 324 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 5071, end: 5431 },
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    assert.deepEqual(parsingTarget, parsingOutput, "failed to parse");

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
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
      { desc: "Mints tokens to an account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "recipient(felt): The address of the recipient" },
      { explicitArgs: "amount(Uint256): The amount of tokens to be minted" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
        # Desc:
        #   Mints tokens to an account
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   recipient(felt): The address of the recipient
        #   amount(Uint256): The amount of tokens to be minted
        # Returns:
        #   None`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
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
              charIndex: { start: 29, end: 57 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 95, end: 113 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 126, end: 152 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 165, end: 180 },
            },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 218, end: 261 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be burned",
              charIndex: { start: 274, end: 324 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 6474, end: 6798 },
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
          charIndex: {
            start: functionCommentScope!.start,
            end: functionCommentScope!.end,
          },
        },
      },
    ];

    const parsingResult = CairoParser.getScopeParsingResult(text, "namespace")![
      scopeNumber
    ];
    assert.deepEqual(parsingResult, parsingOutput[0], "failed to parse");

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
      { desc: "Burns tokens from an account" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "account(felt): The address of the recipient" },
      { explicitArgs: "amount(Uint256): The amount of tokens to be burned" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");

    var functionCommentParsingResult = "";
    for (var i = charIndex!.start; i < charIndex!.end; i++) {
      functionCommentParsingResult += text.at(i);
    }

    const functionCommentTarget = `
        # Desc:
        #   Burns tokens from an account
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   account(felt): The address of the recipient
        #   amount(Uint256): The amount of tokens to be burned`;

    assert.equal(
      functionCommentTarget,
      functionCommentParsingResult,
      "failed to parse"
    );
  });
});
