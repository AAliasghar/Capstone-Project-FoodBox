import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChekoutFormComponent } from './chekout-form.component';

describe('ChekoutFormComponent', () => {
  let component: ChekoutFormComponent;
  let fixture: ComponentFixture<ChekoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChekoutFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChekoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
