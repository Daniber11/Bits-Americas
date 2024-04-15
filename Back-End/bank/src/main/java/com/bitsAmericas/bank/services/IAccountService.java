package com.bitsAmericas.bank.services;

import org.springframework.http.ResponseEntity;

import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.response.AccountResponseRest;


public interface IAccountService {
	
	public ResponseEntity<AccountResponseRest> search();
	
	public ResponseEntity<AccountResponseRest> searchById(Long id);
	
	public ResponseEntity<AccountResponseRest> save(Account account, Long clientId);
	
	public ResponseEntity<AccountResponseRest> update(Account account, Long id);
	
	public ResponseEntity<AccountResponseRest> deleteById(Long id);

}
