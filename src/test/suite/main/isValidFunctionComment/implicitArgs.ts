import * as assert from "assert";
import CairoParser from "../../../../lib/main";

suite("isValidFunctionComment: implicit args", () => {
  test("valid (both are not none)", () => {
    const scopeLines = {
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
    };

    const isValid =
      CairoParser.isValidFunctionComment(scopeLines);
    assert.equal(true, isValid);
  });

  test("invalid commentFunction", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: "totalSupply",
      functionSignature: {
        implicitArgs: [
          { name: "syscall_ptr", type: "felt*", desc: "" },
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
    };

    const isValid =
      CairoParser.isValidFunctionComment(scopeLines);
    assert.equal(false, isValid);
  });

  test("functionSignature is null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: "totalSupply",
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
          },
        ],
        implicitArgs: [
          { name: "syscall_ptr", type: "felt*", desc: "" },
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
    };

    const isValid =
      CairoParser.isValidFunctionComment(scopeLines);
    assert.equal(false, isValid);
  });

  test("functionComment is null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: "totalSupply",
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
          },
        ],
        implicitArgs: null,
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
    };

    const isValid =
      CairoParser.isValidFunctionComment(scopeLines);
    assert.equal(false, isValid);
  });

  test("both are null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: "totalSupply",
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
          },
        ],
        implicitArgs: null,
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
    };

    const isValid =
      CairoParser.isValidFunctionComment(scopeLines);
    assert.equal(true, isValid);
  });
});
