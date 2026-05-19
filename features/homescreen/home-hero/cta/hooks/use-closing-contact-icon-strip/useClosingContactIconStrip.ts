import { useCallback, useRef, useState } from "react";

export type UseClosingContactIconStripResult = Readonly<{
  handleCloseComplete: () => void;
  isOpen: boolean;
  marginActive: boolean;
  requestClose: () => void;
}>;

export function useClosingContactIconStrip(
  onCloseComplete: () => void,
): UseClosingContactIconStripResult {
  const [isOpen, setIsOpen] = useState(true);
  const isClosingRef = useRef(false);

  const requestClose = useCallback(() => {
    isClosingRef.current = true;
    setIsOpen(false);
  }, []);

  const handleCloseComplete = useCallback(() => {
    if (!isClosingRef.current) {
      return;
    }

    isClosingRef.current = false;
    onCloseComplete();
  }, [onCloseComplete]);

  return {
    handleCloseComplete,
    isOpen,
    marginActive: true,
    requestClose,
  };
}
