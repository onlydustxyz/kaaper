import * as assert from "assert";
import CairoParser from "../../../../lib/CairoParser";

suite("isValidFunctionComment: implicit args", () => {
  test("valid (both are not null)", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "name",
        charIndex: { start: 0, end: 0 },
      },
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
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
        ],
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        raises: null,
        charIndex: { start: 0, end: 0 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: true, errorSource: null }, isValid);
  });

  test("commentFunction has less element", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "totalSupply",
        charIndex: { start: 0, end: 0 },
      },
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
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
        ],
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        raises: null,
        charIndex: { start: 0, end: 0 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "implicitArgs" }, isValid);
  });

  test("commentFunction has more element", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "totalSupply",
        charIndex: { start: 0, end: 0 },
      },
      functionSignature: {
        implicitArgs: [
          { name: "syscall_ptr", type: "felt*" },
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
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
        ],
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        raises: null,
        charIndex: { start: 0, end: 0 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "implicitArgs" }, isValid);
  });

  test("functionSignature is null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "totalSupply",
        charIndex: { start: 0, end: 0 },
      },
      functionSignature: {
        implicitArgs: null,
        explicitArgs: null,
        returns: [{ name: "totalSupply", type: "Uint256" }],
      },
      functionComment: {
        desc: [
          {
            name: "",
            type: "",
            desc: "Returns the total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 0, end: 0 },
          },
        ],
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        raises: null,
        charIndex: { start: 0, end: 0 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "implicitArgs" }, isValid);
  });

  test("functionComment is null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "totalSupply",
        charIndex: { start: 0, end: 0 },
      },
      functionSignature: {
        implicitArgs: [{ name: "syscall_ptr", type: "felt*", desc: "" }],
        explicitArgs: null,
        returns: [{ name: "totalSupply", type: "Uint256" }],
      },
      functionComment: {
        desc: [
          {
            name: "",
            type: "",
            desc: "Returns the total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: null,
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        raises: null,
        charIndex: { start: 0, end: 0 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "implicitArgs" }, isValid);
  });

  test("both are null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "totalSupply",
        charIndex: { start: 0, end: 0 },
      },
      functionSignature: {
        implicitArgs: null,
        explicitArgs: null,
        returns: [{ name: "totalSupply", type: "Uint256" }],
      },
      functionComment: {
        desc: [
          {
            name: "",
            type: "",
            desc: "Returns the total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: null,
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 0, end: 0 },
          },
        ],
        raises: null,
        charIndex: { start: 0, end: 0 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: true, errorSource: null }, isValid);
  });
});
