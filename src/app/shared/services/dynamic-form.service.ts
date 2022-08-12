import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AdditionalDataBase } from '../interfaces/additional-data-base';

@Injectable()
export class DynamicFormControlService {
  constructor() { }

  toFormGroup(inputs: AdditionalDataBase<string>[], initData?: any) {
    const group: any = {};

    inputs.forEach(input => {
      group[input.key] = input.required ? new FormControl(initData[input.key] || input.value || '', Validators.required)
                                        : new FormControl(input.value || '');
    });
    return new FormGroup(group);
  }
}
