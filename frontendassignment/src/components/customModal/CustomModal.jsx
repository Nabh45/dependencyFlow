import React from 'react';
import Modal from 'react-modal';
import './styles.css';

const getContent = content => (
  <div className="modal-content">
    {Object.keys(content).map(key => (
      <div key={key} className="content-row">
        <span className="content-label">{key}</span>:
        <span className="content-value">{content[key]}</span>
      </div>
    ))}
  </div>
);

const CustomModal = ({ isOpen, closeModal, content }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Custom Modal"
      className="Modal"
    >
      <div>
        <h2>{content.title}</h2>
        <div>{getContent(content.data)}</div>
        <button onClick={closeModal}>&#10006;</button>
      </div>
    </Modal>
  );
};

export default CustomModal;
