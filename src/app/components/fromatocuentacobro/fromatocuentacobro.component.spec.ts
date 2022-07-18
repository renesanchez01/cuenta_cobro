import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromatocuentacobroComponent } from './fromatocuentacobro.component';

describe('FromatocuentacobroComponent', () => {
  let component: FromatocuentacobroComponent;
  let fixture: ComponentFixture<FromatocuentacobroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromatocuentacobroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromatocuentacobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
