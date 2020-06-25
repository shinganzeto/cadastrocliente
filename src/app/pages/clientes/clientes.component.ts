import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = [ 'nome', 'sobrenome', 'idade', 'sexo','acao'];
  dataSource: Cliente[];
  isLoadingResults = true;
  constructor( private _api: ApiService) { }

  ngOnInit() {
    this._api.getClientes()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
}
