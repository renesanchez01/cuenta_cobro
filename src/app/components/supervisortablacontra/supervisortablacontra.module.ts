import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisortablacontraRoutingModule } from './supervisortablacontra-routing.module';
import { ShardModule } from '../shard/shard.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupervisortablacontraRoutingModule,
    ShardModule
  ]
})
export class SupervisortablacontraModule { }
