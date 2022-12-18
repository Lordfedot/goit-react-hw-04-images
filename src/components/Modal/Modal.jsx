import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  

  const handleKeyDown = useCallback(event => {
    if (event.code === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <div>
      <div className="Overlay" onClick={handleBackdrop}>
        <div className="Modal">{children}</div>
      </div>
    </div>,
    modalRoot
  );
};
