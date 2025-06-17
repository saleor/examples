import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Box, Button, TrashBinIcon, type ButtonProps, Text, Input } from "@saleor/macaw-ui/next";
import { type MouseEventHandler, useCallback, useState } from "react";
import { modalOverlay, modal } from "../../atoms/modal.css";

type ConfirmationButtonProps = Omit<ButtonProps, "type" | "onClick"> & {
  onClick: () => void | Promise<void>;
  configurationName: string;
};

type State = "idle" | "prompt" | "inProgress";

export const ConfirmationButton = ({
  onClick,
  configurationName,
  ...props
}: ConfirmationButtonProps) => {
  const [state, setState] = useState<State>("idle");
  const [inputConfiguratioName, setInputConfiguratioName] = useState("");

  const handleDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    e.preventDefault();
    setState("prompt");
  }, []);

  const handleConfirmationClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    async (e) => {
      e.preventDefault();
      setState("inProgress");
      await onClick();
      setState("idle");
    },
    [onClick],
  );

  const handleOpenChange = useCallback((open: boolean) => {
    setState(open ? "prompt" : "idle");
  }, []);

  return (
    <>
      <AlertDialog.Root
        open={state === "prompt" || state === "inProgress"}
        onOpenChange={handleOpenChange}
      >
        <AlertDialog.Trigger asChild>
          <Button {...props} type="button" onClick={handleDeleteClick} />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={modalOverlay} />
          <AlertDialog.Content className={modal}>
            <AlertDialog.Title asChild>
              <Text variant="title" size="medium">
                Delete {configurationName}
              </Text>
            </AlertDialog.Title>
            <AlertDialog.Description>
              <Box display="flex" flexDirection="column" rowGap={4}>
                <Box>
                  <Text
                    color={state === "inProgress" ? "textNeutralDisabled" : "textNeutralDefault"}
                    as="p"
                    variant="body"
                    size="medium"
                  >
                    Are you sure you want to delete the configuration?
                  </Text>
                  <Text
                    as="p"
                    variant="body"
                    size="medium"
                    color={state === "inProgress" ? "textNeutralDisabled" : "textNeutralDefault"}
                  >
                    Type the configuration name to confirm:{" "}
                    <Text
                      as="strong"
                      variant="bodyStrong"
                      display="inline-block"
                      wordBreak="break-word"
                      size="medium"
                      color={state === "inProgress" ? "textNeutralDisabled" : "textNeutralDefault"}
                    >
                      {configurationName}
                    </Text>
                  </Text>
                </Box>
                <Input
                  label="Configuration name"
                  value={inputConfiguratioName}
                  onChange={(e) => setInputConfiguratioName(e.currentTarget.value)}
                  disabled={state === "inProgress"}
                />
              </Box>
            </AlertDialog.Description>

            <Box display="flex" justifyContent="flex-end" gap={1.5} marginTop={5}>
              <AlertDialog.Cancel asChild>
                <Button type="button" size="medium" disabled={state === "inProgress"}>
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <Button
                type="button"
                size="medium"
                variant="error"
                disabled={inputConfiguratioName !== configurationName || state === "inProgress"}
                onClick={handleConfirmationClick}
                icon={<TrashBinIcon />}
              >
                {state === "inProgress" ? "Deleting..." : "Delete"}
              </Button>
            </Box>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};
