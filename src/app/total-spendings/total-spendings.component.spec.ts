import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSpendingsComponent } from './total-spendings.component';

describe('TotalSpendingsComponent', () => {
  let component: TotalSpendingsComponent;
  let fixture: ComponentFixture<TotalSpendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSpendingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
