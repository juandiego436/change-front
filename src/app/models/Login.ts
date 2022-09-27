import { Persona } from '../models/Persona';

export class Login {
  token?:string;
  persona?:Persona;
  authorities?:string[];
}
