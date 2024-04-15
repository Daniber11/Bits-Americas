import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClienteComponent } from './client.component';
import { ClientService } from 'src/app/modules/shared/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { of } from 'rxjs';

describe('ClienteComponent', () => {
  let component: ClienteComponent;
  let fixture: ComponentFixture<ClienteComponent>;
  let mockClientService: jasmine.SpyObj<ClientService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockClientService = jasmine.createSpyObj('ClientService', [
      'getclient',
      'getClienteById',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ClienteComponent],
      providers: [
        { provide: ClientService, useValue: mockClientService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    });

    fixture = TestBed.createComponent(ClienteComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch clients on init', () => {
    const mockClients = [
      {
        id: 1,
        nombre: 'John Doe',
        direccion: '123 Main St',
        telefono: '555-1234',
      },
    ];
    mockClientService.getclient.and.returnValue(of(mockClients));

    component.ngOnInit();

    expect(mockClientService.getclient).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockClients);
  });

  it('should open dialog for new client', () => {
    component.openClienteDialog();

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should open dialog for client edit', () => {
    const client = {
      id: 1,
      nombre: 'John Doe',
      direccion: '123 Main St',
      telefono: '555-1234',
    };
    component.edit(client.id, client.nombre, client.direccion, client.telefono);

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should delete client', () => {
    const clientId = 1;
    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ id: 1 }),
    } as MatDialogRef<any, any>);

    component.delete(clientId);

    expect(mockClientService.deleteCliente).toHaveBeenCalledWith(clientId);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(
      'Cliente Eliminado',
      'Exitoso'
    );
  });

  it('should handle delete client error', () => {
    const clientId = 1;
    mockMatDialog.open.and.returnValue({
      afterClosed: () => of({ id: 1 }),
    } as MatDialogRef<any, any>);

    component.delete(clientId);

    expect(mockClientService.deleteCliente).toHaveBeenCalledWith(clientId);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(
      'Se produjo un error al eliminar el cliente',
      'Error'
    );
  });

  it('should filter clients by search term', () => {
    const mockClients = [
      {
        id: 1,
        nombre: 'John Doe',
        direccion: '123 Main St',
        telefono: '555-1234',
      },
      {
        id: 2,
        nombre: 'Jane Smith',
        direccion: '456 Elm St',
        telefono: '555-5678',
      },
    ];
    component.dataSource.data = mockClients;
    const searchTerm = 'John Doe';

    component.buscar(searchTerm);

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].nombre).toBe('John Doe');
  });
});
