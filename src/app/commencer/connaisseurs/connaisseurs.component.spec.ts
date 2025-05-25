import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnaisseursComponent } from './connaisseurs.component';

describe('ConnaisseursComponent', () => {
  let component: ConnaisseursComponent;
  let fixture: ComponentFixture<ConnaisseursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnaisseursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnaisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
