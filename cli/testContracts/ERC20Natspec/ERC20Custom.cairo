// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.4.0 (token/erc20/presets/ERC20.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

from openzeppelin.token.erc20.library import ERC20

// @notice Initialize the contract
// @dev a custom dev tag
// @param name name of the token
// @param symbol symbol of the token
// @param decimals floating point of the token
// @param initial_supply amount of initial supply of the token
// @param recipient the address of recipient of the initial supply
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
// The notice continues on a second line.
// @dev a custom dev tag
// that is also written in two lines.
// @return name Name of the token
@view
func name{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (name: felt) {
    let (name) = ERC20.name();
    return (name,);
}

// @notice Returns the symbol of the token
// @return symbol Symbol of the token
@view
func symbol{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (symbol: felt) {
    let (symbol) = ERC20.symbol();
    return (symbol,);
}

//
// Externals
//

// @notice Perform transfer to recipient
// @param recipient the address of ERC20
// recipient
// @param amount the amount of ERC20 transfer
// @return success 1 if transfer was successful,
// 0 otherwise
@external
func transfer{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    recipient: felt, amount: Uint256
) -> (success: felt) {
    ERC20.transfer(recipient, amount);
    return (TRUE,);
}

// @notice Perform transfer from sender to recipient with allowance
// @param sender the address of ERC20 sender
// @param recipient the address of ERC20 recipient
// @param amount the amount of ERC20 transfer
// @return success 1 if transfer was successful, 0 otherwise
@external
func transferFrom{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    sender: felt, recipient: felt, amount: Uint256
) -> (success: felt) {
    ERC20.transfer_from(sender, recipient, amount);
    return (TRUE,);
}