# SPDX-License-Identifier: MIT
# OpenZeppelin Contracts for Cairo v0.1.0 (token/erc20/ERC20.cairo)

%lang starknet

from starkware.cairo.common.cairo_builtins import HashBuiltin
from starkware.cairo.common.bool import TRUE
from starkware.cairo.common.uint256 import Uint256

from src.openzeppelin.token.erc20.library import ERC20

@constructor
func constructor{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    name : felt, symbol : felt, decimals : Uint256, initial_supply : Uint256, recipient : felt
):
    # Desc:
    #   Initialize the contract
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   name(felt): name of the token
    #   symbol(felt): symbol of the token
    #   decimals(Uint256): floating point of the token
    #   initial_supply(Uint256): amount of initial supply of the token
    #   recipient(felt): the address of recipient of the initial supply
    # Returns:
    #   None
    # Raises:
    #   decimals: decimals exceed 2^8
    #   recipient: cannot mint to the zero address
    #   initial_supply: not valid Uint256
    #   initial_supply: mint overflow
    ERC20.constructor(name, symbol, decimals)
    ERC20._mint(recipient, initial_supply)
    return ()
end

#
# Getters
#

@view
func name{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (name : felt):
    # Desc:
    #   Returns the name of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   name(felt): name of the token
    let (name) = ERC20.name()
    return (name)
end

@view
func symbol{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (symbol : felt):
    # Desc:
    #   Returns the symbol of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   symbol(felt): symbol of the token
    let (symbol) = ERC20.symbol()
    return (symbol)
end

@view
func totalSupply{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    totalSupply : Uint256
):
    # Desc:
    #   Returns the total supply of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   totalSupply(Uint256): total supply of the token
    let (totalSupply : Uint256) = ERC20.total_supply()
    return (totalSupply)
end

@view
func decimals{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}() -> (
    decimals : felt
):
    # Desc:
    #   Returns the decimals of the token
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Returns:
    #   decimals(felt): decimals of the token

    let (decimals) = ERC20.decimals()
    return (decimals)
end

@view
func balanceOf{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    account : felt
) -> (balance : Uint256):
    # Desc:
    #   Returns the balance of the account
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   account(felt): account to query balance for
    # Returns:
    #   balance(Uint256): the balance of the account
    let (balance : Uint256) = ERC20.balance_of(account)
    return (balance)
end

@view
func allowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    owner : felt, spender : felt
) -> (remaining : Uint256):
    # Desc
    #   Returns the amount of remaining tokens allowed to be spent by the spender
    # Implicit args
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args
    #   owner(felt): the address of owner of the tokens
    #   spender(felt): the address of spender (delegated account) of the tokens
    # Returns
    #   remaining(Uint256): the amount of remaining tokens allowed to be spent by the spender
    let (remaining : Uint256) = ERC20.allowance(owner, spender)
    return (remaining)
end

#
# Externals
#

@external
func transfer{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    recipient : felt, amount : Uint256
) -> (success : felt):
        # Desc:
        #   Perform transfer to recipient
        # Implicit args:
        #   syscall_ptr(felt*)
        #   pedersen_ptr(HashBuiltin*)
        #   range_check_ptr
        # Explicit args:
        #   recipient(felt): the address of ERC20 recipient
        #   amount(Uint256): the amount of ERC20 transfer
        # Returns:
        #   success(felt): 1 if transfer was successful, 0 otherwise
        # Raises:
        #   amount: amount is not a valid Uint256
        #   recipient: cannot transfer to the zero address
        #   amount: transfer amount exceeds balance
    ERC20.transfer(recipient, amount)
    return (TRUE)
end

@external
func transferFrom{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    sender : felt, recipient : felt, amount : Uint256
) -> (success : felt):
    # Desc:
    #   Perform transfer from sender to recipient with allowance
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   sender(felt): the address of ERC20 sender
    #   recipient(felt): the address of ERC20 recipient
    #   amount(Uint256): the amount of ERC20 transfer
    # Returns:
    #   success(felt): 1 if transfer was successful, 0 otherwise
    # Raises:
    #   amount: amount is not a valid Uint256
    #   sender: cannot transfer from the zero address
    #   amount: transfer amount exceeds balance
    ERC20.transfer_from(sender, recipient, amount)
    return (TRUE)
end

@external
func approve{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spender : felt, amount : Uint256
) -> (success : felt):
    # Desc:
    #   Approve spender to spend amount of tokens
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   spender(felt): the address of ERC20 spender
    #   amount(Uint256): the amount of ERC20 token to approve
    # Returns:
    #   success(felt): 1 if approve was successful, 0 otherwise
    # Raises:
    #   amount: amount is not a valid Uint256
    #   spender: cannot approve to the zero address


    ERC20.approve(spender, amount)
    return (TRUE)
end

@external
func increaseAllowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spender : felt, added_value : Uint256
) -> (success : felt):
    # Desc:
    #   Increase allowance of spender by added_value
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   spender(felt): the address of ERC20 spender
    #   added_value(Uint256): the amount of ERC20 token to increase allowance
    # Returns:
    #   success(felt): 1 if increase allowance was successful, 0 otherwise
    # Raises:
    #   added_value: added_value is not a valid Uint256
    #   spender: cannot increase allowance to the zero address

    ERC20.increase_allowance(spender, added_value)
    return (TRUE)
end

@external
func decreaseAllowance{syscall_ptr : felt*, pedersen_ptr : HashBuiltin*, range_check_ptr}(
    spender : felt, subtracted_value : Uint256
) -> (success : felt):
    # Desc:
    #   Decrease allowance of spender by subtracted_value
    # Implicit args:
    #   syscall_ptr(felt*)
    #   pedersen_ptr(HashBuiltin*)
    #   range_check_ptr
    # Explicit args:
    #   spender(felt): the address of ERC20 spender
    #   subtracted_value(Uint256): the amount of ERC20 token to decrease allowance
    # Returns:
    #   success(felt): 1 if decrease allowance was successful, 0 otherwise
    # Raises:
    #   subtracted_value: subtracted_value is not a valid Uint256
    #   spender: cannot decrease allowance to the zero address
    ERC20.decrease_allowance(spender, subtracted_value)
    return (TRUE)
end
