import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-supervisortablacontra',
  templateUrl: './supervisortablacontra.component.html',
  styleUrls: ['./supervisortablacontra.component.css']
})
export class SupervisortablacontraComponent implements OnInit {

  loading = false;
  volver = new FormGroup({ });

  constructor(
    private toastr: ToastrService, 
    private router: Router,
    ) {  }

  ngOnInit(): void {
  }

  goBack(){
  
      this.router.navigate(['interfazsuper']);
   
      this.toastr.success('BIENVENIDO','CUENTA DE COBRO');
  }

  salir(){
   
    setTimeout(() => {
      this.router.navigate(['./login']);
    }, 2000);
    this.toastr.success('Vuelve Pronto','SALIDA SEGURA');
  }

}
