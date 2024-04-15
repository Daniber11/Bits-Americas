package com.bitsAmericas.bank.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitsAmericas.bank.dao.IAccountDao;
import com.bitsAmericas.bank.dao.IClientDao;
import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.model.Client;
import com.bitsAmericas.bank.response.AccountResponseRest;

@Service 
public class AccountServiceImpl implements IAccountService{
	@Autowired
    private IAccountDao accountDao;
	
	@Autowired
    private IClientDao clientDao;
	
	@Override
	@Transactional(readOnly = true)
    public ResponseEntity<AccountResponseRest> search(){
		
		AccountResponseRest response = new AccountResponseRest();
		
		try {
			
			List<Account> client = (List<Account>) accountDao.findAll();
			
			response.getAccountResponse().setAccount(client);
			
			response.setMetadata("Respuesta ok", "00", "Respuesta Exitosa");
			
		}catch (Exception e){
			
			response.setMetadata("Respuesta No ok", "-1", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<AccountResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
        return new ResponseEntity<AccountResponseRest>(response, HttpStatus.OK);
    }
	
	@Override
	@Transactional(readOnly = true)
    public ResponseEntity<AccountResponseRest> searchById(Long id) {
		
		AccountResponseRest response = new AccountResponseRest();
		
		List<Account> list = new ArrayList<>();
		
		try {
			
			Optional<Account> account = accountDao.findById(id);
			
			if(account.isPresent()) {
				
				list.add(account.get());
				
				response.getAccountResponse().setAccount(list);
				
				response.setMetadata("Respuesta ok", "00", "Cuenta Encontrada");
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cuenta no encontrada");
				
				return  new ResponseEntity<AccountResponseRest>(response, HttpStatus.NOT_FOUND);
				
			}		
						
		}catch (Exception e){
			
			response.setMetadata("Respuesta No ok", "-1", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<AccountResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
        return new ResponseEntity<AccountResponseRest>(response, HttpStatus.OK);
    }
		
	@Override
	@Transactional
	public ResponseEntity<AccountResponseRest> save(Account account, Long clientId) {		
		
		AccountResponseRest response = new AccountResponseRest();
		
		List<Account> list = new ArrayList<>();
		
		try {
			
			//search account to set in the Client object
			Optional<Client> client = clientDao.findById(clientId);
			
			if(client.isPresent()) {
				
				account.setClient(client.get());
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cuenta no encontrada asociada al Cliente");
				
				return new ResponseEntity<AccountResponseRest>(response, HttpStatus.NOT_FOUND);
				
			}
			
			//save the Client
			Account accountsaved = accountDao.save(account);
			
			if(accountsaved != null) {
				
				list.add(accountsaved);
				
				response.getAccountResponse().setAccount(list);;	
				
				response.setMetadata("Respuesta ok", "00", "Cliente Guardado");
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cliente no Guardado");
				
				return new ResponseEntity<AccountResponseRest>(response, HttpStatus.BAD_REQUEST);
				
			}
			
		} catch (Exception e){
			
			e.getStackTrace();
			
			response.setMetadata("Respuesta No ok", "-1", "Error al guardar Cliente");
					
			return new ResponseEntity<AccountResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}		
		
		return new ResponseEntity<AccountResponseRest>(response, HttpStatus.OK);
	}
	
	@Override
	@Transactional
    public ResponseEntity<AccountResponseRest> update( Account account, Long id) {
		
		AccountResponseRest response = new AccountResponseRest();
		
		List<Account> list = new ArrayList<>();
		
		try {
			
			Optional<Account> accountSearch = accountDao.findById(id);
			
			if(accountSearch.isPresent()) {
				
				// Se procedera a actualizar el registro
				accountSearch.get().setNumero(account.getNumero());
				
				accountSearch.get().setSaldo(account.getSaldo());
				
				
				
				Account accountToUpdate = accountDao.save(accountSearch.get());
				
				if(accountToUpdate != null) {
					
					list.add(accountToUpdate);
					
					response.getAccountResponse().setAccount(list);
					
					response.setMetadata("Respuesta ok", "00", "Cuenta Actualizada");
					
				} else {
					
					response.setMetadata("Respuesta No ok", "-1", "Cuenta no Actualizada");
					
					return new ResponseEntity<AccountResponseRest>(response, HttpStatus.BAD_REQUEST);
					
				}
				
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cuenta no Encontrada");
				
				return new ResponseEntity<AccountResponseRest>(response, HttpStatus.NOT_FOUND);
				
			}
						
			
		} catch (Exception e) {
			
			response.setMetadata("Respuesta No ok", "-1", "Error al Actualizar Cuenta");
			e.getStackTrace();
			return new ResponseEntity<AccountResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		return new ResponseEntity<AccountResponseRest>(response, HttpStatus.OK);
    }
	
	@Override
	@Transactional
    public ResponseEntity<AccountResponseRest> deleteById(Long id) {
		AccountResponseRest response = new AccountResponseRest();
		
		try {
			
			accountDao.deleteById(id);
			
			response.setMetadata("Respuesta ok", "00", "Registro Eliminado");
			
		} catch (Exception e) {
			
			response.setMetadata("Respuesta No ok", "-1", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<AccountResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		return new ResponseEntity<AccountResponseRest>(response, HttpStatus.OK);
    }
}
