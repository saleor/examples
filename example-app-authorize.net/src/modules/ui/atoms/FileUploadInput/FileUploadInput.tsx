import { ArrowLeftIcon, Box, Button, Text } from "@saleor/macaw-ui/next";
import { forwardRef } from "react";
import { fileUploadInput } from "./fileUploadInput.css";

export type FileUploadInputProps = {
  label: string;
  disabled?: boolean;
} & JSX.IntrinsicElements["input"];

export const FileUploadInput = forwardRef<HTMLInputElement, FileUploadInputProps>(
  ({ label, disabled = false, ...props }, ref) => {
    return (
      <Box display="flex" alignItems="stretch" flexDirection="row" columnGap={4}>
        <Box as="label" className={fileUploadInput}>
          <Text variant="body" size="medium" color="textNeutralSubdued">
            {label}
          </Text>
          <input
            {...props}
            value={undefined}
            type="file"
            className="visually-hidden"
            disabled={disabled}
            ref={ref}
          />
        </Box>
        <Button
          variant="primary"
          disabled={disabled}
          size="medium"
          marginTop={6}
          whiteSpace="nowrap"
          type="submit"
        >
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            paddingY={"px"}
            paddingX={0.5}
            __transform="rotate(90deg) scale(0.75)"
            __borderWidth={0.5}
            borderColor="neutralPlain"
            borderRadius={2}
            borderStyle="solid"
            outlineStyle="none"
          >
            <ArrowLeftIcon size="small" />
          </Box>
          Upload certificate
        </Button>
      </Box>
    );
  },
);
FileUploadInput.displayName = "FileUploadInput";
