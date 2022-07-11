import * as assert from "assert";
import CairoParser from "../../../lib/main";


suite("isCommentFunctionSameWithFunctionSignature", () => {
  test("implicitArgs(functionSignature) is the same", () => {

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
            { name: "syscall_ptr", type: "felt*" , desc: ""},
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
      }
      
    const isValid = CairoParser.isCommentFunctionSameWithFunctionSignature(scopeLines);
    assert.equal(true, isValid)
});

test("implicitArgs(functionComment) is different", () => {

  const scopeLines = {
      attributeName: "view",
      functionName: "totalSupply",
      functionSignature: {
        implicitArgs: [
          { name: "syscall_ptr", type: "felt*" , desc: ""},
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
          { name: "syscall_ptr", type: "felt*" , desc: ""},
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
    }
    
  const isValid = CairoParser.isCommentFunctionSameWithFunctionSignature(scopeLines);
  assert.equal(false, isValid)
});

test("implicitArgs(functionSignature) is null", () => {

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
          { name: "syscall_ptr", type: "felt*" , desc: ""},
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
    }
    
  const isValid = CairoParser.isCommentFunctionSameWithFunctionSignature(scopeLines);
  assert.equal(false, isValid)
});

test("implicitArgs(functionComment) is null", () => {

  const scopeLines = {
      attributeName: "view",
      functionName: "totalSupply",
      functionSignature: {
        implicitArgs: [{ name: "syscall_ptr", type: "felt*" , desc: ""}],
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
    }
    
  const isValid = CairoParser.isCommentFunctionSameWithFunctionSignature(scopeLines);
  assert.equal(false, isValid)
});

// test("explicitArgs is the same", () => {

//     const scopeLines = {
//         attributeName: "view",
//         functionName: "totalSupply",
//         functionSignature: {
//             implicitArgs: [
//                 { name: "syscall_ptr", type: "felt*"},
//                 { name: "pedersen_ptr", type: "HashBuiltin*"},
//                 { name: "range_check_ptr", type: ""},
//               ],
//           explicitArgs: [
//             { name: "arg1", type: "Uint256" },
//           ],
//           returns: [
//             {
//               name: "totalSupply",
//               type: "Uint256",
//             },
//           ],
//         },
//         functionComment: {
//           desc: [
//             {
//               name: "",
//               type: "",
//               desc: "Returns the total supply of the token",
//             },
//           ],
//           implicitArgs: [
//             { name: "syscall_ptr", type: "felt*", desc: "" },
//             { name: "pedersen_ptr", type: "HashBuiltin*", desc: "" },
//             { name: "range_check_ptr", type: "", desc: "" },
//           ],
//           explicitArgs: null,
//           returns: [
//             {
//               name: "totalSupply",
//               type: "Uint256",
//               desc: "total supply of the token",
//             },
//           ],
//           raises: null,
//         },
//       }
      
//     const isValid = CairoParser.isCommentFunctionSameWithFunctionSignature(scopeLines);
//     assert.equal(false, isValid)
// });
})