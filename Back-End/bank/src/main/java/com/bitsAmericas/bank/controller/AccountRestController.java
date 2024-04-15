package com.bitsAmericas.bank.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.response.AccountResponseRest;
import com.bitsAmericas.bank.services.IAccountService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class AccountRestController {

    @Autowired
    private IAccountService service;

    @GetMapping("/accounts")
    public ResponseEntity<AccountResponseRest> searchAccount() {
    	
        ResponseEntity<AccountResponseRest> response = service.search();
        
        return response;
    }

    @GetMapping("/accounts/{id}")
    public ResponseEntity<AccountResponseRest> searchAccountById(@PathVariable Long id) {
    	
        ResponseEntity<AccountResponseRest> response = service.searchById(id);
        
        return response;
    }

    @PostMapping("/accounts")
    public ResponseEntity<AccountResponseRest> save(@RequestBody Account account, Long id) {
    	
        ResponseEntity<AccountResponseRest> response = service.save(account, id);
        
        return response;
    }

    @PutMapping("/accounts/{id}")
    public ResponseEntity<AccountResponseRest> update( @RequestBody Account account, @PathVariable Long id) {
    	
        ResponseEntity<AccountResponseRest> response = service.update(account, id);
        
        return response;
    }

    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<AccountResponseRest> deleteById(@PathVariable Long id) {
    	
        ResponseEntity<AccountResponseRest> response = service.deleteById(id);
        
        return response;
    }
}

