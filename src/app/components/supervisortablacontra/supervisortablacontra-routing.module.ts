import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupervisortablacontraComponent } from './supervisortablacontra.component';

const routes: Routes = [
  { path: '', component: SupervisortablacontraComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisortablacontraRoutingModule { }
