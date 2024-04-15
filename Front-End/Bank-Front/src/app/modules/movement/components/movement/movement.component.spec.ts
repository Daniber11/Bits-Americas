import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovementComponent } from './movement.component';
import { MovementService } from 'src/app/modules/shared/services/movement.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { of } from 'rxjs';

describe('MovementComponent', () => {
  let component: MovementComponent;
  let fixture: ComponentFixture<MovementComponent>;
  let mockMovementService: jasmine.SpyObj<MovementService>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;
  let mockMatSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockMovementService = jasmine.createSpyObj('MovementService', [
      'getMovements',
      'searchById',
    ]);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockMatSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [MovementComponent],
      providers: [
        { provide: MovementService, useValue: mockMovementService },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    });

    fixture = TestBed.createComponent(MovementComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movements on init', () => {
    const mockMovements = [
      {
        id: 1,
        type: 'Deposit',
        date: new Date(),
        value: 100,
        account: { id: 1, number: '123', balance: 1000 },
      },
    ];
    mockMovementService.getMovements.and.returnValue(of(mockMovements));

    component.ngOnInit();

    expect(mockMovementService.getMovements).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockMovements);
  });

  it('should open dialog for new movement', () => {
    component.openMovementDialog();

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should open dialog for movement edit', () => {
    const movement = {
      id: 1,
      type: 'Deposit',
      date: new Date(),
      value: 100,
      account: { id: 1, number: '123', balance: 1000 },
    };
    component.edit(
      movement.id,
      movement.type,
      movement.date,
      movement.value,
      movement.account
    );

    expect(mockMatDialog.open).toHaveBeenCalled();
  });

  it('should filter movements by search term', () => {
    const mockMovements = [
      {
        id: 1,
        type: 'Deposit',
        date: new Date(),
        value: 100,
        account: { id: 1, number: '123', balance: 1000 },
      },
      {
        id: 2,
        type: 'Withdrawal',
        date: new Date(),
        value: 200,
        account: { id: 2, number: '456', balance: 2000 },
      },
    ];
    component.dataSource.data = mockMovements;
    const searchTerm = '123';

    component.buscar(searchTerm);

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].account.number).toBe('123');
  });
});
