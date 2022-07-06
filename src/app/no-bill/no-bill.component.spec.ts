import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBillComponent } from './no-bill.component';

describe('NoBillComponent', () => {
  let component: NoBillComponent;
  let fixture: ComponentFixture<NoBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoBillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
