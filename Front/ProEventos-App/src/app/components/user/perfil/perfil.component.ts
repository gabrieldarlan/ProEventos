import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  formOptions: AbstractControlOptions = {
    validators: ValidatorField.mustMatch('senha', 'confirmeSenha'),
  };
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
    }
  }

  ngOnInit() {
    this.validation();
  }

  public validation() {
    this.form = this.fb.group(
      {
        primeiroNome: ['', [Validators.required]],
        ultimoNome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        telefone: ['', [Validators.required]],
        descricao: ['', [Validators.required]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmeSenha: ['', [Validators.required, Validators.minLength(6)]],
      },
      this.formOptions
    );
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }
}
