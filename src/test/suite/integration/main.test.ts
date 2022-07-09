import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/main";

suite("integration-test: main", () => {
  test("constructor", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getScopeParsingResult(
      pathFile,
      "constructor"
    );

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: "constructor",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "name", type: "felt" },
            { name: "symbol", type: "felt" },
            { name: "decimals", type: "Uint256" },
            { name: "initial_supply", type: "Uint256" },
            { name: "recipient", type: "felt" },
          ],
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Initialize the contract" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            { name: "name", type: "felt", desc: "name of the token" },
            { name: "symbol", type: "felt", desc: "symbol of the token" },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
            },
          ],
          returns: [{ name: "", type: "", desc: "None" }],
          raises: [
            { name: "decimals", type: "", desc: "decimals exceed 2^8" },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
            },
            { name: "initial_supply", type: "", desc: "not valid Uint256" },
            { name: "initial_supply", type: "", desc: "mint overflow" },
          ],
        },
      },
    ];

    assert.deepEqual(
      parsingTarget,
      parsingOutput,
      "failed parsing whole scope"
    );
  });
});
