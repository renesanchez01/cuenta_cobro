import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'login/:pin', component: LoginComponent},
  { path: 'interfaz', loadChildren: () => import('./components/interfaz/interfaz.module').then(x => x.InterfazModule) },
  { path: 'cuentasestado', loadChildren: () => import('./components/cuentasestado/cuentasestado.module').then(x => x.CuentasestadoModule) },
  { path: 'supervisortablacontra', loadChildren: () => import('./components/supervisortablacontra/supervisortablacontra.module').then(x => x.SupervisortablacontraModule) },

];




@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true, enableTracing: false, onSameUrlNavigation: 'ignore' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
