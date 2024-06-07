import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ModalComponent from "../../Components/ModalComponents";
import { Button, Form } from "react-bootstrap";
import { ApiCall } from "../../Services/Api";
import {
  addCategoryUrl,
  deleteCategoryUrl,
  editCategoryUrl,
  getAllCategoryUrl,
} from "../../../Utils/Constants";
import { MyContext } from "../../Services/Context";
import moment from "moment";
import Loader from "../../Components/Loader";
import { SlideMotion } from "../../Components/FramerMotion";

function Category() {
  const [addCategoryModal, setaddCatregoryModal] = useState({
    show: false,
    id: null,
  });
  const [validated, setValidated] = useState(false);
  const [allCategory, setAllCatgeory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [addCategoryData, setAddCategoryData] = useState({});
  const { Check_Validation } = useContext(MyContext);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  //get all category
  const getAllCategory = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", getAllCategoryUrl);
      if (response.status === 200) {
        setAllCatgeory(response?.data?.category);
        setIsLoading(false);
      } else {
        console.error("Error fetching category list. Unexpected status:");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };
  // add or edit category
  const addCategory = async (e) => {
    setIsLoading(true);
    setIsLoadingButton(true);
    try {
      if (addCategoryData?._id) {
        const response = await ApiCall(
          "put",
          `${editCategoryUrl}/${addCategoryData?._id}`,
          addCategoryData
        );
        if (response.status === 200) {
          setaddCatregoryModal(false);
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          getAllCategory();
          toast.success(response?.data?.message);
        } else {
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          toast.error(response?.response?.data?.message);
          getAllCategory();
        }
      } else {
        const response = await ApiCall("post", addCategoryUrl, addCategoryData);
        if (response.status === 200) {
          setaddCatregoryModal(false);
          setIsLoadingButton(false);
          setValidated(false);
          getAllCategory();
          toast.success(response?.data?.message);
        } else {
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          toast.error(response?.response?.data?.message);
        }
      }
    } catch (error) {
      console.error("Error adding category :", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoadingButton(false);
    }
  };

  // delete catgeory
  const deletCategory = async () => {
    try {
      const response = await ApiCall(
        "delete",
        `${deleteCategoryUrl}/${deleteModal.id}`
      );
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setDeleteModal(false);
        getAllCategory();
      } else {
        toast.error(response?.response?.data?.message);
      }
    } catch (error) {
      console.error("Error in deleting :", error);
    }
  };

  useEffect(() => {
    getAllCategory();
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
                  style={{ color: "#F7AE15", margin: 0 }}
                >
                  Categories
                </h3>

                <div>
                  <Button
                    style={{ background: "#001529", border: "1px solid" }}
                    className="mt-2 mt-md-0"
                    onClick={() => {
                      setaddCatregoryModal({ show: true });
                      setAddCategoryData({});
                    }}
                  >
                    Add Category
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
                      <th>Category Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCategory?.length ? (
                      <>
                        {allCategory.map((category, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {moment(category?.createdAt).format(
                                "Do MMMM  YYYY"
                              )}
                            </td>
                            <td>{category?.categoryName?.toUpperCase()}</td>

                            <td>
                              <i
                                className="fs-4 fas fa-pencil-alt "
                                onClick={() => {
                                  setaddCatregoryModal({
                                    show: true,
                                    id: category?._id,
                                  });
                                  setAddCategoryData(category);
                                }}
                                style={{ cursor: "pointer", color: "red" }}
                              ></i>

                              {category?.products <= 0 ? (
                                <i
                                  className="fs-4 fas fa-trash-alt ms-2"
                                  onClick={() => {
                                    setDeleteModal({
                                      show: true,
                                      id: category._id,
                                    });
                                  }}
                                  style={{ color: "red", cursor: "pointer" }}
                                ></i>
                              ) : (
                                <i
                                  className="fs-4 fas fa-trash-alt ms-2"
                                  onClick={() =>
                                    toast.error(
                                      "Not allowed to delete this product"
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
                          <b>No Categories Found</b>{" "}
                        </td>
                      </tr>
                    )}
                    <div className="me-2 mt-3  mb-4 d-flex ms-auto"></div>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </SlideMotion>

      <ModalComponent
        show={addCategoryModal.show}
        onHide={() => {
          setaddCatregoryModal({ show: false, id: null });
        }}
        title={
          <h4 style={{ color: "#F7AE15", margin: 0 }}>
            {addCategoryData?._id ? "Update Category" : "Add Category"}
          </h4>
        }
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, addCategory, setValidated)}
        >
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Category Name
            </label>
            <input
              id="packageAmountInput"
              className="form-control form-control"
              placeholder="Enter category name"
              value={addCategoryData?.categoryName}
              onChange={(e) => {
                setAddCategoryData({
                  ...addCategoryData,
                  categoryName: e.target.value,
                });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter category name.
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
                : addCategoryData?._id
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
            setaddCatregoryModal({ show: false, id: null });
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
                Are you sure you want to delete this category?
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
                deletCategory();
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

export default Category;
