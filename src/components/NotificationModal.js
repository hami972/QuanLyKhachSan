import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const NotificationModal = ({ show, onHide, title, message, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      {onConfirm && (
        <Modal.Footer>
          <button
            variant="secondary"
            onClick={onConfirm}
            style={{
              backgroundColor: "#0096FF",
              borderRadius: 5,
              borderColor: "#0096FF",
              color: "#fff",
            }}
          >
            Đồng ý
          </button>
          <button
            variant="secondary"
            onClick={onHide}
            style={{
              backgroundColor: "#fff",
              borderRadius: 5,
              borderColor: "#0096FF",
              color: "#0096FF",
            }}
          >
            Hủy
          </button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default NotificationModal;
