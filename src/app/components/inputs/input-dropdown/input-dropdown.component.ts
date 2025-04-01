import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { InputErrorMessageComponent } from '../input-error-message/input-error-message.component';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-dropdown',
  standalone: true,
  imports: [InputErrorMessageComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './input-dropdown.component.html',
  styleUrl: './input-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDropdownComponent),
      multi: true,
    },
  ],
})
export class InputDropdownComponent implements ControlValueAccessor, OnDestroy {
  @Input() formGroup!: FormGroup;
  @Input() controlid!: string;
  @Input() type!: string;
  @Input() title!: string;
  @Input() pholder!: string;
  @Input() options!: Observable<any[]>;
  @Input() formSubmitted?: boolean;

  searchControl = new FormControl('');
  value: string | undefined;
  isShowed: boolean = false;
  initialOptions: any[] = [];
  filteredOptions: any[] = [];
  optionskeys: string[] = [];
  selectedOption: string | null = null;

  private valueChangesSub!: Subscription;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private eRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.options.subscribe((data) => {
      this.initialOptions = data || [];
      this.filteredOptions = [...this.initialOptions];
      this.optionskeys = this.initialOptions.length
        ? Object.keys(this.initialOptions[0])
        : [];
    });
  }

  ngOnDestroy(): void {
    if (this.valueChangesSub) {
      this.valueChangesSub.unsubscribe();
    }
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public writeValue(value: string): void {
    if (value === null || value === '') {
      this.selectedOption = null;
      this.searchControl.patchValue('');
    }
    this.value = value;
    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public toggleDropdown() {
    this.isShowed = !this.isShowed;
    if (this.isShowed) {
      this.filterOptions();
    }
  }

  public filterOptions() {
    if (!this.searchControl.value) {
      this.filteredOptions = [...this.initialOptions];
      console.log(this.filteredOptions);
    } else {
      const searchLower = this.searchControl.value.toLowerCase();
      this.filteredOptions = this.initialOptions.filter((option) =>
        option[this.optionskeys[1]].toLowerCase().includes(searchLower)
      );
      console.log(this.filteredOptions);
    }
  }

  public selectOption(option: any) {
    this.selectedOption = option[this.optionskeys[1]];
    this.searchControl.patchValue(option[this.optionskeys[1]]);
    this.onChange(option[this.optionskeys[0]]);
    this.onTouched();
    this.isShowed = false;
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

  get selectedValue(): string {
    return this.selectedOption ? this.selectedOption : 'Выберите значение';
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isShowed = false;
    }
  }
}
