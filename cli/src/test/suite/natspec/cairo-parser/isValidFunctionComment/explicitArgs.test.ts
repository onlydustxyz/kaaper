import * as assert from "assert";
import {CairoNatspecParser} from "../../../../../../../core/lib/CairoParser";

suite("Natspec - isValidFunctionComment: explicit args", () => {
  test("valid (both are not null)", () => {
    const scopeLines =
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 592,
            end: 603,
          },
        },
        functionSignature: {
          implicitArgs: [
            {name: "syscall_ptr", type: "felt*"},
            {name: "pedersen_ptr", type: "HashBuiltin*"},
            {name: "range_check_ptr", type: ""},
          ],
          explicitArgs: [
            {name: "name", type: "felt"},
            {name: "symbol", type: "felt"},
            {name: "decimals", type: "felt"},
            {name: "initial_supply", type: "Uint256"},
            {name: "recipient", type: "felt"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: {start: 11, end: 34},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "name",
              type: "",
              desc: "name of the token",
              charIndex: {start: 50, end: 67},
            },
            {
              name: "symbol",
              type: "",
              desc: "symbol of the token",
              charIndex: {start: 85, end: 104},
            },
            {
              name: "decimals",
              type: "",
              desc: "floating point of the token",
              charIndex: {start: 124, end: 151},
            },
            {
              name: "initial_supply",
              type: "",
              desc: "amount of initial supply of the token",
              charIndex: {start: 177, end: 214},
            },
            {
              name: "recipient",
              type: "",
              desc: "the address of recipient of the initial supply",
              charIndex: {start: 235, end: 281},
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 292, end: 573}, //FIXME
        },
      }
    const isValid = CairoNatspecParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({isValid: true, errorSource: null}, isValid);
  });

  test("commentFunction has less element", () => {
    const scopeLines =
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 592,
            end: 603,
          },
        },
        functionSignature: {
          implicitArgs: [
            {name: "syscall_ptr", type: "felt*"},
            {name: "pedersen_ptr", type: "HashBuiltin*"},
            {name: "range_check_ptr", type: ""},
          ],
          explicitArgs: [
            {name: "name", type: "felt"},
            {name: "symbol", type: "felt"},
            {name: "decimals", type: "felt"},
            {name: "initial_supply", type: "Uint256"},
            {name: "recipient", type: "felt"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: {start: 11, end: 34},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "name",
              type: "",
              desc: "name of the token",
              charIndex: {start: 50, end: 67},
            },
            {
              name: "decimals",
              type: "",
              desc: "floating point of the token",
              charIndex: {start: 124, end: 151},
            },
            {
              name: "initial_supply",
              type: "",
              desc: "amount of initial supply of the token",
              charIndex: {start: 177, end: 214},
            },
            {
              name: "recipient",
              type: "",
              desc: "the address of recipient of the initial supply",
              charIndex: {start: 235, end: 281},
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 292, end: 573}, //FIXME
        },
      }

    const isValid = CairoNatspecParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({isValid: false, errorSource: "explicitArgs"}, isValid);
  });

  test("commentFunction has more element", () => {
    const scopeLines =
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 592,
            end: 603,
          },
        },
        functionSignature: {
          implicitArgs: [
            {name: "syscall_ptr", type: "felt*"},
            {name: "pedersen_ptr", type: "HashBuiltin*"},
            {name: "range_check_ptr", type: ""},
          ],
          explicitArgs: [
            {name: "symbol", type: "felt"},
            {name: "decimals", type: "felt"},
            {name: "initial_supply", type: "Uint256"},
            {name: "recipient", type: "felt"},
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initialize the contract",
              charIndex: {start: 11, end: 34},
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "name",
              type: "",
              desc: "name of the token",
              charIndex: {start: 50, end: 67},
            },
            {
              name: "symbol",
              type: "",
              desc: "symbol of the token",
              charIndex: {start: 85, end: 104},
            },
            {
              name: "decimals",
              type: "",
              desc: "floating point of the token",
              charIndex: {start: 124, end: 151},
            },
            {
              name: "initial_supply",
              type: "",
              desc: "amount of initial supply of the token",
              charIndex: {start: 177, end: 214},
            },
            {
              name: "recipient",
              type: "",
              desc: "the address of recipient of the initial supply",
              charIndex: {start: 235, end: 281},
            },
          ],
          returns: null,
          raises: null,
          charIndex: {start: 292, end: 573}, //FIXME
        },
      }
    const isValid = CairoNatspecParser.isValidFunctionComment(scopeLines);
    assert.deepEqual({isValid: false, errorSource: "explicitArgs"}, isValid);
  });

  // Rest of the test cases don't need to be adapted since the only change was on implicit arguments anyway.
});
