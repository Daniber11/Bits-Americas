package com.bitsAmericas.bank.response;

import java.util.List;

import com.bitsAmericas.bank.model.Client;

import lombok.Data;

@Data
public class ClientResponse {
	 
	private List<Client> client;
}
