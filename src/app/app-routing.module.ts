import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteNovoComponent } from './pages/cliente-novo/cliente-novo.component';
import { ClienteEditarComponent } from './pages/cliente-editar/cliente-editar.component';

const routes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'novo', component: ClienteNovoComponent },
  { path: ':id', component: ClienteEditarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
