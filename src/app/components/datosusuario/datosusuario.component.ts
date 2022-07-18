import { Component, ContentChild, Injectable, Input, OnInit, QueryList } from '@angular/core';
import { PojoContratista } from 'src/app/models/PojoContratista';
import { PojoContrato } from 'src/app/models/PojoContrato';
import { sueldo } from 'src/app/models/sueldo';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-datosusuario',
  templateUrl: './datosusuario.component.html',
  styleUrls: ['./datosusuario.component.css']
})


@Injectable({
  providedIn: 'root'
})


export class DatosusuarioComponent implements OnInit {

  constructor(
    private _UsuarioService: UsuarioService
    ) {}

  

    
  @Input() variableheredada : PojoContratista = new PojoContratista;
  @Input() datosContrato : PojoContrato = new PojoContrato();
  
   
    

  ngOnInit(): void {
    


  }


  
   
   

  
}


