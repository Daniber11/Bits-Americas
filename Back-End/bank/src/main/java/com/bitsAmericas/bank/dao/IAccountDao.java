package com.bitsAmericas.bank.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bitsAmericas.bank.model.Account;

@Repository
public interface IAccountDao extends JpaRepository<Account, Long> {

	List<Account> findByClientId(Long clientId);	
	
}
