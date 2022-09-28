import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../../../core/lib/CairoParser";

suite("getFileParsingResult", () => {
  test("should get all parsing result in `ERC20.cairo`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    const parsingTarget = [
      {
        attributeName: "constructor",
        functionName: {
          name: "constructor",
          charIndex: {
            start: 351,
            end: 362,
          },
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
              charIndex: { start: 23, end: 46 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 78, end: 96 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 106, end: 132 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 189, end: 218 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 228, end: 261 },
            },
            {
              name: "decimals",
              type: "Uint256",
              desc: "floating point of the token",
              charIndex: { start: 271, end: 317 },
            },
            {
              name: "initial_supply",
              type: "Uint256",
              desc: "amount of initial supply of the token",
              charIndex: { start: 327, end: 389 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of recipient of the initial supply",
              charIndex: { start: 399, end: 462 },
            },
          ],
          returns: null,
          raises: [
            {
              name: "decimals",
              type: "",
              desc: "decimals exceed 2^8",
              charIndex: { start: 517, end: 546 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot mint to the zero address",
              charIndex: { start: 556, end: 598 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "not valid Uint256",
              charIndex: { start: 608, end: 641 },
            },
            {
              name: "initial_supply",
              type: "",
              desc: "mint overflow",
              charIndex: { start: 651, end: 680 },
            },
          ],
          charIndex: { start: 522, end: 1202 },
        },
      },
      {
        attributeName: "view",
        functionName: {
          name: "name",
          charIndex: { start: 1341, end: 1345 },
        },
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
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
              charIndex: { start: 23, end: 52 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 84, end: 102 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 112, end: 138 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 148, end: 163 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "name of the token",
              charIndex: { start: 189, end: 218 },
            },
          ],
          raises: null,
          charIndex: { start: 1430, end: 1648 },
        },
      },
      {
        attributeName: "view",
        functionName: {
          name: "symbol",
          charIndex: { start: 1714, end: 1720 },
        },
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
            {
              name: "",
              type: "",
              desc: "Returns the symbol of the token",
              charIndex: { start: 23, end: 54 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 86, end: 104 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 114, end: 140 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 150, end: 165 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "symbol of the token",
              charIndex: { start: 191, end: 224 },
            },
          ],
          raises: null,
          charIndex: { start: 1807, end: 2031 },
        },
      },
      {
        attributeName: "view",
        functionName: {
          name: "totalSupply",
          charIndex: { start: 2070, end: 2081 },
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
              charIndex: { start: 23, end: 60 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 92, end: 110 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 120, end: 146 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 156, end: 171 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "totalSupply",
              type: "Uint256",
              desc: "total supply of the token",
              charIndex: { start: 189, end: 236 },
            },
          ],
          raises: null,
          charIndex: { start: 2215, end: 2459 },
        },
      },
      {
        attributeName: "view",
        functionName: {
          name: "decimals",
          charIndex: { start: 2517, end: 2525 },
        },
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
            {
              name: "",
              type: "",
              desc: "Returns the decimals of the token",
              charIndex: { start: 21, end: 54 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 84, end: 102 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 111, end: 137 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 146, end: 161 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "felt",
              desc: "decimals of the token",
              charIndex: { start: 185, end: 222 },
            },
          ],
          raises: null,
          charIndex: { start: 2622, end: 2844 },
        },
      },
      {
        attributeName: "view",
        functionName: {
          name: "balanceOf",
          charIndex: { start: 2922, end: 2931 },
        },
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
            {
              name: "",
              type: "",
              desc: "Returns the balance of the account",
              charIndex: { start: 21, end: 55 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 85, end: 103 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 112, end: 138 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 147, end: 162 },
            },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "account to query balance for",
              charIndex: { start: 192, end: 235 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "the balance of the account",
              charIndex: { start: 259, end: 303 },
            },
          ],
          raises: null,
          charIndex: { start: 3044, end: 3347 },
        },
      },
      {
        attributeName: "view",
        functionName: {
          name: "allowance",
          charIndex: { start: 3441, end: 3450 },
        },
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
              charIndex: { start: 21, end: 94 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 124, end: 142 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 151, end: 177 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 186, end: 201 },
            },
          ],
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of owner of the tokens",
              charIndex: { start: 231, end: 278 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of spender (delegated account) of the tokens",
              charIndex: { start: 287, end: 358 },
            },
          ],
          returns: [
            {
              name: "remaining",
              type: "Uint256",
              desc: "the amount of remaining tokens allowed to be spent by the spender",
              charIndex: { start: 382, end: 467 },
            },
          ],
          raises: null,
          charIndex: { start: 3579, end: 4046 },
        },
      },
      {
        attributeName: "external",
        functionName: {
          name: "transfer",
          charIndex: { start: 4171, end: 4179 },
        },
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
          desc: [
            {
              name: "",
              type: "",
              desc: "Perform transfer to recipient",
              charIndex: { start: 21, end: 50 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 80, end: 98 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 107, end: 133 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 142, end: 157 },
            },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 187, end: 234 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 243, end: 288 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 312, end: 368 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 391, end: 428 },
            },
            {
              name: "recipient",
              type: "",
              desc: "cannot transfer to the zero address",
              charIndex: { start: 437, end: 483 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 492, end: 531 },
            },
          ],
          charIndex: { start: 4309, end: 4840 },
        },
      },
      {
        attributeName: "external",
        functionName: {
          name: "transferFrom",
          charIndex: { start: 4917, end: 4929 },
        },
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
              charIndex: { start: 21, end: 77 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 107, end: 125 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 134, end: 160 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 169, end: 184 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "the address of ERC20 sender",
              charIndex: { start: 214, end: 255 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "the address of ERC20 recipient",
              charIndex: { start: 264, end: 311 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 transfer",
              charIndex: { start: 320, end: 365 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if transfer was successful, 0 otherwise",
              charIndex: { start: 389, end: 445 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 468, end: 505 },
            },
            {
              name: "sender",
              type: "",
              desc: "cannot transfer from the zero address",
              charIndex: { start: 514, end: 559 },
            },
            {
              name: "amount",
              type: "",
              desc: "transfer amount exceeds balance",
              charIndex: { start: 568, end: 607 },
            },
          ],
          charIndex: { start: 5074, end: 5681 },
        },
      },
      {
        attributeName: "external",
        functionName: {
          name: "approve",
          charIndex: { start: 5771, end: 5778 },
        },
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
              charIndex: { start: 21, end: 62 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 92, end: 110 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 119, end: 145 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 154, end: 169 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 199, end: 242 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "the amount of ERC20 token to approve",
              charIndex: { start: 251, end: 304 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if approve was successful, 0 otherwise",
              charIndex: { start: 328, end: 383 },
            },
          ],
          raises: [
            {
              name: "amount",
              type: "",
              desc: "amount is not a valid Uint256",
              charIndex: { start: 406, end: 443 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot approve to the zero address",
              charIndex: { start: 452, end: 495 },
            },
          ],
          charIndex: { start: 5906, end: 6401 },
        },
      },
      {
        attributeName: "external",
        functionName: {
          name: "increaseAllowance",
          charIndex: { start: 6477, end: 6494 },
        },
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
              charIndex: { start: 21, end: 65 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 95, end: 113 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 122, end: 148 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 157, end: 172 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 202, end: 245 },
            },
            {
              name: "added_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to increase allowance",
              charIndex: { start: 254, end: 323 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if increase allowance was successful, 0 otherwise",
              charIndex: { start: 347, end: 413 },
            },
          ],
          raises: [
            {
              name: "added_value",
              type: "",
              desc: "added_value is not a valid Uint256",
              charIndex: { start: 436, end: 483 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot increase allowance to the zero address",
              charIndex: { start: 492, end: 546 },
            },
          ],
          charIndex: { start: 6627, end: 7173 },
        },
      },
      {
        attributeName: "external",
        functionName: {
          name: "decreaseAllowance",
          charIndex: { start: 7264, end: 7281 },
        },
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
              charIndex: { start: 21, end: 70 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 100, end: 118 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 127, end: 153 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 162, end: 177 },
            },
          ],
          explicitArgs: [
            {
              name: "spender",
              type: "felt",
              desc: "the address of ERC20 spender",
              charIndex: { start: 207, end: 250 },
            },
            {
              name: "subtracted_value",
              type: "Uint256",
              desc: "the amount of ERC20 token to decrease allowance",
              charIndex: { start: 259, end: 333 },
            },
          ],
          returns: [
            {
              name: "success",
              type: "felt",
              desc: "1 if decrease allowance was successful, 0 otherwise",
              charIndex: { start: 357, end: 423 },
            },
          ],
          raises: [
            {
              name: "subtracted_value",
              type: "",
              desc: "subtracted_value is not a valid Uint256",
              charIndex: { start: 446, end: 503 },
            },
            {
              name: "spender",
              type: "",
              desc: "cannot decrease allowance to the zero address",
              charIndex: { start: 512, end: 566 },
            },
          ],
          charIndex: { start: 7419, end: 7985 },
        },
      },
    ];

    assert.deepEqual(
      parsingOutput!,
      parsingTarget,
      "failed parsing whole scope"
    );
  });

  test("should get all parsing result in `library.cairo`", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../../../testContracts/ERC20Compliant/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    const parsingTarget = [
      {
        attributeName: "event",
        functionName: {
          name: "Transfer",
          charIndex: { start: 645, end: 653 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "from_", type: "felt" },
            { name: "to", type: "felt" },
            { name: "value", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Emit event when a transfer is made",
              charIndex: { start: 23, end: 57 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "from_",
              type: "felt",
              desc: "The address of the sender",
              charIndex: { start: 89, end: 127 },
            },
            {
              name: "to",
              type: "felt",
              desc: "The address of the receiver",
              charIndex: { start: 137, end: 174 },
            },
            {
              name: "value",
              type: "Uint256",
              desc: "The amount of tokens transferred",
              charIndex: { start: 184, end: 232 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 694, end: 926 },
        },
      },
      {
        attributeName: "event",
        functionName: {
          name: "Approval",
          charIndex: { start: 942, end: 950 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
            { name: "value", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Emit event when a delegation is made",
              charIndex: { start: 22, end: 58 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of the owner",
              charIndex: { start: 90, end: 127 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of the spender",
              charIndex: { start: 137, end: 178 },
            },
            {
              name: "value",
              type: "Uint256",
              desc: "the amount of tokens approved for the spender",
              charIndex: { start: 188, end: 249 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 996, end: 1245 },
        },
      },
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_name",
          charIndex: { start: 1285, end: 1295 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
              charIndex: { start: 23, end: 52 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 78, end: 111 },
            },
          ],
          raises: null,
          charIndex: { start: 1315, end: 1426 },
        },
      },
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_symbol",
          charIndex: { start: 1448, end: 1460 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "symbol", type: "felt" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the symbol of the token",
              charIndex: { start: 23, end: 54 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 80, end: 117 },
            },
          ],
          raises: null,
          charIndex: { start: 1482, end: 1599 },
        },
      },
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_decimals",
          charIndex: { start: 1621, end: 1635 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "decimals", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the number of decimals of the token",
              charIndex: { start: 23, end: 66 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "Uint256",
              desc: "The number of decimals of the token",
              charIndex: { start: 92, end: 146 },
            },
          ],
          raises: null,
          charIndex: { start: 1662, end: 1808 },
        },
      },
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_total_supply",
          charIndex: { start: 1830, end: 1848 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "total_supply", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns total amount of tokens in existence",
              charIndex: { start: 23, end: 66 },
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "total_supply",
              type: "Uint256",
              desc: "The total amount of tokens in existence",
              charIndex: { start: 92, end: 154 },
            },
          ],
          raises: null,
          charIndex: { start: 1879, end: 2033 },
        },
      },
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_balances",
          charIndex: { start: 2055, end: 2069 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [{ name: "account", type: "felt" }],
          returns: [{ name: "balance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the amount of tokens owned by an account",
              charIndex: { start: 23, end: 71 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the account",
              charIndex: { start: 103, end: 144 },
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "The amount of tokens owned by an account",
              charIndex: { start: 170, end: 228 },
            },
          ],
          raises: null,
          charIndex: { start: 2108, end: 2336 },
        },
      },
      {
        attributeName: "storage_var",
        functionName: {
          name: "ERC20_allowances",
          charIndex: { start: 2389, end: 2405 },
        },
        functionSignature: {
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt" },
            { name: "spender", type: "felt" },
          ],
          returns: [{ name: "allowance", type: "Uint256" }],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Store the amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 22, end: 98 },
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "The address of the owner",
              charIndex: { start: 128, end: 165 },
            },
            {
              name: "spender",
              type: "felt",
              desc: "The address of the spender",
              charIndex: { start: 174, end: 215 },
            },
          ],
          returns: [
            {
              name: "allowance",
              type: "Uint256",
              desc: "The amount of tokens that an owner is allowed to delegate to a spender",
              charIndex: { start: 239, end: 329 },
            },
          ],
          raises: null,
          charIndex: { start: 2461, end: 2790 },
        },
      },
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "constructor",
          charIndex: { start: 2852, end: 2863 },
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
            { name: "multiplier", type: "felt" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Initializes the contract with the given name, symbol, and decimals",
              charIndex: { start: 29, end: 95 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 133, end: 151 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 164, end: 190 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 203, end: 218 },
            },
          ],
          explicitArgs: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 256, end: 289 },
            },
            {
              name: "symbol",
              type: "felt",
              desc: "The symbol of the token",
              charIndex: { start: 302, end: 339 },
            },
            {
              name: "multiplier",
              type: "felt",
              desc: "The multiplier of the token",
              charIndex: { start: 352, end: 397 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 2992, end: 3389 },
        },
      },
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "name",
          charIndex: { start: 3691, end: 3695 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
            },
          ],
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
              charIndex: { start: 29, end: 58 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 96, end: 114 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 127, end: 153 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 166, end: 181 },
            },
          ],
          explicitArgs: null,
          returns: [
            {
              name: "name",
              type: "felt",
              desc: "The name of the token",
              charIndex: { start: 213, end: 246 },
            },
          ],
          raises: null,
          charIndex: { start: 3782, end: 4028 },
        },
      },
      {
        attributeName: "namespace ERC20",
        functionName: {
          name: "transfer_from",
          charIndex: { start: 4109, end: 4122 },
        },
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
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Transfers tokens from one account to another",
              charIndex: { start: 29, end: 73 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 111, end: 129 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 142, end: 168 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 181, end: 196 },
            },
          ],
          explicitArgs: [
            {
              name: "sender",
              type: "felt",
              desc: "The address of the sender",
              charIndex: { start: 234, end: 273 },
            },
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 286, end: 331 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be transferred",
              charIndex: { start: 344, end: 399 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 4261, end: 4660 },
        },
      },
      {
        attributeName: "namespace internal",
        functionName: {
          name: "_mint",
          charIndex: { start: 4948, end: 4953 },
        },
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
          desc: [
            {
              name: "",
              type: "",
              desc: "Mints tokens to an account",
              charIndex: { start: 29, end: 55 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 93, end: 111 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 124, end: 150 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 163, end: 178 },
            },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 216, end: 261 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be minted",
              charIndex: { start: 274, end: 324 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 5071, end: 5431 },
        },
      },
      {
        attributeName: "namespace internal",
        functionName: {
          name: "_burn",
          charIndex: { start: 6347, end: 6352 },
        },
        functionSignature: {
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*" },
            { name: "pedersen_ptr", type: "HashBuiltin*" },
            { name: "range_check_ptr", type: "" },
          ],
          explicitArgs: [
            { name: "account", type: "felt" },
            { name: "amount", type: "Uint256" },
          ],
          returns: null,
        },
        functionComment: {
          desc: [
            {
              name: "",
              type: "",
              desc: "Burns tokens from an account",
              charIndex: { start: 29, end: 57 },
            },
          ],
          implicitArgs: [
            {
              name: "syscall_ptr",
              type: "felt*",
              desc: "",
              charIndex: { start: 95, end: 113 },
            },
            {
              name: "pedersen_ptr",
              type: "HashBuiltin*",
              desc: "",
              charIndex: { start: 126, end: 152 },
            },
            {
              name: "range_check_ptr",
              type: "",
              desc: "",
              charIndex: { start: 165, end: 180 },
            },
          ],
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the recipient",
              charIndex: { start: 218, end: 261 },
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be burned",
              charIndex: { start: 274, end: 324 },
            },
          ],
          returns: null,
          raises: null,
          charIndex: { start: 6474, end: 6798 },
        },
      },
    ];

    assert.deepEqual(
      parsingOutput,
      parsingTarget,
      "failed parsing whole scope"
    );
  });
});
