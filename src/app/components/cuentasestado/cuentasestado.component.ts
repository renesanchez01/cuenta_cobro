import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuentasestado',
  templateUrl: './cuentasestado.component.html',
  styleUrls: ['./cuentasestado.component.css']
})
export class CuentasestadoComponent implements OnInit {
  formCap = new FormGroup({
  })

  constructor(
    private router: Router,
    private toastr: ToastrService,
    ) {  }

  ngOnInit(): void {
  }

   goBack(){
  
      this.router.navigate(['interfazsuper']);
   
      this.toastr.success('BIENVENIDO','CUENTA DE COBRO');
  }

  verdetalle(){
  
    this.router.navigate(['./']);
 
    this.toastr.success('BIENVENIDO','CUENTA DE COBRO');
}

salir(){
   
  setTimeout(() => {
    this.router.navigate(['./login']);
  }, 2000);
  this.toastr.success('Vuelve Pronto','SALIDA SEGURA');
}

}
