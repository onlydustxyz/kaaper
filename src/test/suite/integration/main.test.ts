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
          returns: null,
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

  test("view", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getScopeParsingResult(pathFile, "view");

    const parsingTarget = [
      {
        attributeName: "view",
        functionName: "name",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Returns the name of the token" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "name", type: "felt", desc: "name of the token" }],
          raises: null,
        },
      },
      {
        attributeName: "view",
        functionName: "symbol",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "symbol", type: "felt" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the symbol of the token" },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            { name: "symbol", type: "felt", desc: "symbol of the token" },
          ],
          raises: null,
        },
      },
      {
        attributeName: "view",
        functionName: "totalSupply",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "totalSupply", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the total supply of the token",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "totalSupply",
              type: "Uint256",
              desc: "total supply of the token",
            },
          ],
          raises: null,
        },
      },
      {
        attributeName: "view",
        functionName: "decimals",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [{ name: "decimals", type: "felt" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the decimals of the token" },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            { name: "decimals", type: "felt", desc: "decimals of the token" },
          ],
          raises: null,
        },
      },
      {
        attributeName: "view",
        functionName: "balanceOf",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [{ name: "account", type: "felt" }],
          returns: [{ name: "balance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the balance of the account" },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "account to query balance for",
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "the balance of the account",
            },
          ],
          raises: null,
        },
      },
      {
        attributeName: "view",
        functionName: "allowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
          ],
          returns: [{ name: "remaining", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the amount of remaining tokens allowed to be spent by the spender",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of owner of the tokens",
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of spender (delegated account) of the tokens",
            },
          ],
          returns: [
            {
              name: "remaining",
              type: "Uint256",
              desc: "the amount of remaining tokens allowed to be spent by the spender",
            },
          ],
          raises: null,
        },
      },
    ];

    assert.deepEqual(
      parsingTarget,
      parsingOutput,
      "failed parsing whole scope"
    );
  });

  test("external", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getScopeParsingResult(
      pathFile,
      "external"
    );

    const parsingTarget = [
      {
        attributeName: "external",
        functionName: "transfer",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "recipient", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Perform transfer to recipient" }],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
            },
          ],
        },
      },
      {
        attributeName: "external",
        functionName: "transferFrom",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "sender", type: "felt" },
            { name: "recipient", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer from sender to recipient with allowance",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "the address of ERC20 sender",
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "sender",
              type: "",
              desc: "cannot transfer from the zero address",
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
            },
          ],
        },
      },
      {
        attributeName: "external",
        functionName: "approve",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Approve spender to spend amount of tokens",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 token to approve",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if approve was successful, 0 otherwise",
            },
          ],
          raises: [
            { name: "amount", type: "", desc: "amount is not a valid Uint256" },
            {
              name: "spender",
              type: "",
              desc: "cannot approve to the zero address",
            },
          ],
        },
      },
      {
        attributeName: "external",
        functionName: "increaseAllowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "added_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Increase allowance of spender by added_value",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
            },
            {
              name: "added_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to increase allowance",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if increase allowance was successful, 0 otherwise",
            },
          ],
          raises: [
            {
              name: "added_value",
              type: "",
              desc: "added_value is not a valid Uint256",
            },
            {
              name: "spender",
              type: "",
              desc: "cannot increase allowance to the zero address",
            },
          ],
        },
      },
      {
        attributeName: "external",
        functionName: "decreaseAllowance",
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "spender", type: "felt" },
            { name: "subtracted_value", type: "Uint256" },
          ],
          returns: [{ name: "success", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Decrease allowance of spender by subtracted_value",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
            },
            {
              name: "subtracted_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to decrease allowance",
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if decrease allowance was successful, 0 otherwise",
            },
          ],
          raises: [
            {
              name: "subtracted_value",
              type: "",
              desc: "subtracted_value is not a valid Uint256",
            },
            {
              name: "spender",
              type: "",
              desc: "cannot decrease allowance to the zero address",
            },
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
