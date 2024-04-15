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

import com.bitsAmericas.bank.model.Client;
import com.bitsAmericas.bank.response.ClientResponseRest;
import com.bitsAmericas.bank.services.IClientService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class ClientRestController {

    @Autowired
    private IClientService service;

    @GetMapping("/clients")
    public ResponseEntity<ClientResponseRest> searchClient() {
    	
    	ResponseEntity<ClientResponseRest> response = service.search();
		
		return response;        
        
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<ClientResponseRest> searchClientById(@PathVariable Long id) {
    	
    	ResponseEntity<ClientResponseRest> response = service.searchById(id);
		
		return response; 
    }

    @PostMapping("/clients")
    public ResponseEntity<ClientResponseRest> save(@RequestBody Client client) {
    	
    	ResponseEntity<ClientResponseRest> response = service.save(client);
		
		return response; 
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<ClientResponseRest> update(@RequestBody Client client,@PathVariable Long id) {
    	
    	ResponseEntity<ClientResponseRest> response = service.update(client, id);
		
		return response; 
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<ClientResponseRest> deleteById(@PathVariable Long id) {
    	
    	ResponseEntity<ClientResponseRest> response = service.deleteById(id);
		
		return response; 
    }
}

