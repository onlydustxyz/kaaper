import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../lib/MainParser";

suite("scope: constructor test", () => {
  test("get attribute name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const attributeName = constructorParser.getAttributeName(attributeScope);
    assert.equal("constructor", attributeName, "failed to get attribute name");
  });
  test("get function name", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const functionName = constructorParser.getFunctionName(attributeScope);
    assert.equal("constructor", functionName, "failed to get function name");
  });

  test("get implicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const implicitArgs = constructorParser.getImplicitArgs(attributeScope);
    const targetArgs = new Map();
    targetArgs.set("syscall_ptr", "felt*");
    targetArgs.set("pedersen_ptr", "HashBuiltin*");
    targetArgs.set("range_check_ptr", "");

    // TODO: refactor this, somehow the two Maps are not equal but if we unpack it they are equal
    const targetArgsIter = targetArgs.values();
    const implicitArgsIter = implicitArgs.values();
    assert.equal(
      targetArgs.size,
      implicitArgs.size,
      "failed to get implicit args"
    );
    for (let i = 0; i < targetArgs.size; i++) {
      assert.equal(
        targetArgsIter.next().value,
        implicitArgsIter.next().value,
        "failed to get explicit args"
      );
    }
  });

  test("get explicit args", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const explicitArgs = constructorParser.getExplicitArgs(attributeScope);
    const targetArgs = new Map();
    targetArgs.set("name", "felt");
    targetArgs.set("symbol", "felt");
    targetArgs.set("decimals", "Uint256");
    targetArgs.set("initial_supply", "Uint256");
    targetArgs.set("recipient", "felt");
    // TODO: refactor this, somehow the two Maps are not equal but if we unpack it they are equal
    const targetArgsIter = targetArgs.values();
    const explicitArgsIter = explicitArgs.values();
    assert.equal(
      targetArgs.size,
      explicitArgs.size,
      "failed to get implicit args"
    );
    for (let i = 0; i < targetArgs.size; i++) {
      assert.equal(
        targetArgsIter.next().value,
        explicitArgsIter.next().value,
        "failed to get explicit args"
      );
    }
  });

  test("get desc comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const comments = constructorParser.getComments(attributeScope);
    if (comments) {
      assert.equal("# Desc:", comments[0].trim(), "failed to get comments");
      const isStartNode = constructorParser.isStartNode(comments[0], "Desc");
      const isEndNode = constructorParser.isEndNode(comments[0], "Desc");
      assert.equal(true, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }
    if (comments) {
      assert.equal(
        "#   Initialize the contract",
        comments[1].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(comments[1], "Desc");
      const isEndNode = constructorParser.isEndNode(comments[1], "Desc");
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }
    if (comments) {
      assert.equal(
        "# Implicit args:",
        comments[2].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(comments[2], "Desc");
      const isEndNode = constructorParser.isEndNode(comments[2], "Desc");
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(true, isEndNode, "failed to get comments");
    }
  });

  test("get implicit args comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const comments = constructorParser.getComments(attributeScope);
    if (comments) {
      assert.equal(
        "# Implicit args:",
        comments[2].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[2],
        "Implicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[2],
        "Implicit args"
      );
      assert.equal(true, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   syscall_ptr(felt*)",
        comments[3].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[3],
        "Implicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[3],
        "Implicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   pedersen_ptr(HashBuiltin)",
        comments[4].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[4],
        "Implicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[4],
        "Implicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   range_check_ptr",
        comments[5].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[5],
        "Implicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[5],
        "Implicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "# Explicit args:",
        comments[6].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[6],
        "Implicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[6],
        "Implicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(true, isEndNode, "failed to get comments");
    }
  });

  test("get explicit args comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../test_assets/ERC20.cairo"
    );
    let constructorParser = new CairoParser(pathFile, "constructor");
    const attributeScope = constructorParser.parseAttribute();
    const comments = constructorParser.getComments(attributeScope);
    if (comments) {
      assert.equal(
        "# Explicit args:",
        comments[6].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[6],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[6],
        "Explicit args"
      );
      assert.equal(true, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   name(felt): the address of the ERC20 sender",
        comments[7].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[7],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[7],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   symbol(felt): the address of the ERC20 recipient",
        comments[8].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[8],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[8],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   decimals(uint256): floating point of the token",
        comments[9].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[9],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[9],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   initial_supply(uint256): amount of ERC20 transfer",
        comments[10].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[10],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[10],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal(
        "#   recipient(felt): amount of ERC20 transfer",
        comments[11].trim(),
        "failed to get comments"
      );
      const isStartNode = constructorParser.isStartNode(
        comments[11],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[11],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal("# Returns:", comments[12].trim(), "failed to get comments");
      const isStartNode = constructorParser.isStartNode(
        comments[12],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[12],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(true, isEndNode, "failed to get comments");
    }

    if (comments) {
      assert.equal("#   None", comments[13].trim(), "failed to get comments");
      const isStartNode = constructorParser.isStartNode(
        comments[13],
        "Explicit args"
      );
      const isEndNode = constructorParser.isEndNode(
        comments[13],
        "Explicit args"
      );
      assert.equal(false, isStartNode, "failed to get comments");
      assert.equal(false, isEndNode, "failed to get comments");
    }
  });
});
