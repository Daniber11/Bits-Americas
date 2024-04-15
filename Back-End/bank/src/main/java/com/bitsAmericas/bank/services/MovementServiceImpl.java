package com.bitsAmericas.bank.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitsAmericas.bank.dao.IAccountDao;
import com.bitsAmericas.bank.dao.IMovementDao;
import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.model.Movement;
import com.bitsAmericas.bank.response.MovementResponseRest;

@Service
public class MovementServiceImpl implements  IMovementService{

		@Autowired
	    private IMovementDao movementDao;

	    @Autowired
	    private IAccountDao accountDao;	    
	    

	    @Override
	    @Transactional(readOnly = true)
	    public ResponseEntity<MovementResponseRest> searchByAccount(Long accountId) {
	    	
	    	MovementResponseRest response = new MovementResponseRest();
	    	
	        List<Movement> movement = new ArrayList<>();

	        try {
	            Optional<Account> optionalAccount= accountDao.findById(accountId);

	            if (optionalAccount.isPresent()) {
	            	
	            	Account account = optionalAccount.get();
	            	
	                movement = movementDao.findByAccount(account);

	                response.setMetadata("Respuesta ok", "00", "Movimientos encontrados");
	                
	                response.getMovementResponse().setMovement(movement);
	            } else {
	                response.setMetadata("Respuesta No ok", "-1", "Cuenta no encontrada");
	                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	            }
	        } catch (Exception e) {
	            response.setMetadata("Respuesta No ok", "-1", "Error al buscar movimientos");
	            e.printStackTrace();
	            return new ResponseEntity<MovementResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	        return new ResponseEntity<MovementResponseRest>(response, HttpStatus.OK);
	    }
	    
	    @Override
	    @Transactional
	    public ResponseEntity<MovementResponseRest> update(Movement movement, Long id) {
	    	MovementResponseRest response = new MovementResponseRest();

	        try {
	            Optional<Account> optionalCuenta = accountDao.findById(movement.getAccount().getId());

	            if (optionalCuenta.isPresent()) {
	            	Account account = optionalCuenta.get();

	                if (movement.getTipo().equals("débito")) {
	                    BigDecimal nuevoSaldo = account.getSaldo().subtract(movement.getValor());
	                    if (nuevoSaldo.compareTo(BigDecimal.ZERO) < 0) {
	                    	
	                        response.setMetadata("Respuesta No ok", "-1", "Saldo insuficiente");
	                        
	                        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	                    }
	                    
	                    account.setSaldo(nuevoSaldo);
	                    
	                } else if (movement.getTipo().equals("crédito")) {
	                	
	                    BigDecimal nuevoSaldo = account.getSaldo().add(movement.getValor());
	                    
	                    account.setSaldo(nuevoSaldo);
	                } else {
	                    response.setMetadata("Respuesta No ok", "-1", "Tipo de movimiento inválido");
	                    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	                }

	                accountDao.save(account);
	                
	                movementDao.save(movement);

	                response.setMetadata("Respuesta ok", "00", "Movimiento registrado exitosamente");
	            } else {
	            	
	                response.setMetadata("Respuesta No ok", "-1", "Cuenta no encontrada");
	                
	                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
	            }
	        } catch (Exception e) {
	        	
	            response.setMetadata("Respuesta No ok", "-1", "Error al registrar movimiento");
	            
	            e.printStackTrace();
	            
	            return new ResponseEntity<MovementResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	        return new ResponseEntity<MovementResponseRest>(response, HttpStatus.OK);
	    }
	    
	    @Override
	    @Transactional(readOnly = true)
	    public ResponseEntity<MovementResponseRest> searchByDate(Date fechaInicio, Date fechaFin, Long clienteId) {
	    	MovementResponseRest response = new MovementResponseRest();
	        List<Movement> movement = new ArrayList<>();

	        try {
	            List<Account> accounts = accountDao.findByClientId(clienteId);
	            for (Account account : accounts) {
	                List<Movement> movimientosCuenta = movementDao.findByAccountAndDateBetween(account, fechaInicio, fechaFin);
	                movement.addAll(movimientosCuenta);
	            }

	            response.setMetadata("Respuesta ok", "00", "Movimientos encontrados");
	            response.getMovementResponse().setMovement(movement);
	        } catch (Exception e) {
	            response.setMetadata("Respuesta No ok", "-1", "Error al buscar movimientos");
	            e.printStackTrace();
	            return new ResponseEntity<MovementResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	        return new ResponseEntity<MovementResponseRest>(response, HttpStatus.OK);
	    }    
	    	    
	    
	    @Override
		@Transactional
		public ResponseEntity<MovementResponseRest> save(Movement movement, Long accountId) {		
			
	    	MovementResponseRest response = new MovementResponseRest();
			
			List<Movement> list = new ArrayList<>();
			
			try {
				
				//search category to set in the player object
				Optional<Account> account = accountDao.findById(accountId);
				
				if(account.isPresent()) {
					
					movement.setAccount(account.get());
					
				} else {
					
					response.setMetadata("Respuesta No ok", "-1", "Movieminto no encontrada asociada a la Cuenta");
					
					return new ResponseEntity<MovementResponseRest>(response, HttpStatus.NOT_FOUND);
					
				}
				
				//save the moviment
				Movement movementsaved = movementDao.save(movement);
				
				if(movementsaved != null) {
					
					list.add(movementsaved);
					
					response.getMovementResponse().setMovement(list);	
					
					response.setMetadata("Respuesta ok", "00", "Movimiento Guardado");
					
				} else {
					
					response.setMetadata("Respuesta No ok", "-1", "Movimiento no Guardado");
					
					return new ResponseEntity<MovementResponseRest>(response, HttpStatus.BAD_REQUEST);
					
				}
				
			} catch (Exception e){
				
				e.getStackTrace();
				
				response.setMetadata("Respuesta No ok", "-1", "Error al guardar Jugador");
						
				return new ResponseEntity<MovementResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				
			}		
			
			return new ResponseEntity<MovementResponseRest>(response, HttpStatus.OK);
		}
}
