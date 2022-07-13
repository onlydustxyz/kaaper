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
    assert.deepEqual({ isValid: true, errorSource: null }, isValid);
  });

  test("commentFunction has less element", () => {
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
        returns: [
          { name: "success", type: "felt" },
          { name: "success", type: "felt" },
        ],
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
    assert.deepEqual({ isValid: false, errorSource: "returns" }, isValid);
  });

  test("commentFunction has more element", () => {
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
    assert.deepEqual({ isValid: false, errorSource: "returns" }, isValid);
  });

  test("functionSignature is null", () => {
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
        returns: null,
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
    assert.deepEqual({ isValid: false, errorSource: "returns" }, isValid);
  });

  test("functionComment is null", () => {
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
        returns: null,
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
    assert.deepEqual({ isValid: false, errorSource: "returns" }, isValid);
  });

  test("both are null", () => {
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
        returns: null,
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
        returns: null,
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
    assert.deepEqual({ isValid: true, errorSource: null }, isValid);
  });
});
