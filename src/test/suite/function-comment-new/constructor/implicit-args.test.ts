import * as assert from "assert";
import * as path from "path";
import * as fs from "fs";
import FunctionCommentImplicitArgsParser from "../../../../lib/parser/function-comment-new/implicit-args";
import CairoParser from "../../../../lib/CairoParser";

suite("function-comment: constructor: implicit-args", () => {
  test("parse line 2", () => {
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
      CairoParser.parseCommentLinesWithMatchAll(functionScope)!.text;
    const functionCommentText = functionCommentScope!.join("");
    const implicitArgsParser = new FunctionCommentImplicitArgsParser(
      functionCommentText
    );

    const line = 2;
    assert.equal(
      "# Implicit args:",
      functionCommentScope![line].trim(),
      `check line ${line}`
    );
    implicitArgsParser.setStartScope(functionCommentScope![line]);

    assert.equal(functionCommentScope![line], implicitArgsParser.startLine);

    const resultLineParsing = implicitArgsParser.parseCommentLine(
      functionCommentScope![line]
    );
    const isEndScope = implicitArgsParser.isEndScope(
      functionCommentScope![line]
    );

    assert.equal(
      true,
      implicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    assert.equal(false, isEndScope, `failed to get end scope line ${line}`);
    assert.equal(
      null,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );
  });

  test("parse line 3", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(
      text,
      "constructor"
    );
    const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(
      functionScopes![0]
    )!.text;
    const functionCommentText = functionCommentScope!.join("");
    const implicitArgsParser = new FunctionCommentImplicitArgsParser(
      functionCommentText
    );
    implicitArgsParser.setStartScope(functionCommentScope![2]);

    const line = 3;
    assert.equal(
      "#   syscall_ptr(felt*)",
      functionCommentScope![line].trim(),
      `check line ${line}`
    );
    assert.notEqual(functionCommentScope![line], implicitArgsParser.startLine);

    assert.equal(
      true,
      implicitArgsParser.runningScope,
      `failed to get running scope line ${line}`
    );
    const resultLineParsing = implicitArgsParser.parseCommentLine(
      functionCommentScope![line]
    );

    const targetLineParsing = {
      name: "syscall_ptr",
      type: "felt*",
      desc: "",
      charIndex: { start: 70, end: 97 },
    };
    assert.deepEqual(
      targetLineParsing,
      resultLineParsing,
      `failed to get resultLineParsing line ${line}`
    );

    assert.equal(
      false,
      implicitArgsParser.isEndScope(functionCommentScope![line]),
      `failed to get end scope line ${line}`
    );
  });

  // test("parse line 4", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const implicitArgsParser = new FunctionCommentImplicitArgsParser();
  //   implicitArgsParser.setStartScope(functionCommentScope![2]);

  //   const line = 4;
  //   assert.equal(
  //     "#   pedersen_ptr(HashBuiltin*)",
  //     functionCommentScope![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(functionCommentScope![line], implicitArgsParser.startLine);

  //   assert.equal(
  //     true,
  //     implicitArgsParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = implicitArgsParser.parseCommentLine(
  //     functionCommentScope![line]
  //   );

  //   const targetLineParsing = {
  //     name: "pedersen_ptr",
  //     type: "HashBuiltin*",
  //     desc: "",
  //   };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );

  //   assert.equal(
  //     false,
  //     implicitArgsParser.isEndScope(functionCommentScope![line]),
  //     `failed to get end scope line ${line}`
  //   );
  // });

  // test("parse line 5", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const implicitArgsParser = new FunctionCommentImplicitArgsParser();
  //   implicitArgsParser.setStartScope(functionCommentScope![2]);

  //   const line = 5;
  //   assert.equal(
  //     "#   range_check_ptr",
  //     functionCommentScope![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(functionCommentScope![line], implicitArgsParser.startLine);
  //   assert.equal(
  //     false,
  //     implicitArgsParser.isEndScope(functionCommentScope![line]),
  //     `failed to get end scope line ${line}`
  //   );

  //   assert.equal(
  //     true,
  //     implicitArgsParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = implicitArgsParser.parseCommentLine(
  //     functionCommentScope![line]
  //   );

  //   const targetLineParsing = { name: "range_check_ptr", type: "", desc: "" };
  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing line ${line}`
  //   );

  //   assert.equal(
  //     false,
  //     implicitArgsParser.isEndScope(functionCommentScope![line]),
  //     `failed to get end scope line ${line}`
  //   );
  // });

  // test("parse line 6", () => {
  //   const pathFile = path.resolve(
  //     __dirname,
  //     "../../../../../testContracts/ERC20Compliant/ERC20.cairo"
  //   );
  //   const text = fs.readFileSync(pathFile, "utf8");
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const implicitArgsParser = new FunctionCommentImplicitArgsParser();
  //   implicitArgsParser.setStartScope(functionCommentScope![2]);

  //   const line = 6;
  //   assert.equal(
  //     false,
  //     implicitArgsParser.isStartScope(functionCommentScope![line]),
  //     `check line ${line}`
  //   );
  //   assert.equal(
  //     true,
  //     implicitArgsParser.isEndScope(functionCommentScope![line]),
  //     `failed to get end scope line ${line}`
  //   );

  //   assert.equal(
  //     "# Explicit args:",
  //     functionCommentScope![line].trim(),
  //     `check line ${line}`
  //   );
  //   assert.notEqual(functionCommentScope![line], implicitArgsParser.startLine);

  //   implicitArgsParser.setEndScope(functionCommentScope![line]);

  //   assert.equal(
  //     false,
  //     implicitArgsParser.runningScope,
  //     `failed to get running scope line ${line}`
  //   );
  //   const resultLineParsing = implicitArgsParser.parseCommentLine(
  //     functionCommentScope![line]
  //   );

  //   assert.deepEqual(
  //     null,
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
  //   const functionScopes = CairoParser.parseFunctionScopeWithMatchAll(text, "constructor");
  //   const functionCommentScope = CairoParser.parseCommentLinesWithMatchAll(functionScopes![0])!.text;
  //   const implicitArgsParser = new FunctionCommentImplicitArgsParser();
  //   const targetLineParsing = [
  //     { name: "syscall_ptr", type: "felt*", desc: "" },
  //     { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //     { name: "range_check_ptr", type: "", desc: "" },
  //   ];

  //   const resultLineParsing = implicitArgsParser.parseCommentLinesWithMatchAll(
  //     functionCommentScope!
  //   );

  //   assert.deepEqual(
  //     targetLineParsing,
  //     resultLineParsing,
  //     `failed to get resultLineParsing on whole scope`
  //   );
  // });
});
