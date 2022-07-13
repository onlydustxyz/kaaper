import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/CairoParser";

suite("get-file-parsing-result", () => {
  test("ERC20.cairo", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/ERC20.cairo"
    );

    // parse whole scope
    const result = CairoParser.getFileParsingResult(pathFile);

  });

  test("library.cairo", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testAssets/library.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getFileParsingResult(pathFile);

    const parsingTarget = [
      {
        attributeName: "event",
        functionName: "Transfer",
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
            { name: "", type: "", desc: "Emit event when a transfer is made" },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "from_",
              type: "felt",
              desc: "The address of the sender",
            },
            {
              name: "to",
              type: "felt",
              desc: "The address of the receiver",
            },
            {
              name: "value",
              type: "Uint256",
              desc: "The amount of tokens transferred",
            },
          ],
          returns: null,
          raises: null,
        },
      },
      {
        attributeName: "event",
        functionName: "Approval",
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
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "owner",
              type: "felt",
              desc: "the address of the owner",
            },
            {
              name: "spender",
              type: "felt",
              desc: "the address of the spender",
            },
            {
              name: "value",
              type: "Uint256",
              desc: "the amount of tokens approved for the spender",
            },
          ],
          returns: null,
          raises: null,
        },
      },
      {
        attributeName: "storage_var",
        functionName: "ERC20_name",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "name", type: "felt" }],
        },
        functionComment: {
          desc: [{ name: "", type: "", desc: "Returns the name of the token" }],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            { name: "name", type: "felt", desc: "The name of the token" },
          ],
          raises: null,
        },
      },
      {
        attributeName: "storage_var",
        functionName: "ERC20_symbol",
        functionSignature: {
          implicitArgs: null,
          explicitArgs: null,
          returns: [{ name: "symbol", type: "felt" }],
        },
        functionComment: {
          desc: [
            { name: "", type: "", desc: "Returns the symbol of the token" },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            { name: "symbol", type: "felt", desc: "The symbol of the token" },
          ],
          raises: null,
        },
      },
      {
        attributeName: "storage_var",
        functionName: "ERC20_decimals",
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
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "decimals",
              type: "Uint256",
              desc: "The number of decimals of the token",
            },
          ],
          raises: null,
        },
      },
      {
        attributeName: "storage_var",
        functionName: "ERC20_total_supply",
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
            },
          ],
          implicitArgs: null,
          explicitArgs: null,
          returns: [
            {
              name: "total_supply",
              type: "Uint256",
              desc: "The total amount of tokens in existence",
            },
          ],
          raises: null,
        },
      },
      {
        attributeName: "storage_var",
        functionName: "ERC20_balances",
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
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            {
              name: "account",
              type: "felt",
              desc: "The address of the account",
            },
          ],
          returns: [
            {
              name: "balance",
              type: "Uint256",
              desc: "The amount of tokens owned by an account",
            },
          ],
          raises: null,
        },
      },
      {
        attributeName: "storage_var",
        functionName: "ERC20_allowances",
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
            },
          ],
          implicitArgs: null,
          explicitArgs: [
            { name: "owner", type: "felt", desc: "The address of the owner" },
            {
              name: "spender",
              type: "felt",
              desc: "The address of the spender",
            },
          ],
          returns: [
            {
              name: "allowance",
              type: "Uint256",
              desc: "The amount of tokens that an owner is allowed to delegate to a spender",
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
});
