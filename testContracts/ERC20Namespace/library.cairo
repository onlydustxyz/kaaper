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
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   name(felt): The name of the token
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


    func transfer_from{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        sender : felt, recipient : felt, amount : Uint256
    ) -> ():
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
        # Returns:
        #   None
        # Throws:
        #   None
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
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
        # Returns:
        #   None
        # Throws:
        #   None
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)
        end
        
        let (caller) = get_caller_address()
        _approve(caller, spender, amount)
        return ()
    end

    func decrease_allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spender : felt, subtracted_value : Uint256
    ) -> ():
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
        # Returns:
        #   None
        # Throws:
        #   None
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
end

namespace internal:
    #
    # Constructor
    #

    func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        name : felt, symbol : felt, multiplier : felt
    ):
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
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


    func transfer_from{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        sender : felt, recipient : felt, amount : Uint256
    ) -> ():
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
        # Returns:
        #   None
        # Throws:
        #   None
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
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
        # Returns:
        #   None
        # Throws:
        #   None
        with_attr error_message("ERC20: amount is not a valid Uint256"):
            uint256_check(amount)
        end
        
        let (caller) = get_caller_address()
        _approve(caller, spender, amount)
        return ()
    end

    func decrease_allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
        spender : felt, subtracted_value : Uint256
    ) -> ():
        # Desc:
        #   Initializes the contract with the given name, symbol, and decimals
        # Explicit args:
        #   name(felt): The name of the token
        #   symbol(felt): The symbol of the token
        #   multiplier(felt): The multiplier of the token
        # Returns:
        #   None
        # Throws:
        #   None
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
end