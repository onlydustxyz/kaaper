import * as assert from "assert";
import * as path from "path";
import FunctionCommentDescParser from "../../../lib/parser/function-comment/desc";
import FunctionCommentImplicitArgsParser from "../../../lib/parser/function-comment/implicit-args";
import CairoParser from "../../../lib/main";
import FunctionCommentExplicitArgsParser from "../../../lib/parser/function-comment/explicit-args";
import FunctionCommentReturnsParser from "../../../lib/parser/function-comment/returns";

suite("function-comment: constructor", () => {
  test("get desc comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );
    const constructorParser = new CairoParser(pathFile, "constructor");
    const functionText = constructorParser.parseFunctionScope();
    const commentText = constructorParser.parseComments(functionText);
    const descParser = new FunctionCommentDescParser();

    {
      const line = 0;
      assert.equal("# Desc:", commentText![line].trim(), `check line ${line}`);
      const isStartScope = descParser.isStartScope(commentText![line]);
      const isEndScope = descParser.isEndScope(commentText![line]);
      const output = descParser.returnOutput(commentText![line]);
      assert.equal(
        true,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );

      assert.equal(null, output, `failed to get desc comment line ${line}`);
    }

    {
      const line = 1;
      assert.equal(
        "#   Initialize the contract",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = descParser.isStartScope(commentText![line]);
      const isEndScope = descParser.isEndScope(commentText![line]);
      const output = descParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );

      assert.equal(
        "Initialize the contract",
        output?.get("desc"),
        `failed to get desc comment line ${line}`
      );
    }

    {
      const line = 2;
      assert.equal(
        "# Implicit args:",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = descParser.isStartScope(commentText![line]);
      const isEndScope = descParser.isEndScope(commentText![line]);
      const output = descParser.returnOutput(commentText![line]);
      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(true, isEndScope, `failed to get desc comment line ${line}`);
      assert.equal(null, output, `failed to get desc comment line ${line}`);
    }
  });

  test("get implicit args comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );
    const constructorParser = new CairoParser(pathFile, "constructor");
    const functionText = constructorParser.parseFunctionScope();
    const commentText = constructorParser.parseComments(functionText);
    const implicitArgsParser = new FunctionCommentImplicitArgsParser();

    {
      const line = 2;
      assert.equal(
        "# Implicit args:",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = implicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = implicitArgsParser.isEndScope(commentText![line]);
      assert.equal(
        true,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
    }

    {
      const line = 3;
      assert.equal(
        "#   syscall_ptr(felt*)",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = implicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = implicitArgsParser.isEndScope(commentText![line]);
      const output = implicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("syscall_ptr", output?.get("name"), "map not equal");
      assert.equal("felt*", output?.get("type"), "map not equal");
    }

    {
      const line = 4;
      assert.equal(
        "#   pedersen_ptr(HashBuiltin)",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = implicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = implicitArgsParser.isEndScope(commentText![line]);
      const output = implicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("pedersen_ptr", output?.get("name"), "map not equal");
      assert.equal("HashBuiltin", output?.get("type"), "map not equal");
    }

    {
      const line = 5;
      assert.equal(
        "#   range_check_ptr",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = implicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = implicitArgsParser.isEndScope(commentText![line]);
      const output = implicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );

      assert.equal("range_check_ptr", output?.get("name"), "map not equal");
      assert.equal("", output?.get("type"), "map not equal");
    }

    {
      const line = 6;
      assert.equal(
        "# Explicit args:",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = implicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = implicitArgsParser.isEndScope(commentText![line]);
      const output = implicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(true, isEndScope, `failed to get desc comment line ${line}`);
      assert.equal(null, output, `failed to get desc comment line ${line}`);
    }
  });

  test("get explicit args comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    const constructorParser = new CairoParser(pathFile, "constructor");
    const functionText = constructorParser.parseFunctionScope();
    const commentText = constructorParser.parseComments(functionText);
    const explicitArgsParser = new FunctionCommentExplicitArgsParser();

    {
      const line = 6;
      assert.equal(
        "# Explicit args:",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        true,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(null, output, `failed to get desc comment line ${line}`);
    }

    {
      const line = 7;
      assert.equal(
        "#   name(felt): the address of the ERC20 sender",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("name", output?.get("name"), "name not equal");
      assert.equal("felt", output?.get("type"), "type not equal");
      console.log(output?.get("desc"));
      assert.equal(
        "the address of the ERC20 sender",
        output?.get("desc"),
        "desc not equal"
      );
    }

    {
      const line = 8;
      assert.equal(
        "#   symbol(felt): the address of the ERC20 recipient",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("symbol", output?.get("name"), "name not equal");
      assert.equal("felt", output?.get("type"), "type not equal");
      assert.equal(
        "the address of the ERC20 recipient",
        output?.get("desc"),
        "desc not equal"
      );
    }

    {
      const line = 9;
      assert.equal(
        "#   decimals(uint256): floating point of the token",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("decimals", output?.get("name"), "name not equal");
      assert.equal("uint256", output?.get("type"), "type not equal");
      assert.equal(
        "floating point of the token",
        output?.get("desc"),
        "desc not equal"
      );
    }

    {
      const line = 10;
      assert.equal(
        "#   initial_supply(uint256): amount of ERC20 transfer",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);
      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("initial_supply", output?.get("name"), "name not equal");
      assert.equal("uint256", output?.get("type"), "type not equal");
      assert.equal(
        "amount of ERC20 transfer",
        output?.get("desc"),
        "desc not equal"
      );
    }

    {
      const line = 11;
      assert.equal(
        "#   recipient(felt): amount of ERC20 transfer",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);

      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal("recipient", output?.get("name"), "name not equal");
      assert.equal("felt", output?.get("type"), "type not equal");
      assert.equal(
        "amount of ERC20 transfer",
        output?.get("desc"),
        "desc not equal"
      );
    }

    {
      const line = 12;
      assert.equal(
        "# Returns:",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = explicitArgsParser.isStartScope(commentText![line]);
      const isEndScope = explicitArgsParser.isEndScope(commentText![line]);
      const output = explicitArgsParser.returnOutput(commentText![line]);
      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(true, isEndScope, `failed to get desc comment line ${line}`);
      assert.equal(null, output, `failed to get desc comment line ${line}`);
    }
  });

  test("get returns comments", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    const constructorParser = new CairoParser(pathFile, "constructor");
    const functionText = constructorParser.parseFunctionScope();
    const commentText = constructorParser.parseComments(functionText);
    const returnsParser = new FunctionCommentReturnsParser();

    {
      const line = 12;
      assert.equal(
        "# Returns:",
        commentText![line].trim(),
        `check line ${line}`
      );
      const isStartScope = returnsParser.isStartScope(commentText![line]);
      const isEndScope = returnsParser.isEndScope(commentText![line]);
      const output = returnsParser.returnOutput(commentText![line]);
      assert.equal(
        true,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(null, output, `failed to get desc comment line ${line}`);
    }

    {
      const line = 13;
      assert.equal("#   None", commentText![line].trim(), `check line ${line}`);
      const isStartScope = returnsParser.isStartScope(commentText![line]);
      const isEndScope = returnsParser.isEndScope(commentText![line]);
      const output = returnsParser.returnOutput(commentText![line]);
      assert.equal(
        false,
        isStartScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        false,
        isEndScope,
        `failed to get desc comment line ${line}`
      );
      assert.equal(
        "None",
        output?.get("desc"),
        `failed to get desc comment line ${line}`
      );
    }
  });
});
