/* eslint-disable @typescript-eslint/member-delimiter-style */
export class AdditionalDataBase<T> {
    value: T|undefined;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;
    type: string;
    options: {key: string,value: string}[];
    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        required?: boolean;
        order?: number;
        controlType?: string;
        type?: string;
        options?: {key: string, value: string}[];
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
    }
}

export class TextboxQuestion extends AdditionalDataBase<string> {
  controlType = 'textbox';
}

export class DropdownQuestion extends AdditionalDataBase<string> {
  controlType = 'dropdown';
}
