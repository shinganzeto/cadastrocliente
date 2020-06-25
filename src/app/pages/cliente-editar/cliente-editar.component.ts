import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent implements OnInit {
  id: Number;
  clienteForm: FormGroup;
  nome: String = '';
  sobrenome: String = '';
  idade: String = '';
  sexo: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id']);
    this.clienteForm = this.formBuilder.group({
   'nome' : [null, Validators.required],
   'sobrenome' : [null, Validators.required],
   'idade' : [null, Validators.required],
   'sexo' : [null, Validators.required],
 });
 }

 getCliente(id) {
  this.api.getCliente(id).subscribe(data => {
    this.id = data.id;
    this.clienteForm.setValue({
      nome: data.nome,
      sobrenome: data.sobrenome,
      idade: data.idade,
      sexo: data.sexo,
    });
  });
}

updateCliente(form: NgForm) {
  this.isLoadingResults = true;
  this.api.updateCliente(this.id, form)
    .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }

  deleteCliente() {
    this.isLoadingResults = true;
    this.api.deleteCliente(this.route.snapshot.params['id'])
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
