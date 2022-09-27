import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/Persona';
import { environment } from 'src/environments/environment';
import { Login } from '../models/Login';
import { Rol } from '../models/Rol';

@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  constructor(private http : HttpClient) { }

  public registro(persona: Persona){
    return this.http.post(environment.apiUrl+'/crea',persona);
  }

  public login(data:any){
    return this.http.post(environment.apiUrl+'/login',data);
  }

  public roles(){
    return this.http.get(environment.apiUrl+'/roles');
  }

  public obtener(id:number){
    return this.http.get(environment.apiUrl+'/'+id);
  }

  public lista(){
    return this.http.get(environment.apiUrl+'/');
  }

  public actualizar(id:number, persona:Persona){
    return this.http.put(environment.apiUrl+'/actualizar/'+id, persona);
  }

  public eliminar(id:number){
    return this.http.delete(environment.apiUrl+'/eliminar/'+id);
  }

  public logout(){
    return this.http.post(environment.apiUrl,'/logout');
  }

}
