// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.4.0 (token/erc20/presets/ERC20.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

from openzeppelin.token.erc20.library import ERC20

// @notice The constructor of the ERC20
// This is the following line of the notice.
// @param name the name
// @param symbol the symbol
// @param decimals
// @param initial_supply
// @param recipient
@constructor
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    name: felt, symbol: felt, decimals: felt, initial_supply: Uint256, recipient: felt
) {
    ERC20.initializer(name, symbol, decimals);
    ERC20._mint(recipient, initial_supply);
    return ();
}

//
// Getters
//

// @notice Returns the name of the token
// @returns the name of the token
@view
func name{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (name: felt) {
    // Desc:
    //   Returns the name of the token
    // Implicit args:
    //   syscall_ptr(felt*)
    //   pedersen_ptr(HashBuiltin*)
    //   range_check_ptr
    // Returns:
    //   name(felt): name of the token
    let (name) = ERC20.name();
    return (name,);
}
