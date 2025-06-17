import { Select as $Select } from "@saleor/macaw-ui/next";
import { type ComponentProps } from "react";
import {
  type UseControllerProps,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";

type $FormSelectProps = ComponentProps<typeof $Select>;

export type FormSelectProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & Omit<$FormSelectProps, "value">;

export function FormSelect<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormSelectProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>(props);

  return (
    <$Select
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
