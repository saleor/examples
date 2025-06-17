import { RadioGroup as $RadioGroup } from "@saleor/macaw-ui/next";
import { type ComponentProps } from "react";
import {
  type UseControllerProps,
  type FieldPath,
  type FieldValues,
  useController,
  type PathValue,
} from "react-hook-form";

type $RadioGroupProps = ComponentProps<typeof $RadioGroup>;

export type FormRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & $RadioGroupProps;

export function FormRadioGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormRadioGroupProps<TFieldValues, TName>) {
  const { field, fieldState } = useController<TFieldValues, TName>(props);

  return (
    <$RadioGroup
      error={!!fieldState.error?.message}
      {...props}
      {...field}
      onChange={(e) => {
        field.onChange(e as PathValue<TFieldValues, TName>);
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
