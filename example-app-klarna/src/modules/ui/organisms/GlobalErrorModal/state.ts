import { create } from "zustand";

export interface ErrorModalState {
  isOpen: boolean;
  title?: string;
  message: string | null;

  actions: {
    openModal: ({ message, title }: { message: string; title?: string }) => void;
    closeModal: () => void;
  };
}

export const useErrorModalStore = create<ErrorModalState>((set) => ({
  isOpen: false,
  message: null,
  title: undefined,

  actions: {
    openModal: ({ message, title }: { message: string; title?: string }) =>
      set(() => ({ isOpen: true, message, title })),
    closeModal: () => set(() => ({ isOpen: false, message: null, title: undefined })),
  },
}));

export const useErrorModalOpen = () => useErrorModalStore((state) => state.isOpen);
export const useErrorModalMessage = () => useErrorModalStore((state) => state.message);
export const useErrorModalTitle = () => useErrorModalStore((state) => state.title);
export const useErrorModalActions = () => useErrorModalStore((state) => state.actions);
