import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducatifComponent } from './educatif.component';

describe('EducatifComponent', () => {
  let component: EducatifComponent;
  let fixture: ComponentFixture<EducatifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducatifComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
