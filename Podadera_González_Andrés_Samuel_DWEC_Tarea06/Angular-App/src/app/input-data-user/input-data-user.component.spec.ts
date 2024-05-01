import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDataUserComponent } from './input-data-user.component';

describe('InputDataUserComponent', () => {
  let component: InputDataUserComponent;
  let fixture: ComponentFixture<InputDataUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDataUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputDataUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
