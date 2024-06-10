import React, { useContext, useState } from "react";
import { SlideMotion } from "../../Components/FramerMotion";
import ModalComponent from "../../Components/ModalComponents";
import { MyContext } from "../../Services/Context";
import Loader from "../../Components/Loader";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { ApiCall } from "../../Services/Api";
import {
  addStocksUrl,
  getAllCategoryUrl,
  getAllFranchiseUrl,
  getAllStockUrl,
  getProductUrl,
  outStockUrl,
  productFilterUrl,
} from "../../../Utils/Constants";
import { Pagination, Stack } from "@mui/material";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faBox } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
function Stock() {
  const [addStockModal, setAddStockModal] = useState({
    show: false,
    id: null,
  });
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [addStocksData, setAddStockData] = useState({});
  const { Check_Validation } = useContext(MyContext);
  const [allProducts, setAllProducts] = useState();
  const [allFranchise, setAllFranchise] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState();
  const [name, setName] = useState("");
  const [searchKey, setSearchKey] = useState(0);

  //get franchise
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
  //get all products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", getProductUrl, {}, params);
      if (response.status === 200) {
        setAllProducts(response?.data?.products);
        setIsLoading(false);
      } else {
        console.error("Error fetching products list. Unexpected status:");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products list:", error);
    }
  };

  //get all filtered products
  const getAllFilterProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", `${productFilterUrl}${filter}`);

      if (response.status === 200) {
        setAllProducts(response?.data?.products);
        setIsLoading(false);
      } else {
        console.error("Error fetching products list. Unexpected status:");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products list:", error);
    }
  };

  // add stocks in
  const addStocks = async (e) => {
    setIsLoading(true);
    setIsLoadingButton(true);
    try {
      const response = await ApiCall("post", addStocksUrl, addStocksData);
      if (response.status === 200) {
        setAddStockModal(false);
        setAddStockData({});
        setIsLoadingButton(false);
        setValidated(false);
        getAllProducts();
        setSearchKey(searchKey + 1);
        setName("");
        setFilter()
        toast.success(response?.data?.message);
      } else {
      
        setIsLoadingButton(false);
        setValidated(false);
        setSearchKey(searchKey + 1);
        setName("");

        toast.error(response?.response?.data?.message);
        getAllProducts();
      }
    } catch (error) {
      console.error("Error adding stocks :", error);
      toast.error("stocks  failed", false);
    } finally {
      setIsLoadingButton(false);
    }
  };

  // Out stocks in
  const outStocks = async (e) => {
    setIsLoading(true);
    setIsLoadingButton(true);
    try {
      const response = await ApiCall("post", outStockUrl, addStocksData);
      if (response?.status === 200) {
        setAddStockModal(false);
        setAddStockData({});
        setIsLoading(false);
        setIsLoadingButton(false);
        setValidated(false);
        setSearchKey(searchKey + 1);
        setName("");
        setFilter();
        getAllProducts();
        toast.success(response?.data?.message);
      } else {
        // setAddStockModal(false);
        setIsLoading(false);
        setIsLoadingButton(false);
        setValidated(false);
        setSearchKey(searchKey + 1);
        setName("");

        toast.error(response?.response?.data?.message);
        getAllProducts();
      }
    } catch (error) {
      console.error("Error adding stocks :", error);
      toast.error("stocks  failed", false);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };

  const handleSubmit = () => {
    if (addStockModal?.out) {
      outStocks();
    } else {
      addStocks();
    }
  };

  useEffect(() => {
    if (filter) {
      getAllFilterProducts();
    } else {
      getAllProducts();
    }
    getAllFranchises();
  }, [filter, params]);


  useEffect(()=>{
if(addStockModal?.show===false){
  setAddStockData({})
}
  },[addStockModal]);
  return (
    <>
      <SlideMotion>
        <div className="col-xl-12 mt-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-center justify-content-between px-4 py-3 border-bottom">
                <h3
                  className="card-title fw-semibold mb-0"
                  style={{ color: "#F7AE15", margin: 0 }}
                >
                  {`Stocks ${name ? "in" : ""} ${
                    name.charAt(0).toUpperCase() + name.slice(1)
                  }`}
                </h3>
                <div className="d-flex ms-auto">
                  {" "}
                  <Select
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: 200, 
                    }),
                  }}
                    key={searchKey}
                    placeholder="Search by franchise..."
                    isSearchable={true}
                    onChange={(selectedOption) => {
                      setFilter(selectedOption.value);
                      setName(selectedOption?.label);
                    }}
                    required
                    options={allFranchise?.map((franchise) => ({
                      value: franchise._id,
                      label: franchise.franchiseName,
                    }))}
                    className="me-2"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setFilter("");
                      setSearchKey(searchKey + 1);
                      setName("");
                    
                    }}
                  >
                    Reset
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
                      <th>Date</th>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Category</th>
                      <th>Total Quantity</th>
                      <th>Price</th>
                      <th>Stock In</th>
                      <th>Stock Out</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts?.length ? (
                      <>
                        {allProducts?.map((products, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {moment(products?.createdAt).format(
                                "Do MMMM  YYYY"
                              )}
                            </td>
                            <td>
                              {products?.productCode ||
                                products?.product?.productCode}
                            </td>
                            <td>
                              {products?.name?.toUpperCase() ||
                                products?.product?.productName?.toUpperCase()}
                            </td>
                            <td>
                              {products?.category?.categoryName?.toUpperCase() ||
                                products?.product?.categoryName?.toUpperCase()}
                            </td>

                            <td>
                              {products?.quantity ||
                                products?.product?.quantity ||
                                "0"}
                            </td>
                            <td>
                              {products?.price ||
                                products?.product?.price ||
                                "0"}
                            </td>
                            <td>
                              <Button
                                variant="primary"
                                className="mt-2 mt-md-0"
                                onClick={() => {
                                  setAddStockModal({
                                    show: true,
                                    out: false,
                                  });
                                  setAddStockData({
                                    ...addStocksData,
                                    product: !filter
                                      ? products?._id
                                      : products?.product?.productId,
                                  });
                                  setValidated(false);
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faBoxOpen}
                                  className="me-2"
                                />
                                Stock In
                              </Button>
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                onClick={() => {
                                  setAddStockModal({
                                    show: true,
                                    out: true,
                                  });
                                  setAddStockData({
                                    ...addStocksData,
                                    product: !filter
                                      ? products?._id
                                      : products?.product?.productId,
                                  });
                                  setValidated(false);

                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faBox}
                                  className="me-2"
                                />
                                Stock Out
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td colSpan={20} style={{ textAlign: "center" }}>
                          <b>No Data Found</b>{" "}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
            <div className="me-2 mt-3  mb-4 d-flex ms-auto">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={params.page}
                  onChange={handlePageChange}
                  color="primary"
                />
              </Stack>
            </div>
          </div>
        </div>
      </SlideMotion>

      <ModalComponent
        show={addStockModal.show}
        onHide={() => {
          setAddStockModal({ show: false, id: null });
        }}
        title={
          <h4 style={{ color: "#F7AE15", margin: 0 }}>
            {addStockModal?.out ? "Stock Out" : "Stock In"}
          </h4>
        }
        centered
        width={"500px"}
      >
        <Form
          noValidate
          validated={validated}
          onSubmit={(e) => Check_Validation(e, handleSubmit, setValidated)}
        >
          <div className="d-flex mb-2">
            <div className="me-2 flex-grow-1">
              <label htmlFor="categoryName" className="form-label">
                Franchise Name
              </label>
              <select
                id="categoryName"
                className="form-control"
                value={addStocksData?.franchise}
                onChange={(e) => {
                  setAddStockData({
                    ...addStocksData,
                    franchise: e.target.value,
                  });
                }}
                required
              >
                <option value="">Select franchise name</option>
                {allFranchise?.map((franchise, index) => (
                  <option key={index} value={franchise?._id}>
                    {franchise?.franchiseName}
                  </option>
                ))}
              </select>
              <Form.Control.Feedback type="invalid">
                Please enter franchise name.
              </Form.Control.Feedback>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Quantity
            </label>
            <input
              id="packageAmountInput"
              type="number"
              className="form-control form-control"
              placeholder="Enter quantity"
              value={addStocksData?.quantity}
              onChange={(e) => {
                const value = e.target.value;
                setAddStockData({
                  ...addStocksData,
                  quantity: value === '' ? '' : Number(value),
                });
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter quantity name.
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
                : addStocksData?._id
                ? "Save"
                : "Save"}
            </Button>
          </div>
        </Form>
        <Button
          variant="danger"
          type="submit"
          className="btn btn-custom float-end ms-1"
          onClick={() => {
            setAddStockModal({ show: false, id: null });
            setAddStockData({})
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
                Are you sure you want to delete this alert{""} ?
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
                //   ();
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

export default Stock;
