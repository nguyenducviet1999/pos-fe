import { useState } from "react";
export const useConfirmModal = <T = undefined>(initData?: T) => {
  const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(initData);
  const onOpen = (modalData?: T) => {
    setData(modalData || (true as any));
  };
  const onClose = () => {
    setData(undefined);
  };
  return {
    isOpen: !!data,
    data,
    onOpen,
    onClose,
    isConfirmLoading,
    setIsConfirmLoading,
  };
};
