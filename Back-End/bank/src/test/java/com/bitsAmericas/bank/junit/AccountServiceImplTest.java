package com.bitsAmericas.bank.junit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
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

import com.bitsAmericas.bank.dao.IAccountDao;
import com.bitsAmericas.bank.dao.IClientDao;
import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.model.Client;
import com.bitsAmericas.bank.response.AccountResponseRest;
import com.bitsAmericas.bank.services.AccountServiceImpl;

public class AccountServiceImplTest {

    @Mock
    private IAccountDao accountDao;

    @Mock
    private IClientDao clientDao;

    @InjectMocks
    private AccountServiceImpl accountService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSearchById_AccountFound() {
        // Mocking data
        Long accountId = 1L;
        Account account = new Account();
        account.setId(accountId);
        account.setNumero("12345");
        account.setSaldo(BigDecimal.valueOf(100.00));

        // Mocking behavior
        when(accountDao.findById(accountId)).thenReturn(Optional.of(account));

        // Executing the method
        ResponseEntity<AccountResponseRest> responseEntity = accountService.searchById(accountId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        
        String actualType = responseEntity.getBody().getMetadata().get(0).get("type");
        System.out.println("Actual Type: " + actualType);
        System.out.println("Expected Type: Respuesta ok");
        
        assertTrue(actualType.trim().equalsIgnoreCase("Respuesta ok"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cuenta Encontrada", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(1, responseEntity.getBody().getAccountResponse().getAccount().size());
        assertEquals(accountId, responseEntity.getBody().getAccountResponse().getAccount().get(0).getId());
        assertEquals("12345", responseEntity.getBody().getAccountResponse().getAccount().get(0).getNumero());
        assertEquals(BigDecimal.valueOf(100.00), responseEntity.getBody().getAccountResponse().getAccount().get(0).getSaldo());
    }

    
    
    @Test
    public void testSave_AccountSaved() {
        // Mocking data
        Long clientId = 1L;
        Client client = new Client();
        client.setId(clientId);
        client.setNombre("John Doe");

        Account account = new Account();
        account.setId(1L);
        account.setNumero("12345");
        account.setSaldo(BigDecimal.valueOf(100.00));
        account.setClient(client);

        // Mocking behavior
        when(clientDao.findById(clientId)).thenReturn(Optional.of(client));
        when(accountDao.save(account)).thenReturn(account);

        // Executing the method
        ResponseEntity<AccountResponseRest> responseEntity = accountService.save(account, clientId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cliente Guardado", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(1, responseEntity.getBody().getAccountResponse().getAccount().size());
        assertEquals(account.getId(), responseEntity.getBody().getAccountResponse().getAccount().get(0).getId());
        assertEquals(account.getNumero(), responseEntity.getBody().getAccountResponse().getAccount().get(0).getNumero());
        assertEquals(account.getSaldo(), responseEntity.getBody().getAccountResponse().getAccount().get(0).getSaldo());
    }


    @Test
    public void testSearch() {
        // Mocking data
        List<Account> accounts = new ArrayList<>();
        Account account1 = new Account();
        account1.setId(1L);
        account1.setNumero("12345");
        account1.setSaldo(BigDecimal.valueOf(100.00));

        Account account2 = new Account();
        account2.setId(2L);
        account2.setNumero("67890");
        account2.setSaldo(BigDecimal.valueOf(200.00));

        accounts.add(account1);
        accounts.add(account2);

        // Mocking behavior
        when(accountDao.findAll()).thenReturn(accounts);

        // Executing the method
        ResponseEntity<AccountResponseRest> responseEntity = accountService.search();

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Respuesta Exitosa", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(2, responseEntity.getBody().getAccountResponse().getAccount().size());
        assertEquals(1L, responseEntity.getBody().getAccountResponse().getAccount().get(0).getId());
        assertEquals("12345", responseEntity.getBody().getAccountResponse().getAccount().get(0).getNumero());
        assertEquals(BigDecimal.valueOf(100.00), responseEntity.getBody().getAccountResponse().getAccount().get(0).getSaldo());
        assertEquals(2L, responseEntity.getBody().getAccountResponse().getAccount().get(1).getId());
        assertEquals("67890", responseEntity.getBody().getAccountResponse().getAccount().get(1).getNumero());
        assertEquals(BigDecimal.valueOf(200.00), responseEntity.getBody().getAccountResponse().getAccount().get(1).getSaldo());
    }

    @Test
    public void testUpdate_AccountUpdated() {
        // Mocking data
        Long accountId = 1L;
        Account account = new Account();
        account.setId(accountId);
        account.setNumero("12345");
        account.setSaldo(BigDecimal.valueOf(100.00));

        // Mocking behavior
        when(accountDao.findById(accountId)).thenReturn(Optional.of(account));
        when(accountDao.save(account)).thenReturn(account);

        // Executing the method
        ResponseEntity<AccountResponseRest> responseEntity = accountService.update(account, accountId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cuenta Actualizada", responseEntity.getBody().getMetadata().get(0).get("date"));
    }

    @Test
    public void testDeleteById_AccountDeleted() {
        // Mocking data
        Long accountId = 1L;

        // Executing the method
        ResponseEntity<AccountResponseRest> responseEntity = accountService.deleteById(accountId);

        // Verifying the result
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Registro Eliminado", responseEntity.getBody().getMetadata().get(0).get("date"));
    }
}
