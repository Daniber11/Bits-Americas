package com.bitsAmericas.bank.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Movement implements Serializable {
		
	private static final long serialVersionUID = -5786766726587809640L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    private String tipo;
    private Date fecha;
    private BigDecimal valor;
    
    @ManyToOne
    private Account account;
}
