package com.bitsAmericas.bank.services;

import org.springframework.http.ResponseEntity;

import com.bitsAmericas.bank.model.Client;
import com.bitsAmericas.bank.response.ClientResponseRest;

public interface IClientService {

	public ResponseEntity<ClientResponseRest> search();
	
	public ResponseEntity<ClientResponseRest> searchById(Long id);
	
	public ResponseEntity<ClientResponseRest> save(Client client);
	
	public ResponseEntity<ClientResponseRest> update(Client client, Long id);
	
	public ResponseEntity<ClientResponseRest> deleteById(Long id);
	
}
