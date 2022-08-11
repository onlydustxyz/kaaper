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
    # Explicit args:
    #   symbol(felt): The symbol of the token
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
    #   Returns the amount of tokens owned by an account
    # Explicit args:
    #   account(felt): The address of the account
    # Returns:
    #   balance(Uint256): The amount of tokens owned by an account
end

@storage_var
func ERC20_allowances(owner : felt, spender : felt) -> (allowance : Uint256):
    # Desc: 
    #   Store the amount of tokens that an owner is allowed to delegate to a spender
    # Explicit args:
    #   owner(felt): The address of the owner
    #   spender(felt): The address of the spender
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
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Implicit args:
        #   syscall_ptr(felt)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   names(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
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
        # Desc:
        #   Returns the name of the token
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Returns:
        #   name(felt): The name of the token
        let (name) = ERC20_name.read()
        return (name)
    end


    func transfer_from{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        sender : felt, recipient : felt, amount : Uint256
    ) -> ():
        # Desc:
        #   Transfers tokens from one account to another
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   sender(felt): The address of the sender
        #   recipient(felt): The address of the recipient
        #   amount(Uint256): The amount of tokens to be transferred
        alloc_locals
        let (caller) = get_caller_address()
        # subtract allowance
        _spend_allowance(sender, caller, amount)
        # execute transfer
        _transfer(sender, recipient, amount)
        return ()
    end

    
end

namespace internal:
    

    func _mint{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        recipient : felt, amount : Uint256
    ):
        # Desc:
        #   Mints tokens to an account
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   recipient(felt): The address of the recipient
        #   amount(felt): The amount of tokens to be minted
        # Returns:
        #   None

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
    ) -> ():
        # Desc:
        #   Burns tokens from an account
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   account(felt): The address of the recipient
        #   amount(Uint256): The amount of tokens to be burned

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

    #
    # Public functions
    #

end