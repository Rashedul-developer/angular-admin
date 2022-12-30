import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // Angular Validators
  minDigits(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      // tslint:disable-next-line: semicolon
      if (control.value !== undefined && this.countDigits(control.value) < min) {
        return { 'minDigits': true };
      }
      return null;
    };
  }

  passMatched(pass: string, cpass: string): ValidatorFn {
    return  (control: AbstractControl): { [key: string]: boolean } | null => {
      const password = control.get(pass);
      const confirmPassword = control.get(cpass);

      return password && confirmPassword && password.value !== confirmPassword.value ? { 'passMatched': true } : null;
    }
  }

  // Non-Angular Validators
  stringSlicer(n, control) {
    if (control.value.length > n) {
      control.setValue(control.value.slice(0, n));
    } else if (isNaN(Number(control.value.slice(-1)))) {
      control.setValue(control.value.slice(0, -1));
    }
  }

  // helper functions
  countDigits(n) {
    let count = 0;
    if (n >= 1) {
      ++count;
    }
    while (n / 10 >= 1) {
      n /= 10;
      ++count;
    }
    return count;
  }
}
