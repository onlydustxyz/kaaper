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

suite("integration-test: view", () => {
  test("0", () => {
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
          functionScopeLines![0]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![0]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![0]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![0]
          ),
          returns: functionSignatureParser.getReturns(functionScopeLines![0]),
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
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

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
          functionScopeLines![line]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![line]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![line]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![line]
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![line]
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
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 2;
    const commentLines = CairoParser.parseCommentLines(
      functionScopeLines![line]
    )!.text;
    console.log(commentLines);
    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

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
          functionScopeLines![line]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![line]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![line]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![line]
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![line]
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
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 3;
    const commentLines = CairoParser.parseCommentLines(
      functionScopeLines![line]
    )!.text;
    console.log(commentLines);
    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

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
          functionScopeLines![line]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![line]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![line]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![line]
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![line]
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
    const functionScopeLines = CairoParser.parseFunctionScope(text, "view");

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();

    // Comment parsing
    // parse comment lines
    const line = 4;
    const commentLines = CairoParser.parseCommentLines(
      functionScopeLines![line]
    )!.text;
    console.log(commentLines);
    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

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
          functionScopeLines![line]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![line]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![line]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![line]
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![line]
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

  test("5", () => {
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
    const line = 5;
    const commentLines = CairoParser.parseCommentLines(
      functionScopeLines![line]
    )!.text;
    console.log(commentLines);
    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser =
      new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser =
      new FunctionCommentExplicitArgsParser();
    const functionCommentReturnsParser = new FunctionCommentReturnsParser();
    const functionCommentRaisesParser = new FunctionCommentRaisesParser();

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "allowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
          ],
          returns: [{ name: "remaining", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the amount of remaining tokens allowed to be spent by the spender",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of owner of the tokens",
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of spender (delegated account) of the tokens",
            },
          ],
          returns: [
            {
              name: "remaining",
              type: "Uint256",
              desc: "the amount of remaining tokens allowed to be spent by the spender",
            },
          ],
          raises: null,
        },
      },
    ];

    var parsingOutput = [
      {
        attributeName: functionSignatureParser.getAttributeName(
          functionScopeLines![line]
        ),
        functionName: functionSignatureParser.getFunctionName(
          functionScopeLines![line]
        ),
        functionSignature: {
          implicitArgs: functionSignatureParser.getImplicitArgs(
            functionScopeLines![line]
          ),
          explicitArgs: functionSignatureParser.getExplicitArgs(
            functionScopeLines![line]
          ),
          returns: functionSignatureParser.getReturns(
            functionScopeLines![line]
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
