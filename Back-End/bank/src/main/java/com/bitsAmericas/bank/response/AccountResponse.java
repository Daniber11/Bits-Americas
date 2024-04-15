package com.bitsAmericas.bank.response;

import java.util.List;

import com.bitsAmericas.bank.model.Account;

import lombok.Data;

@Data
public class AccountResponse {
	
	private List<Account> account;
	
}
