import React from "react";
import { Modal } from "react-bootstrap";

function DeleteConfirmation(props) {
  const handleClose = () => {
    props.onHide();
  };

  return (
    <>
      <Modal show={props.show} onHide={handleClose}>
        <div className="modal-content">
          <div className="modal-header ">
            <button
              type="button"
              className="btn-close"
              onClick={() => handleClose()}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <i
                  style={{ fontSize: "50px", color: "#fe9423" }}
                  className="fa fa-exclamation-triangle "
                  aria-hidden="true"
                ></i>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center ">
                <h5 className="">Are you sure you want to delete {""} ?</h5>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <div className="col gap-3 d-flex justify-content-center">
              <button
                onClick={props.onHide}
                type="button"
                className="btn btn-outline-primary"
                data-bs-dismiss="modal"
              >
                No, keep it
              </button>
              <button
                type="button"
                className="btn text-white"
                style={{ backgroundColor: "#E63946" }}
                onClick={props.onDelete}
              >
                Yes, delete it
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteConfirmation;
