import * as assert from "assert";
import * as path from "path";
import FunctionCommentReturnsParser from "../../../../lib/parser/function-comment/returns"
import CairoParser from "../../../../lib/main";

suite("function-comment: constructor: returns", () => {
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

    const returnsParser = new FunctionCommentReturnsParser();

    const line = 12;
    assert.equal("# Returns:", commentText![line].trim(), `check line ${line}`);
    returnsParser.setStartScope(commentText![line]);
    
    assert.equal(commentText![line], returnsParser.startLine);

    const resultLineParsing = returnsParser.parseCommentLine(commentText![line]);

    assert.equal(
      true,
      returnsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(false, returnsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });


  test("parse line 13", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const returnsParser = new FunctionCommentReturnsParser();
    returnsParser.setStartScope(commentText![12]);

    const line = 13;
    assert.equal("#   None", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], returnsParser.startLine);
    const isEndScope = returnsParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    assert.equal(true, returnsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = returnsParser.parseCommentLine(commentText![line]);
    
    const targetLineParsing = {name: "", type: "", desc: "None"};
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing line ${line}`);
  })

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
    const returnsParser = new FunctionCommentReturnsParser();
    returnsParser.setStartScope(commentText![12]);

    const line = 14;
    assert.equal("# Raises:", commentText![line].trim(), `check line ${line}`);
    assert.notEqual(commentText![line], returnsParser.startLine);
    assert.equal(true, returnsParser.isEndScope(commentText![line]), `failed to get end scope line ${line}`);
    returnsParser.setEndScope(commentText![line]);

    assert.equal(false, returnsParser.runningScope, `failed to get running scope line ${line}`);
    const resultLineParsing = returnsParser.parseCommentLine(commentText![line]);
    
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
    const returnsParser = new FunctionCommentReturnsParser();

    const targetLineParsing = [
      {name: "", type: "", desc: "None"},
    ]
    const resultLineParsing = returnsParser.parseCommentLines(commentText!);
    
    assert.deepEqual(targetLineParsing, resultLineParsing, `failed to get resultLineParsing on whole scope`);
  })

});
