import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisortablacontraComponent } from './supervisortablacontra.component';

describe('SupervisortablacontraComponent', () => {
  let component: SupervisortablacontraComponent;
  let fixture: ComponentFixture<SupervisortablacontraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisortablacontraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisortablacontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
