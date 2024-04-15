package com.bitsAmericas.bank.junit;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
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
import com.bitsAmericas.bank.dao.IMovementDao;
import com.bitsAmericas.bank.model.Account;
import com.bitsAmericas.bank.model.Movement;
import com.bitsAmericas.bank.response.MovementResponseRest;
import com.bitsAmericas.bank.services.MovementServiceImpl;

public class MovementServiceImplTest {

    @Mock
    private IMovementDao movementDao;

    @Mock
    private IAccountDao accountDao;

    @InjectMocks
    private MovementServiceImpl movementService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testUpdate_CreditMovement() {
        Long accountId = 1L;
        BigDecimal amount = BigDecimal.valueOf(500);
        Account account = new Account();
        account.setId(accountId);
        account.setSaldo(BigDecimal.valueOf(1000));

        Movement movement = new Movement();
        movement.setAccount(account);
        movement.setTipo("crédito");
        movement.setValor(amount);

        when(accountDao.findById(accountId)).thenReturn(Optional.of(account));

        ResponseEntity<MovementResponseRest> responseEntity = movementService.update(movement, accountId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Movimiento registrado exitosamente", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(BigDecimal.valueOf(1500), account.getSaldo());
    }

    
    
    @Test
    public void testSearchByAccount_AccountFound() {
        Long accountId = 1L;
        Account account = new Account();
        account.setId(accountId);
        account.setSaldo(BigDecimal.valueOf(1000));

        List<Movement> movements = new ArrayList<>();
        Movement movement1 = new Movement();
        movement1.setId(1L);
        movement1.setAccount(account);
        movement1.setTipo("crédito");
        movement1.setValor(BigDecimal.valueOf(500));
        movements.add(movement1);

        when(accountDao.findById(accountId)).thenReturn(Optional.of(account));
        when(movementDao.findByAccount(account)).thenReturn(movements);

        ResponseEntity<MovementResponseRest> responseEntity = movementService.searchByAccount(accountId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Movimientos encontrados", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(movements, responseEntity.getBody().getMovementResponse().getMovement());
    }

    @Test
    public void testSearchByAccount_AccountNotFound() {
        Long accountId = 1L;

        when(accountDao.findById(accountId)).thenReturn(Optional.empty());

        ResponseEntity<MovementResponseRest> responseEntity = movementService.searchByAccount(accountId);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Respuesta No ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("-1", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Cuenta no encontrada", responseEntity.getBody().getMetadata().get(0).get("date"));
    }

    @Test
    public void testUpdate_InvalidMovementType() {
        Long accountId = 1L;
        Account account = new Account();
        account.setId(accountId);
        account.setSaldo(BigDecimal.valueOf(1000));

        Movement movement = new Movement();
        movement.setAccount(account);
        movement.setTipo("invalido");
        movement.setValor(BigDecimal.valueOf(500));

        when(accountDao.findById(accountId)).thenReturn(Optional.of(account));

        ResponseEntity<MovementResponseRest> responseEntity = movementService.update(movement, accountId);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Respuesta No ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("-1", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Tipo de movimiento inválido", responseEntity.getBody().getMetadata().get(0).get("date"));
    }

    @Test
    public void testUpdate_InsufficientBalance() {
        Long accountId = 1L;
        Account account = new Account();
        account.setId(accountId);
        account.setSaldo(BigDecimal.valueOf(100));

        Movement movement = new Movement();
        movement.setAccount(account);
        movement.setTipo("débito");
        movement.setValor(BigDecimal.valueOf(200));

        when(accountDao.findById(accountId)).thenReturn(Optional.of(account));

        ResponseEntity<MovementResponseRest> responseEntity = movementService.update(movement, accountId);

        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Respuesta No ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("-1", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Saldo insuficiente", responseEntity.getBody().getMetadata().get(0).get("date"));
    }

    @Test
    public void testSearchByDate_MovementsFound() {
        Long clientId = 1L;
        Date fechaInicio = new Date();
        Date fechaFin = new Date();

        List<Account> accounts = new ArrayList<>();
        Account account = new Account();
        account.setId(1L);
        account.setSaldo(BigDecimal.valueOf(1000));
        accounts.add(account);

        List<Movement> movements = new ArrayList<>();
        Movement movement1 = new Movement();
        movement1.setId(1L);
        movement1.setAccount(account);
        movement1.setTipo("crédito");
        movement1.setValor(BigDecimal.valueOf(500));
        movements.add(movement1);

        when(accountDao.findByClientId(clientId)).thenReturn(accounts);
        when(movementDao.findByAccountAndDateBetween(account, fechaInicio, fechaFin)).thenReturn(movements);

        ResponseEntity<MovementResponseRest> responseEntity = movementService.searchByDate(fechaInicio, fechaFin, clientId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Movimientos encontrados", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(movements, responseEntity.getBody().getMovementResponse().getMovement());
    }

    @Test
    public void testSearchByDate_NoMovementsFound() {
        Long clientId = 1L;
        Date fechaInicio = new Date();
        Date fechaFin = new Date();

        List<Account> accounts = new ArrayList<>();
        Account account = new Account();
        account.setId(1L);
        account.setSaldo(BigDecimal.valueOf(1000));
        accounts.add(account);

        when(accountDao.findByClientId(clientId)).thenReturn(accounts);
        when(movementDao.findByAccountAndDateBetween(account, fechaInicio, fechaFin)).thenReturn(new ArrayList<>());

        ResponseEntity<MovementResponseRest> responseEntity = movementService.searchByDate(fechaInicio, fechaFin, clientId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Respuesta ok", responseEntity.getBody().getMetadata().get(0).get("type"));
        assertEquals("00", responseEntity.getBody().getMetadata().get(0).get("code"));
        assertEquals("Movimientos encontrados", responseEntity.getBody().getMetadata().get(0).get("date"));
        assertEquals(new ArrayList<>(), responseEntity.getBody().getMovementResponse().getMovement());
    }

    
    

}


