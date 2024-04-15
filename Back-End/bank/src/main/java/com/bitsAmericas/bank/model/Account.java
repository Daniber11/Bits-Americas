package com.bitsAmericas.bank.model;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Account implements Serializable {

		private static final long serialVersionUID = -6114700227410211609L;
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    private String numero;
	    private BigDecimal saldo;
	    
	    @ManyToOne
	    private Client client;

}
