import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovementService } from 'src/app/modules/shared/services/movement.service';
import { NewMovementComponent } from './new-movement.component';
import { of } from 'rxjs';

describe('NewMovementComponent', () => {
  let component: NewMovementComponent;
  let fixture: ComponentFixture<NewMovementComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<NewMovementComponent>>;
  let mockMovementService: jasmine.SpyObj<MovementService>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockMovementService = jasmine.createSpyObj('MovementService', [
      'updateMovement',
      'saveMovement',
    ]);

    TestBed.configureTestingModule({
      declarations: [NewMovementComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MovementService, useValue: mockMovementService },
      ],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(NewMovementComponent);
    component = fixture.componentInstance;
    component.movementForm = formBuilder.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required],
      account: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog with 1 on successful update', () => {
    const data = {
      id: 1,
      type: 'Deposit',
      date: '2022-04-25',
      value: 100,
      account: '123456789',
    };
    component.data = data;
    component.updateForm(data);
    mockMovementService.updateMovement.and.returnValue(of(data));

    component.onSave();

    expect(mockMovementService.updateMovement).toHaveBeenCalledWith(
      data,
      data.id
    );
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with 1 on successful save', () => {
    const data = {
      type: 'Deposit',
      date: '2022-04-25',
      value: 100,
      account: '123456789',
    };
    component.updateForm(data);
    mockMovementService.saveMovement.and.returnValue(of(data));

    component.onSave();

    expect(mockMovementService.saveMovement).toHaveBeenCalledWith(data);
    expect(mockDialogRef.close).toHaveBeenCalledWith(1);
  });

  it('should close dialog with 2 on error during update', () => {
    const data = {
      id: 1,
      type: 'Deposit',
      date: '2022-04-25',
      value: 100,
      account: '123456789',
    };
    component.data = data;
    component.updateForm(data);
    mockMovementService.updateMovement.and.returnValue(of(data));

    component.onSave();

    expect(mockMovementService.updateMovement).toHaveBeenCalledWith(
      data,
      data.id
    );
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should close dialog with 2 on error during save', () => {
    const data = {
      type: 'Deposit',
      date: '2022-04-25',
      value: 100,
      account: '123456789',
    };
    component.updateForm(data);
    mockMovementService.saveMovement.and.returnValue(of(data));

    component.onSave();

    expect(mockMovementService.saveMovement).toHaveBeenCalledWith(data);
    expect(mockDialogRef.close).toHaveBeenCalledWith(2);
  });

  it('should close dialog with 3 on cancel', () => {
    component.onCancel();

    expect(mockDialogRef.close).toHaveBeenCalledWith(3);
  });
});
