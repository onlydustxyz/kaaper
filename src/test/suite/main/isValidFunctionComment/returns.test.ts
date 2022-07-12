import * as assert from "assert";
import CairoParser from "../../../../lib/main";

suite("isValidFunctionComment: returns", () => {
  test("valid (both are not null)", () => {
    const scopeLines = {
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
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({isValid: true, errorSource: null}, isValid);
  });

  // test("commentFunction has less element", () => {
  //   const scopeLines = {
  //     attributeName: "constructor",
  //     functionName: "constructor",
  //     functionSignature: {
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*" },
  //         { name: "range_check_ptr", type: "" },
  //       ],
  //       explicitArgs: [
  //         { name: "name", type: "felt" },
  //         { name: "symbol", type: "felt" },
  //         { name: "decimals", type: "Uint256" },
  //         { name: "initial_supply", type: "Uint256" },
  //         { name: "recipient", type: "felt" },
  //       ],
  //       returns: null,
  //     },
  //     functionComment: {
  //       desc: [{ name: "", type: "", desc: "Initialize the contract" }],
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
  //       explicitArgs: [
  //         { name: "name", type: "felt", desc: "name of the token" },
  //         { name: "symbol", type: "felt", desc: "symbol of the token" },
  //         {
  //           name: "decimals",
  //           type: "Uint256",
  //           desc: "floating point of the token",
  //         },
  //         {
  //           name: "recipient",
  //           type: "felt",
  //           desc: "the address of recipient of the initial supply",
  //         },
  //       ],
  //       returns: null,
  //       raises: [
  //         { name: "decimals", type: "", desc: "decimals exceed 2^8" },
  //         {
  //           name: "recipient",
  //           type: "",
  //           desc: "cannot mint to the zero address",
  //         },
  //         { name: "initial_supply", type: "", desc: "not valid Uint256" },
  //         { name: "initial_supply", type: "", desc: "mint overflow" },
  //       ],
  //     },
  //   };

  //   const isValid = CairoParser.isValidFunctionComment(scopeLines);
  //   assert.deepEqual({isValid: false, errorSource: "explicitArgs"}, isValid);
  // });

  // test("commentFunction has more element", () => {
  //   const scopeLines = {
  //     attributeName: "constructor",
  //     functionName: "constructor",
  //     functionSignature: {
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*" },
  //         { name: "range_check_ptr", type: "" },
  //       ],
  //       explicitArgs: [
  //         { name: "decimals", type: "Uint256" },
  //         { name: "initial_supply", type: "Uint256" },
  //         { name: "recipient", type: "felt" },
  //       ],
  //       returns: null,
  //     },
  //     functionComment: {
  //       desc: [{ name: "", type: "", desc: "Initialize the contract" }],
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
  //       explicitArgs: [
  //         { name: "name", type: "felt", desc: "name of the token" },
  //         { name: "symbol", type: "felt", desc: "symbol of the token" },
  //         {
  //           name: "decimals",
  //           type: "Uint256",
  //           desc: "floating point of the token",
  //         },
  //         {
  //           name: "initial_supply",
  //           type: "Uint256",
  //           desc: "amount of initial supply of the token",
  //         },
  //         {
  //           name: "recipient",
  //           type: "felt",
  //           desc: "the address of recipient of the initial supply",
  //         },
  //       ],
  //       returns: null,
  //       raises: [
  //         { name: "decimals", type: "", desc: "decimals exceed 2^8" },
  //         {
  //           name: "recipient",
  //           type: "",
  //           desc: "cannot mint to the zero address",
  //         },
  //         { name: "initial_supply", type: "", desc: "not valid Uint256" },
  //         { name: "initial_supply", type: "", desc: "mint overflow" },
  //       ],
  //     },
  //   };

  //   const isValid = CairoParser.isValidFunctionComment(scopeLines);
  //   assert.deepEqual({isValid: false, errorSource: "explicitArgs"}, isValid);
  // });

  // test("functionSignature is null", () => {
  //   const scopeLines = {
  //     attributeName: "constructor",
  //     functionName: "constructor",
  //     functionSignature: {
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*" },
  //         { name: "range_check_ptr", type: "" },
  //       ],
  //       explicitArgs: null,
  //       returns: null,
  //     },
  //     functionComment: {
  //       desc: [{ name: "", type: "", desc: "Initialize the contract" }],
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
  //       explicitArgs: [
  //         { name: "name", type: "felt", desc: "name of the token" },
  //         { name: "symbol", type: "felt", desc: "symbol of the token" },
  //         { name: "decimals", type: "Uint256", desc: "floating point of the token" },
  //         { name: "initial_supply", type: "Uint256", desc: "amount of initial supply of the token" },
  //         { name: "recipient", type: "felt", desc: "the address of recipient of the initial supply" },
  //       ],
  //       returns: null,
  //       raises: [
  //         { name: "decimals", type: "", desc: "decimals exceed 2^8" },
  //         {
  //           name: "recipient",
  //           type: "",
  //           desc: "cannot mint to the zero address",
  //         },
  //         { name: "initial_supply", type: "", desc: "not valid Uint256" },
  //         { name: "initial_supply", type: "", desc: "mint overflow" },
  //       ],
  //     },
  //   };

  //   const isValid = CairoParser.isValidFunctionComment(scopeLines);
  //   assert.deepEqual({isValid: false, errorSource: "explicitArgs"}, isValid);
  // });

  // test("functionComment is null", () => {
  //   const scopeLines = {
  //     attributeName: "constructor",
  //     functionName: "constructor",
  //     functionSignature: {
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*" },
  //         { name: "range_check_ptr", type: "" },
  //       ],
  //       explicitArgs: [
  //         { name: "name", type: "felt" },
  //         { name: "symbol", type: "felt" },
  //         { name: "decimals", type: "Uint256" },
  //         { name: "initial_supply", type: "Uint256" },
  //         { name: "recipient", type: "felt" },
  //       ],
  //       returns: null,
  //     },
  //     functionComment: {
  //       desc: [{ name: "", type: "", desc: "Initialize the contract" }],
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
  //       explicitArgs: null,
  //       returns: null,
  //       raises: [
  //         { name: "decimals", type: "", desc: "decimals exceed 2^8" },
  //         {
  //           name: "recipient",
  //           type: "",
  //           desc: "cannot mint to the zero address",
  //         },
  //         { name: "initial_supply", type: "", desc: "not valid Uint256" },
  //         { name: "initial_supply", type: "", desc: "mint overflow" },
  //       ],
  //     },
  //   };

  //   const isValid = CairoParser.isValidFunctionComment(scopeLines);
  //   assert.deepEqual({isValid: false, errorSource: "explicitArgs"}, isValid);
  // });

  

  // test("both are null", () => {
  //   const scopeLines = {
  //     attributeName: "view",
  //     functionName: "totalSupply",
  //     functionSignature: {
  //       implicitArgs: null,
  //       explicitArgs: null,
  //       returns: [{ name: "totalSupply", type: "Uint256" }],
  //     },
  //     functionComment: {
  //       desc: [
  //         {
  //           name: "",
  //           type: "",
  //           desc: "Returns the total supply of the token",
  //         },
  //       ],
  //       implicitArgs: null,
  //       explicitArgs: null,
  //       returns: [
  //         {
  //           name: "totalSupply",
  //           type: "Uint256",
  //           desc: "total supply of the token",
  //         },
  //       ],
  //       raises: null,
  //     },
  //   };

  //   const isValid = CairoParser.isValidFunctionComment(scopeLines);
  //   assert.deepEqual({isValid: true, errorSource: null}, isValid);
  // });
});
