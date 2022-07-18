import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { PojoContratista } from '../models/PojoContratista';
import { Router } from '@angular/router';
import { PojoContrato } from '../models/PojoContrato';
import { PojoPersonalSupervisor } from '../models/PojoPersonalSupervisor';
import { PojoObligaciones2 } from '../models/PojoObligaciones2';
import { Table_SEGUIMENTOMUSI } from '../models/Table_SEGUIMENTOMUSI';




const baseUrl = 'http://localhost:8080/contratistaUser?UserName=';
const baseUrl2 = 'http://localhost:8080/consultacontrato?UserName=';
const baseUrl3 = 'http://localhost:8080/PersonalSupervisor?UserName=';
const baseUrl4 = 'http://localhost:8080/consultaObligaciones?UserName=';
const baseUrl5 = 'http://localhost:8080/consultaObligaciones2?UserName=';
const baseUrl6 = 'http://localhost:8080/musi';
const baseUrl7 = 'http://localhost:8080/codigopropuesta?Codigo_Propuesta=';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  @Output() disparador: EventEmitter<any> = new EventEmitter();

  constructor(
    private http:HttpClient, 
    private router : Router
    ) {}

  
  //login(usuario: PojoContratista) : Observable<any>
 login() : Observable<PojoContratista>
  {
      return this.http.get<PojoContratista>(baseUrl);
  }

  User(UserName: String): Observable<any> {  

    const pHeaders = new HttpHeaders({
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    });

    return this.http.get(`${baseUrl}${UserName}`,{headers: pHeaders, observe: 'response'});
}


User2(UserName): Observable<PojoContratista> {  

  const pHeaders = new HttpHeaders({
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
  });

  return this.http.get<PojoContratista>(`${baseUrl}${UserName}`);
}


contrato(UserName): Observable<PojoContrato> {  

  const pHeaders = new HttpHeaders({
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
  });

  return this.http.get<PojoContrato>(`${baseUrl2}${UserName}`);
}

  PersonalaCargo(UserName): Observable<PojoPersonalSupervisor> {  

    const pHeaders = new HttpHeaders({
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    });
  
    return this.http.get<PojoPersonalSupervisor>(`${baseUrl3}${UserName}`);
  }

  
  Obligaciones2(UserName): Observable<PojoObligaciones2>{
    const pHeaders = new HttpHeaders({
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    });
  
    return this.http.get<PojoObligaciones2>(`${baseUrl5}${UserName}`);
  }


  Codigopresupuestal():Observable<Table_SEGUIMENTOMUSI>{
    const pHeaders = new HttpHeaders({
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    });
  
    return this.http.get<Table_SEGUIMENTOMUSI>(`${baseUrl6}`);


  }

  Codigopresupuestalid(Codigo_Propuesta):Observable<Table_SEGUIMENTOMUSI>{
    const pHeaders = new HttpHeaders({
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS'
    });
  
    return this.http.get<Table_SEGUIMENTOMUSI>(`${baseUrl7}${Codigo_Propuesta}`);
  }



  logout() 
  { 
    // Remove the token from the localStorage.
    localStorage.removeItem('token');

    this.router.navigate(['']);


  }


}
