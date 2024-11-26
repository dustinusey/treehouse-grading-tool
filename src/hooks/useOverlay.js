import { useState } from 'react';

export function useOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openOverlay = (content) => {
    setContent(content);
    setIsOpen(true);
  };

  const closeOverlay = () => {
    setIsOpen(false);
    setContent(null);
  };

  return {
    isOpen,
    content,
    openOverlay,
    closeOverlay
  };
}
