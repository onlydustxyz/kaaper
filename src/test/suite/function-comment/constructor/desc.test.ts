import * as assert from "assert";
import * as path from "path";
import FunctionCommentDescParser from "../../../../lib/parser/function-comment/desc";
import CairoParser from "../../../../lib/main";

suite("function-comment: constructor: desc", () => {
  test("parse line 0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);

    const descParser = new FunctionCommentDescParser();

    const line = 0;
    assert.equal("# Desc:", commentText![line].trim(), `check line ${line}`);
    descParser.setStartScope(commentText![line]);

    const resultLineParsing = descParser.parseCommentLine(commentText![line]);
    const isEndScope = descParser.isEndScope(commentText![line]);

    assert.equal(
      true,
      descParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse line 1", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const descParser = new FunctionCommentDescParser();
    descParser.setStartScope(commentText![0]);

    const line = 1;
    assert.equal(
      "#   Initialize the contract",
      commentText![line].trim(),
      `check line ${line}`
    );

    assert.equal("# Desc:", descParser.startLine);
    assert.notEqual(line, descParser.startLine);

    assert.equal(
      true,
      descParser.runningScope,
      `failed to get running scope line ${line}`
    );

    const isEndScope = descParser.isEndScope(commentText![line]);
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

    const resultLineParsing = descParser.parseCommentLine(commentText![line]);

    const targetLineParsing = {
      name: "",
      type: "",
      desc: "Initialize the contract",
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse line 2", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);
    const descParser = new FunctionCommentDescParser();
    descParser.setStartScope(commentText![0]);

    const line = 2;
    assert.equal(
      "# Implicit args:",
      commentText![line].trim(),
      `check line ${line}`
    );

    assert.equal("# Desc:", descParser.startLine);
    assert.notEqual(line, descParser.startLine);
    const isEndScope = descParser.isEndScope(commentText![line]);
    assert.equal(true, isEndScope, `failed to get end scope line ${line}`);

    descParser.setEndScope(commentText![line]);

    assert.equal(
      false,
      descParser.runningScope,
      `failed to get running scope line ${line}`
    );

    const resultLineParsing = descParser.parseCommentLine(commentText![line]);

    assert.deepEqual(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse whole comment", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../test_assets/ERC20.cairo"
    );
    const functionText = CairoParser.parseFunctionScope(
      pathFile,
      "constructor"
    );
    const commentText = CairoParser.parseCommentLines(functionText);

    const descParser = new FunctionCommentDescParser();

    const resultLineParsing = descParser.parseCommentLines(commentText!);

    const targetLineParsing = [{name: "", type: "", desc: "Initialize the contract"}];
    
    assert.deepEqual(targetLineParsing, resultLineParsing, "failed to get resultLineParsing");
  });
});
