import { Component } from '@angular/core';
import { InputSimpleComponent } from '../inputs/input-simple/input-simple.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputDropdownComponent } from '../inputs/input-dropdown/input-dropdown.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    InputSimpleComponent,
    InputDropdownComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  testform!: FormGroup;
  formSubmitted: boolean = false;

  mocDropdownMenu = [
    { id: 1, value: 'United States' },
    { id: 2, value: 'United Kingdom' },
    { id: 3, value: 'Canada' },
    { id: 4, value: 'Australia' },
    { id: 5, value: 'Germany' },
    { id: 6, value: 'France' },
    { id: 7, value: 'Japan' },
    { id: 8, value: 'United States' },
    { id: 9, value: 'United Kingdom' },
    { id: 10, value: 'Canada' },
    { id: 11, value: 'Australia' },
    { id: 12, value: 'Germany' },
    { id: 13, value: 'France' },
    { id: 14, value: 'Japan' },
  ];

  // Создаем Observable из массива
  mocDropdownMenu$: Observable<{ id: number; value: string }[]> = of(
    this.mocDropdownMenu
  );

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

    //Сброс валидаторов формы
    this.testform.markAsPristine();
    this.testform.markAsUntouched();
    //Сброс значений формы
    this.testform.reset();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      testtext: [
        { value: 'Руслан', disabled: false },
        [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
      ],
      testdropdown: [{ value: null, disabled: false }, [Validators.required]],
    });
  }
}
