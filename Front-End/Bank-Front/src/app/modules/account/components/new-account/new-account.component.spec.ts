import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { NewAccountComponent } from './new-account.component';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { ClientService } from 'src/app/modules/shared/services/client.service';
import { throwError } from 'rxjs';

describe('NewAccountComponent', () => {
  let component: NewAccountComponent;
  let fixture: ComponentFixture<NewAccountComponent>;
  let mockDialogRef: Partial<MatDialogRef<NewAccountComponent>>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockClientService: jasmine.SpyObj<ClientService>;

  beforeEach(() => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockAccountService = jasmine.createSpyObj('AccountService', [
      'saveAccount',
      'updateAccount',
    ]);
    mockAccountService.saveAccount.and.returnValue(of({}));
    mockAccountService.updateAccount.and.returnValue(of({}));

    mockClientService = jasmine.createSpyObj('ClientService', ['getclient']);
    mockClientService.getclient.and.returnValue(
      of([
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
      ])
    );

    TestBed.configureTestingModule({
      declarations: [NewAccountComponent],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: AccountService, useValue: mockAccountService },
        { provide: ClientService, useValue: mockClientService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    expect(component.clients.length).toBe(2);
    expect(component.clients[0].id).toBe(1);
    expect(component.clients[1].name).toBe('Client 2');
  });

  it('should create form with number, balance, and client fields', () => {
    expect(component.accountForm).toBeDefined();
    expect(component.accountForm.get('number')).toBeDefined();
    expect(component.accountForm.get('balance')).toBeDefined();
    expect(component.accountForm.get('client')).toBeDefined();
  });

  it('should call accountService.saveAccount when onSave is called with new account', () => {
    component.accountForm.patchValue({
      number: '123',
      balance: 100,
      client: 1,
    });
    component.onSave();
    expect(mockAccountService.saveAccount).toHaveBeenCalledWith({
      number: '123',
      balance: 100,
      client: 1,
    });
  });

  it('should call accountService.updateAccount when onSave is called with existing account', () => {
    component.data = { id: 1, number: '123', balance: 100, client: 1 };
    component.ngOnInit(); // Simulate ngOnInint to update form
    component.onSave();
    expect(mockAccountService.updateAccount).toHaveBeenCalledWith(
      { number: '123', balance: 100, client: 1 },
      1
    );
  });

  it('should close dialog with code 1 when onSave is successful', () => {
    component.onSave();
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with code 2 when onSave encounters an error', () => {
    mockAccountService.saveAccount.and.returnValue(throwError('Error'));
    component.onSave();
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should close dialog with code 3 when onCancel is called', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalledWith(3);
  });
});
