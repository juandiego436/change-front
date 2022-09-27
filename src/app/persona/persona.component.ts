import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OrigenService } from '../servicio/origen.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  isLogged = false;
  nombreUsuario = '';
  result:any;
  constructor(private service : AuthService, private origen : OrigenService, private router : Router) { }

  ngOnInit(): void {
    if (this.service.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.service.getUserName();
      console.log(this.nombreUsuario);
      console.log(this.isLogged);
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
    this.personas();
  }

  personas(){
    this.origen.lista().subscribe(data => {
      this.result=data;
      this.result = this.result.data;
    }, error => {
      console.error(error);
      this.result = [];
    });
  }

  deleted(id:number){
    this.origen.eliminar(id).subscribe(data => {
      this.result = data;
      console.log(this.result);
      if(this.result["message"] == "OK"){
        Swal.fire('Exitoso', 'Persona Eliminada', 'success').then((r)=>{
          window.location.reload();
        });
      }
    }, error => {
      console.error(error);
      Swal.fire('Lo sentimos', 'Ocurrio error interno', 'error').catch((e)=>{
        window.location.reload();
      });
    });
  }

}
