import { useState } from "react";

export const useModal = (opened = false) => {
  const [isOpen, setOpen] = useState<boolean>(opened);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { isOpen, onOpen, onClose };
};
