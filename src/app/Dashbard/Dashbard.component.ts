import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { OrigenService } from '../servicio/origen.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-Dashbard',
  templateUrl: './Dashbard.component.html',
  styleUrls: ['./Dashbard.component.css']
})
export class DashbardComponent implements OnInit {

  isLogged = false;
  nombreUsuario = '';
  result:any;
  constructor(private service : AuthService, private origen : OrigenService, private router: Router) { }

  ngOnInit() {
    if (this.service.getToken()) {
      this.isLogged = true;
      this.nombreUsuario = this.service.getUserName();
      console.log(this.nombreUsuario);
      console.log(this.isLogged);
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
  }

  onLogOut(){
    this.origen.logout().subscribe(data =>{
      console.log(data);
      this.result = data;
      if(this.result["message"] == "OK"){
        this.router.navigateByUrl('/login');
      }
    }, error => {
      console.error(error);
      this.router.navigateByUrl('/login');
      this.result = [];
    });
    this.service.logOut();
  }

}
