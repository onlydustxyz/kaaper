# SPDX-License-Identifier: MIT
# OpenZeppelin Contracts for Cairo v0.1.0 (token/erc20/library.cairo)

%lang starknet

from starkware.starknet.common.syscalls import get_caller_address
from starkware.cairo.common.cairo_builtins import HashBuiltin, SignatureBuiltin
from starkware.cairo.common.math import assert_not_zero, assert_lt
from starkware.cairo.common.bool import TRUE, FALSE
from starkware.cairo.common.uint256 import Uint256, uint256_check, uint256_eq, uint256_not

from openzeppelin.utils.constants import UINT8_MAX
from openzeppelin.security.safemath import uint256_checked_add, uint256_checked_sub_le

#
# Events
#

@event
func Transfer(from_ : felt, to : felt, value : Uint256):
    # Desc: 
    #   Emit event when a transfer is made
    # Explicit args:
    #   from_(felt): The address of the sender
    #   to(felt): The address of the receiver
    #   value(Uint256): The amount of tokens transferred
end


@event
func Approval(owner : felt, spender : felt, value : Uint256):
    # Desc: 
    #  Emit event when a delegation is made
    # Explicit args:
    #   owner(felt): the address of the owner
    #   spender(felt): the address of the spender
    #   value(Uint256): the amount of tokens approved for the spender
end

#
# Storage
#

@storage_var
func ERC20_name() -> (name : felt):
    # Desc: 
    #   Returns the name of the token
    # Returns:
    #   name(felt): The name of the token
end

@storage_var
func ERC20_symbol() -> (symbol : felt):
    # Desc: 
    #   Returns the symbol of the token
    # Returns:
    #   symbol(felt): The symbol of the token
end

@storage_var
func ERC20_decimals() -> (decimals : Uint256):
    # Desc: 
    #   Returns the number of decimals of the token
    # Returns:
    #   decimals(Uint256): The number of decimals of the token
func ERC20_decimals() -> (multiplier : felt):
end

@storage_var
func ERC20_total_supply() -> (total_supply : Uint256):
    # Desc: 
    #   Returns total amount of tokens in existence
    # Returns:
    #   total_supply(Uint256): The total amount of tokens in existence
end

@storage_var
func ERC20_balances(account : felt) -> (balance : Uint256):
    # Desc: 
    #   The amount of tokens owned by an account
    # Returns:
    #   balance(Uint256): The amount of tokens owned by an account
end

@storage_var
func ERC20_allowances(owner : felt, spender : felt) -> (allowance : Uint256):
    # Desc: 
    #   The amount of tokens that an owner is allowed to delegate to a spender
    # Returns:
    #   allowance(Uint256): The amount of tokens that an owner is allowed to delegate to a spender
end

namespace ERC20:
    #
    # Constructor
    #

    func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        name : felt, symbol : felt, multiplier : felt
    ):
        ERC20_name.write(name)
        ERC20_symbol.write(symbol)
        with_attr error_message("ERC20: multiplier exceed 2^8"):
            assert_lt(multiplier, UINT8_MAX)
        end
        ERC20_decimals.write(multiplier)
        return ()
    end

    #
    # Public functions
    #

    func name{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (name : felt):
        let (name) = ERC20_name.read()
        return (name)
    end

    func symbol{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        symbol : felt
    ):
        let (symbol) = ERC20_symbol.read()
        return (symbol)
    end

    func total_supply{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        total_supply : Uint256
    ):
        let (total_supply : Uint256) = ERC20_total_supply.read()
        return (total_supply)
    end

    func multiplier{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
        multiplier : felt
    ):
        let (multiplier) = ERC20_decimals.read()
        return (multiplier)
    end

    func balance_of{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        account : felt
    ) -> (balance : Uint256):
        let (balance : Uint256) = ERC20_balances.read(account)
        return (balance)
    end

    func allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        owner : felt, spender : felt
    ) -> (remaining : Uint256):
        let (remaining : Uint256) = ERC20_allowances.read(owner, spender)
        return (remaining)
    end

    func transfer{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        recipient : felt, amount : Uint256
    ):
        let (sender) = get_caller_address()
        _transfer(sender, recipient, amount)
        return ()
    end

    func transfer_from{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        sender : felt, recipient : felt, amount : Uint256
    ) -> ():
        alloc_locals
        let (caller) = get_caller_address()
        # subtract allowance
        _spend_allowance(sender, caller, amount)
        # execute transfer
        _transfer(sender, recipient, amount)
        return ()
    end

    func approve{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spender : felt, amount : Uint256
    ):
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)
        end
        
        let (caller) = get_caller_address()
        _approve(caller, spender, amount)
        return ()
    end

    func increase_allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spender : felt, added_value : Uint256
    ) -> ():
        with_attr error("ERC20: added_value is not a valid Uint256"):
            uint256_check(added_value)
        end

        let (caller) = get_caller_address()
        let (current_allowance : Uint256) = ERC20_allowances.read(caller, spender)

        # add allowance
        with_attr error_message("ERC20: allowance overflow"):
            let (new_allowance : Uint256) = uint256_checked_add(current_allowance, added_value)
        end

        _approve(caller, spender, new_allowance)
        return ()
    end

    func decrease_allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spender : felt, subtracted_value : Uint256
    ) -> ():
        alloc_locals
        with_attr error_message("ERC20: subtracted_value is not a valid Uint256"):
            uint256_check(subtracted_value)
        end

        let (caller) = get_caller_address()
        let (current_allowance : Uint256) = ERC20_allowances.read(owner=caller, spender=spender)

        with_attr error_message("ERC20: allowance below zero"):
            let (new_allowance : Uint256) = uint256_checked_sub_le(
                current_allowance, subtracted_value
            )
        end

        _approve(caller, spender, new_allowance)
        return ()
    end

    #
    # Internal
    #

    func _mint{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        recipient : felt, amount : Uint256
    ):
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)
        end

        with_attr error_message("ERC20: cannot mint to the zero address"):
            assert_not_zero(recipient)
        end

        let (supply : Uint256) = ERC20_total_supply.read()
        with_attr error_message("ERC20: mint overflow"):
            let (new_supply : Uint256) = uint256_checked_add(supply, amount)
        end
        ERC20_total_supply.write(new_supply)

        let (balance : Uint256) = ERC20_balances.read(account=recipient)
        # overflow is not possible because sum is guaranteed to be less than total supply
        # which we check for overflow below
        let (new_balance : Uint256) = uint256_checked_add(balance, amount)
        ERC20_balances.write(recipient, new_balance)

        Transfer.emit(0, recipient, amount)
        return ()
    end

    func _burn{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        account : felt, amount : Uint256
    ):
        alloc_locals
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)
        end

        with_attr error_message("ERC20: cannot burn from the zero address"):
            assert_not_zero(account)
        end

        let (balance : Uint256) = ERC20_balances.read(account)
        with_attr error_message("ERC20: burn amount exceeds balance"):
            let (new_balance : Uint256) = uint256_checked_sub_le(balance, amount)
        end

        ERC20_balances.write(account, new_balance)

        let (supply : Uint256) = ERC20_total_supply.read()
        let (new_supply : Uint256) = uint256_checked_sub_le(supply, amount)
        ERC20_total_supply.write(new_supply)
        Transfer.emit(account, 0, amount)
        return ()
    end

    func _transfer{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        sender : felt, recipient : felt, amount : Uint256
    ):
        alloc_locals
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)  # almost surely not needed, might remove after confirmation
        end

        with_attr error_message("ERC20: cannot transfer from the zero address"):
            assert_not_zero(sender)
        end

        with_attr error_message("ERC20: cannot transfer to the zero address"):
            assert_not_zero(recipient)
        end

        let (sender_balance : Uint256) = ERC20_balances.read(account=sender)
        with_attr error_message("ERC20: transfer amount exceeds balance"):
            let (new_sender_balance : Uint256) = uint256_checked_sub_le(sender_balance, amount)
        end

        ERC20_balances.write(sender, new_sender_balance)

        # add to recipient
        let (recipient_balance : Uint256) = ERC20_balances.read(account=recipient)
        # overflow is not possible because sum is guaranteed by mint to be less than total supply
        let (new_recipient_balance : Uint256) = uint256_checked_add(recipient_balance, amount)
        ERC20_balances.write(recipient, new_recipient_balance)
        Transfer.emit(sender, recipient, amount)
        return ()
    end

    func _approve{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        owner : felt, spender : felt, amount : Uint256
    ):
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)
        end

        with_attr error_message("ERC20: cannot approve from the zero address"):
            assert_not_zero(owner)
        end

        with_attr error_message("ERC20: cannot approve to the zero address"):
            assert_not_zero(spender)
        end

        ERC20_allowances.write(owner, spender, amount)
        Approval.emit(owner, spender, amount)
        return ()
    end

    func _spend_allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        owner : felt, spender : felt, amount : Uint256
    ):
        alloc_locals
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)  # almost surely not needed, might remove after confirmation
        end

        let (current_allowance : Uint256) = ERC20_allowances.read(owner, spender)
        let (infinite : Uint256) = uint256_not(Uint256(0, 0))
        let (is_infinite : felt) = uint256_eq(current_allowance, infinite)

        if is_infinite == FALSE:
            with_attr error_message("ERC20: insufficient allowance"):
                let (new_allowance : Uint256) = uint256_checked_sub_le(current_allowance, amount)
            end

            _approve(owner, spender, new_allowance)
            return ()
        end
        return ()
    end
end
