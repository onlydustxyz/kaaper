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
      assert.equal("# Desc:", commentText[0].trim(), "failed to get comments");
      const isStartNode = functionCommentParser.isStartScope(commentText[0]);
      const isEndNode = functionCommentParser.isEndScope(commentText[0]);
      assert.equal(true, isStartNode, "failed to get desc comment line 0");
      assert.equal(false, isEndNode, "failed to get desc comment line 0");
    }

    if (commentText) {
        assert.equal("#   Initialize the contract", commentText[1].trim(), "failed to get comments");
        const isStartNode = functionCommentParser.isStartScope(commentText[1]);
        const isEndNode = functionCommentParser.isEndScope(commentText[1]);
        assert.equal(false, isStartNode, "failed to get desc comment line 1");
        assert.equal(false, isEndNode, "failed to get desc comment line 1");
      }
  });

//   test("get implicit args comments", () => {
//     const pathFile = path.resolve(
//       __dirname,
//       "../../../test_assets/ERC20.cairo"
//     );
//     let constructorParser = new CairoParser(pathFile, "constructor");
//     const attributeScope = constructorParser.parseAttribute();
//     const comments = constructorParser.getComments(attributeScope);
//     if (comments) {
//       assert.equal(
//         "# Implicit args:",
//         comments[2].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[2],
//         "Implicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[2],
//         "Implicit args"
//       );
//       assert.equal(true, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   syscall_ptr(felt*)",
//         comments[3].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[3],
//         "Implicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[3],
//         "Implicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   pedersen_ptr(HashBuiltin)",
//         comments[4].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[4],
//         "Implicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[4],
//         "Implicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   range_check_ptr",
//         comments[5].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[5],
//         "Implicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[5],
//         "Implicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "# Explicit args:",
//         comments[6].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[6],
//         "Implicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[6],
//         "Implicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(true, isEndNode, "failed to get comments");
//     }
//   });

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
//       const isStartNode = constructorParser.isStartNode(
//         comments[6],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[6],
//         "Explicit args"
//       );
//       assert.equal(true, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   name(felt): the address of the ERC20 sender",
//         comments[7].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[7],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[7],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   symbol(felt): the address of the ERC20 recipient",
//         comments[8].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[8],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[8],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   decimals(uint256): floating point of the token",
//         comments[9].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[9],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[9],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   initial_supply(uint256): amount of ERC20 transfer",
//         comments[10].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[10],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[10],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal(
//         "#   recipient(felt): amount of ERC20 transfer",
//         comments[11].trim(),
//         "failed to get comments"
//       );
//       const isStartNode = constructorParser.isStartNode(
//         comments[11],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[11],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal("# Returns:", comments[12].trim(), "failed to get comments");
//       const isStartNode = constructorParser.isStartNode(
//         comments[12],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[12],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(true, isEndNode, "failed to get comments");
//     }

//     if (comments) {
//       assert.equal("#   None", comments[13].trim(), "failed to get comments");
//       const isStartNode = constructorParser.isStartNode(
//         comments[13],
//         "Explicit args"
//       );
//       const isEndNode = constructorParser.isEndNode(
//         comments[13],
//         "Explicit args"
//       );
//       assert.equal(false, isStartNode, "failed to get comments");
//       assert.equal(false, isEndNode, "failed to get comments");
//     }
//   });
});
