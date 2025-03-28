import { Component } from '@angular/core';
import { InputSimpleComponent } from '../inputs/input-simple/input-simple.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [InputSimpleComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  testform!: FormGroup;
  formSubmitted: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.testform = this.initForm();
  }

  sumbit() {
    //Затрагиваем все поля формы для проверки
    this.testform.markAllAsTouched();
    this.formSubmitted = true;
    // Если валидна - продолжаем отправку
    if (this.testform.invalid) {
      console.error('zapolni pole');
      return;
    }

    console.log(this.testform.value);
  }

  private initForm(): FormGroup {
    return this.fb.group({
      testtext: [
        { value: 'Руслан', disabled: false },
        [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
      ],
    });
  }
}
