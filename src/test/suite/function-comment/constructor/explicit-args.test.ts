import * as assert from "assert";
import * as path from "path";
import FunctionCommentExplicitArgsParser from "../../../../lib/parser/function-comment/explicit-args"
import CairoParser from "../../../../lib/main";

suite("function-comment: constructor: explicit-args", () => {
  test("parse line 6", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);

    const explicitArgsParser = new FunctionCommentExplicitArgsParser();

    const line = 6;
    assert.equal("# Explicit args:", commentText![line].trim(), `check line ${line}`);
    explicitArgsParser.setStartScope(commentText![line]);
    
    assert.equal(commentText![line], explicitArgsParser.startLine);

    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);

    assert.equal(
      true,
      explicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(false, explicitArgsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });


  test("parse line 7", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();
    explicitArgsParser.setStartScope(commentText![6]);

    const line = 7;
    assert.equal("#   name(felt): name of the token", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], explicitArgsParser.startLine);
    const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(true, explicitArgsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "name", type: "felt", desc: "name of the token"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
    
  })

  test("parse line 8", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();
    explicitArgsParser.setStartScope(commentText![6]);

    const line = 8;
    assert.equal("#   symbol(felt): symbol of the token", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], explicitArgsParser.startLine);
    assert.equal(false, explicitArgsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);

    assert.equal(true, explicitArgsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "symbol", type: "felt", desc: "symbol of the token"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
    
  })

  

  test("parse line 9", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();
    explicitArgsParser.setStartScope(commentText![6]);

    const line = 9;
    assert.equal("#   decimals(Uint256): floating point of the token", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], explicitArgsParser.startLine);
    assert.equal(false, explicitArgsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);


    assert.equal(true, explicitArgsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "decimals", type: "Uint256", desc: "floating point of the token"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse line 10", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();
    explicitArgsParser.setStartScope(commentText![6]);

    const line = 10;
    assert.equal("#   initial_supply(Uint256): amount of initial supply of the token", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], explicitArgsParser.startLine);
    assert.equal(false, explicitArgsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);

    assert.equal(true, explicitArgsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "initial_supply", type: "Uint256", desc: "amount of initial supply of the token"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse line 11", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();
    explicitArgsParser.setStartScope(commentText![6]);

    const line = 11;
    assert.equal("#   recipient(felt): the address of recipient of the initial supply", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], explicitArgsParser.startLine);
    assert.equal(false, explicitArgsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);

    assert.equal(true, explicitArgsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "recipient", type: "felt", desc: "the address of recipient of the initial supply"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse line 12", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();
    explicitArgsParser.setStartScope(commentText![6]);

    const line = 12;
    assert.equal("# Returns:", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], explicitArgsParser.startLine);
    assert.equal(true, explicitArgsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);
    explicitArgsParser.setEndScope(commentText![line]);

    assert.equal(false, explicitArgsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = explicitArgsParser.parseCommentLine(commentText![line]);
    
    assert.deepEqual(null, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse whole scope", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();

    const targetLineParsing = [
      {name: "name", type: "felt", desc: "name of the token"},
      {name: "symbol", type: "felt", desc: "symbol of the token"},
      {name: "decimals", type: "Uint256", desc: "floating point of the token"},
      {name: "initial_supply", type: "Uint256", desc: "amount of initial supply of the token"},
      {name: "recipient", type: "felt", desc: "the address of recipient of the initial supply"}

    ]
    const resultLineParsing = explicitArgsParser.parseCommentLines(commentText!);
    
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing on whole scope`);
  })



});
