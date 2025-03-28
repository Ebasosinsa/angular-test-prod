import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessagesService } from '../../../service/validators/ValidationMessages/validation-messages.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-error-message.component.html',
  styleUrl: './input-error-message.component.scss',
})
export class InputErrorMessageComponent {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = '';
  @Input()
  formSubmitted?: boolean;

  constructor(private validationMessages: ValidationMessagesService) {}

  get shouldShowError(): boolean {
    return !!(
      this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched)
    );
  }

  get errorMessage(): string {
    if (this.control?.errors && this.control.touched && this.formSubmitted) {
      return this.validationMessages.getErrorMessage(
        this.fieldName,
        this.control.errors
      );
    }
    return '';
  }
}
