import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentasestadoRoutingModule } from './cuentasestado-routing.module';
import { ShardModule } from '../shard/shard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CuentasestadoRoutingModule,
    ShardModule
  ]
})
export class CuentasestadoModule { }
