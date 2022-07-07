import * as assert from "assert";
import * as path from "path";
import FunctionCommentRaisesParser from "../../../../lib/parser/function-comment/raises"
import CairoParser from "../../../../lib/main";

suite("function-comment: constructor: raises", () => {
  test("parse line 14", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);

    const raisesParser = new FunctionCommentRaisesParser();

    const line = 14;
    assert.equal("# Raises:", commentText![line].trim(), `check line ${line}`);
    raisesParser.setStartScope(commentText![line]);
    
    assert.equal(commentText![line], raisesParser.startLine);

    const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(false, raisesParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });


  test("parse line 15", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const raisesParser = new FunctionCommentRaisesParser();
    raisesParser.setStartScope(commentText![14]);

    const line = 15;
    assert.equal("#   decimals: decimals exceed 2^8", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(true, raisesParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "decimals", type: "", desc: "decimals exceed 2^8"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse line 16", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const raisesParser = new FunctionCommentRaisesParser();
    raisesParser.setStartScope(commentText![14]);

    const line = 16;
    assert.equal("#   recipient: cannot mint to the zero address", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(true, raisesParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "recipient", type: "", desc: "cannot mint to the zero address"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse line 17", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const raisesParser = new FunctionCommentRaisesParser();
    raisesParser.setStartScope(commentText![14]);

    const line = 17;
    assert.equal("#   initial_supply: not valid Uint256", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(true, raisesParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "initial_supply", type: "", desc: "not valid Uint256"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

  test("parse line 18", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const raisesParser = new FunctionCommentRaisesParser();
    raisesParser.setStartScope(commentText![14]);

    const line = 18;
    assert.equal("#   initial_supply: mint overflow", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], raisesParser.startLine);
    const isEndScope = raisesParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(true, raisesParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "initial_supply", type: "", desc: "mint overflow"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
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
    const raisesParser = new FunctionCommentRaisesParser();

    const targetLineParsing = [
      {name: "decimals", type: "", desc: "decimals exceed 2^8"},
      {name: "recipient", type: "", desc: "cannot mint to the zero address"},
      {name: "initial_supply", type: "", desc: "not valid Uint256"},
      {name: "initial_supply", type: "", desc: "mint overflow"}
    ]
    const resultLineParsing = raisesParser.parseCommentLines(commentText!);
    
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing on whole scope`);
  })

});
