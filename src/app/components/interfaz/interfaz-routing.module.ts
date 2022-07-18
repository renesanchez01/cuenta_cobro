import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfazComponent } from './interfaz.component';

const routes: Routes = [
  
  { path: '', component: InterfazComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InterfazRoutingModule { }
