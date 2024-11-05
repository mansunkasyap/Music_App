import React, { useEffect } from "react";
import ReactDOM from "react-dom";


const Modal = ({ isOpen, closeModal, msg , children }) => {
    // console.log(msg);
    
  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  // Trap focus inside the modal for accessibility
  useEffect(() => {
    if (isOpen) {
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input, select'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const trapFocus = (e) => {
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      };

      firstElement?.focus();
      document.addEventListener("keydown", trapFocus);
      return () => document.removeEventListener("keydown", trapFocus);
    }
  }, [isOpen]);

  const modalRef = React.useRef();

  // Return null if modal is not to be shown
  if (!isOpen) {
    return null;
  }

  // Use React Portal to render the modal outside the normal DOM hierarchy
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content modal-animation"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-modal" onClick={closeModal}>
          X
        </button>
        
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
