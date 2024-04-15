package com.bitsAmericas.bank.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bitsAmericas.bank.dao.IClientDao;
import com.bitsAmericas.bank.model.Client;
import com.bitsAmericas.bank.response.ClientResponseRest;

@Service
public class ClientServiceImpl implements IClientService {
	
	@Autowired
    private IClientDao clientDao;
	
	@Override
	@Transactional(readOnly = true)
    public ResponseEntity<ClientResponseRest> search(){
		
		ClientResponseRest response = new ClientResponseRest();
		
		try {
			
			List<Client> client = (List<Client>) clientDao.findAll();
			
			response.getClientResponse().setClient(client);
			
			response.setMetadata("Respuesta ok", "00", "Respuesta Exitosa");
			
		}catch (Exception e){
			
			response.setMetadata("Respuesta No ok", "-1", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<ClientResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
        return new ResponseEntity<ClientResponseRest>(response, HttpStatus.OK);
    }
	
	@Override
	@Transactional(readOnly = true)
    public ResponseEntity<ClientResponseRest> searchById(Long id) {
		
		ClientResponseRest response = new ClientResponseRest();
		
		List<Client> list = new ArrayList<>();
		
		try {
			
			Optional<Client> client = clientDao.findById(id);
			
			if(client.isPresent()) {
				
				list.add(client.get());
				
				response.getClientResponse().setClient(list);
				
				response.setMetadata("Respuesta  ok", "00", "Cliente Encontrada");
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cliente no encontrada");
				
				return  new ResponseEntity<ClientResponseRest>(response, HttpStatus.NOT_FOUND);
				
			}		
						
		}catch (Exception e){
			
			response.setMetadata("Respuesta No ok", "-1", "Error al consultar");
			e.getStackTrace();
			return new ResponseEntity<ClientResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
        return new ResponseEntity<ClientResponseRest>(response, HttpStatus.OK);
    }
	
	@Override
	@Transactional
    public ResponseEntity<ClientResponseRest> save(Client client) {
		
		ClientResponseRest response = new ClientResponseRest();
		
		List<Client> list = new ArrayList<>();
		
		try {
			
			Client clientSaved = clientDao.save(client);
			
			if (clientSaved != null) {
				
				list.add(clientSaved);
				
				response.getClientResponse().setClient(list);
				
				response.setMetadata("Respuesta ok", "00", "Cliente Guardada");
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cliente no guardada");
				
				return new ResponseEntity<ClientResponseRest>(response, HttpStatus.BAD_REQUEST);
				
			}
						
			
		} catch (Exception e) {
			
			response.setMetadata("Respuesta No ok", "-1", "Error al Guardar Cliente");
			e.getStackTrace();
			return new ResponseEntity<ClientResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		return new ResponseEntity<ClientResponseRest>(response, HttpStatus.OK);
	}
	
	@Override
	@Transactional
    public ResponseEntity<ClientResponseRest> update( Client client, Long id) {
		ClientResponseRest response = new ClientResponseRest();
		
		List<Client> list = new ArrayList<>();
		
		try {
			
			Optional<Client> clientSearch = clientDao.findById(id);
			
			if(clientSearch.isPresent()) {
				
				// Se procedera a actualizar el registro
				clientSearch.get().setNombre(client.getNombre());
				
				clientSearch.get().setDireccion(client.getDireccion());
				
				clientSearch.get().setTelefono(client.getTelefono());
				
				Client clientToUpdate = clientDao.save(clientSearch.get());
				
				if(clientToUpdate != null) {
					
					list.add(clientToUpdate);
					
					response.getClientResponse().setClient(list);
					
					response.setMetadata("Respuesta ok", "00", "Cliente Actualizada");
					
				} else {
					
					response.setMetadata("Respuesta No ok", "-1", "Cliente no Actualizada");
					
					return new ResponseEntity<ClientResponseRest>(response, HttpStatus.BAD_REQUEST);
					
				}
				
				
			} else {
				
				response.setMetadata("Respuesta No ok", "-1", "Cliente no Encontrada");
				
				return new ResponseEntity<ClientResponseRest>(response, HttpStatus.NOT_FOUND);
				
			}
						
			
		} catch (Exception e) {
			
			response.setMetadata("Respuesta No ok", "-1", "Error al Actualizar Cliente");
			e.getStackTrace();
			return new ResponseEntity<ClientResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		return new ResponseEntity<ClientResponseRest>(response, HttpStatus.OK);
    }
	
	@Override
	@Transactional
    public ResponseEntity<ClientResponseRest> deleteById(Long id) {
		ClientResponseRest response = new ClientResponseRest();
		
		try {
			
			clientDao.deleteById(id);
			
			response.setMetadata("Respuesta ok", "00", "Registro Eliminado");
			
		} catch (Exception e) {
			
			response.setMetadata("Respuesta No ok", "-1", "Error al Eliminar");
			e.getStackTrace();
			return new ResponseEntity<ClientResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
		return new ResponseEntity<ClientResponseRest>(response, HttpStatus.OK);
    }
}
