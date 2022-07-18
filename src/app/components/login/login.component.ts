import { Component, EventEmitter, Injectable, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { PojoContratista } from '../../models/PojoContratista';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})


export class LoginComponent implements OnInit {

 
    loading = false;
    PassWord : boolean = false;
    dato: string;
    user3: PojoContratista;


    formCap = new FormGroup({
      UserName: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]),
      Password: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(12)]),
      ROL: new FormControl('', [Validators.required]),
    })
   
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private _UsuarioService: UsuarioService,
    private _activatedRoute: ActivatedRoute
    ) {}
 
  ngOnInit(): void {

   

  }

  togglePassword() {

    this.PassWord = !this.PassWord;  
  }



  Logapi(): void{

    
   const us : PojoContratista ={
     userName: this.formCap.value.UserName,
     cedula: '',
     direccion: '',
     id_PROYECTO: '',
     id_RIESGO: '',
     n_CONTRATO: '',
     n_CUENTA_BANCO: '',
     nam_AREA: '',
     nam_ARL: '',
     name_BANCO: '',
     name_EPS: '',
     name_SUPER: '',
     nombres: '',
     passWord: this.formCap.value.Password,
     pension: '',
     rol: this.formCap.value.ROL,
     telefono: '',
     tipo_CUENTA: '',
     cedula_SUPERVISOR: '',
     ciudad_cedula_supervisor: '',
     cargo: '',
     firma_Contratista: '',
     detalle_POR: ''
   }
   
   
   
    this._UsuarioService.User(us.userName).subscribe(response => {
      
      this.user3=response.body;

      if(this.user3.userName == this.formCap.value.UserName && this.user3.passWord == this.formCap.value.Password)
      {   
       
        this.faceloand();
      }else{
       this.error();
       this.formCap.reset();
      }
    });


    this.dato=this.formCap.value.UserName;
    
    
  }
 
      
  faceloand(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/interfaz']);
    }, 2000);
    this.toastr.success('BIENVENIDO','CUENTA DE COBRO');
  }
 

  faceloandsuper(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/interfazsuper']);
    }, 2000);
    this.toastr.success('BIENVENIDO','CUENTA DE COBRO');
  }

  error()
  {
   this.toastr.error('Revise los campos de Usuario y/ó Constraseña','ERROR EN')
  }
 
  
   
  }