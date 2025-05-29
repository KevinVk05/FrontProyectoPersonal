import ReactDOM from 'react-dom'
import '../../estilos/modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content m-4">
        <button className="close-btn" onClick={onClose}>X</button>
        {children}
      </div>
    </div>,
        document.body
  );
};

export default Modal;

