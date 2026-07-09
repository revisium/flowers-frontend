import { type KeyboardEvent, type RefObject, useEffect, useState } from 'react';

interface UseModalFocusTrapParams {
  readonly cardRef: RefObject<HTMLDivElement | null>;
  readonly closeButtonRef: RefObject<HTMLButtonElement | null>;
  readonly onClose: () => void;
}

export const useModalFocusTrap = ({
  cardRef,
  closeButtonRef,
  onClose,
}: UseModalFocusTrapParams) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true);
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      previousFocus?.focus();
    };
  }, [closeButtonRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const focusable = getFocusableElements(cardRef.current);
    const firstElement = focusable.at(0);
    const lastElement = focusable.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return { handleKeyDown, isOpen };
};

const getFocusableElements = (container: HTMLDivElement | null) => {
  const elements = container?.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  );

  return Array.from(elements ?? []).filter((element) => element.offsetParent);
};
