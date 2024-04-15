package com.bitsAmericas.bank.dao;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.model.Movement;

public interface IMovementDao extends JpaRepository <Movement, Long>{

	List<Movement> findByAccount(Account account);
	
	List<Movement> findByAccountAndDateBetween(Account account, Date fechaInicio, Date fechaFin);
	
}
