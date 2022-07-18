import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatoscontratoComponent } from './datoscontrato.component';

describe('DatoscontratoComponent', () => {
  let component: DatoscontratoComponent;
  let fixture: ComponentFixture<DatoscontratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatoscontratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatoscontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
