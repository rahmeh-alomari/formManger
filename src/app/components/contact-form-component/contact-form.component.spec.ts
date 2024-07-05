import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormComponentComponent } from './contact-form.component';

describe('ContactFormComponentComponent', () => {
  let component: ContactFormComponentComponent;
  let fixture: ComponentFixture<ContactFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
