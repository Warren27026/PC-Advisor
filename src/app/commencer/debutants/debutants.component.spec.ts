import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebutantsComponent } from './debutants.component';

describe('DebutantsComponent', () => {
  let component: DebutantsComponent;
  let fixture: ComponentFixture<DebutantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebutantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebutantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
