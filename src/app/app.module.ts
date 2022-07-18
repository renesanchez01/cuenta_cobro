import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { ShardModule } from './components/shard/shard.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DialogOverviewExampleDialog } from './components/interfaz/interfaz.component';
import localeFr from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeFr, 'es-CO');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DialogOverviewExampleDialog
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ShardModule
   
  ],

  providers: [{provide: LOCALE_ID, useValue: 'es-CO'}],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
