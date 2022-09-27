import { DashbardComponent } from './Dashbard/Dashbard.component';
import { LoginComponent } from '../app/login/login.component';
import { RegistroComponent } from '../app/Registro/Registro.component';
import { PersonaComponent } from './persona/persona.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuardsService as guard} from '../app/guards/guards.service';

const routes: Routes = [
  {path: 'persona/crea', component : RegistroComponent},
  {path: 'login', component : LoginComponent},
  {path: 'home', component: DashbardComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  {path: 'persona', component: PersonaComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  {path: 'persona/actualizar/:id', component : RegistroComponent, canActivate: [guard], data: { expectedRol: ['admin', 'user'] } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
