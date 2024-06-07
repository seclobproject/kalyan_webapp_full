import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../Components/FramerMotion";
import { Button, Form } from "react-bootstrap";
import { MyContext } from "../../Services/Context";
import Loader from "../../Components/Loader";
import ModalComponent from "../../Components/ModalComponents";
import {
  addFranchiseUrl,
  deleteFranchiseUrl,
  editFranchiseUrl,
  getAllFranchiseUrl,
} from "../../../Utils/Constants";
import { ApiCall } from "../../Services/Api";
import toast from "react-hot-toast";
import moment from "moment";

function Franchise() {
  const [addFranchiseModal, setAddFranchiseModal] = useState({
    show: false,
    id: null,
  });
  const [validated, setValidated] = useState(false);
  const [allFranchise, setAllFranchise] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [addFranchiseData, setddFranchiseData] = useState({});
  const { Check_Validation } = useContext(MyContext);

  //get all category
  const getAllFranchises = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", getAllFranchiseUrl);
      if (response.status === 200) {
        setAllFranchise(response?.data?.franchise);
        setIsLoading(false);
      } else {
        console.error("Error fetching franchises list. Unexpected status:");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching franchises list:", error);
    }
  };
  // add Franshises
  const addFranchise = async (e) => {
    setIsLoading(true);
    setIsLoadingButton(true);
    try {
      if (addFranchiseData?._id) {
        const response = await ApiCall(
          "put",
          `${editFranchiseUrl}/${addFranchiseData?._id}`,
          addFranchiseData
        );
        if (response.status === 200) {
          setAddFranchiseModal(false);
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          getAllFranchises();
          toast.success(response?.data?.message);
        } else {
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          toast.error(response?.response?.data?.message);
          getAllFranchises();
        }
      } else {
        const response = await ApiCall(
          "post",
          addFranchiseUrl,
          addFranchiseData
        );

        if (response.status === 200) {
          setAddFranchiseModal(false);
          setIsLoadingButton(false);
          setValidated(false);
          setIsLoading(false);
          getAllFranchises();
          toast.success(response?.data?.message);
        } else {
          setIsLoadingButton(false);
          setValidated(false);
          setIsLoading(false);
          toast.error(response?.response?.data?.message);
          getAllFranchises();
        }
      }
    } catch (error) {
      console.error("Error adding category :", error);
    } finally {
      setIsLoadingButton(false);
      setIsLoading(false);
    }
  };

  // delete catgeory
  const deleteFranchises = async () => {
    try {
      const response = await ApiCall(
        "delete",
        `${deleteFranchiseUrl}/${deleteModal.id}`
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setDeleteModal(false);
        getAllFranchises();
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.error("Error in deleting :", error);
    }
  };

  useEffect(() => {
    getAllFranchises();
  }, []);
  return (
    <>
      <SlideMotion>
        <div className="col-xl-12 mt-4">
          <div className="card">
            <div className="card-body">
              <div className="px-4 py-3 border-bottom d-flex  align-items-center justify-content-between">
                <h3
                  className="card-title fw-semibold mb-0  "
                  style={{ color: "#F7AE15" }}
                >
                  Franchise
                </h3>

                <div>
                  <Button
                    style={{ background: "#001529", border: "1px solid" }}
                    className="mt-2 mt-md-0"
                    onClick={() => {
                      setAddFranchiseModal({ show: true });
                      setddFranchiseData({});
                    }}
                  >
                    Add Franchise
                  </Button>
                </div>
              </div>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="table-responsive" style={{ padding: "12px" }}>
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sl.no</th>
                      <th>Created Date</th>
                      <th>Franchise Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFranchise?.length ? (
                      <>
                        {allFranchise.map((franchises, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {moment(franchises?.createdAt).format(
                                "Do MMMM  YYYY"
                              )}
                            </td>
                            <td>{franchises?.franchiseName?.toUpperCase()}</td>

                            <td>
                              <i
                                className="fs-4 fas fa-pencil-alt"
                                onClick={() => {
                                  setAddFranchiseModal({
                                    show: true,
                                    id: franchises?._id,
                                  });
                                  setddFranchiseData(franchises);
                                }}
                                style={{ cursor: "pointer", color: "red" }}
                              ></i>

                              {franchises?.stock.length < 1 ? (
                                <i
                                  className="fs-4 fas fa-trash-alt ms-2"
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => {
                                    setDeleteModal({
                                      show: true,
                                      id: franchises._id,
                                    });
                                  }}
                                ></i>
                              ) : (
                                <i
                                  className="fs-4 fas fa-trash-alt ms-2"
                                  onClick={() =>
                                    toast.error(
                                      "Not allowed to delete this Franchise"
                                    )
                                  }
                                  style={{ color: "grey", cursor: "pointer" }}
                                ></i>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Franchise Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <div className="me-2 mt-3  mb-4 d-flex ms-auto"></div>
          </div>
        </div>
      </SlideMotion>

      <ModalComponent
        show={addFranchiseModal.show}
        onHide={() => {
          setAddFranchiseModal({ show: false, id: null });
        }}
        title={
          <h4 style={{ color: "#F7AE15", margin: 0 }}>
            {addFranchiseData?._id ? "Update Franchise" : "Add Franchise"}
          </h4>
        }
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addFranchise, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Franchise Name
            </label>
            <input
              id="packageAmountInput"
              className="form-control form-control"
              placeholder="Enter franchise name"
              value={addFranchiseData?.franchiseName}
              onChange={(e) => {
                setddFranchiseData({
                  ...addFranchiseData,
                  franchiseName: e.target.value,
                });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter Franchise name.
            </Form.Control.Feedback>
          </div>

          <div className="col-12 mt-4">
            <Button
              type="submit"
              className="btn btn-custom float-end ms-1"
              disabled={isLoadingButton}
            >
              {isLoadingButton
                ? "Loading....."
                : addFranchiseData?._id
                ? "Update"
                : "Add"}
            </Button>
          </div>
        </Form>
        <Button
          variant="danger"
          type="submit"
          className="btn btn-custom float-end ms-1"
          onClick={() => {
            setAddFranchiseModal({ show: false, id: null });
          }}
        >
          Cancel
        </Button>
      </ModalComponent>

      <ModalComponent
        show={deleteModal.show}
        onHide={() => {
          setDeleteModal({ show: false, id: null });
        }}
        centered
        width={"500px"}
      >
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
              <h5 className="">
                Are you sure you want to delete this Franchise?
              </h5>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="col gap-3 d-flex justify-content-center">
            <Button
              onClick={() => {
                setDeleteModal({ show: false, id: null });
              }}
              variant="secondary"
              Delete
              type="button"
              className="btn btn-cancel"
              data-bs-dismiss="modal"
            >
              No, keep it
            </Button>
            <Button
              variant="danger"
              type="button"
              className="btn btn-custom text-white"
              onClick={() => {
                deleteFranchises();
              }}
            >
              <i
                className="fs-4 fas fa-trash-alt me-2"
                style={{ color: "white" }}
              />{" "}
              Yes, Delete it
            </Button>
          </div>
        </div>
      </ModalComponent>
    </>
  );
}

export default Franchise;
