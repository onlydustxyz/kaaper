import * as assert from "assert";
import CairoParser from "../../../../lib/main";

suite("isValidFunctionComment: explicit args", () => {
  test("valid (both are not none)", () => {
    const scopeLines = {
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
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.equal(true, isValid);
  });

  // test("commentFunction has less element", () => {
  //   const scopeLines = {
  //     attributeName: "view",
  //     functionName: "totalSupply",
  //     functionSignature: {
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*" },
  //         { name: "range_check_ptr", type: "" },
  //       ],
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
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
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
  //   assert.equal(false, isValid);
  // });

  // test("commentFunction has more element", () => {
  //   const scopeLines = {
  //     attributeName: "view",
  //     functionName: "totalSupply",
  //     functionSignature: {
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*" },
  //         { name: "range_check_ptr", type: "" },
  //       ],
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
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
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
  //   assert.equal(false, isValid);
  // });

  // test("functionSignature is null", () => {
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
  //       implicitArgs: [
  //         { name: "syscall_ptr", type: "felt*", desc: "" },
  //         { name: "range_check_ptr", type: "", desc: "" },
  //       ],
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
  //   assert.equal(false, isValid);
  // });

  // test("functionComment is null", () => {
  //   const scopeLines = {
  //     attributeName: "view",
  //     functionName: "totalSupply",
  //     functionSignature: {
  //       implicitArgs: [{ name: "syscall_ptr", type: "felt*", desc: "" }],
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
  //   assert.equal(false, isValid);
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
  //   assert.equal(true, isValid);
  // });
});
