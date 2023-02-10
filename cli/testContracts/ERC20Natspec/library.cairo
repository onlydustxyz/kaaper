// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts for Cairo v0.1.0 (token/erc20/library.cairo)

%lang starknet

from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_not_zero, assert_lt
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.uint256 import Uint256, uint256_check, uint256_eq, uint256_not

from openzeppelin.utils.constants import UINT8_MAX
from openzeppelin.security.safemath import uint256_checked_add, uint256_checked_sub_le

//
// Events
//

// @notice Emit event when a transfer is made
// @param from The address of the sender
// @param to The address of the receiver
// @param value The amount of tokens transferred
@event
func Transfer(from_: felt, to: felt, value: Uint256) {
}

// @notice Emit event when a delegation is made
// @param owner the address of the owner
// @param spender the address of the spender
// @param value the amount of tokens approved for the spender
@event
func Approval(owner: felt, spender: felt, value: Uint256) {
}

//
// Storage
//

// @notice Returns the name of the token
// @return name The name of the token
@storage_var
func ERC20_name() -> (name: felt) {
}

// @notice Returns the symbol of the token
// @return symbol The symbol of the token
@storage_var
func ERC20_symbol() -> (symbol: felt) {
    // Desc:
    //   Returns the symbol of the token
    // Returns:
    //   symbol(felt): The symbol of the token
}

// @notice Returns the number of decimals the token uses
// @return decimals The number of decimals of the token
@storage_var
func ERC20_decimals() -> (decimals: Uint256) {
}

// @notice Returns total amount of tokens in existence
// @return total_supply The total amount of tokens in existence
@storage_var
func ERC20_total_supply() -> (total_supply: Uint256) {
}

// @notice Returns the amount of tokens owned by an account
// @param account The address of the account
// @return balance The amount of tokens owned by an account
@storage_var
func ERC20_balances(account: felt) -> (balance: Uint256) {
}

// @notice Store the amount of tokens that an owner is allowed to delegate to a spender
// @param owner The address of the owner
// @param spender The address of the spender
// @return allowance The amount of tokens that an owner is allowed to delegate to a spender
@storage_var
func ERC20_allowances(owner: felt, spender: felt) -> (allowance: Uint256) {
}

namespace ERC20 {
    //
    // Constructor
    //

    // @notice Initializes the contract with the given name, symbol, and decimals
    // @param name The name of the token
    // @param symbol The symbol of the token
    // @param multiplier The multiplier of the token
    func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        name: felt, symbol: felt, multiplier: felt
    ) {
        ERC20_name.write(name);
        ERC20_symbol.write(symbol);
        with_attr error_message("ERC20: multiplier exceed 2^8") {
            assert_lt(multiplier, UINT8_MAX);
        }
        ERC20_decimals.write(multiplier);
        return ();
    }

    //
    // Public functions
    //

    // @notice Returns the name of the token
    // @return name The name of the token
    func name{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() -> (name: felt) {
        let (name) = ERC20_name.read();
        return (name,);
    }

    // @notice Transfers tokens from one account to another
    // @param sender The address of the sender
    // @param recipient The address of the recipient
    // @param amount The amount of tokens to be transferred
    func transfer_from{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        sender: felt, recipient: felt, amount: Uint256
    ) -> () {
        alloc_locals;
        let (caller) = get_caller_address();
        // subtract allowance
        _spend_allowance(sender, caller, amount);
        // execute transfer
        _transfer(sender, recipient, amount);
        return ();
    }
}

namespace internal {
    // @notice Mints tokens to an account
    // @param recipient The address of the recipient
    // @param amount The amount of tokens to be minted
    func _mint{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        recipient: felt, amount: Uint256
    ) {
        with_attr error_message("ERC20: amount is not a valid Uint256") {
            uint256_check(amount);
        }

        with_attr error_message("ERC20: cannot mint to the zero address") {
            assert_not_zero(recipient);
        }

        let (supply: Uint256) = ERC20_total_supply.read();
        with_attr error_message("ERC20: mint overflow") {
            let (new_supply: Uint256) = uint256_checked_add(supply, amount);
        }
        ERC20_total_supply.write(new_supply);

        let (balance: Uint256) = ERC20_balances.read(account=recipient);
        // overflow is not possible because sum is guaranteed to be less than total supply
        // which we check for overflow below
        let (new_balance: Uint256) = uint256_checked_add(balance, amount);
        ERC20_balances.write(recipient, new_balance);

        Transfer.emit(0, recipient, amount);
        return ();
    }

    // @notice Burns tokens from an account
    // @param account The address of the recipient
    // @param amount The amount of tokens to be burned
    func _burn{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
        account: felt, amount: Uint256
    ) -> () {
        alloc_locals;
        with_attr error_message("ERC20: amount is not a valid Uint256") {
            uint256_check(amount);
        }

        with_attr error_message("ERC20: cannot burn from the zero address") {
            assert_not_zero(account);
        }

        let (balance: Uint256) = ERC20_balances.read(account);
        with_attr error_message("ERC20: burn amount exceeds balance") {
            let (new_balance: Uint256) = uint256_checked_sub_le(balance, amount);
        }

        ERC20_balances.write(account, new_balance);

        let (supply: Uint256) = ERC20_total_supply.read();
        let (new_supply: Uint256) = uint256_checked_sub_le(supply, amount);
        ERC20_total_supply.write(new_supply);
        Transfer.emit(account, 0, amount);
        return ();
    }

    //
    // Public functions
    //
}
