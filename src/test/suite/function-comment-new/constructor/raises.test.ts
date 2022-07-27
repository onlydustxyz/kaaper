import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentRaisesParser from "../../../../lib/parser/function-comment-new/raises";
import CairoParser from "../../../../lib/CairoParser";

suite("function-comment: constructor: raises", () => {
  test("parse line 14", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");

    const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(
      text,
      "constructor"
    );
    const functionScope = functionScopes![0];
    const functionCommentScope =
      CairoParser.parseCommentLinesWithMatchAll(functionScope)!;

    const functionCommentText: string = functionCommentScope!.text.join("");
    const raisesParser = new FunctionCommentRaisesParser(functionCommentText);

    const line = 14;
    const functionCommentLine = functionCommentScope!.text[line];

    assert.equal("# Raises:", functionCommentLine.trim(), `check line ${line}`);
    raisesParser.setStartScope(functionCommentLine);

    assert.equal(functionCommentLine, raisesParser.startLine);

    const resultLineParsing =
      raisesParser.parseCommentLine(functionCommentLine);

    assert.equal(
      true,
      raisesParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(
      false,
      raisesParser.isEndScope(functionCommentLine),
      `failed to get end scope line ${line}`
    );
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  // test("parse line 15", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionCommentScope = CairoParser.parseFunctionScope(text, "constructor");
  //   const commentText = CairoParser.parseCommentLines(functionCommentScope![0])!.text;
  //   const raisesParser = new FunctionCommentRaisesParser();
  //   raisesParser.setStartScope(commentText![14]);

  //   const line = 15;
  //   assert.equal(
  //     "#   decimals: decimals exceed 2^8",
  //     commentText![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(commentText![line], raisesParser.startLine);
  //   const isEndScope = raisesParser.isEndScope(commentText![line]);
  //   assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

  //   assert.equal(
  //     true,
  //     raisesParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);

  //   const targetLineParsing = {
  //     name: "decimals",
  //     type: "",
  //     desc: "decimals exceed 2^8",
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );
  // });

  // test("parse line 16", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionCommentScope = CairoParser.parseFunctionScope(text, "constructor");
  //   const commentText = CairoParser.parseCommentLines(functionCommentScope![0])!.text;
  //   const raisesParser = new FunctionCommentRaisesParser();
  //   raisesParser.setStartScope(commentText![14]);

  //   const line = 16;
  //   assert.equal(
  //     "#   recipient: cannot mint to the zero address",
  //     commentText![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(commentText![line], raisesParser.startLine);
  //   const isEndScope = raisesParser.isEndScope(commentText![line]);
  //   assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

  //   assert.equal(
  //     true,
  //     raisesParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);

  //   const targetLineParsing = {
  //     name: "recipient",
  //     type: "",
  //     desc: "cannot mint to the zero address",
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );
  // });

  // test("parse line 17", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionCommentScope = CairoParser.parseFunctionScope(text, "constructor");
  //   const commentText = CairoParser.parseCommentLines(functionCommentScope![0])!.text;
  //   const raisesParser = new FunctionCommentRaisesParser();
  //   raisesParser.setStartScope(commentText![14]);

  //   const line = 17;
  //   assert.equal(
  //     "#   initial_supply: not valid Uint256",
  //     commentText![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(commentText![line], raisesParser.startLine);
  //   const isEndScope = raisesParser.isEndScope(commentText![line]);
  //   assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

  //   assert.equal(
  //     true,
  //     raisesParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);

  //   const targetLineParsing = {
  //     name: "initial_supply",
  //     type: "",
  //     desc: "not valid Uint256",
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );
  // });

  // test("parse line 18", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionCommentScope = CairoParser.parseFunctionScope(text, "constructor");
  //   const commentText = CairoParser.parseCommentLines(functionCommentScope![0])!.text;
  //   const raisesParser = new FunctionCommentRaisesParser();
  //   raisesParser.setStartScope(commentText![14]);

  //   const line = 18;
  //   assert.equal(
  //     "#   initial_supply: mint overflow",
  //     commentText![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(commentText![line], raisesParser.startLine);
  //   const isEndScope = raisesParser.isEndScope(commentText![line]);
  //   assert.equal(false, isEndScope, `failed to get end scope line ${line}`);

  //   assert.equal(
  //     true,
  //     raisesParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = raisesParser.parseCommentLine(commentText![line]);

  //   const targetLineParsing = {
  //     name: "initial_supply",
  //     type: "",
  //     desc: "mint overflow",
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );
  // });

  // test("parse whole scope", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionCommentScope = CairoParser.parseFunctionScope(text, "constructor");
  //   const commentText = CairoParser.parseCommentLines(functionCommentScope![0])!.text;
  //   const raisesParser = new FunctionCommentRaisesParser();

  //   const targetLineParsing = [
  //     { name: "decimals", type: "", desc: "decimals exceed 2^8" },
  //     { name: "recipient", type: "", desc: "cannot mint to the zero address" },
  //     { name: "initial_supply", type: "", desc: "not valid Uint256" },
  //     { name: "initial_supply", type: "", desc: "mint overflow" },
  //   ];
  //   const resultLineParsing = raisesParser.parseCommentLines(commentText!);

  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing on whole scope`
  //   );
  // });
});
