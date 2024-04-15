package com.bitsAmericas.bank.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.bitsAmericas.bank.model.Movement;
import com.bitsAmericas.bank.response.MovementResponseRest;
import com.bitsAmericas.bank.services.IMovementService;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class MovementRestController {

    @Autowired
    private IMovementService service;

    @GetMapping("/movements/accounts/{accountId}")
    public ResponseEntity<MovementResponseRest> searchByAccount(@PathVariable Long accountId) {
    	
        ResponseEntity<MovementResponseRest> response = service.searchByAccount(accountId);
        
        return response;
    }

    @PutMapping("/movements")
    public ResponseEntity<MovementResponseRest> update(@RequestParam Movement movement,  Long id) {
    	
        ResponseEntity<MovementResponseRest> response = service.update(movement , id);
        
        return response;
    }

    @GetMapping("/movements/clients/{clientId}")
    public ResponseEntity<MovementResponseRest> searchByDate(
            @RequestParam(name = "startDate") Date startDate,
            @RequestParam(name = "endDate") Date endDate,
            @PathVariable Long clientId) {
    	
        ResponseEntity<MovementResponseRest> response = service.searchByDate(startDate, endDate, clientId);
        
        return response;
    }
    
    @PostMapping("/movements")
    public ResponseEntity<MovementResponseRest> save(@RequestBody Movement movement, Long id) {
    	
        ResponseEntity<MovementResponseRest> response = service.save(movement, id);
        
        return response;
    }
}
