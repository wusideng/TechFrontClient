export type FormItem = {
  name: string;
  label: string;
  type:
    | "hidden"
    | "input"
    | "radio"
    | "textarea"
    | "picker"
    | "datepick"
    | "single_image"
    | "array";
  inputType?: string;
  placeholder?: string;
  rules?: rule[] | any[];
  arryColumns?: any[];
  options?: Option[];
  upload?: any;
  extra?: React.ReactNode;
};
export interface rule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
}
export interface Option {
  label: string;
  value: any;
}
