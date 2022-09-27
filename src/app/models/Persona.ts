import {Rol} from '../models/Rol';

export class Persona {
  nombre?:string;
  email?:string;
  password?:string;
  fechaNacimiento?:string;
  rol?: Rol;
}
