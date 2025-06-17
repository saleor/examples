import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Box, Button, Text } from "@saleor/macaw-ui/next";
import { modalOverlay, modal } from "../../atoms/modal.css";
import {
  useErrorModalActions,
  useErrorModalMessage,
  useErrorModalOpen,
  useErrorModalTitle,
} from "./state";

export const ErrorModal = () => {
  const isOpen = useErrorModalOpen();
  const title = useErrorModalTitle();
  const message = useErrorModalMessage();
  const { closeModal } = useErrorModalActions();

  return (
    <AlertDialog.Root open={isOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className={modalOverlay} />
        <AlertDialog.Content className={modal}>
          {title && (
            <AlertDialog.Title asChild>
              <Text variant="title">Confirm delete</Text>
            </AlertDialog.Title>
          )}
          <AlertDialog.Description>
            <Text variant="bodyEmp">{message}</Text>
          </AlertDialog.Description>

          <Box display="flex" justifyContent="flex-end" gap={1.5} marginTop={5}>
            <AlertDialog.Cancel asChild>
              <Button type="button" size="large" onClick={() => closeModal()}>
                Close
              </Button>
            </AlertDialog.Cancel>
          </Box>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
