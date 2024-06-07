import React from "react";
import { Modal } from "react-bootstrap";

function ModalComponent(props) {
  const { children, title, width, size } = props;
  const modalDialogStyle = {
    width: width,
  };
  return (
    <Modal
      {...props}
      size={size || "lg"}
      style={{ minWidth: "auto" }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-center">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <style>{`.modal-dialog { max-width: ${modalDialogStyle.width} }`}</style>
    </Modal>
  );
}

export default ModalComponent;
