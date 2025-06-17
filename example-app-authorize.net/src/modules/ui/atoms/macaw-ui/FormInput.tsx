import { Input as $Input, type InputProps as $InputProps } from "@saleor/macaw-ui/next";
import {
  type UseControllerProps,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

export type FormInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & $InputProps;

export function FormInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormInputProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>(props);

  return (
    <$Input
      error={!!fieldState.error?.message}
      {...props}
      {...field}
      onChange={(e) => {
        field.onChange(e);
        props.onChange?.(e);
      }}
      onFocus={(e) => {
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        field.onBlur();
        props.onBlur?.(e);
      }}
    />
  );
}
