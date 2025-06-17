import { type TRPCClientErrorLike } from "@trpc/client";
import {
  type DeepPartial,
  type FieldPath,
  type FieldValues,
  type UseFormSetError,
} from "react-hook-form";
import { type AppBridge } from "@saleor/app-sdk/app-bridge";
import { type AppRouter } from "./trpc-app-router";
import { BaseTrpcError, FieldError } from "@/errors";

interface HandlerInput {
  message?: string;
  title?: string;
  actionId: string;
  appBridge: AppBridge | undefined;
}

const getParsedError = <T extends TRPCClientErrorLike<AppRouter>>(error: T) => {
  if (error.data?.serialized) {
    return BaseTrpcError.parse(error.data.serialized);
  }
  return null;
};

export const getErrorHandler =
  (input: HandlerInput) =>
  <T extends TRPCClientErrorLike<AppRouter>>(error: T) => {
    if (input.appBridge) {
      const parsedError = getParsedError(error);
      void input.appBridge.dispatch({
        type: "notification",
        payload: {
          title: input.title || "Request failed",
          text: input.message || parsedError?.message || error.message,
          apiMessage: error.shape ? JSON.stringify(error.shape ?? {}, null, 2) : undefined,
          actionId: input.actionId,
          status: "error",
        },
      });
    }
  };

interface FieldHandlerInput<TFieldValues extends FieldValues> extends HandlerInput {
  fieldName: FieldPath<TFieldValues> | `root.${string}` | "root";
  formFields: FieldPath<TFieldValues>[];
  setError: UseFormSetError<TFieldValues>;
}

export const getFormFields = <TFieldValues extends FieldValues>(
  defaultValues: Readonly<DeepPartial<TFieldValues>> | undefined,
): FieldPath<TFieldValues>[] => {
  if (!defaultValues) {
    return [];
  }
  return Object.keys(defaultValues) as FieldPath<TFieldValues>[];
};

const isMatchingField = <TFieldValues extends FieldValues>(
  fieldName: string,
  formFields: FieldPath<TFieldValues>[],
): fieldName is FieldPath<TFieldValues> => {
  return formFields.some((field) => field === fieldName);
};

export const getFieldErrorHandler =
  <TFieldValues extends FieldValues>(input: FieldHandlerInput<TFieldValues>) =>
  <T extends TRPCClientErrorLike<AppRouter>>(error: T) => {
    getErrorHandler(input)(error);
    const parsedError = BaseTrpcError.parse(error.data?.serialized);

    if (
      parsedError instanceof FieldError &&
      isMatchingField(parsedError.fieldName, input.formFields)
    ) {
      input.setError(parsedError.fieldName, { message: parsedError.message });
    } else {
      input.setError(input.fieldName, {
        message: input.message,
      });
    }
  };
