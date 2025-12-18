//src/components/ui/select/select.types.ts

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SelectProps<T = string> {
  value?: T;
  options: SelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: T | undefined) => void;
}
