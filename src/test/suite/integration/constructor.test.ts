import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/main";
import FunctionCommentDescParser from "../../../lib/parser/function-comment/desc";
import FunctionSignatureRegexParser from "../../../lib/parser/function-signature/regex";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment/implicit-args";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment/returns";
import FunctionCommentRaisesParser from "../../../lib/parser/function-comment/raises";

test("parse whole scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );
    const functionScopeLines = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentLines = CairoParser.parseCommentLines(functionScopeLines);

    // Function signature parsing
    const functionSignatureParser = new FunctionSignatureRegexParser();
    const attributeName =
      functionSignatureParser.getAttributeName(functionScopeLines);
    const functionName =
      functionSignatureParser.getFunctionName(functionScopeLines);
    const functionSignatureImplicitArgsResult =
      functionSignatureParser.getImplicitArgs(functionScopeLines);
    const functionSignatureExplicitArgsResult = functionSignatureParser.getExplicitArgs(functionScopeLines);

    assert.equal(attributeName, "constructor", "failed to get attribute name");
    assert.equal(functionName, "constructor", "failed to get function name");
    

    const functionSignatureImplicitArgsTarget = [
        { name: "syscall_ptr", type: "felt*" },
        { name: "pedersen_ptr", type: "HashBuiltin*" },
        { name: "range_check_ptr", type: "" },
      ];

    const functionSignatureExplicitArgsTarget = [
    { name: "name", type: "felt" },
    { name: "symbol", type: "felt" },
    { name: "decimals", type: "Uint256" },
    { name: "initial_supply", type: "Uint256" },
    { name: "recipient", type: "felt" },
    ];

    assert.deepEqual(functionSignatureImplicitArgsTarget, functionSignatureImplicitArgsResult, "failed to get implicit args");
    assert.deepEqual(functionSignatureExplicitArgsTarget, functionSignatureExplicitArgsResult, "failed to get explicit args");


    // Comment parsing
    const functionCommentDescParser = new FunctionCommentDescParser();
    const functionCommentImplicitArgsParser = new FunctionCommentImplicitArgsParser();
    const functionCommentExplicitArgsParser = new FunctionCommentExplicitArgsParser()
    const functionCommentReturnsParser = new FunctionCommentReturnsParser()
    const functionCommentRaisesParser = new FunctionCommentRaisesParser()


    const functionCommentDescParserResult = functionCommentDescParser.parseCommentLines(commentLines!);
    const functionCommentImplicitArgsResult = functionCommentImplicitArgsParser.parseCommentLines(commentLines!);
    const functionCommentExplicitArgsResult = functionCommentExplicitArgsParser.parseCommentLines(commentLines!);
    const functionCommentReturnsResult = functionCommentReturnsParser.parseCommentLines(commentLines!);
    const functionCommentRaisesResult = functionCommentRaisesParser.parseCommentLines(commentLines!);

    const functionCommentDescParserTarget = [{name: "", type: "", desc: "Initialize the contract"}];
    const functionCommentImplicitArgsParserTarget = [
      {name: "syscall_ptr", type: "felt*", desc: ""}, 
      {name: "pedersen_ptr", type: "HashBuiltin", desc: ""},
      {name: "range_check_ptr", type: "", desc: ""}
    ];
    const functionCommentExplicitArgsParserTarget = [
      {name: "name", type: "felt", desc: "name of the token"},
      {name: "symbol", type: "felt", desc: "symbol of the token"},
      {name: "decimals", type: "Uint256", desc: "floating point of the token"},
      {name: "initial_supply", type: "Uint256", desc: "amount of initial supply of the token"},
      {name: "recipient", type: "felt", desc: "the address of recipient of the initial supply"}
    ]
    const functionCommentReturnsParserTarget =  [
      {name: "", type: "", desc: "None"},
    ]

    const functionCommentRaisesParserTarget = [
      {name: "decimals", type: "", desc: "decimals exceed 2^8"},
      {name: "recipient", type: "", desc: "cannot mint to the zero address"},
      {name: "initial_supply", type: "", desc: "not valid Uint256"},
      {name: "initial_supply", type: "", desc: "mint overflow"}
    ]

    assert.deepEqual(functionCommentDescParserTarget, functionCommentDescParserResult, "failed to get desc");
    assert.deepEqual(functionCommentImplicitArgsParserTarget, functionCommentImplicitArgsResult, "failed to get implicit args");
    assert.deepEqual(functionCommentExplicitArgsParserTarget, functionCommentExplicitArgsResult, "failed to get explicit args");
    assert.deepEqual(functionCommentReturnsParserTarget, functionCommentReturnsResult, "failed to get returns");
    assert.deepEqual(functionCommentRaisesParserTarget, functionCommentRaisesResult, "failed to get raises");

  });