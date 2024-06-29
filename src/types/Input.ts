export type TextareaProps = {
  id: string;
  labelName: string;
};

export type SelectInputProps = {
  labelName: string;
  id: string;
};

export type InputProps = {
  type: string;
  id: string;
  labelName: string;
  placeholder?: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  multiple?: boolean;
  accept?: string;
  defaultValue?: string | number;
};
