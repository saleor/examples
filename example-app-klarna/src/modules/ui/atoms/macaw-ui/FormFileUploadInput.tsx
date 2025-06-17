import {
  type UseControllerProps,
  type FieldPath,
  type FieldValues,
  useController,
} from "react-hook-form";
import {
  FileUploadInput as $FileUploadInput,
  type FileUploadInputProps as $FileUploadInputProps,
} from "../FileUploadInput/FileUploadInput";

export type FormFileUploadInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & $FileUploadInputProps;

export function FormFileUploadInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFileUploadInputProps<TFieldValues, TName>) {
  const { field } = useController<TFieldValues, TName>(props);

  return <$FileUploadInput {...props} {...field} />;
}
