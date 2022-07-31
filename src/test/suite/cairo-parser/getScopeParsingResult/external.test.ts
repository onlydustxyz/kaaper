import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import CairoParser from "../../../../lib/CairoParser";
import FunctionCommentDescParser from "../../../../lib/parser/function-comment-new/desc";
import FunctionSignatureRegexParser from "../../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../../lib/parser/function-comment-new/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../../lib/parser/function-comment-new/explicit-args";
import FunctionCommentReturnsParser from "../../../../lib/parser/function-comment-new/returns";
import FunctionCommentRaisesParser from "../../../../lib/parser/function-comment-new/raises";

suite("getScopeParsingResult: external", () => {
  test("should get `5` for the length of function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");
    assert.equal(functionScopes!.length, 5, "failed to parse");
  });

  test("should get `transfer` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

    const functionScope = functionScopes![0];

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const functionCommentScope = CairoParser.parseCommentLines(functionScope)!;

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
        attributeName: "external",
        functionName: "transfer",
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
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer to recipient",
              charIndex: { start: 21, end: 50 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 80, end: 98 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 107, end: 133 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 187, end: 234 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 243, end: 288 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 312, end: 368 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 391, end: 428 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
              charIndex: { start: 437, end: 483 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 492, end: 531 },
            },
          ],
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
      { desc: "Perform transfer to recipient" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "recipient(felt): the address of ERC20 recipient" },
      { explicitArgs: "amount(Uint256): the amount of ERC20 transfer" },
      {
        returns: "success(felt): 1 if transfer was successful, 0 otherwise",
      },
      { raises: "amount: amount is not a valid Uint256" },
      { raises: "recipient: cannot transfer to the zero address" },
      { raises: "amount: transfer amount exceeds balance" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `transferFrom` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

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
        attributeName: "external",
        functionName: "transferFrom",
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
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer from sender to recipient with allowance",
              charIndex: { start: 21, end: 77 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 107, end: 125 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 134, end: 160 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 169, end: 184 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "the address of ERC20 sender",
              charIndex: { start: 214, end: 255 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 264, end: 311 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 320, end: 365 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 389, end: 445 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 468, end: 505 },
            },
            {
              name: "sender",
              type: "",
              desc: "cannot transfer from the zero address",
              charIndex: { start: 514, end: 559 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 568, end: 607 },
            },
          ],
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
        },
      },
    ];

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
          const commentParsing = {
            [key]: char,
          };
          commentParsingResult.push(commentParsing);
        }
      }
    }
    const textTarget = [
      { desc: "Perform transfer from sender to recipient with allowance" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "sender(felt): the address of ERC20 sender" },
      { explicitArgs: "recipient(felt): the address of ERC20 recipient" },
      { explicitArgs: "amount(Uint256): the amount of ERC20 transfer" },
      { returns: "success(felt): 1 if transfer was successful, 0 otherwise" },
      { raises: "amount: amount is not a valid Uint256" },
      { raises: "sender: cannot transfer from the zero address" },
      { raises: "amount: transfer amount exceeds balance" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `approve` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

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
        attributeName: "external",
        functionName: "approve",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Approve spender to spend amount of tokens",
              charIndex: { start: 21, end: 62 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 92, end: 110 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 119, end: 145 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 154, end: 169 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 199, end: 242 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 token to approve",
              charIndex: { start: 251, end: 304 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if approve was successful, 0 otherwise",
              charIndex: { start: 328, end: 383 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 406, end: 443 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot approve to the zero address",
              charIndex: { start: 452, end: 495 },
            },
          ],
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
        },
      },
    ];

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
          const commentParsing = {
            [key]: char,
          };
          commentParsingResult.push(commentParsing);
        }
      }
    }
    const textTarget = [
      { desc: "Approve spender to spend amount of tokens" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "spender(felt): the address of ERC20 spender" },
      { explicitArgs: "amount(Uint256): the amount of ERC20 token to approve" },
      { returns: "success(felt): 1 if approve was successful, 0 otherwise" },
      { raises: "amount: amount is not a valid Uint256" },
      { raises: "spender: cannot approve to the zero address" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `increaseAllowance` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

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
        attributeName: "external",
        functionName: "increaseAllowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "added_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Increase allowance of spender by added_value",
              charIndex: { start: 21, end: 65 },
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
              charIndex: { start: 122, end: 148 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 157, end: 172 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 202, end: 245 },
            },
            {
              name: "added_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to increase allowance",
              charIndex: { start: 254, end: 323 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if increase allowance was successful, 0 otherwise",
              charIndex: { start: 347, end: 413 },
            },
          ],
          raises: [
            {
              name: "added_value",
              type: "",
              desc: "added_value is not a valid Uint256",
              charIndex: { start: 436, end: 483 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot increase allowance to the zero address",
              charIndex: { start: 492, end: 546 },
            },
          ],
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
        },
      },
    ];

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
          const commentParsing = {
            [key]: char,
          };
          commentParsingResult.push(commentParsing);
        }
      }
    }
    const textTarget = [
      { desc: "Increase allowance of spender by added_value" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "spender(felt): the address of ERC20 spender" },
      {
        explicitArgs:
          "added_value(Uint256): the amount of ERC20 token to increase allowance",
      },
      {
        returns:
          "success(felt): 1 if increase allowance was successful, 0 otherwise",
      },
      { raises: "added_value: added_value is not a valid Uint256" },
      { raises: "spender: cannot increase allowance to the zero address" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get `decreaseAllowance` function scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopes = CairoParser.parseFunctionScope(text, "external");

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
        attributeName: "external",
        functionName: "decreaseAllowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "subtracted_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Decrease allowance of spender by subtracted_value",
              charIndex: { start: 21, end: 70 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 100, end: 118 },
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
              charIndex: { start: 162, end: 177 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 207, end: 250 },
            },
            {
              name: "subtracted_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to decrease allowance",
              charIndex: { start: 259, end: 333 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if decrease allowance was successful, 0 otherwise",
              charIndex: { start: 357, end: 423 },
            },
          ],
          raises: [
            {
              name: "subtracted_value",
              type: "",
              desc: "subtracted_value is not a valid Uint256",
              charIndex: { start: 446, end: 503 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot decrease allowance to the zero address",
              charIndex: { start: 512, end: 566 },
            },
          ],
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
        },
      },
    ];

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
          const commentParsing = {
            [key]: char,
          };
          commentParsingResult.push(commentParsing);
        }
      }
    }
    const textTarget = [
      { desc: "Decrease allowance of spender by subtracted_value" },
      { implicitArgs: "syscall_ptr(felt*)" },
      { implicitArgs: "pedersen_ptr(HashBuiltin*)" },
      { implicitArgs: "range_check_ptr" },
      { explicitArgs: "spender(felt): the address of ERC20 spender" },
      {
        explicitArgs:
          "subtracted_value(Uint256): the amount of ERC20 token to decrease allowance",
      },
      {
        returns:
          "success(felt): 1 if decrease allowance was successful, 0 otherwise",
      },
      { raises: "subtracted_value: subtracted_value is not a valid Uint256" },
      { raises: "spender: cannot decrease allowance to the zero address" },
    ];
    assert.deepEqual(textTarget, commentParsingResult, "failed to parse");
  });

  test("should get all `external` function scopes", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const parsingOutput = CairoParser.getScopeParsingResult(text, "external");

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: "transfer",
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
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer to recipient",
              charIndex: { start: 21, end: 50 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 80, end: 98 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 107, end: 133 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 187, end: 234 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 243, end: 288 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 312, end: 368 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 391, end: 428 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
              charIndex: { start: 437, end: 483 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 492, end: 531 },
            },
          ],
          charIndex: { start: 4309, end: 4840 },
        },
      },
      {
        attributeName: "external",
        functionName: "transferFrom",
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
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer from sender to recipient with allowance",
              charIndex: { start: 21, end: 77 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 107, end: 125 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 134, end: 160 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 169, end: 184 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "the address of ERC20 sender",
              charIndex: { start: 214, end: 255 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 264, end: 311 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 320, end: 365 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 389, end: 445 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 468, end: 505 },
            },
            {
              name: "sender",
              type: "",
              desc: "cannot transfer from the zero address",
              charIndex: { start: 514, end: 559 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 568, end: 607 },
            },
          ],
          charIndex: { start: 5074, end: 5681 },
        },
      },
      {
        attributeName: "external",
        functionName: "approve",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Approve spender to spend amount of tokens",
              charIndex: { start: 21, end: 62 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 92, end: 110 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 119, end: 145 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 154, end: 169 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 199, end: 242 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 token to approve",
              charIndex: { start: 251, end: 304 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if approve was successful, 0 otherwise",
              charIndex: { start: 328, end: 383 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 406, end: 443 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot approve to the zero address",
              charIndex: { start: 452, end: 495 },
            },
          ],
          charIndex: { start: 5906, end: 6401 },
        },
      },
      {
        attributeName: "external",
        functionName: "increaseAllowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "added_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Increase allowance of spender by added_value",
              charIndex: { start: 21, end: 65 },
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
              charIndex: { start: 122, end: 148 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 157, end: 172 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 202, end: 245 },
            },
            {
              name: "added_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to increase allowance",
              charIndex: { start: 254, end: 323 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if increase allowance was successful, 0 otherwise",
              charIndex: { start: 347, end: 413 },
            },
          ],
          raises: [
            {
              name: "added_value",
              type: "",
              desc: "added_value is not a valid Uint256",
              charIndex: { start: 436, end: 483 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot increase allowance to the zero address",
              charIndex: { start: 492, end: 546 },
            },
          ],
          charIndex: { start: 6627, end: 7173 },
        },
      },
      {
        attributeName: "external",
        functionName: "decreaseAllowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "subtracted_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Decrease allowance of spender by subtracted_value",
              charIndex: { start: 21, end: 70 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 100, end: 118 },
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
              charIndex: { start: 162, end: 177 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 207, end: 250 },
            },
            {
              name: "subtracted_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to decrease allowance",
              charIndex: { start: 259, end: 333 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if decrease allowance was successful, 0 otherwise",
              charIndex: { start: 357, end: 423 },
            },
          ],
          raises: [
            {
              name: "subtracted_value",
              type: "",
              desc: "subtracted_value is not a valid Uint256",
              charIndex: { start: 446, end: 503 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot decrease allowance to the zero address",
              charIndex: { start: 512, end: 566 },
            },
          ],
          charIndex: { start: 7419, end: 7985 },
        },
      },
    ];

    assert.deepEqual(
      parsingTarget,
      parsingOutput!,
      "failed parsing whole scope"
    );

    {
      const scopeNumber = 0;
      const charIndex = parsingOutput![scopeNumber].functionComment.charIndex;
      var functionCommentParsingResult = "";
      for (var i = charIndex!.start; i < charIndex!.end; i++) {
        functionCommentParsingResult += text.at(i);
      }

      const functionCommentTarget = `
    # Desc:
    #   Perform transfer to recipient
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   recipient(felt): the address of ERC20 recipient
    #   amount(Uint256): the amount of ERC20 transfer
    # Returns:
    #   success(felt): 1 if transfer was successful, 0 otherwise
    # Raises:
    #   amount: amount is not a valid Uint256
    #   recipient: cannot transfer to the zero address
    #   amount: transfer amount exceeds balance`;

      assert.equal(
        functionCommentTarget,
        functionCommentParsingResult,
        "failed to parse"
      );
    }

    {
      const scopeNumber = 1;
      const charIndex = parsingOutput![scopeNumber].functionComment.charIndex;
      var functionCommentParsingResult = "";
      for (var i = charIndex!.start; i < charIndex!.end; i++) {
        functionCommentParsingResult += text.at(i);
      }

      const functionCommentTarget = `
    # Desc:
    #   Perform transfer from sender to recipient with allowance
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   sender(felt): the address of ERC20 sender
    #   recipient(felt): the address of ERC20 recipient
    #   amount(Uint256): the amount of ERC20 transfer
    # Returns:
    #   success(felt): 1 if transfer was successful, 0 otherwise
    # Raises:
    #   amount: amount is not a valid Uint256
    #   sender: cannot transfer from the zero address
    #   amount: transfer amount exceeds balance`;

      assert.equal(
        functionCommentTarget,
        functionCommentParsingResult,
        "failed to parse"
      );
    }

    {
      const scopeNumber = 2;
      const charIndex = parsingOutput![scopeNumber].functionComment.charIndex;
      var functionCommentParsingResult = "";
      for (var i = charIndex!.start; i < charIndex!.end; i++) {
        functionCommentParsingResult += text.at(i);
      }

      const functionCommentTarget = `
    # Desc:
    #   Approve spender to spend amount of tokens
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   spender(felt): the address of ERC20 spender
    #   amount(Uint256): the amount of ERC20 token to approve
    # Returns:
    #   success(felt): 1 if approve was successful, 0 otherwise
    # Raises:
    #   amount: amount is not a valid Uint256
    #   spender: cannot approve to the zero address`;

      assert.equal(
        functionCommentTarget,
        functionCommentParsingResult,
        "failed to parse"
      );
    }

    {
      const scopeNumber = 3;
      const charIndex = parsingOutput![scopeNumber].functionComment.charIndex;
      var functionCommentParsingResult = "";
      for (var i = charIndex!.start; i < charIndex!.end; i++) {
        functionCommentParsingResult += text.at(i);
      }

      const functionCommentTarget = `
    # Desc:
    #   Increase allowance of spender by added_value
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   spender(felt): the address of ERC20 spender
    #   added_value(Uint256): the amount of ERC20 token to increase allowance
    # Returns:
    #   success(felt): 1 if increase allowance was successful, 0 otherwise
    # Raises:
    #   added_value: added_value is not a valid Uint256
    #   spender: cannot increase allowance to the zero address`;

      assert.equal(
        functionCommentTarget,
        functionCommentParsingResult,
        "failed to parse"
      );
    }

    {
      const scopeNumber = 4;
      const charIndex = parsingOutput![scopeNumber].functionComment.charIndex;
      var functionCommentParsingResult = "";
      for (var i = charIndex!.start; i < charIndex!.end; i++) {
        functionCommentParsingResult += text.at(i);
      }

      const functionCommentTarget = `
    # Desc:
    #   Decrease allowance of spender by subtracted_value
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   spender(felt): the address of ERC20 spender
    #   subtracted_value(Uint256): the amount of ERC20 token to decrease allowance
    # Returns:
    #   success(felt): 1 if decrease allowance was successful, 0 otherwise
    # Raises:
    #   subtracted_value: subtracted_value is not a valid Uint256
    #   spender: cannot decrease allowance to the zero address`;

      assert.equal(
        functionCommentTarget,
        functionCommentParsingResult,
        "failed to parse"
      );
    }
  });
});
