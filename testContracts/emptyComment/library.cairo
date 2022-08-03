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
end


@event
func Approval(owner : felt, spender : felt, value : Uint256):
end

#
# Storage
#

@storage_var
func ERC20_name() -> (name : felt):
end

@storage_var
func ERC20_symbol() -> (symbol : felt):
end


@storage_var
func ERC20_total_supply() -> (total_supply : Uint256):
    # Desc: 
    #   Returns total amount of tokens in existence
    # Returns:
    #   total_supply(Uint256): The total amount of tokens in existence
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

    
end

namespace internal:
    

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
    ) -> ():

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