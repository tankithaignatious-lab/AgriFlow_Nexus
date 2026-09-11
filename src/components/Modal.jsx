import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h3>{title}</h3>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
