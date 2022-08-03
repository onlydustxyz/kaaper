import * as assert from "assert";
import CairoParser from "../../../../lib/CairoParser";

suite("isValidFunctionComment: explicit args", () => {
  test("valid (both are not null)", () => {
    const scopeLines = {
      attributeName: "constructor",
      functionName: {
        name: "constructor",
        charIndex: { start: 0, end: 0 },
      },
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
        desc: [
          {
            name: "",
            type: "",
            desc: "Initialize the contract",
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 10, end: 0 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 100, end: 1000 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 213, end: 2189 },
          },
        ],
        explicitArgs: [
          {
            name: "name",
            type: "felt",
            desc: "name of the token",
            charIndex: { start: 200, end: 0 },
          },
          {
            name: "symbol",
            type: "felt",
            desc: "symbol of the token",
            charIndex: { start: 401, end: 699 },
          },
          {
            name: "decimals",
            type: "Uint256",
            desc: "floating point of the token",
            charIndex: { start: 2, end: 918 },
          },
          {
            name: "initial_supply",
            type: "Uint256",
            desc: "amount of initial supply of the token",
            charIndex: { start: 8781, end: 12718 },
          },
          {
            name: "recipient",
            type: "felt",
            desc: "the address of recipient of the initial supply",
            charIndex: { start: 98910, end: 1297 },
          },
        ],
        returns: null,
        raises: [
          {
            name: "decimals",
            type: "",
            desc: "decimals exceed 2^8",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "recipient",
            type: "",
            desc: "cannot mint to the zero address",
            charIndex: { start: 2389, end: 123198 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "not valid Uint256",
            charIndex: { start: 0, end: 0 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "mint overflow",
            charIndex: { start: 0, end: 0 },
          },
        ],
        charIndex: { start: 129837, end: 9283 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: true, errorSource: null }, isValid);
  });

  test("commentFunction has less element", () => {
    const scopeLines = {
      attributeName: "constructor",
      functionName: {
        name: "constructor",
        charIndex: { start: 0, end: 0 },
      },
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
        desc: [
          {
            name: "",
            type: "",
            desc: "Initialize the contract",
            charIndex: { start: 0, end: 0 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 50, end: 124 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 12, end: 1231 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 193, end: 718 },
          },
        ],
        explicitArgs: [
          {
            name: "name",
            type: "felt",
            desc: "name of the token",
            charIndex: { start: 1928, end: 91231 },
          },
          {
            name: "symbol",
            type: "felt",
            desc: "symbol of the token",
            charIndex: { start: 198, end: 92183 },
          },
          {
            name: "decimals",
            type: "Uint256",
            desc: "floating point of the token",
            charIndex: { start: 129380, end: 29391 },
          },
          {
            name: "recipient",
            type: "felt",
            desc: "the address of recipient of the initial supply",
            charIndex: { start: 5870, end: 2420 },
          },
        ],
        returns: null,
        raises: [
          {
            name: "decimals",
            type: "",
            desc: "decimals exceed 2^8",
            charIndex: { start: 12900, end: 1240 },
          },
          {
            name: "recipient",
            type: "",
            desc: "cannot mint to the zero address",
            charIndex: { start: 9880, end: 530 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "not valid Uint256",
            charIndex: { start: 12400, end: 2390 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "mint overflow",
            charIndex: { start: 1490, end: 59890 },
          },
        ],
        charIndex: { start: 3400, end: 234140 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "explicitArgs" }, isValid);
  });

  test("commentFunction has more element", () => {
    const scopeLines = {
      attributeName: "constructor",
      functionName: {
        name: "constructor",
        charIndex: { start: 0, end: 0 },
      },
      functionSignature: {
        implicitArgs: [
          { name: "syscall_ptr", type: "felt*" },
          { name: "pedersen_ptr", type: "HashBuiltin*" },
          { name: "range_check_ptr", type: "" },
        ],
        explicitArgs: [
          { name: "decimals", type: "Uint256" },
          { name: "initial_supply", type: "Uint256" },
          { name: "recipient", type: "felt" },
        ],
        returns: null,
      },
      functionComment: {
        desc: [
          {
            name: "",
            type: "",
            desc: "Initialize the contract",
            charIndex: { start: 84100, end: 2410 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 4190, end: 2780 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 12410, end: 24980 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 14900, end: 240 },
          },
        ],
        explicitArgs: [
          {
            name: "name",
            type: "felt",
            desc: "name of the token",
            charIndex: { start: 12400, end: 12410 },
          },
          {
            name: "symbol",
            type: "felt",
            desc: "symbol of the token",
            charIndex: { start: 9100, end: 170 },
          },
          {
            name: "decimals",
            type: "Uint256",
            desc: "floating point of the token",
            charIndex: { start: 910, end: 81790 },
          },
          {
            name: "initial_supply",
            type: "Uint256",
            desc: "amount of initial supply of the token",
            charIndex: { start: 1280, end: 12490 },
          },
          {
            name: "recipient",
            type: "felt",
            desc: "the address of recipient of the initial supply",
            charIndex: { start: 17180, end: 9190 },
          },
        ],
        returns: null,
        raises: [
          {
            name: "decimals",
            type: "",
            desc: "decimals exceed 2^8",
            charIndex: { start: 1910, end: 12480 },
          },
          {
            name: "recipient",
            type: "",
            desc: "cannot mint to the zero address",
            charIndex: { start: 1280, end: 94910 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "not valid Uint256",
            charIndex: { start: 1230, end: 980 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "mint overflow",
            charIndex: { start: 9890, end: 120 },
          },
        ],
        charIndex: { start: 12990, end: 1240 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "explicitArgs" }, isValid);
  });

  test("functionSignature is null", () => {
    const scopeLines = {
      attributeName: "constructor",
      functionName: {
        name: "constructor",
        charIndex: { start: 0, end: 0 },
      },
      functionSignature: {
        implicitArgs: [
          { name: "syscall_ptr", type: "felt*" },
          { name: "pedersen_ptr", type: "HashBuiltin*" },
          { name: "range_check_ptr", type: "" },
        ],
        explicitArgs: null,
        returns: null,
      },
      functionComment: {
        desc: [
          {
            name: "",
            type: "",
            desc: "Initialize the contract",
            charIndex: { start: 2480, end: 120 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 4140, end: 21340 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 4330, end: 2490 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 4120, end: 1240 },
          },
        ],
        explicitArgs: [
          {
            name: "name",
            type: "felt",
            desc: "name of the token",
            charIndex: { start: 1580, end: 580 },
          },
          {
            name: "symbol",
            type: "felt",
            desc: "symbol of the token",
            charIndex: { start: 5820, end: 2690 },
          },
          {
            name: "decimals",
            type: "Uint256",
            desc: "floating point of the token",
            charIndex: { start: 32480, end: 1980 },
          },
          {
            name: "initial_supply",
            type: "Uint256",
            desc: "amount of initial supply of the token",
            charIndex: { start: 19010, end: 5810 },
          },
          {
            name: "recipient",
            type: "felt",
            desc: "the address of recipient of the initial supply",
            charIndex: { start: 12400, end: 9480 },
          },
        ],
        returns: null,
        raises: [
          {
            name: "decimals",
            type: "",
            desc: "decimals exceed 2^8",
            charIndex: { start: 1244780, end: 52390 },
          },
          {
            name: "recipient",
            type: "",
            desc: "cannot mint to the zero address",
            charIndex: { start: 15850, end: 59810 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "not valid Uint256",
            charIndex: { start: 5280, end: 2340 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "mint overflow",
            charIndex: { start: 5980, end: 1480 },
          },
        ],
        charIndex: { start: 5980, end: 2690 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "explicitArgs" }, isValid);
  });

  test("functionComment is null", () => {
    const scopeLines = {
      attributeName: "constructor",
      functionName: {
        name: "constructor",
        charIndex: { start: 0, end: 0 },
      },
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
        desc: [
          {
            name: "",
            type: "",
            desc: "Initialize the contract",
            charIndex: { start: 124980, end: 190 },
          },
        ],
        implicitArgs: [
          {
            name: "syscall_ptr",
            type: "felt*",
            desc: "",
            charIndex: { start: 2950, end: 5380 },
          },
          {
            name: "pedersen_ptr",
            type: "HashBuiltin*",
            desc: "",
            charIndex: { start: 1280, end: 3980 },
          },
          {
            name: "range_check_ptr",
            type: "",
            desc: "",
            charIndex: { start: 75618, end: 18610 },
          },
        ],
        explicitArgs: null,
        returns: null,
        raises: [
          {
            name: "decimals",
            type: "",
            desc: "decimals exceed 2^8",
            charIndex: { start: 698290, end: 1240 },
          },
          {
            name: "recipient",
            type: "",
            desc: "cannot mint to the zero address",
            charIndex: { start: 21470, end: 5280 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "not valid Uint256",
            charIndex: { start: 1480, end: 31240 },
          },
          {
            name: "initial_supply",
            type: "",
            desc: "mint overflow",
            charIndex: { start: 1820, end: 12480 },
          },
        ],
        charIndex: { start: 860, end: 120 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: false, errorSource: "explicitArgs" }, isValid);
  });

  test("both are null", () => {
    const scopeLines = {
      attributeName: "view",
      functionName: {
        name: "constructor",
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
            charIndex: { start: 148, end: 1241 },
          },
        ],
        implicitArgs: null,
        explicitArgs: null,
        returns: [
          {
            name: "totalSupply",
            type: "Uint256",
            desc: "total supply of the token",
            charIndex: { start: 1481029, end: 1248 },
          },
        ],
        raises: null,
        charIndex: { start: 2419, end: 4819 },
      },
    };

    const isValid = CairoParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({ isValid: true, errorSource: null }, isValid);
  });
});
