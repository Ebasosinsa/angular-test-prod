import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';

@Component({
  selector: 'app-input-base',
  standalone: true,
  imports: [InputErrorMessageComponent, ReactiveFormsModule],
  templateUrl: './input-base.component.html',
  styleUrl: './input-base.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputBaseComponent),
      multi: true,
    },
  ],
})
export class InputBaseComponent implements ControlValueAccessor {
  @Input() formGroup!: FormGroup;
  @Input() controlid!: string;
  @Input() type!: string;
  @Input() title!: string;
  @Input() pholder!: string;
  @Input()
  formSubmitted?: boolean;

  value: string | undefined;
  isShowed: boolean = false;

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  public onInputValueChange(event: Event): void {
    const targetDivElement = event.target as HTMLInputElement;
    const value = targetDivElement.value;

    this.onChange(value);
  }

  public writeValue(value: string): void {
    this.value = value;
    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  get control(): FormControl {
    return this.formGroup.get(this.controlid) as FormControl;
  }
  get isInvalid(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.dirty || this.control.touched)
    );
  }

  onFocus() {
    this.isShowed = true;
    console.log('focus');
  }

  onBlur() {
    this.isShowed = false;
    console.log('blur');
  }
}
