package com.bitsAmericas.bank.response;

import java.util.List;

import com.bitsAmericas.bank.model.Movement;

import lombok.Data;

@Data
public class MovementResponse {
	
	private List<Movement> movement;
	
}
