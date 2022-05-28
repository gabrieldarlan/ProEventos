import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  formOptions: AbstractControlOptions = {
    validators: ValidatorField.mustMatch('senha', 'confirmeSenha'),
  };
  form: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
  }

  public validation() {
    this.form = this.fb.group(
      {
        primeiroNome: ['', [Validators.required]],
        ultimoNome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        userName: [
          '',
          [
            Validators.required,
            Validators.maxLength(8),
            Validators.minLength(6),
          ],
        ],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmeSenha: ['', [Validators.required, Validators.minLength(6)]],
      },
      this.formOptions
    );
  }
}
