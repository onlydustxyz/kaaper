import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/CairoParser";

suite("getNamespaceScopeParsingResult", () => {
  test("should fetch all namespaces", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getNamespaceScopeParsingResult(pathFile);

    const parsingTarget = [
      {
        attributeName: "namespace ERC20",
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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            { name: "name", type: "felt", desc: "The name of the token" },
            { name: "symbol", type: "felt", desc: "The symbol of the token" },
            {
              name: "multiplier",
              type: "felt",
              desc: "The multiplier of the token",
            },
          ],
          returns: null,
          raises: null,
        },
      },
      {
        attributeName: "namespace ERC20",
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
          desc: [
            {
              name: "",
              type: "",
              desc: "Returns the name of the token",
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: null,
          returns: [
            { name: "name", type: "felt", desc: "The name of the token" },
          ],
          raises: null,
        },
      },
      {
        attributeName: "namespace ERC20",
        functionName: "transfer_from",
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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            { name: "sender", type: "felt", desc: "The address of the sender" },
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be transferred",
            },
          ],
          returns: null,
          raises: null,
        },
      },
      {
        attributeName: "namespace internal",
        functionName: "_mint",
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
            },
          ],
          implicitArgs: [
            { name: "syscall_ptr", type: "felt*", desc: "" },
            { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
            { name: "range_check_ptr", type: "", desc: "" },
          ],
          explicitArgs: [
            {
              name: "recipient",
              type: "felt",
              desc: "The address of the recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be minted",
            },
          ],
          returns: null,
          raises: null,
        },
      },
      {
        attributeName: "namespace internal",
        functionName: "_burn",
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
            },
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
              desc: "The address of the recipient",
            },
            {
              name: "amount",
              type: "Uint256",
              desc: "The amount of tokens to be burned",
            },
          ],
          returns: null,
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
});
