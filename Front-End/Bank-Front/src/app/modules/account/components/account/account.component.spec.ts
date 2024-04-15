import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { of } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockAccountService: jasmine.SpyObj<AccountService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<AccountComponent>>;

  beforeEach(() => {
    mockAccountService = jasmine.createSpyObj('AccountService', [
      'getAccounts',
      'deleteAccount',
      'getAccountById',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [
        { provide: AccountService, useValue: mockAccountService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
      ],
    });

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch accounts on init', () => {
    const mockAccounts = [{ id: 1, number: '123', balance: 100 }];
    mockAccountService.getAccounts.and.returnValue(of(mockAccounts));

    component.ngOnInit();

    expect(mockAccountService.getAccounts).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockAccounts);
  });

  it('should open dialog for new account', () => {
    component.openAccountDialog();

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should open dialog for account edit', () => {
    const account = { id: 1, number: '123', balance: 100 };
    component.edit(account.id, account.number, account.balance.toString());

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should delete account', () => {
    const accountId = 1;
    mockMatDialogRef.afterClosed.and.returnValue(of(1));

    component.delete(accountId);

    expect(mockAccountService.deleteAccount).toHaveBeenCalledWith(accountId);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(
      'Cuenta Eliminada',
      'Exitosa'
    );
  });

  it('should handle delete account error', () => {
    const accountId = 1;
    mockMatDialogRef.afterClosed.and.returnValue(of(2));

    component.delete(accountId);

    expect(mockAccountService.deleteAccount).toHaveBeenCalledWith(accountId);
    expect(mockMatSnackBar.open).toHaveBeenCalledWith(
      'Se produjo un error al eliminar la cuenta',
      'Error'
    );
  });

  it('should handle delete account dialog closed', () => {
    const accountId = 1;
    mockMatDialogRef.afterClosed.and.returnValue(of(undefined));

    component.delete(accountId);

    expect(mockAccountService.deleteAccount).not.toHaveBeenCalled();
    expect(mockMatSnackBar.open).not.toHaveBeenCalled();
  });

  it('should filter accounts by search term', () => {
    const mockAccounts = [
      { id: 1, number: '123', balance: 100 },
      { id: 2, number: '456', balance: 200 },
    ];
    component.dataSource.data = mockAccounts;
    const searchTerm = '123';

    component.buscar(searchTerm);

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].number).toBe('123');
  });
});
