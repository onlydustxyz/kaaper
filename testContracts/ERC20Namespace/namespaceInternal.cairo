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