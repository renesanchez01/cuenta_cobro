import { Component, Input, OnInit } from '@angular/core';
import { PojoContrato } from 'src/app/models/PojoContrato';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-datoscontrato',
  templateUrl: './datoscontrato.component.html',
  styleUrls: ['./datoscontrato.component.css']
})
export class DatoscontratoComponent implements OnInit {
 
  constructor( 
    private _UsuarioService: UsuarioService
    ) { }

    @Input() datosContrato : PojoContrato = new PojoContrato;


  ngOnInit(): void {

 
  }
 

  


  panelOpenState = false;
}
