// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.4.0 (token/erc20/presets/ERC20.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

from openzeppelin.token.erc20.library import ERC20

// @notice The constructor of the ERC20
// This is the following line of the notice.
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
// @returns name of the token
@view
func name{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (name: felt) {
    let (name) = ERC20.name();
    return (name,);
}

// @notice Returns the symbol of the token
// @returns symbol of the token
@view
func symbol{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (symbol: felt) {
    let (symbol) = ERC20.symbol();
    return (symbol,);
}

// @notice Returns the total supply of the token
// @returns total supply of the token
@view
func totalSupply{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    totalSupply: Uint256
) {
    let (totalSupply: Uint256) = ERC20.total_supply();
    return (totalSupply,);
}

// @notice Returns the decimals of the token
// @returns decimals of the token
@view
func decimals{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (
    decimals: felt
) {
    let (decimals) = ERC20.decimals();
    return (decimals,);
}

// @notice Returns the balance of the account
// @param account account to query balance for
// @returns the balance of the account
@view
func balanceOf{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(account: felt) -> (
    balance: Uint256
) {
    let (balance: Uint256) = ERC20.balance_of(account);
    return (balance,);
