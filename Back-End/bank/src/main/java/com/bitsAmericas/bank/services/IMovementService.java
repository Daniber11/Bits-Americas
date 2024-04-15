package com.bitsAmericas.bank.services;

import java.util.Date;

import org.springframework.http.ResponseEntity;

import com.bitsAmericas.bank.model.Movement;
import com.bitsAmericas.bank.response.MovementResponseRest;



public interface IMovementService {
	
	public ResponseEntity<MovementResponseRest> searchByAccount(Long accountId);
	
	public ResponseEntity<MovementResponseRest> searchByDate(Date fechaInicio, Date fechaFin, Long clientId);
		
	public ResponseEntity<MovementResponseRest> update(Movement movement, Long id);
	
	public ResponseEntity<MovementResponseRest> save(Movement movement, Long accountid);
}
