import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChuckNorrisComponent } from './chuck-norris.component';

describe('ChuckNorrisComponent', () => {
  let component: ChuckNorrisComponent;
  let fixture: ComponentFixture<ChuckNorrisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChuckNorrisComponent]
    });
    fixture = TestBed.createComponent(ChuckNorrisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
