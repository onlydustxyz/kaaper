import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../../lib/main";

suite("integration-test: main", () => {
  test("constructor", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getScopeParsingResult(
      pathFile,
      "constructor"
    );

    const parsingTarget = [
      {
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
      },
    ];

    assert.deepEqual(
      parsingTarget,
      parsingOutput,
      "failed parsing whole scope"
    );
  });

  test("view", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../test_assets/ERC20.cairo"
    );

    // parse whole scope
    const parsingOutput = CairoParser.getScopeParsingResult(
      pathFile,
      "view"
    );

    const parsingTarget = [{
      attributeName: "view",
      functionName: "name",
      functionSignature: {
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*"},
          {name: "pedersen_ptr", type: "HashBuiltin*"},
          {name: "range_check_ptr", type: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "name", type: "felt"},
        ]
      },
      functionComment: {
        desc: [{name: "", type: "", desc: "Returns the name of the token"}],
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*", desc: ""},
          {name: "pedersen_ptr", type: "HashBuiltin*", desc: ""},
          {name: "range_check_ptr", type: "", desc: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "name", type: "felt", desc: "name of the token"}
        ],
        raises: null,
      }
    },
    {
      attributeName: "view",
      functionName: "symbol",
      functionSignature: {
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*"},
          {name: "pedersen_ptr", type: "HashBuiltin*"},
          {name: "range_check_ptr", type: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "symbol", type: "felt"},
        ]
      },
      functionComment: {
        desc: [{name: "", type: "", desc: "Returns the symbol of the token"}],
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*", desc: ""},
          {name: "pedersen_ptr", type: "HashBuiltin*", desc: ""},
          {name: "range_check_ptr", type: "", desc: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "symbol", type: "felt", desc: "symbol of the token"}
        ],
        raises: null,
      }
    },
    {
      attributeName: "view",
      functionName: "totalSupply",
      functionSignature: {
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*"},
          {name: "pedersen_ptr", type: "HashBuiltin*"},
          {name: "range_check_ptr", type: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "totalSupply", type: "Uint256"},
        ]
      },
      functionComment: {
        desc: [{name: "", type: "", desc: "Returns the total supply of the token"}],
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*", desc: ""},
          {name: "pedersen_ptr", type: "HashBuiltin*", desc: ""},
          {name: "range_check_ptr", type: "", desc: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "totalSupply", type: "Uint256", desc: "total supply of the token"}
        ],
        raises: null,
      },
    },
    {
      attributeName: "view",
      functionName: "decimals",
      functionSignature: {
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*"},
          {name: "pedersen_ptr", type: "HashBuiltin*"},
          {name: "range_check_ptr", type: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "decimals", type: "felt"},
        ]
      },
      functionComment: {
        desc: [{name: "", type: "", desc: "Returns the decimals of the token"}],
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*", desc: ""},
          {name: "pedersen_ptr", type: "HashBuiltin*", desc: ""},
          {name: "range_check_ptr", type: "", desc: ""},
        ],
        explicitArgs: null,
        returns: [
          {name: "decimals", type: "felt", desc: "decimals of the token"}
        ],
        raises: null,
      }
    },
    {
      attributeName: "view",
      functionName: "balanceOf",
      functionSignature: {
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*"},
          {name: "pedersen_ptr", type: "HashBuiltin*"},
          {name: "range_check_ptr", type: ""},
        ],
        explicitArgs: [
          {name: "account", type: "felt"},
        ],
        returns: [
          {name: "balance", type: "Uint256"},
        ]
      },
      functionComment: {
        desc: [{name: "", type: "", desc: "Returns the balance of the account"}],
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*", desc: ""},
          {name: "pedersen_ptr", type: "HashBuiltin*", desc: ""},
          {name: "range_check_ptr", type: "", desc: ""},
        ],
        explicitArgs: [
          {name: "account", type: "felt", desc: "account to query balance for"},
        ],
        returns: [
          {name: "balance", type: "Uint256", desc: "the balance of the account"}
        ],
        raises: null,
      }
    },
    {
      attributeName: "view",
      functionName: "allowance",
      functionSignature: {
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*"},
          {name: "pedersen_ptr", type: "HashBuiltin*"},
          {name: "range_check_ptr", type: ""},
        ],
        explicitArgs: [
          {name: "owner", type: "felt"},
          {name: "spender", type: "felt"},
        ],
        returns: [
          {name: "remaining", type: "Uint256"},
        ]
      },
      functionComment: {
        desc: [{name: "", type: "", desc: "Returns the amount of remaining tokens allowed to be spent by the spender"}],
        implicitArgs: [
          {name: "syscall_ptr", type: "felt*", desc: ""},
          {name: "pedersen_ptr", type: "HashBuiltin*", desc: ""},
          {name: "range_check_ptr", type: "", desc: ""},
        ],
        explicitArgs: [
          {name: "owner", type: "felt", desc: "the address of owner of the tokens"},
          {name: "spender", type: "felt", desc: "the address of spender (delegated account) of the tokens"},
        ],
        returns: [
          {name: "", type: "", desc: "None"}
        ],
        raises: null
      }
    },
    ]
    
    assert.deepEqual(
      parsingTarget,
      parsingOutput,
      "failed parsing whole scope"
    );
  });
});
