import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { PojoContrato } from 'src/app/models/PojoContrato';
import { UsuarioService } from 'src/app/service/usuario.service';
import { PojoContratista } from 'src/app/models/PojoContratista';
import { sueldo } from 'src/app/models/sueldo';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
//import pdfFonts from "./../../../assets/custom-fonts";
import { DatePipe } from '@angular/common';
import { PojoObligaciones2 } from 'src/app/models/PojoObligaciones2';
import { DomSanitizer } from '@angular/platform-browser';
import { Table_SEGUIMENTOMUSI } from 'src/app/models/Table_SEGUIMENTOMUSI';
pdfMake.vfs = pdfFonts.pdfMake.vfs;   


const today = new Date();


@Component({
  selector: 'app-fromatocuentacobro',
  templateUrl: './fromatocuentacobro.component.html',
  styleUrls: ['./fromatocuentacobro.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  
})



export class FromatocuentacobroComponent implements OnInit {

  
  @Input() datosContrato : PojoContrato = new PojoContrato();
  @Input() variableheredada : PojoContratista = new PojoContratista();
  @Input() totalsaldo : sueldo = new sueldo();
  @Input() obligacioneslist2 : PojoObligaciones2=new PojoObligaciones2();
  @Input() Propuesta: Table_SEGUIMENTOMUSI = new Table_SEGUIMENTOMUSI();
  public pinmusi : Table_SEGUIMENTOMUSI = new Table_SEGUIMENTOMUSI();

  
  buttonDisabled:boolean = true;
  buttonDisabled2:boolean = true;
  buttonDisabled3:boolean = true;
  sueldo: number = 0;
  sueldoibc: number = 0;
  sueldoap: number = 0;
  sueldoas: number = 0;
  sueldoarl: number = 0;
  suelapfs:number = 0;
  sueldotap:number = 0;
  valorcontrati: number = 0;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  treFormGroup :  FormGroup; 
  cuaFormGroup :  FormGroup;
  cinFormGroup : FormGroup;
  firmafill : FormGroup;
  element: boolean= true;

  selectedOption:string;
 
  public firma:any=[]
  public previsualizacion: string;

  constructor(
    private _formBuilder: FormBuilder, 
    private _UsuarioService: UsuarioService, 
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer) { }

  
    
  ngOnInit() {

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

    const fechaInicio = obtenerFechaInicioDeMes();
    //const fechaFin = obtenerFechaFinDeMes();
    const fechaInicioFormateada = formatearFecha(fechaInicio);
    //const fechaFinFormateada = formatearFecha(fechaFin);
    //console.log(`Fecha inicial  ${fechaInicioFormateada} Fecha final  ${fechaFinFormateada}`);


    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [fechaInicioFormateada, {disable:true}, Validators.required],
      SI0NO:[''],
      SI1NO:[''],
      SI2NO:[''],
     
      
    })

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [this.totalsaldo.fechaInicio, Validators.required],
      secondCtrl1: [this.totalsaldo.fechaFin, Validators.required],
      secondCtrl2: [this.sueldo,{disable:true}, Validators.required],
      secondCtrl3: ['', Validators.required],
      secondCtrl4: ['', Validators.required],
      valortotalcontrato:[this.valorcontrati],
      valperiodoactual: [this.sueldo,{disable:true}],
      toatalibc:[this.sueldoibc,{disable:true}],
      totalap:[this.sueldoap,{disable:true}],
      totalaps:[this.sueldoas,{disable:true}],
      totalarl:[this.sueldoarl,{disable:true}],
      totalaprs:[this.sueldotap,{disable:true}],
     
      
    }); 

   
   
    this.treFormGroup = this._formBuilder.group({
      treeCtrl: ['', Validators.required],
      treeCtrl1: ['', Validators.required],
      treeCtrl2: ['', Validators.required],
      treeCtrl3: ['', Validators.required],
      treeCtrl4: ['', Validators.required],
      treeCtrl5: ['', Validators.required], 
      pin2: ['N/A', Validators.required],
      pin2fechapago: ['', Validators.required],
      pin2periodo: ['N/A', Validators.required],

      
    });

     
    this.cinFormGroup = this._formBuilder.group({
      cinCtrl1: [this.datosContrato.n_CONTRATO, Validators.required],
      cinCtrl2: [this.secondFormGroup.value.secondCtrl3, Validators.required],
      cinCtrl3: [this.variableheredada.nombres, Validators.required],
      cinCtrl4: [this.datosContrato.objeto_CONTRATO, Validators.required],
      cinCtrl5: [this.datosContrato.fecha_INICIO_CONTRATO, Validators.required],
      cinCtrl6: [this.datosContrato.fecha_FINAL_CONTRATO, Validators.required],
      cinCtrl7: [''],
      cinCtrl8: [''],
      cinCtrl9: [''],
      cinCtrl10: [''],
      cinCtrl11: [''],
      cinCtrl12: [''],
      cinCtrl13: [''],
      cinCtrl14: [''],
      cinCtrl15: [''],
      cinCtrl16: [''],
      cinCtrl17: [''],
      cinCtrl18: [''],
      cinCtrl19: [''],
      cinCtrl20: [''],
      cinCtrl21: [this.valorcontrati],
      cinCtrl22: [''],
      cinCtrl23: [''],
      cinCtrl24: [''],
      cinCtrl25: [''],
      cinCtrl26: [''],
      cinCtrl27: [''],
      cinCtrl28: [''],
      cinCtrl29: [''],
      cinCtrl30: [''],
      cinCtrl31: [''],
      cinCtrl32: [''],
      cinCtrl33: [this.pinmusi.codigo_Propuesta],
      cinCtrl34: [this.pinmusi.consulta_Codigo_Proyecto],
      cinCtrl35: [this.pinmusi.nombre_Proyecto],
      cinCtrl36: [this.pinmusi.meta_Proyecto],
      cinCtrl37: [this.pinmusi.sector],
      cinCtrl38: [this.pinmusi.propuesta_Ciudadana],
      cinCtrl39: [''],
      cinCtrl40: [''],
      cinCtrl41: [''],
      terminacionanticipadaA:[''],
      terminacionanticipadaP:[''],
      terminacionanticipadaE:[''],
      cesioncontratoA:[''],
      cesioncontratoP:[''],
      cesioncontratoE:['']

      
      
  
    });

    this.cuaFormGroup = this._formBuilder.group({
      act1: [''],
      prod1: [''],
      evid1: [''],
      act2: [''],
      prod2: [''],
      evid2: [''],
      act3: ['' ],
      prod3: ['' ],
      evid3: [''],
      act4: [''],
      prod4: [''],
      evid4: [''],
      act5: [''],
      prod5: [''],
      evid5: [''],
      act6: [''],
      prod6: [''],
      evid6: [''],
      act7: [''],
      prod7: [''],
      evid7: [''],
      act8: [''],
      prod8: [''],
      evid8: [''],
      act9: [''],
      prod9: ['', ],
      evid9: [''],
      act10: [''],
      prod10: [''],
      evid10: [''],
      act11: [''],
      prod11: [''],
      evid11: [''],
      act12: [''],
      prod12: [''],
      evid12: [''],
      act13: [''],
      prod13: [''],
      evid13: [''],
      act14: [''],
      prod14: [''],
      evid14: [''],
      act15: [''],
      prod15: [''],
      evid15: [''],
      act16: [''],
      prod16: [''],
      evid16: [''],
      act17: [''],
      prod17: [''],
      evid17: [''],
      act18: [''],
      prod18: [''],
      evid18: [''],
      act19: [''],
      prod19: ['' ],
      evid19: ['']
      
    });

    this.firmafill =this._formBuilder.group({ 
      firmauser: ['']
     });


  }

      



  ////////////////////////////////////////////


  capturarfirma(event):any{
    const firmacapturada = event.target.files[0]
    this.extraerBase64(firmacapturada).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      //console.log(imagen.base);

    })
    this.firma.push(firmacapturada)
    // 
    // console.log(event.target.files);
  }
  
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  clearImage(): any {
    this.previsualizacion = '';
    this.firma = [];
  }

 

  //////////////////////////////////////////
  
  
 
  
//////////////////////////////////////////////////
  nuevosaldo(){
    
    let milisegundosdia = 24*60*60*1000;
    let milisegundostras = Math.abs(this.secondFormGroup.value.secondCtrl.getTime() - this.secondFormGroup.value.secondCtrl1.getTime());
    let diastrascurridos = Math.round(((milisegundostras)/(milisegundosdia))); 
   //console.log('dias laborados',diastrascurridos);

    let Nuesueldo = Number(this.datosContrato.valor_CONTRATO)
    const Varlnuevo = Number(this.datosContrato.detalle_POR);

    if(diastrascurridos <= 29){
    this.sueldo = (Nuesueldo/30)*(diastrascurridos+1);
     this.sueldoibc=((this.sueldo)*(0.4))
     this.sueldoap=((this.sueldoibc)*(0.16))
     this.sueldoarl=((this.sueldoibc)*(0.125))
     this.suelapfs=Math.round(Varlnuevo*(this.sueldoibc))
     this.sueldotap=Math.round((this.sueldoap+this.sueldoarl+this.suelapfs))
     //console.log(this.secondFormGroup.value.toatalibc);
     //console.log(this.sueldoibc);
    
    }else if(diastrascurridos >= 30){

      this.sueldo = ((Nuesueldo/30)*(diastrascurridos))
      this.sueldoibc=(this.sueldo*(0.4))
     this.sueldoap=((this.sueldoibc)*(0.16))
     this.sueldoarl=((this.sueldoibc)*(0.125))
     this.suelapfs=Math.round(Varlnuevo*(this.sueldoibc))
     this.sueldotap=Math.round((this.sueldoap+this.sueldoarl+this.suelapfs))
     //console.log(this.secondFormGroup.value.toatalibc);
     //console.log(this.sueldoibc);
      
    }

    
  }

  onInputChange(event){
    this.sueldo,
    this.sueldoibc
  }

  onChange(centroId) {
    this._UsuarioService.Codigopresupuestalid(this.cinFormGroup.value.cinCtrl33).subscribe(listamusi => {
      this.pinmusi = listamusi
      //console.log(listamusi)
      
    })
    
    //console.log(this.cinFormGroup.value.cinCtrl33);
}

  showData() {
    return (this.buttonDisabled2 = false);
    
  }
  hideData() {
    return (this.buttonDisabled2 = true);
  }

  showDataPlanilla() {
    return (this.buttonDisabled3 = false);
    
  }
  hideDataPlanilla() {
    return (this.buttonDisabled3 = true);
  }

  public openPDF(infrom) {
 
   //console.log(this.cuaFormGroup.value);
    //console.log(infrom)
  

   }

   

   datepipe = new DatePipe('es-CO');
   

   getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }

// Pdf Certificado de cumplimiento  

   async PDFCertificadoCumplimento(action = 'open'){

   
    
 
    let docDefinicion = {
     
      
      content: [
         {
          image: await this.getBase64ImageFromURL(
            "data:image/png;base64,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"
          ),
          alignment: 'center',
          width: 50,
          height: 50,
         },
         {
          text:"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n",
          fontSize: 10,
         
          alignment: 'left',
          color: '#000000',

         },
                
        {
          
          text: 'ALCALDÍA LOCAL DE SUBA',
          fontSize: 10,
          Garamond: true,
          alignment: 'center',
          color: '#000000',
          bold: true,
          
         
        },
        {
          text: 'CERTIFICACIÓN DE CUMPLIMIENTO (Persona Natural)',
          fontSize: 10,
          italics: true,
          alignment: 'center',
          color: '#000000',
          bold: true,
        },
        {
          text:" ",
          fontSize: 10,
          
          alignment: 'left',
          color: '#000000',
        },
       { 
        text: 'Teniendo en cuenta el informe presentado por el contratista ' + this.variableheredada.nombres + 'sobre las actividades desarrolladas para dar cumplimiento a los términos contratados y los resultados obtenidos, una vez realizada la revisión del informe, se autoriza el pago correspondiente al periodo comprendido entre:  '+this.datepipe.transform(this.secondFormGroup.value.secondCtrl,'dd MMMM yyy') +' y ' +this.datepipe.transform(this.secondFormGroup.value.secondCtrl1,'dd MMMM yyy'),
        fontSize: 10,
       
        alignment: 'justify',
        color: '#000000',
      },
      {
        text:" ",
        fontSize: 10,
        
        alignment: 'left',
        color: '#000000',
      },
      {
        columns:[
          [
            {
              text:"Contrato:",
              fontSize: 10,
             
              alignment: 'left',
              color: '#000000',
            }
          ],

          [
            {
              text:this.datosContrato.n_CONTRATO,
              fontSize: 10,
              
              alignment: 'left',
              color: '#000000',
            }
          ],
          [
            {
             text:" "
            }
          ],
          [
            {
             text:" "
            }
          ]
         
        ],

     },
     {
      columns:[
        [
          {
            text:"Tipo de Contrato:",
            fontSize: 10,
            
            alignment: 'left',
            color: '#000000',
          }
        ],

        [
          {
            text:this.datosContrato.detalle,
            fontSize: 10,
            
            alignment: 'left',
            color: '#000000',
          }
        ],
        [
          {
           text:" "
          }
        ],
        [
          {
           text:" "
          }
        ]
       
      ],

   },
   {
    columns:[
      [
        {
          text:"Contratista:                               " +this.variableheredada.nombres,
          fontSize: 10,
          
          alignment: 'left',
          color: '#000000',
        }
      ],
       
     
    ],

 },


 {
  columns:[
    [
      {
        text:"Cédula o NIT:",
        fontSize: 10,
        alignment: 'left',
        color: '#000000',
      }
    ],

    [
      {
        text:this.datosContrato.cedula,
        fontSize: 10,
        
        alignment: 'left',
        color: '#000000',
      }
    ],
    [
      {
       text:" "
      }
    ],
    [
      {
       text:" "
      }
    ],
    
   
  ],

},
{
  columns:[
    [
      {
        text:"Objeto:",
        fontSize: 10,
       
        alignment: 'left',
        color: '#000000',
      }
    ]
   
  ],

},


  {
    columns:[
    [
      {
    text:"\r\n"+this.datosContrato.objeto_CONTRATO,
    fontSize: 10,
   
    alignment: 'justify',
    color: '#000000',
      }
    ]
      ]
  },

     {
      columns:[
        [
          {
            text:"\r\n"+"Plazo de contrato: ",
            fontSize: 10,
          
            alignment: 'left',
            color: '#000000',
          },
    
        ],
        [
          {
            text:"\r\n"+this.datosContrato.duracion_CONTRATO+ " Meses",
            fontSize: 10,
        
            alignment: 'left',
            color: '#000000',
          },
        ],
        [
          {

          }
        ],
        [
          {
            
          }
        ]
       
      ]

     },
     {
      columns:[
        [
          {
            text:"Fecha Iniciación:",
            fontSize: 10,
         
            alignment: 'left',
            color: '#000000',
          },
    
        ],
        [
          {
            text: this.datepipe.transform(this.datosContrato.fecha_INICIO_CONTRATO,'dd MMMM yyy'),
            fontSize: 10,
         
            alignment: 'left',
            color: '#000000',
          },
        ],
        [
          {

          }
        ],
        [
          {
            
          }
        ]
       
      ]

     },
     {
      columns:[
        [
          {
            text:"Fecha de Terminación:",
            fontSize: 10,
          
            alignment: 'left',
            color: '#000000',
          },
         
    
        ],
        [
          {
            text:this.datepipe.transform(this.datosContrato.fecha_FINAL_CONTRATO,'dd MMMM yyy'),
            fontSize: 10,
          
            alignment: 'left',
            color: '#000000',
          },
        ],
        [
          {

          }
        ],
        [
          {
            
          }
        ]
       
      ]

     },
     {
      columns:[
        [
          {
            text:"Valor inicial pactado:",
            fontSize: 10,
       
            alignment: 'left',
            color: '#000000',
          },
         
    
        ],
        [
          {
            text:this.secondFormGroup.value.secondCtrl2,
            fontSize: 10,
         
            alignment: 'left',
            color: '#000000',
          },
        ],
        [
          {

          }
        ],
        [
          {
            
          }
        ]
       
      ]

     },
     {
      columns:[
        [
          {
            text:"Valor Adicional:",
            fontSize: 10,
     
            alignment: 'left',
            color: '#000000',
          },
         
    
        ],
        [
          {
            text:"$"+this.datosContrato.valor_ADICION,
            fontSize: 10,
   
            alignment: 'left',
            color: '#000000',
          },
        ],
        [
          {

          }
        ],
        [
          {
            
          }
        ]
       
      ]

     },

     {
      columns:[
        [
          {
            text:"Suspensión (Inicio/Fin):",
            fontSize: 10,
        
            alignment: 'left',
            color: '#000000',
          },
         
    
        ],
        [
          {
            text:"N/A",
            fontSize: 10,
           
            alignment: 'center',
            color: '#000000',
          }
        ],
        [
    
            {
              text:"  -  ",
              fontSize: 10,
  
              alignment: 'center',
              color: '#000000',
      
          }
        ],
        [
  
            {
              text:"N/A",
              fontSize: 10,

              alignment: 'center',
              color: '#000000',
            }
          
        ]
        
       
      ]

     },



     {
      columns:[
        [
          {
            text:"Número de PIN:",
            fontSize: 10,
   
            alignment: 'left',
            color: '#000000',
          },
         
    
        ],
        [
          {
            text:this.treFormGroup.value.treeCtrl,
            fontSize: 10,
        
            alignment: 'center',
            color: '#000000',
          },
        ],
        [
    
          {
            text:"  -  ",
            fontSize: 10,
  
            alignment: 'center',
            color: '#000000',
    
        }
      ],
      [

          {
            text:this.treFormGroup.value.pin2,
            fontSize: 10,
    
            alignment: 'center',
            color: '#000000',
          }
        
      ]
      ]

     },

     {
      columns:[
        [
          {
            text:"Periodo cotizado:",
            fontSize: 10,
 
            alignment: 'left',
            color: '#000000',
          },
         
    
        ],
        [
          {
            text:this.treFormGroup.value.treeCtrl2,
            fontSize: 10,

            alignment: 'center',
            color: '#000000',
          },
        ],
        [
    
          {
            text:"  -  ",
            fontSize: 10,

            alignment: 'center',
            color: '#000000',
    
        }
      ],
      [

          {
            text:this.treFormGroup.value.pin2periodo,
            fontSize: 10,

            alignment: 'center',
            color: '#000000',
          }
        
      ]
      ]

     },


     {
      text:" ",
      fontSize: 10,

      alignment: 'left',
      color: '#000000',
    },
     {
      text:"Se verificó el cumplimiento del pago de los aportes parafiscales relativos a SENA, ICBF, Cajas de Compensación Familiar, cuando corresponda y ARL y al Sistema de Seguridad Social Integral por parte del contratista, de conformidad con el Parágrafo 1 del Art. 23 la Ley 1150 de 2007 y Artículo 244 de la Ley 1955 de 2019:",
            fontSize: 10,

            alignment: 'justify',
            color: '#000000',
     },
     {
      text:" ",
            fontSize: 10,
 
            alignment: 'left',
            color: '#000000',
     },
     {
      text:"En constancia se firma el "  +this.datepipe.transform(this.firstFormGroup.value.firstCtrl,'dd MMMM yyy'),
            fontSize: 10,
       
            alignment: 'left',
            color: '#000000',
     },

     {
      columns:[
        [
          {
            text:"\r\n"+'Supervisor,',
            fontSize: 10,
       
            alignment: 'left',
            color: '#000000',
          },
          {
            text:"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n",
            fontSize: 10,
         
            alignment: 'left',
            color: '#000000',
           },
          {
            text:"\r\n"+"_____________________________________________________",
            fontSize: 10,
      
            alignment: 'center',
            color: '#000000',
          },
          {
            text:'JULIAN ANDRÉS MORENO BARÓN',
            fontSize: 10,
         
            alignment: 'center',
            color: '#000000',
          },
          {
            text:'ALCALDE LOCAL DE SUBA',
            fontSize: 10,
           
            alignment: 'center',
            color: '#000000',
          },
          {
            text:'C.C. No. 1032437150 de Bogotá D.C',
            fontSize: 10,
         
            alignment: 'center',
            color: '#000000',
          }

        ],
        [
          {
            text:"\r\n"+'Apoyo a la supervisión,',
            fontSize: 10,
           
            alignment: 'left',
            color: '#000000',
          },
          {
            text:"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n",
            fontSize: 10,
           
            alignment: 'left',
            color: '#000000',
           },
          {
            text:"\r\n"+"_____________________________________________________",
            fontSize: 10,
          
            alignment: 'center',
            color: '#000000',
          },
          {
            text: this.variableheredada.name_SUPER,
            fontSize: 10,
  
            alignment: 'center',
            color: '#000000',
          },
          {
            text:this.variableheredada.cargo,
            fontSize: 10,
        
            alignment: 'center',
            color: '#000000',
          },
          {
            text:'C.C. No.'+ this.variableheredada.cedula_SUPERVISOR+' de '+this.variableheredada.ciudad_cedula_supervisor,
            fontSize: 10,
        
            alignment: 'center',
            color: '#000000',
          }
        ]
      ]
     },
     {
      // auto-sized columns have their widths based on their content
      
     
      text:"\r\n"+"\r\n"+"Versión: 2.3. ",
      alignment: 'right',
      color: '#000000',
      fontSize: 6,
    },
    {
      // auto-sized columns have their widths based on their content
      
      
      text:"Vigencia: 28/02/22 ",
      alignment: 'right',
      color: '#000000',
      fontSize: 6,
    },
    

      ],
      
      
       };
       if(action==='print'){
        pdfMake.createPdf(docDefinicion).print(); 
      }else if(action === 'download'){
        pdfMake.createPdf(docDefinicion).download(); 
      }else {
        pdfMake.createPdf(docDefinicion).open();      
      }
       
      
   };

// PdfCeuntadeCobro
   async PdfCeuntadeCobro(action = 'open'){
 
    let docDefinicion = {
      content: [
        {
          text:"\r\n"+"Documento de Cobro de Servicios prestados por personas naturales no comerciantes inscritas en el regimen simplificado (Art 3 decreto 522 de 2003) y Certificación de cumplimiento de requisitos de acuerdo con lo establecido en el parágrafo primero del Artículo 4 del Decreto 2271 de 2009, en el artículo 50 de la Ley 789 de 2002, en la Ley 828 de 2003 y ley 1819 de 2016.",
          alignment: 'center',
          color: '#000000',
          fontSize: 10,
        },
        
        {
          text:"\r\n"+"\r\n",
          alignment: 'left',
          color: '#000000',
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '20%',
              text:"Ciudad y fecha: ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
            },
            {
             
              width: '30%',
              text:" "+"Bogotá D.C "+this.datepipe.transform(this.firstFormGroup.value.firstCtrl, 'dd MMMM yyy')+" ",
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
              // fixed width
              width: '20%',
              text:" Documento No. ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
            },
            {
              // fixed width
              width: '20%',
              text:" "+this.variableheredada.cedula+" ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
              decoration: 'underline'
            },
            
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: 'auto',
              text:"Yo ",
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: '40%',
              text:" "+this.variableheredada.nombres+" ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            
                        
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          // fixed width
          width: '60%',
          text:" identificado como aparece al pie de mi firma, me permito manifestar bajo la gravedad del juramento que de conformidad con los art. 383, 388 y  330 del Estatuto Tributario mis ingresos se encuentran clasificados de acuerdo con la determinacion cedular informada a continuación: ",
          alignment: 'justify',
          color: '#000000',
          fontSize: 10,
        },
        {
          text:"\r\n"+"\r\n",
          alignment: 'left',
          color: '#000000',
          fontSize: 10,
        },
        
        {
          columns: [
           
            {
             
              width: 'auto',
              text: this.firstFormGroup.value.SI0NO,
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
            },
           
            {
              width: 'auto',
              text:'Soy declarante de renta por el años gravable 2021',
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
              
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
             
              width: 'auto',
              text:'SI  [X]   NO [  ]',
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
            },
           
            {
              width: 'auto',
              text:'Pertenece a rentas de trabajo',
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
              
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: 'auto',
              text:'SI  [  ]   NO [X]',
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
           
            {
              width: 'auto',
              text:'He contratado o vinculado dos (2) o mas trabajdores asociados a esta activadad',
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
              
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"+"\r\n"+'EL FONDO DE DESARROLLO LOCAL DE SUBA',
          alignment: 'center',
          color: '#000000',
          bold: true,
          fontSize: 10,
          
        }, 
        {
          text:'NIT 899.999.061-9',
          alignment: 'center',
          color: '#000000',
          fontSize: 10,
          
        },
        {
          text:'Calle 146 C bis No. 90-57 Teléfono 6620222',
          alignment: 'center',
          color: '#000000',
          fontSize: 10,
         
        },

        {
          text:"\r\n"+'DEBE A:',
          alignment: 'center',
          color: '#000000',
          fontSize: 10,
         
        },
        {
          text:this.variableheredada.nombres+", "+" identificado  con cédula de ciudadanía "+this.variableheredada.cedula+"\r\n",
          alignment: 'left',
          color: '#000000',
          fontSize: 10,
         
        },
        {
          text:"\r\n",
        alignment: 'left',
        color: '#000000',

        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '15%',
              text:"\r\n"+"Por concepto",
              fontSize: 10,
              alignment: 'left',
              color: '#000000',
          
            },
            {
             
              width: '85%',
              text: this.datosContrato.objeto_CONTRATO,
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
           
          ],
          // optional space between columns
          columnGap: 10
        },
{
  text:"\r\n"
},
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '20%',
              text:"Periodo:",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: '30%',
              text:"      "+ this.datepipe.transform(this.secondFormGroup.value.secondCtrl,'dd MMMM yyy')+"      ",
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
              // auto-sized columns have their widths based on their content
              
              width: '10%',
              text:"a",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: '30%',
              text:"      "+this.datepipe.transform(this.totalsaldo.fechaFin,'dd MMMM yyy')+"      ",
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
           
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '30%',
              text:"La suma de:",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
            },
            {
             
              width: '70%',
              text:"      "+ this.secondFormGroup.value.secondCtrl2+"      ",
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: 'auto',
              text:"La suma de: ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: 'auto',
              text:" "+ this.datosContrato.n_CONTRATO +"  ",
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: 'auto',
              text:"Tipo Contrato",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
              
            },
            {
             
              width: 'auto',
              text:this.datosContrato.detalle,
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: 'auto',
              text:"Pago: ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
              
            },
            {
             
              width: 'auto',
              text:this.secondFormGroup.value.secondCtrl3,
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: 'auto',
              text:"de",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: 'auto',
              text:this.secondFormGroup.value.secondCtrl4,
              alignment: 'left',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '35%',
              text:"Planillas pago seguridad social: ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: '30%',
              text:"    "+this.treFormGroup.value.treeCtrl+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: '10%',
              text:" - ",
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
              
            },
            {
             
              width: '30%',
              text:"    "+this.treFormGroup.value.pin2+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            }
          ],
          // optional space between columns
          columnGap: 10
        },

        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '35%',
              text:"Periodo de pago: ",
              alignment: 'left',
              color: '#000000',
              fontSize: 10,
          
            },
            {
             
              width: '30%',
              text:"    "+this.treFormGroup.value.treeCtrl2+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: '10%',
              text:" - ",
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
              
            },
            {
             
              width: '30%',
              text:"    "+this.treFormGroup.value.pin2periodo+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            }
          ],
          // optional space between columns
          columnGap: 10
        },

        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '35%',
              text:"Fecha de pago: ",
              alignment: 'left',
              color: '#000000',fontSize: 10,
          
            },
            {
             
              width: '30%',
              text:"    "+this.datepipe.transform(this.treFormGroup.value.treeCtrl1,'dd MMMM yyy')+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: '10%',
              text:" - ",
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
            },
            {
             
              width: '30%',
              text:"    "+this.datepipe.transform(this.treFormGroup.value.pin2fechapago,'dd MMMM yyy')+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: 'auto',
              text:"Favor consignar en: ",
              alignment: 'left',
              color: '#000000',fontSize: 10,
          
            },
            {
             
              width: 'auto',
              text:this.variableheredada.name_BANCO,
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: 'auto',
              text:'Cuenta: ',
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
              
            },
            {
             
              width: 'auto',
              text:this.variableheredada.tipo_CUENTA,
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            {
             
              width: 'auto',
              text:'No. ',
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
            },{
             
              width: 'auto',
              text:this.variableheredada.n_CUENTA_BANCO,
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
            
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '35%',
              text:"Ingreso base de cotización: ",
              alignment: 'left',
              color: '#000000',fontSize: 10,
          
            },
            {
             
              width: '30%',
              text:"    "+this.secondFormGroup.value.toatalibc+"   ",
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10,
            },
           
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: 'auto',
              text:"Conozco la responsabilidad que implica jurar en falso de conformidad con el Código Penal y Certifico bajo la gravedad del juramento que los documentos soportes del pago de aportes obligatorios al sistema de seguridad social en salud y ARL, corresponde a los ingresos provenientes del contrato de prestación de servicios Celebrado con EL FONDO DE DESARROLLO LOCAL DE SUBA materia del pago sujeto a retención. De igual manera certifico que todo lo declarado anteriormente es verdadero y se puede comprobar en cualquier momento para lo cual otorgo las autorizaciones ",
              alignment: 'justify',
              color: '#000000',
              fontSize: 10,
              
          
            }
          ],
          // optional space between columns
          columnGap: 10
        },
       
        {
          text:"\r\n"
        },
        {
          columns: [
            {
              // auto-sized columns have their widths based on their content
              
              width: '25%',
              text:"DIRECCIÓN: ",
              alignment: 'center',
              color: '#000000',
              fontSize: 10,
          
            },
            {
              // auto-sized columns have their widths based on their content
              
              width: '25%',
              text:this.variableheredada.direccion,
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10
          
            },
            {
              // auto-sized columns have their widths based on their content
              
              width: '25%',
              text:"TELÉFONO: ",
              alignment: 'center',
              color: '#000000',
              fontSize: 10
              
          
            },
            {
              // auto-sized columns have their widths based on their content
              
              width: '25%',
              text:this.variableheredada.telefono,
              alignment: 'center',
              color: '#000000',
              decoration: 'underline',
              fontSize: 10
          
            }
          ],
          // optional space between columns
          columnGap: 10
        },

        {
          text:"\r\n"
        },
   
  
            {
              // auto-sized columns have their widths based on their content
              
             
              text:"Versión: 2.3. ",
              alignment: 'right',
              color: '#000000',
              fontSize: 6,
           
            },
            
            {
              // auto-sized columns have their widths based on their content
              
              
              text:"Vigencia: 28/02/22 ",
              alignment: 'right',
              color: '#000000',
              fontSize: 6,

            },
           
   
          // optional space between columns
   

       
     ],
   

    };
    if(action==='print'){
     pdfMake.createPdf(docDefinicion).print(); 
   }else if(action === 'download'){
     pdfMake.createPdf(docDefinicion).download(); 
   }else{
     pdfMake.createPdf(docDefinicion).open();      
   }

   };


//PDF SUPERVISOR INFORME

  async PdfInformeSupervisor(action = 'open') {
    const docDefinicion: any = {
      content: [
        {
          table: {
            body: [
              [
                
                {
                  image: await this.getBase64ImageFromURL(
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlPAe6DGjT6cx3nQKzZOYXrV9CmtXtsC2SwXI76xUyCj6vSTr1swie7qKklEwksmV5qiw&usqp=CAU" ),
                alignment: 'center',
                width: 150,
                height: 50,
              },
                {
                 text:"\r\n"+'INFORME DE SUPERVISIÓN PARA LOS CONTRATOS DE PRESUPUESTOS PARTICIPATIVOS',
                 alignment: 'center',
                 fontSize: 10,
                 bold: true
                }
              ],
              
            ]
          }
        },
        {
          text:"\r\n"+'SEGUIMIENTO JURÍDICO',
          alignment: 'center',
          fontSize: 10,
          bold: true,
          decoration: 'underline'
         },
         {
          text:"\r\n",
         
          
         },

         {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text:'No. Contrato',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datosContrato.n_CONTRATO,
                  alignment: 'center',
                  fontSize: 10,
                 
                 
                 },
              ],
              [
                {
                  text:'No. Pago',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.secondFormGroup.value.secondCtrl3,
                  alignment: 'center',
                  fontSize: 10,
                
                 
                 },
              ],
              
              [
                {
                  text:'NOMBRE CONTRATISTA',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.variableheredada.nombres,
                  alignment: 'center',
                  fontSize: 10,
                 
                  
                 },
              ],
             
              [
                {
                  text:'OBJETO DEL CONTRATO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
              
                 },
                 {
                  text:this.datosContrato.objeto_CONTRATO,
                  alignment: 'justify',
                  fontSize: 10,
                 
                 },
              ]
              ,
              [
                {
                  text:'FECHA INICIO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                
                 },
                 {
                  text:this.datosContrato.fecha_FINAL_CONTRATO,
                  alignment: 'center',
                  fontSize: 10,
                
               
                 },
              ],
              
              [
                {
                  text:'FECHA FINAL',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datosContrato.fecha_FINAL_CONTRATO,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              
                        
              
            ]
          }

         },
         {
          
          table: {
            widths: ['*'],
            body: [
              [
                {
                 text:'MODIFICACIONES CONTRACTUALES',
                 alignment: 'center',
                 fontSize: 10,
                 bold: true
                }
              ],
              
            ]
          }
        },

        {
          table: {
            widths: [130, '*', '*', '*'],
            body: [
              [
                {
                  text:'TIPO DE MODIFICACIÓN',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:"FECHA DE INICIO DE LA MODIFICACIÓN",
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:"TIPO DE MODIFICACIÓN",
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:"NO. PÓLIZA APROBADA Y VIGENTE",
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
              [
                {
                  text:'ADICIÓN',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datepipe.transform(this.cinFormGroup.value.cinCtrl7,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl8,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl9,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
              [
                {
                  text:'PRORROGA',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datepipe.transform(this.cinFormGroup.value.cinCtrl10,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl11,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl12,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
              [
                {
                  text:'SUSPENSIÓN',
                  alignment: 'left',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datepipe.transform(this.cinFormGroup.value.cinCtrl13,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl14,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl15,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
              [
                {
                  text:'TERMINACIÓN ANTICIPADA',
                  alignment: 'left',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datepipe.transform(this.cinFormGroup.value.terminacionanticipadaA,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.terminacionanticipadaP,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.terminacionanticipadaE,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
              [
                {
                  text:'CESIÓN',
                  alignment: 'left',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datepipe.transform(this.cinFormGroup.value.cesioncontratoA,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cesioncontratoP,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cesioncontratoE,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
              [
                {
                  text:'OTRO SI',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datepipe.transform(this.cinFormGroup.value.cinCtrl16,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl17,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
                 {
                  text:this.cinFormGroup.value.cinCtrl18,
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                 
                 
                 },
              ],
         
             
                        
              
            ]
          }
        },
        {
          
          
            table: {
              widths: ['*'],
              body: [
                [
                  {
                   text:'OBSERVACIONES: '+this.cinFormGroup.value.cinCtrl19,
                   alignment: 'left',
                   fontSize: 10,
                   bold: true
                  }
                ],
                
              ]
          
          },
        },

        {
          text:"\r\n"+'SEGUIMIENTO TÉCNICO - ADMINISTRATIVO',
          alignment: 'center',
          fontSize: 10,
          bold: true,
          decoration: 'underline'
         },
         {
          text:"\r\n",
          alignment: 'center',
          fontSize: 10,
          bold: true,
         
         },

         {

          table: {
            widths: ['*'],
            body: [
              [
                {
                 text:"\r\n"+this.cinFormGroup.value.cinCtrl20+"\r\n",
                 alignment: 'left',
                 fontSize: 10,
                 bold: true
                }
              ],
              
            ]
        
        },
      },
      {
        text:"\r\n"+'SEGUIMIENTO FINANCIERO',
        alignment: 'center',
        fontSize: 10,
        bold: true,
        decoration: 'underline'
       },
       {
        text:"\r\n",
        alignment: 'center',
        fontSize: 10,
        bold: true,
       
       },

       {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text:'CONCETPO',
                alignment: 'center',
                fontSize: 10,
                bold: true,
               
               },
               {
                text:'VALOR',
                alignment: 'center',
                fontSize: 10,
                bold: true,               
               
               },
            ],
            [
              {
                text:'VALOR INICIAL',
                alignment: 'letf',
                fontSize: 10
               
               },
               {
                text:this.cinFormGroup.value.cinCtrl21,
                alignment: 'center',
                fontSize: 10,
              
               
               },
            ],
            
            [
              {
                text:'VALOR ADICIONAL No. 1',
                alignment: 'letf',
                fontSize: 10,
             
               
               },
               {
                text:this.cinFormGroup.value.cinCtrl22,
                alignment: 'center',
                fontSize: 10,
               
                
               },
            ],
            [
              {
                text:'VALOR ADICIONAL No. 2',
                alignment: 'letf',
                fontSize: 10,
             
               
               },
               {
                text:this.cinFormGroup.value.cinCtrl23,
                alignment: 'center',
                fontSize: 10,
               
                
               },
            ],
           
            [
              {
                text:'VALOR TOTAL',
                alignment: 'letf',
                fontSize: 10,
               
            
               },
               {
                text:this.cinFormGroup.value.cinCtrl24,
                alignment: 'center',
                fontSize: 10,
               
               },
            ]
            ,
            [
              {
                text:'PAGO No. 1',
                alignment: 'letf',
                fontSize: 10,
               
              
               },
               {
                text: this.cinFormGroup.value.cinCtrl25,
                alignment: 'center',
                fontSize: 10,
              
             
               },
            ],
            
            [
              {
                text:'PAGO No. 2',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl26,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'PAGO No. 3',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl27,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'PAGO No. 4',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl28,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'PAGO No. 5',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl29,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'PAGO No. 6',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl30,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'SALDO',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl31,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            
                      
            
          ]
        }

       },
       {
        text:"\r\n"+'SEGUIMIENTO MUSI',
        alignment: 'center',
        fontSize: 10,
        bold: true,
        decoration: 'underline'
       },
       {
        text:"\r\n",
        alignment: 'center',
        fontSize: 10,
        bold: true,
       
       },
       {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                text:'CONCETPO',
                alignment: 'center',
                fontSize: 10,
                bold: true,
               
               },
               {
                text:'DESCRIPCIÓN',
                alignment: 'center',
                fontSize: 10,
                bold: true,               
               
               },
            ],
            [
              {
                text:'CÓDIGO DE LA PROPUESTA',
                alignment: 'letf',
                fontSize: 10
               
               },
               {
                text:this.cinFormGroup.value.cinCtrl33,
                alignment: 'center',
                fontSize: 10,
              
               
               },
            ],
            
            [
              {
                text:'No PROYECTO INVERSIÓN',
                alignment: 'letf',
                fontSize: 10,
             
               
               },
               {
                text:this.cinFormGroup.value.cinCtrl34,
                alignment: 'center',
                fontSize: 10,
               
                
               },
            ],
            [
              {
                text:'NOMBRES DEL PROYECTO',
                alignment: 'letf',
                fontSize: 10,
             
               
               },
               {
                text:this.cinFormGroup.value.cinCtrl35,
                alignment: 'center',
                fontSize: 10,
               
                
               },
            ],
           
            [
              {
                text:'META ASIGNADA PROYECTO INVERSIÓN',
                alignment: 'letf',
                fontSize: 10,
               
            
               },
               {
                text:this.cinFormGroup.value.cinCtrl36,
                alignment: 'center',
                fontSize: 10,
               
               },
            ]
            ,
            [
              {
                text:'SECTOR',
                alignment: 'letf',
                fontSize: 10,
               
              
               },
               {
                text: this.cinFormGroup.value.cinCtrl37,
                alignment: 'center',
                fontSize: 10,
              
             
               },
            ],
            
            [
              {
                text:'PROPUESTA CIUDANA',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl38,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'MAGNITUD META PROGRAMA',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl39,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],
            [
              {
                text:'MAGNITUD META AVANZADA',
                alignment: 'letf',
                fontSize: 10,
                
                
               },
               {
                text:this.cinFormGroup.value.cinCtrl40,
                alignment: 'center',
                fontSize: 10,
         
                
               },
            ],

          ]
        }

       },
       {
        columns:[
          [
            {
              text:' ',
              fontSize: 10,
         
              alignment: 'left',
              color: '#000000',
            }, 
            {
              text:' ',
              fontSize: 10,
         
              alignment: 'left',
              color: '#000000',
            },
            {
              text:"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n",
              fontSize: 10,
           
              alignment: 'left',
              color: '#000000',
             },
            
            {
              text:"_____________________________________________________",
              fontSize: 10,
        
              alignment: 'center',
              color: '#000000',
            },
            {
              text:this.variableheredada.name_SUPER,
              fontSize: 10,
           
              alignment: 'center',
              color: '#000000',
            },
            {
              text:'C.C. No.'+ this.variableheredada.cedula_SUPERVISOR,
              fontSize: 10,
           
              alignment: 'center',
              color: '#000000',
            },
            {
              text:'C.C. No. '+ this.variableheredada.cedula_SUPERVISOR+' de '+this.variableheredada.ciudad_cedula_supervisor,
              fontSize: 10,
              alignment: 'center',
              color: '#000000',
            }
  
          ],
          [
            {
              text:"\r\n"+"\r\n"+' ',
              fontSize: 10,
             
              alignment: 'left',
              color: '#000000',
            },
            {
              image: await this.getBase64ImageFromURL(this.previsualizacion),
              height: 70,
              width: 125,
              alignment: 'center',
              display: 'block',
             },
            {
              text:"\r\n"+"_____________________________________________________",
              fontSize: 10,
            
              alignment: 'center',
              color: '#000000',
            },
            {
              text: this.variableheredada.nombres,
              fontSize: 10,
    
              alignment: 'center',
              color: '#000000',
            },
            {
              text:'CONTRATISTA',
              fontSize: 10,
          
              alignment: 'center',
              color: '#000000',
            },
            {
              text:'C.C. No.'+ this.variableheredada.cedula,
              fontSize: 10,
          
              alignment: 'center',
              color: '#000000',
            },
          ]
        ]
       },
       {
        text:"\r\n"+'Código: GCI-GCI-F133'+"\r\n"+"Versión: 01"+"\r\n"+"Vigencia: 30 de julio de 2018",
        alignment: 'center',
        fontSize: 8,
       },
       {
        text:"\r\n"+'Versión PP. 07- 28/02/22',
        alignment: 'center',
        fontSize: 8,
       
       
       },

         
         

      ]
    };

    if(action==='print'){
      pdfMake.createPdf(docDefinicion).print(); 
    }else if(action === 'download'){
      pdfMake.createPdf(docDefinicion).download(); 
    }else{
      pdfMake.createPdf(docDefinicion).open();      
    }
 
    };


    async PDFinformeActividaes(action='open'){

      //console.log(this.cuaFormGroup.value.lessons)
      const docDefinicion: any = {
        content: [
          {
            image: await this.getBase64ImageFromURL(
              "data:image/png;base64,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"
            ), 
                  alignment: 'center',
                  width: 50,
                  height: 50,
               
          },
          
            {
          
              text:"\r\n"+"\r\n"+"\r\n"+'ALCALDÍA LOCAL DE SUBA'+"\r\n"+"\r\n",
              alignment: 'center',
              fontSize: 10,
              bold: true,
            
          },
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    text:'INFORME MENSUAL DE ACTIVIDADES NÚMERO '+ this.secondFormGroup.value.secondCtrl3+"\r\n"+'PERIODO: '+ this.datepipe.transform(this.secondFormGroup.value.secondCtrl,'dd MMMM yyy')+' AL '+this.datepipe.transform(this.secondFormGroup.value.secondCtrl1,'dd MMMM yyy') ,
                    alignment: 'center',
                    fontSize: 10,
                    bold: true,
                   
                   }
                ],
               [
                {
                text:"\r\n"+'DATOS BÁSICOS DEL CONTRATO'+"\r\n"+"\r\n",
              alignment: 'center',
              fontSize: 10,
              bold: true,
               }
               ]
                      
              ]
            }
          
        },

        {
          table: {
            widths: ['*', '*'],
            
            body: [
              [
                {
                  text:'TIPO DE CONTRATO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datosContrato.detalle,
                  alignment: 'center',
                  fontSize: 10,
                 
                 
                 },
              ],
              [
                {
                  text:'No CONTRATO Y FECHA',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.datosContrato.n_CONTRATO+"   "+this.datepipe.transform(this.datosContrato.fecha_INICIO_CONTRATO,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
                
                 
                 },
              ],
              
              [
                {
                  text:'NOMBRE CONTRATISTA',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                 
                 },
                 {
                  text:this.variableheredada.nombres,
                  alignment: 'center',
                  fontSize: 10,
                 
                  
                 },
              ],
             
              [
                {
                  text:'No. IDENTIFACIÓN',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
              
                 },
                 {
                  text:this.datosContrato.cedula,
                  alignment: 'center',
                  fontSize: 10,
                 
                 },
              ]
              ,
              [
                {
                  text:'PLAZO DE EJECUCIÓN',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                
                 },
                 {
                  text:this.datosContrato.duracion_CONTRATO,
                  alignment: 'center',
                  fontSize: 10,
                
               
                 },
              ],
              
              [
                {
                  text:'VALOR TOTAL DEL CONTRATO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                
                  text:this.secondFormGroup.value.valortotalcontrato,
                  currency: 'COL',
                  alignment: 'center',
                  fontSize: 10,
                  
                  
                 },
                
              ],
              [
                {
                  text:'VALOR DEL PERIODO DE COBRO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.secondFormGroup.value.secondCtrl2,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'No. DEL PROYECTO(IMPUTACIÓN PRESUPUESTAL)',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.variableheredada.id_PROYECTO,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'FEHCA ACTA DE INICIO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datosContrato.fecha_INICIO_CONTRATO,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'PRORROGA',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datosContrato.detalle_PRORROGA,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'ADICIONES',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datosContrato.valor_ADICION,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'SUSPENCIONES (Días)',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datosContrato.detalle_SUPENCION,
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'FECHA TERMINACIÓN INCLUYENDO PRÓRROGAS Y SUSPENSIONES',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datepipe.transform(this.datosContrato.fecha_FINAL_CONTRATO,'dd MMMM yyy'),
                  alignment: 'center',
                  fontSize: 10,
           
                  
                 },
              ],
              [
                {
                  text:'OBJETO DEL CONTRATO',
                  alignment: 'letf',
                  fontSize: 10,
                  bold: true,
                  
                 },
                 {
                  text:this.datosContrato.objeto_CONTRATO,
                  alignment: 'justify',
                  fontSize: 10,
           
                  
                 },
              ],
              
                        
              
            ]
          }
        },
        
          {
            table: {
              widths: ['*'],
              body: [
                
               [
                {
                text:'DESARROLLO DEL INFORME',
                fillColor: 'lightskyblue',
                alignment: 'center',
                fontSize: 10,
                bold: true,
               }
               ]
                      
              ]
            }
          
        
        },
        {
          table: {
            headerRows: 1,
            widths: ['*'],
            body: [
              
             [
              {
            text:'OBLIGACIONES ESPECIFICAS 1:',
            alignment: 'left',
            fontSize: 10,
            bold: true,
             }
             ],
             [
              {
                stack: [
                  
                  {
                    ul: [
                      {
                   
                        text: this.obligacioneslist2.obligacion_1,
                        alignment: 'left',
                        fontSize: 10,
                        
                          }
                    ]
                  }
                ]
              },
            
             ]
                    
            ]
          }
        
      
      },
      {
        table: {
          widths: [5,157,158,158],
          body: [
            
           [
           {

           },
           {
            text:'ACTIVIDADES DESARROLLADAS',
            alignment: 'center',
            fontSize: 10,
            bold: true,
            
           },
            {
              text:'PRODUCTOS',
              alignment: 'center',
              fontSize: 10,
              bold: true,
              
            }
            ,
            {
              text:'MEDIO DE VERIFICACIÓN',
              alignment: 'center',
              fontSize: 10,
              bold: true,
              
            }
           ],
           [
            {
              text: '1',
              alignment: 'center',
              fontSize: 10,
              bold: true,
           },
           {
            text:this.cuaFormGroup.value.act1,
            alignment: 'justify',
            fontSize: 10,
            
           },
            {
              text:this.cuaFormGroup.value.prod1,
              alignment: 'justify',
              fontSize: 10,
              
            }
            ,
            {
              text:this.cuaFormGroup.value.evid1,
              alignment: 'justify',
              fontSize: 10,
              
            }
           ]
          
           
                  
          ]
        }
      
    
    },

    {
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          
         [
          {
        text:'OBLIGACIONES ESPECIFICAS 2:',
        alignment: 'left',
        fontSize: 10,
        bold: true,
         }
         ],
         [
          {
            stack: [
              
              {
                ul: [
                  {
               
                    text: this.obligacioneslist2.obligacion_2,
                    alignment: 'left',
                    fontSize: 10,
                    
                      }
                ]
              }
            ]
          },
        
         ]
                
        ]
      }
    
  
  },
  {
    table: {
      widths: [5,157,158,158],
      body: [
        
       [
       {

       },
       {
        text:'ACTIVIDADES DESARROLLADAS',
        alignment: 'center',
        fontSize: 10,
        bold: true,
        
       },
        {
          text:'PRODUCTOS',
          alignment: 'center',
          fontSize: 10,
          bold: true,
          
        }
        ,
        {
          text:'MEDIO DE VERIFICACIÓN',
          alignment: 'center',
          fontSize: 10,
          bold: true,
          
        }
       ],
       [
        {
          text: '1',
          alignment: 'left',
          fontSize: 10,
          bold: true,
       },
       {
        text:this.cuaFormGroup.value.act2,
        alignment: 'justify',
        fontSize: 10,
        
       },
        {
          text:this.cuaFormGroup.value.prod2,
          alignment: 'justify',
          fontSize: 10,
          
        }
        ,
        {
          text:this.cuaFormGroup.value.evid2,
          alignment: 'justify',
          fontSize: 10,
          
        }
       ]
      
       
              
      ]
    }
  

},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 3:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_3,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act3,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod3,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid3,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 4:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_4,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act4,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod4,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid4,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 5:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_5,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act5,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod5,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid5,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 6:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_6,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act6,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod6,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid6,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 7:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_7,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act7,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod7,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid7,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 8:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_8,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act9,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod9,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid9,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 9:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_9,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act9,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod9,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid9,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 10:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_10,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act10,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod10,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid10,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 11:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_11,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act11,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod11,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid11,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 12:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_12,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act12,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod12,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid12,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 13:',
    alignment: 'left',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_13,
                alignment: 'left',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'justify',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act13,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod13,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid13,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 14:',
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_14,
                alignment: 'justify',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: ['auto','*','*','*'],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act14,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod14,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid14,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 15:',
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_15,
                alignment: 'justify',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'justify',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act15,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod15,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid15,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 16:',
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_16,
                alignment: 'justify',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'justify',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act16,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod16,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid16,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 17:',
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_17,
                alignment: 'justify',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'justify',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act17,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod17,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid17,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 18:',
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_18,
                alignment: 'justify',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'justify',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act18,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod18,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid18,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},
{
  table: {
    headerRows: 1,
    widths: ['*'],
    body: [
      
     [
      {
    text:'OBLIGACIONES ESPECIFICAS 19:',
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     }
     ],
     [
      {
        stack: [
          
          {
            ul: [
              {
           
                text: this.obligacioneslist2.obligacion_19,
                alignment: 'justify',
                fontSize: 10,
                
                  }
            ]
          }
        ]
      },
    
     ]
            
    ]
  }


},
{
table: {
  widths: [5,157,158,158],
  body: [
    
   [
   {

   },
   {
    text:'ACTIVIDADES DESARROLLADAS',
    alignment: 'center',
    fontSize: 10,
    bold: true,
    
   },
    {
      text:'PRODUCTOS',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
    ,
    {
      text:'MEDIO DE VERIFICACIÓN',
      alignment: 'center',
      fontSize: 10,
      bold: true,
      
    }
   ],
   [
    {
      text: '1',
      alignment: 'center',
      fontSize: 10,
      bold: true,
   },
   {
    text:this.cuaFormGroup.value.act19,
    alignment: 'justify',
    fontSize: 10,
    
   },
    {
      text:this.cuaFormGroup.value.prod19,
      alignment: 'justify',
      fontSize: 10,
      
    }
    ,
    {
      text:this.cuaFormGroup.value.evid19,
      alignment: 'justify',
      fontSize: 10,
      
    }
   ]
  
   
          
  ]
}


},



      
       {
        table: {
          widths: ['*'],
          body: [
            
           [
            {
            text:'INFORMACÍON ADICIONAL',
          alignment: 'center',
          fillColor: 'lightskyblue',
          fontSize: 10,
          bold: true,
           }
           ]
                  
          ]
        }
      
    
    },

      {
        table: {
          widths: ['*','*','*','*'],
          body: [
            
           [
            {
            text:"\r\n"+'APORTESDE SEGURIDAD SOCIAL'+"\r\n",
          alignment: 'center',
          fontSize: 10,
          bold: true,
           },
           {
            text:'EMPRESA DONDE APOSTA PAGO DE SALUD '+"\r\n"+"\r\n"+ this.treFormGroup.value.treeCtrl3+"\r\n",
          alignment: 'center',
          fontSize: 10,
          bold: true,
           },
           {
            text:'EMPRESA DONDE APORTA PAGO ARL '+"\r\n" +"\r\n"+ this.treFormGroup.value.treeCtrl4+"\r\n",
          alignment: 'center',
          fontSize: 10,
          bold: true,
           },
           {
            text:'EMPRESA DONDE SE APORTA PENSIÓN '+"\r\n" +"\r\n"+ this.treFormGroup.value.treeCtrl5+"\r\n",
          alignment: 'center',
          fontSize: 10,
          bold: true,
           }
           ]
                  
          ]
        }
      
    
    },

    {
      table: {
        widths: ['*'],
        body: [
          
         [
          {
          text:'FIRMAS',
          alignment: 'center',
          fillColor: 'lightskyblue',
          fontSize: 10,
          bold: true,
          }
         ]
                
        ]
      }
    
  
  },
  {
    table: {
      widths: ['*','*'],
      body: [
        
       [
        {
        text:"\r\n"+"\r\n"+"\r\n"+"\r\n"+'DECLARACIÓN DEL CONTRATISTA: Manifiesto que he cumplido con las obligaciones derivadas del contrato y que las actividades mencionadas en el presente informe corresponden a las labores efectivamente desarrolladas en el periodo indicado, declarando que seré responsable por las afirmaciones contenidas en el presente documento, que sirve como soporte para certificar el cumplimiento del objeto del contrato.'+"\r\n"+"\r\n",
      alignment: 'justify',
      fontSize: 10,
      bold: true,
       },
       {
        table: {
          widths: ['*'],
          body: [
            
           [
           
           {
            text:'CONTRATISTA ',
          alignment: 'center',
          fontSize: 10,
          bold: true,
           }
           ],
           [
           {
            columns:[
              [
                {
                  text:"\r\n"+"\r\n"+'FIRMA:   ',
                  width: 100,
                  alignment: 'left',
                  display: 'block',
                },
                {
                  image: await this.getBase64ImageFromURL(this.previsualizacion),
                  width: 100,
                  alignment: 'center',
                  display: 'block',
                },
                {
                  
                  text:"\r\n"+"\r\n"+'NOMBRE:   '+this.variableheredada.nombres+"\r\n"+"\r\n"+"\r\n"+'CEDULA:   '+this.variableheredada.cedula+"\r\n"+"\r\n"+"\r\n",
                alignment: 'left',
                fontSize: 10,
                bold: true,
                 
              }
              ],
             
           
            ]
          }
        ]
             
             
           
         
                  
          ],
          
        }
        
       }
       ],
       
              
      ]
    }
  

},
{
  table: {
    widths: ['*','*'],
    body: [
      
     [
      {
      text:"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+"\r\n"+'DECLARACIÓN DEL SUPERVISOR : Una vez verificado los soportes allegados por el contratista manifiesto que el/la contratista ha cumplido a la fecha con las obligaciones establecidas en el contrato.'+"\r\n"+"\r\n",
    alignment: 'justify',
    fontSize: 10,
    bold: true,
     },
     {
      table: {
        widths: ['*'],
        body: [
          
         [
         
         {
          text:'SUPERVISOR ',
        alignment: 'center',
        fontSize: 10,
        bold: true,
         }
         ],
         [
          {
            text:"\r\n"+"\r\n"+'NOMBRE:  JULIAN ANDRÉS MORENO BARÓN'+"\r\n"+"\r\n"+"\r\n"+'CARGO:  ALCALDE LOCAL DE SUBA'+"\r\n"+"\r\n"+"\r\n"+'FIRMA: '+"\r\n"+"\r\n"+"\r\n",
          alignment: 'left',
          fontSize: 10,
          bold: true,
           },
           
         ],
         [
          {
            text:'APOYO A LA SUPERVISIÓN ',
          alignment: 'center',
          fontSize: 10,
          bold: true,
           },
          
         ],
         [
          {
            text:"\r\n"+"\r\n"+'NOMBRE:  '+this.variableheredada.name_SUPER+"\r\n"+"\r\n"+"\r\n"+'CARGO:  '+this.variableheredada.cargo+"\r\n"+"\r\n"+"\r\n"+'FIRMA: '+"\r\n"+"\r\n"+"\r\n",
          alignment: 'left',
          fontSize: 10,
          bold: true,
           },
         ]
                
        ],
        
      }
      
      
     },
     
     
     ],
     
            
    ]
  }


},

{
  text:"\r\n"+'Código: GCI-GCI-F110'+"\r\n"+"Versión: 06"+"\r\n"+"Vigencia: 17 de julio de 2019",
  alignment: 'right',
  fontSize: 8,
 },
    
          

        ]
      };

    
  
      if(action==='print'){
        pdfMake.createPdf(docDefinicion).print(); 
      }else if(action === 'open'){
        pdfMake.createPdf(docDefinicion).open(); 
      }else{
        pdfMake.createPdf(docDefinicion).download();      
      }
      
     }


  }



  



