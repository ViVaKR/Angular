import { IFormFieldConfig } from "./i-form-field-config";

export interface IFormConfig {
  fields: IFormFieldConfig[];
  formValidators?: any[];
}
