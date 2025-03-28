import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationMessagesService {
  private messages = {
    required: (field: string) => `${field} is required`,
    minlength: (field: string, params: any) =>
      `${field} не может быть меньше ${params.requiredLength} символов`,
    maxlength: (field: string, params: any) =>
      `${field} не может быть больше ${params.requiredLength} символов`,
  };

  getErrorMessage(field: string, error: any): string {
    const firstError = Object.keys(error)[0];
    const getError = this.messages[firstError as keyof typeof this.messages];
    return getError ? getError(field, error[firstError]) : 'Invalid field';
  }

  addCustomMessage(
    key: string,
    messageFunction: (field: string, params?: any) => string
  ): void {
    this.messages = {
      ...this.messages,
      [key]: messageFunction,
    };
  }
}
