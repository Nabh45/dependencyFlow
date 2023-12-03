import { useState } from 'react';

const Modal = ({ isOpen, onClose, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose && onClose();
  };

  const renderModalContent = () => {
    return (
      <div className="modal-content">
        {content}
        <button onClick={closeModal}>Close Modal</button>
      </div>
    );
  };

  return (
    <div className={`modal ${isModalOpen ? 'open' : ''}`}>
      <div className="modal-overlay" onClick={closeModal}></div>
      {isModalOpen && renderModalContent()}
    </div>
  );
};

export default Modal;
