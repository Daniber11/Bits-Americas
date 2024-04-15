package com.bitsAmericas.bank.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitsAmericas.bank.model.Client;

public interface IClientDao extends JpaRepository<Client, Long> {

}
