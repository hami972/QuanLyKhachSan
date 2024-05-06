import React from 'react';
import { Modal } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, body }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Thông báo</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
