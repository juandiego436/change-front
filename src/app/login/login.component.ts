import { Component, OnInit } from '@angular/core';
import { Login } from '../models/Login';
import { OrigenService } from '../servicio/origen.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  login?:Login;
  result:any;
  password?: string='12345678';
  email?:string = 'juandiego1201@gmail.com';
  roles: string[] = [];

  constructor(private service: OrigenService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.authService.getAuthorities();
    }
  }

  OnSubmit(): void {
    let request : any = {};
    request["email"] = this.email;
    request["password"] = this.password;
    console.log(request);
    this.service.login(request).subscribe(data =>{
      console.log(data);
      this.result = data;
      if(this.result.data!=null){
        this.login = this.result.data;
        console.log(this.login);
        this.isLogged = true;
        this.authService.setToken(this.login?.token||'');
        this.authService.setUserName(this.login?.persona?.email||'');
        this.authService.setAuthorities(this.login?.authorities||[]);
        this.roles = this.login?.authorities||[];
        this.router.navigateByUrl('/persona')
      }

    }, error => {
      this.isLogged = false;
      console.log(error);
    });
  }

}
