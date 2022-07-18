import { Component } from '@angular/core';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UsuarioService]
})
export class AppComponent {

  title = 'CuentasDeCobroWebApp';

  
}
