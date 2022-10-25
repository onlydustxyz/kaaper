// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.4.0 (token/erc20/presets/ERC20.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.uint256 import Uint256

from openzeppelin.token.erc20.library import ERC20

// @notice Initialize the contract
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
}

// @notice Returns the amount of remaining tokens allowed to be spent by the spender
// @param owner the address of owner of the tokens
// @param spender the address of spender (delegated account) of the tokens
// @returns the amount of remaining tokens allowed to be spent by the spender
@view
func allowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    owner: felt, spender: felt
) -> (remaining: Uint256) {
    let (remaining: Uint256) = ERC20.allowance(owner, spender);
    return (remaining,);
}

//
// Externals
//

// @notice Perform transfer to recipient
// @param recipient the address of ERC20 recipient
// @param amount the amount of ERC20 transfer
// @returns 1 if transfer was successful, 0 otherwise
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
// @returns 1 if transfer was successful, 0 otherwise
@external
func transferFrom{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    sender: felt, recipient: felt, amount: Uint256
) -> (success: felt) {
    ERC20.transfer_from(sender, recipient, amount);
    return (TRUE,);
}

// @notice Approve spender to spend amount of tokens
// @param spender the address of ERC20 spender
// @param amount the amount of ERC20 token to approve
// @returns 1 if allowance was successful, 0 otherwise
@external
func approve{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, amount: Uint256
) -> (success: felt) {
    ERC20.approve(spender, amount);
    return (TRUE,);
}

// @notice Increase allowance of spender by added_value
// @param spender the address of ERC20 spender
// @param amount the amount of ERC20 token to increase allowance
// @returns 1 if allowance was successful, 0 otherwise
@external
func increaseAllowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, added_value: Uint256
) -> (success: felt) {
    ERC20.increase_allowance(spender, added_value);
    return (TRUE,);
}

// @notice Decrease allowance of spender by subtracted_value
// @param spender the address of ERC20 spender
// @param amount the amount of ERC20 token to decrease allowance
// @returns 1 if decrease allowance was successful, 0 otherwise
@external
func decreaseAllowance{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    spender: felt, subtracted_value: Uint256
) -> (success: felt) {
    ERC20.decrease_allowance(spender, subtracted_value);
    return (TRUE,);
}
