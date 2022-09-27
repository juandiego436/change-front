import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Persona } from '../models/Persona';
import { OrigenService } from '../servicio/origen.service';
import { Rol } from '../models/Rol';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-Registro',
  templateUrl: './Registro.component.html',
  styleUrls: ['./Registro.component.css']
})
export class RegistroComponent implements OnInit {

  rol:any;
  nombre?:string;
  email?:string;
  password?:string;
  fechaNacimiento?:string;
  rols:any;
  result:any;

  constructor(private service : OrigenService, private router : Router, private auth : AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.roles();
    this.actualizar();
  }

  roles(){
    this.service.roles().subscribe(data => {
      this.rols = data;
      this.rols = this.rols.data;
    }, error => {
      console.error(error);
      this.rols = [];
    });
  }

  actualizar()
  {
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.service.obtener(id).subscribe(
      data => {
        this.result = data;
        this.result = this.result.data;
        this.nombre = this.result.nombre;
        this.email = this.result.email;
        this.fechaNacimiento = this.result.fechaNacimiento;
        this.rol = this.result.roles;
      },
      err => {
        console.error(err);
      }
    );
  }

  OnSubmit(){
    let request = new Persona;
    request.nombre = this.nombre;
    request.email = this.email;
    request.password = this.password;
    request.fechaNacimiento = this.fechaNacimiento;
    let requestRol = new Rol;
    requestRol.rolNombre = this.rol;
    request.rol = requestRol;
    console.log(request);
    const id = this.activatedRoute.snapshot.params['id'];
    console.log(id);
    if(id != null){
      this.service.actualizar(id,request).subscribe(data => {
        Swal.fire('Exitoso', 'Persona Actualizo', 'success').then((r)=>{
          this.router.navigateByUrl('/persona');
        });

      }, error => {
        console.error(error);
      Swal.fire('Lo sentimos', 'Ocurrio error interno', 'error');
      });
    }else{
      this.service.registro(request).subscribe(data => {
        console.log(data);
        this.result = data;
        if(this.result["message"] == "OK"){
          console.log(this.auth.getToken())
          if(this.auth.getToken()){
            Swal.fire('Exitoso', 'Persona Registrada', 'success')
            this.router.navigateByUrl('/persona');
          }else{
            Swal.fire('Exitoso', 'Persona Registrada', 'success')
            this.router.navigateByUrl('/login');
          }
        }
      }, error => {
        console.error(error);
        Swal.fire('Lo sentimos', 'Ocurrio error interno', 'error')
      });
    }
  }
}
