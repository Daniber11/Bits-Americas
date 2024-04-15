import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from 'src/app/modules/shared/services/client.service';
import { NewClientComponent } from './new-client.component';
import { of } from 'rxjs';

describe('NewClientComponent', () => {
  let component: NewClientComponent;
  let fixture: ComponentFixture<NewClientComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<NewClientComponent>>;
  let mockClientService: jasmine.SpyObj<ClientService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockClientService = jasmine.createSpyObj('ClientService', [
      'updateCliente',
      'saveCliente',
    ]);

    TestBed.configureTestingModule({
      declarations: [NewClientComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: ClientService, useValue: mockClientService },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(NewClientComponent);
    component = fixture.componentInstance;
    component.clienteForm = formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with 1 on successful update', () => {
    const data = {
      id: 1,
      nombre: 'John Doe',
      direccion: '123 Main St',
      telefono: '555-1234',
    };
    component.data = data;
    component.updateForm(data);
    mockClientService.updateCliente.and.returnValue(of(data));

    component.onSave();

    expect(mockClientService.updateCliente).toHaveBeenCalledWith(data, data.id);
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with 1 on successful save', () => {
    const data = {
      nombre: 'John Doe',
      direccion: '123 Main St',
      telefono: '555-1234',
    };
    component.updateForm(data);
    mockClientService.saveCliente.and.returnValue(of(data));

    component.onSave();

    expect(mockClientService.saveCliente).toHaveBeenCalledWith(data);
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with 2 on error during update', () => {
    const data = {
      id: 1,
      nombre: 'John Doe',
      direccion: '123 Main St',
      telefono: '555-1234',
    };
    component.data = data;
    component.updateForm(data);
    mockClientService.updateCliente.and.returnValue(of(data));

    component.onSave();

    expect(mockClientService.updateCliente).toHaveBeenCalledWith(data, data.id);
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should close dialog with 2 on error during save', () => {
    const data = {
      nombre: 'John Doe',
      direccion: '123 Main St',
      telefono: '555-1234',
    };
    component.updateForm(data);
    mockClientService.saveCliente.and.returnValue(of(data));

    component.onSave();

    expect(mockClientService.saveCliente).toHaveBeenCalledWith(data);
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should close dialog with 3 on cancel', () => {
    component.onCancel();

    expect(mockDialogRef.close).toHaveBeenCalledWith(3);
  });
});
