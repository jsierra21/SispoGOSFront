import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdditionalDataBase } from '../../interfaces/additional-data-base';
@Component({
  selector: 'app-dynamic-form-element',
  templateUrl: './dynamic-form-element.component.html',
  styleUrls: ['./dynamic-form-element.component.scss'],
})
export class DynamicFormElementComponent{
  @Input() input!: AdditionalDataBase<string>;
  @Input() form!: FormGroup;
  get isValid() { return this.form.controls[this.input.key].valid; }

}
