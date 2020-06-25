import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.scss']
})

export class ClienteNovoComponent implements OnInit {
  clienteForm: FormGroup;
  nome: String = '';
  sobrenome: String = '';
  idade: String = '';
  sexo: String = '';
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
     this.clienteForm = this.formBuilder.group({
    'nome' : [null, Validators.required],
    'sobrenome' : [null, Validators.required],
    'idade' : [null, Validators.required],
    'sexo' : [null, Validators.required]
  });
  }

  addCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCliente(form)
      .subscribe(res => {
          const id = res['id'];
          this.isLoadingResults = false;
          this.router.navigate(['/']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
