import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComputerComponent } from './update-computer.component';

describe('UpdateComputerComponent', () => {
  let component: UpdateComputerComponent;
  let fixture: ComponentFixture<UpdateComputerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateComputerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComputerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
