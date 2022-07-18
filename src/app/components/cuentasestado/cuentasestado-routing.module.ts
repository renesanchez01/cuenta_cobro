import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentasestadoComponent } from './cuentasestado.component';

const routes: Routes = [
  
  { path: '', component: CuentasestadoComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentasestadoRoutingModule { }
