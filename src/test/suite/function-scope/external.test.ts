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

suite("integration-test: external", () => {
  test("0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "external");

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
          desc: [{ name: "", type: "", desc: "Perform transfer to recipient" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
            },
          ],
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
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "external");

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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "the address of ERC20 sender",
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "sender",
              type: "",
              desc: "cannot transfer from the zero address",
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
            },
          ],
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
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "external");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 2;
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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 token to approve",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if approve was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "spender",
              type: "",
              desc: "cannot approve to the zero address",
            },
          ],
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

  test("3", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "external");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 3;
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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
            },
            {
              name: "added_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to increase allowance",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if increase allowance was successful, 0 otherwise",
            },
          ],
          raises: [
            {
              name: "added_value",
              type: "",
              desc: "added_value is not a valid Uint256",
            },
            {
              name: "spender",
              type: "",
              desc: "cannot increase allowance to the zero address",
            },
          ],
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

  test("4", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    // parse whole scope
    const functionScopeLines = CairoParser.parseFunctionScope(text, "external");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 4;
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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
            },
            {
              name: "subtracted_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to decrease allowance",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if decrease allowance was successful, 0 otherwise",
            },
          ],
          raises: [
            {
              name: "subtracted_value",
              type: "",
              desc: "subtracted_value is not a valid Uint256",
            },
            {
              name: "spender",
              type: "",
              desc: "cannot decrease allowance to the zero address",
            },
          ],
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
});
