package com.bitsAmericas.bank.junit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.bitsAmericas.bank.dao.IClientDao;
import com.bitsAmericas.bank.model.Client;
import com.bitsAmericas.bank.response.ClientResponseRest;
import com.bitsAmericas.bank.services.ClientServiceImpl;


public class ClientServiceImplTest {

    @Mock
    private IClientDao clientDao;

    @InjectMocks
    private ClientServiceImpl clientService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearchById_ClientFound() {
        // Mocking data
        Long clientId = 1L;
        Client client = new Client();
        client.setId(clientId);
        client.setNombre("John Doe");

        // Mocking behavior
        when(clientDao.findById(clientId)).thenReturn(Optional.of(client));

        // Executing the method
        ResponseEntity<ClientResponseRest> responseEntity = clientService.searchById(clientId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta  ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cliente Encontrada", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(1, responseEntity.getBody().getClientResponse().getClient().size());
        assertEquals(clientId, responseEntity.getBody().getClientResponse().getClient().get(0).getId());
        assertEquals("John Doe", responseEntity.getBody().getClientResponse().getClient().get(0).getNombre());
    }
    
    @Test
    public void testSave_ClientSaved() {
        // Mocking data
        Client client = new Client();

        // Mocking behavior
        when(clientDao.save(client)).thenReturn(client);

        // Executing the method
        ResponseEntity<ClientResponseRest> responseEntity = clientService.save(client);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cliente Guardada", responseEntity.getBody().getMetadata().get(0).get("date"));
    }
    
    @Test
    public void testSearch() {
        // Mocking data
        List<Client> clients = new ArrayList<>();
        Client client1 = new Client();
        client1.setId(1L); 
        client1.setNombre("John Doe");
        
        Client client2 = new Client();
        client2.setId(2L);
        client2.setNombre("Jane Smith");

        clients.add(client1);
        clients.add(client2);

        // Mocking behavior
        when(clientDao.findAll()).thenReturn(clients);

        // Executing the method
        ResponseEntity<ClientResponseRest> responseEntity = clientService.search();

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Respuesta Exitosa", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(2, responseEntity.getBody().getClientResponse().getClient().size());
        assertEquals(1L, responseEntity.getBody().getClientResponse().getClient().get(0).getId());
        assertEquals("John Doe", responseEntity.getBody().getClientResponse().getClient().get(0).getNombre());
        assertEquals(2L, responseEntity.getBody().getClientResponse().getClient().get(1).getId());
        assertEquals("Jane Smith", responseEntity.getBody().getClientResponse().getClient().get(1).getNombre());
    }



    @Test
    public void testUpdate_ClientUpdated() {
        // Mocking data
        Long clientId = 1L;
        Client client = new Client();
        client.setId(clientId);
        client.setNombre("John Doe");

        // Mocking behavior
        when(clientDao.findById(clientId)).thenReturn(Optional.of(client));
        when(clientDao.save(client)).thenReturn(client);

        // Executing the method
        ResponseEntity<ClientResponseRest> responseEntity = clientService.update(client, clientId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cliente Actualizada", responseEntity.getBody().getMetadata().get(0).get("date"));
    }

    @Test
    public void testDeleteById_ClientDeleted() {
        // Mocking data
        Long clientId = 1L;

        // Executing the method
        ResponseEntity<ClientResponseRest> responseEntity = clientService.deleteById(clientId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Registro Eliminado", responseEntity.getBody().getMetadata().get(0).get("date"));
    }

    
    
}
