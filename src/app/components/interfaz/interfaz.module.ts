import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfazRoutingModule } from './interfaz-routing.module';
import { InterfazComponent } from './interfaz.component';
import { DatosusuarioComponent } from '../datosusuario/datosusuario.component';
import { ShardModule } from '../shard/shard.module';
import { DatoscontratoComponent } from '../datoscontrato/datoscontrato.component';
import { FromatocuentacobroComponent } from '../fromatocuentacobro/fromatocuentacobro.component';
import { SupervisortablacontraComponent } from '../supervisortablacontra/supervisortablacontra.component';




@Injectable({
  providedIn: 'root'
})


@NgModule({
  declarations: [
    InterfazComponent,
    DatosusuarioComponent,
    DatoscontratoComponent,
    FromatocuentacobroComponent,
    SupervisortablacontraComponent
  ],
  imports: [
    CommonModule,
    InterfazRoutingModule,
    ShardModule
    
  ]
})
export class InterfazModule { }
