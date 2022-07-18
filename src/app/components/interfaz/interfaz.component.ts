import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PojoContratista } from 'src/app/models/PojoContratista';
import { PojoContrato } from 'src/app/models/PojoContrato';
import { PojoObligaciones2 } from 'src/app/models/PojoObligaciones2';
import { PojoPersonalSupervisor } from 'src/app/models/PojoPersonalSupervisor';
import { Table_SEGUIMENTOMUSI } from 'src/app/models/Table_SEGUIMENTOMUSI';
import { sueldo } from 'src/app/models/sueldo';
import { UsuarioService } from 'src/app/service/usuario.service';



export interface DialogData {
  userName: string;
  Password: string;
  ROL: string;
}

@Component({
  selector: 'app-interfaz',
  templateUrl: './interfaz.component.html',
  styleUrls: ['./interfaz.component.css']
})



export class InterfazComponent implements OnInit {


 public pin : PojoContratista= new PojoContratista();
 public pin2 : PojoContrato= new PojoContrato();
 public pin3 : PojoPersonalSupervisor = new PojoPersonalSupervisor();
 public pin5 : PojoObligaciones2 = new PojoObligaciones2();
 public pin6 : Table_SEGUIMENTOMUSI = new Table_SEGUIMENTOMUSI();
 public valorapagar : sueldo = new sueldo();



 userName: string;
 PassWord : boolean = false;
 loading = false;
 formCap = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  })

  constructor(
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private _UsuarioService: UsuarioService) { }

  ngOnInit(): void {

    }


    
  openDialog(): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '65%',
      height: 'auto',
      data: {userName: this.userName},
      
    });

   
    dialogRef.afterClosed().subscribe(result => {
      
      this.userName = result;

      //llamdo al servicio para los datos de ususario o contratista

      this._UsuarioService.User2(this.userName).subscribe( lista =>{

        this.pin=lista;
        
      
        })

        //llamado al servicio para los datos del contrato
        
        this._UsuarioService.contrato(this.userName).subscribe( lista1 =>{
    
          this.pin2=lista1;

          const formatearFecha = fecha => {
            const mes = fecha.getMonth() + 1;
            const dia = fecha.getDate();
            return `${fecha.getFullYear()}/${(mes < 10 ? '0' : '').concat(mes)}/${(dia < 10 ? '0' : '').concat(dia)}`;
          };
    
          const obtenerFechaInicioDeMes = () => {
            const fechaInicio = new Date();
            // Iniciar en este año, este mes, en el día 1
            return new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
          };
      
          const obtenerFechaFinDeMes = () => {
            const fechaFin = new Date();
            // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
            return new Date(fechaFin.getFullYear(), fechaFin.getMonth() + 1, 0);
          };
      
          this.valorapagar.fechaInicio = obtenerFechaInicioDeMes();
          this.valorapagar.fechaFin = obtenerFechaFinDeMes();
          const fechaInicioFormateada = formatearFecha(this.valorapagar.fechaInicio);
          const fechaFinFormateada = formatearFecha(this.valorapagar.fechaFin);
          
          //console.log(`Fecha inicial  ${fechaInicioFormateada} Fecha final  ${fechaFinFormateada}`);

          let milisegundosdia = 24*60*60*1000;
          let milisegundostras = Math.abs(this.valorapagar.fechaInicio.getTime()-this.valorapagar.fechaFin.getTime());
          let diastrascurridos = Math.round(((milisegundostras)/(milisegundosdia))); 
      
      //console.log('dias laborados',diastrascurridos);
          
          const Vsueldo2 = Number(lista1.valor_CONTRATO);
          const VARL = Number(lista1.detalle_POR);
          //const Valrdecialmal = Number(VARL.toFixed(3));
         

          if(diastrascurridos <= 29){

            this.valorapagar.count = ((Vsueldo2/30)*(diastrascurridos+1))
            //console.log(this.valorapagar.count, "s1");
            this.valorapagar.ibc=(this.valorapagar.count*(0.4))
            this.valorapagar.ap=((this.valorapagar.ibc)*(0.16))
            this.valorapagar.as=((this.valorapagar.ibc)*(0.125))
            this.valorapagar.aarl=Math.round(VARL*(this.valorapagar.ibc))
            
            this.valorapagar.totalaportes=Math.round((this.valorapagar.ap+ this.valorapagar.as+this.valorapagar.aarl))
          
    
          }else if(diastrascurridos >= 30){

            this.valorapagar.count = ((Vsueldo2/30)*(diastrascurridos))
            //console.log(this.valorapagar.count, "s2");
            this.valorapagar.ibc=(this.valorapagar.count*(0.4))
            this.valorapagar.ap=((this.valorapagar.ibc)*(0.16))
            this.valorapagar.as=((this.valorapagar.ibc)*(0.125))
            this.valorapagar.aarl=Math.round(VARL*(this.valorapagar.ibc))
            
            this.valorapagar.totalaportes=Math.round((this.valorapagar.ap+ this.valorapagar.as+this.valorapagar.aarl))
            
          }

        
          })

      

//llamado al servicio para los datos de supervisor

          this._UsuarioService.PersonalaCargo(this.userName).subscribe( lista3 =>{

              this.pin3 = lista3;
              //console.log(this.pin3.nombres);

            })


//llamado al servivion para las obligaciones

       
        this._UsuarioService.Obligaciones2(this.userName).subscribe( lista5 => {

          this.pin5 = lista5

        //  console.log(lista5);
        
        })

        this._UsuarioService.Codigopresupuestal().subscribe(lista6 => {
          this.pin6 = lista6
        //  console.log(lista6);

        })
      
    });
    
  }

  logOut(): void{
      
    this.router.navigate(['login']);
  }

salir(){
  this.loading = true;
  setTimeout(() => {
    this.router.navigate(['login']);
  }, 2000);
  this.toastr.success('Vuelve Pronto','SALIDA SEGURA');
}

tablacontratista(){
  this.router.navigate(['supervisortablacontra']);
}

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}


