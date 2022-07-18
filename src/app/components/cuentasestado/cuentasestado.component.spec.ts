import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasestadoComponent } from './cuentasestado.component';

describe('CuentasestadoComponent', () => {
  let component: CuentasestadoComponent;
  let fixture: ComponentFixture<CuentasestadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentasestadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
