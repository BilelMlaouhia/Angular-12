import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycomputersComponent } from './mycomputers.component';

describe('MycomputersComponent', () => {
  let component: MycomputersComponent;
  let fixture: ComponentFixture<MycomputersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycomputersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MycomputersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
