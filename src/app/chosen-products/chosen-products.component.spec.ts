import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenProductsComponent } from './chosen-products.component';

describe('ChosenProductsComponent', () => {
  let component: ChosenProductsComponent;
  let fixture: ComponentFixture<ChosenProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChosenProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
