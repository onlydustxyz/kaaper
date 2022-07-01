import * as assert from "assert";
import * as path from "path";
import FunctionCommentParser from "../../../lib/parser/function-comment";
import CairoParser from "../../../lib/main";

suite("function-comment: constructor", () => {
  test("get desc comments", () => {
    const pathFile = path.resolve(
        __dirname,
        "../../../../test_assets/ERC20.cairo"
    );
      const constructorParser = new CairoParser(pathFile, "constructor");
      const functionText = constructorParser.parseFunctionScope()
      const commentText = constructorParser.parseComments(functionText);
      const functionCommentParser = new FunctionCommentParser('Desc');

    if (commentText) {
      assert.equal("# Desc:", commentText[0].trim(), "check line 0");
      const isStartScope = functionCommentParser.isStartScope(commentText[0]);
      const isEndScope = functionCommentParser.isEndScope(commentText[0]);
      assert.equal(true, isStartScope, "failed to get desc comment line 0");
      assert.equal(false, isEndScope, "failed to get desc comment line 0");
    }

    if (commentText) {
        assert.equal("#   Initialize the contract", commentText[1].trim(), "check line 1");
        const isStartScope = functionCommentParser.isStartScope(commentText[1]);
        const isEndScope = functionCommentParser.isEndScope(commentText[1]);
        assert.equal(false, isStartScope, "failed to get desc comment line 1");
        assert.equal(false, isEndScope, "failed to get desc comment line 1");
      }

    if (commentText) {
        assert.equal("# Implicit args:", commentText[2].trim(), "check line 2");
        const isStartScope = functionCommentParser.isStartScope(commentText[2]);
        const isEndScope = functionCommentParser.isEndScope(commentText[2]);
        assert.equal(false, isStartScope, "failed to get desc comment line 2");
        assert.equal(true, isEndScope, "failed to get desc comment line 2");
      }
  });

  test("get implicit args comments", () => {
    const pathFile = path.resolve(
        __dirname,
        "../../../../test_assets/ERC20.cairo"
    );
      const constructorParser = new CairoParser(pathFile, "constructor");
      const functionText = constructorParser.parseFunctionScope()
      const commentText = constructorParser.parseComments(functionText);
      const functionCommentParser = new FunctionCommentParser('Implicit args');

      if (commentText) {
        assert.equal("# Implicit args:", commentText[2].trim(), "check line 2");
        const isStartScope = functionCommentParser.isStartScope(commentText[2]);
        const isEndScope = functionCommentParser.isEndScope(commentText[2]);
        assert.equal(true, isStartScope, "failed to get desc comment line 2");
        assert.equal(false, isEndScope, "failed to get desc comment line 2");
      }

      if (commentText) {
        assert.equal("#   syscall_ptr(felt*)", commentText[3].trim(), "check line 3");
        const isStartScope = functionCommentParser.isStartScope(commentText[3]);
        const isEndScope = functionCommentParser.isEndScope(commentText[3]);
        assert.equal(false, isStartScope, "failed to get desc comment line 3");
        assert.equal(false, isEndScope, "failed to get desc comment line 3");
      }
  });

//   test("get explicit args comments", () => {
//     const pathFile = path.resolve(
//       __dirname,
//       "../../../test_assets/ERC20.cairo"
//     );
//     let constructorParser = new CairoParser(pathFile, "constructor");
//     const attributeScope = constructorParser.parseAttribute();
//     const comments = constructorParser.getComments(attributeScope);
//     if (comments) {
//       assert.equal(
//         "# Explicit args:",
//         comments[6].trim(),
//         "failed to get comments"
//       );
//       const isStartScope = constructorParser.isStartScope(
//         comments[6],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[6],
//         "Explicit args"
//       );
//       assert.equal(true, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   name(felt): the address of the ERC20 sender",
//         comments[7].trim(),
//         "failed to get comments"
//       );
//       const isStartScope = constructorParser.isStartScope(
//         comments[7],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[7],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   symbol(felt): the address of the ERC20 recipient",
//         comments[8].trim(),
//         "failed to get comments"
//       );
//       const isStartScope = constructorParser.isStartScope(
//         comments[8],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[8],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   decimals(uint256): floating point of the token",
//         comments[9].trim(),
//         "failed to get comments"
//       );
//       const isStartScope = constructorParser.isStartScope(
//         comments[9],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[9],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   initial_supply(uint256): amount of ERC20 transfer",
//         comments[10].trim(),
//         "failed to get comments"
//       );
//       const isStartScope = constructorParser.isStartScope(
//         comments[10],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[10],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   recipient(felt): amount of ERC20 transfer",
//         comments[11].trim(),
//         "failed to get comments"
//       );
//       const isStartScope = constructorParser.isStartScope(
//         comments[11],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[11],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal("# Returns:", comments[12].trim(), "failed to get comments");
//       const isStartScope = constructorParser.isStartScope(
//         comments[12],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[12],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(true, isEndScope, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal("#   None", comments[13].trim(), "failed to get comments");
//       const isStartScope = constructorParser.isStartScope(
//         comments[13],
//         "Explicit args"
//       );
//       const isEndScope = constructorParser.isEndScope(
//         comments[13],
//         "Explicit args"
//       );
//       assert.equal(false, isStartScope, "failed to get comments");
//       assert.equal(false, isEndScope, "failed to get comments");
//     }
//   });
});
