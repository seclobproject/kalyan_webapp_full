import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../Services/Context';
import { SlideMotion } from '../../Components/FramerMotion';
import { Button, Form } from 'react-bootstrap';
import Loader from '../../Components/Loader';
import { addStocksUrl, getAllFranchiseUrl, getAllSubproductUrl, outStockUrl } from '../../../Utils/Constants';
import { ApiCall } from '../../Services/Api';
import ModalComponent from '../../Components/ModalComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faBox } from "@fortawesome/free-solid-svg-icons";
import toast from 'react-hot-toast';

function StockInSubProducts() {
    const [isLoading,setIsLoading]=useState(false);
    const [validated, setValidated] = useState(false);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [addStocksData, setAddStockData] = useState({});
    const [addStockModal, setAddStockModal] = useState({
        show: false,
        id: null,
      });
      const { Check_Validation } = useContext(MyContext);
      const [allSubProduct,SetAllSubProducts]=useState([]);
      const [allFranchise, setAllFranchise] = useState([]);


         //get all sub products
 const getAllSubProducts = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", getAllSubproductUrl);
      if (response.status === 200) {
        SetAllSubProducts(response?.data?.products);
        setIsLoading(false);
      } else {
        console.error("Error fetching sub products list");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching sub products list:", error);
    }
  };

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
        getAllSubProducts();
        toast.success(response?.data?.message);
      } else {
      
        setIsLoadingButton(false);
        setValidated(false);
       

        toast.error(response?.response?.data?.message);
        getAllSubProducts();
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
      
        getAllSubProducts();
        toast.success(response?.data?.message);
      } else {
        // setAddStockModal(false);
        setIsLoading(false);
        setIsLoadingButton(false);
        setValidated(false);
        toast.error(response?.response?.data?.message);
        getAllSubProducts();
      }
    } catch (error) {
      console.error("Error adding stocks :", error);
      toast.error("stocks  failed", false);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoadingButton(false);
    }
  };

  const handleSubmit = () => {
    if (addStockModal?.out) {
      outStocks();
    } else {
      addStocks();
    }
  };

  useEffect(()=>{
getAllSubProducts();
getAllFranchises();
  },[]);
  return (
    <>
    <SlideMotion>
        <div className="col-xl-12 mt-4">
          <div className="card">
            <div className="card-body">
            <div className="px-4 py-3 border-bottom">
  <div className="d-flex align-items-center justify-content-between">
    <h3 className="card-title fw-semibold mb-0" style={{ color: "#F7AE15", margin: 0 }}>
     Stocks in Sub Products
    </h3>
    <div>
   
    </div>
  </div>

</div>

            
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className="table-responsive" style={{padding:'12px'}}>
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Sl.no</th>
                      <th>Date</th>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Minimum Quantity</th>
                      <th>Price</th>
                      <th>Stock In</th>
                      <th>Stock Out</th>
                    </tr>
                  </thead>
                  <tbody>
                      {allSubProduct?.length ? (
                        <>
                          {allSubProduct?.map((products, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {moment(products?.createdAt).format(
                                  "Do MMMM  YYYY"
                                )}
                              </td>
                              <td>
                                {products?.productCode?.toUpperCase()}
                              </td>  
                              <td>
                                {products?.name?.toUpperCase()}
                              </td>
                            
                              
                              <td style={{ width: "300px", height: "100px", overflow: "hidden", whiteSpace: "pre-wrap" }}>
  <p style={{ margin: 0 }}>  {products?.description}</p>
</td>
<td>
                                {products?.quantity}
                              </td>
<td>{products?.minimumQuantity}</td>
                        
                              <td>
                                {products?.price}
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
                                    product:products?._id,

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
                                    product:products?._id
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
                            <b>No Sub Products Found</b>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                </table>
              </div>
            )}
                     <div className="me-2 mt-3  mb-4 d-flex ms-auto">
            {/* <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={params.page}
                onChange={handlePageChange}
                color="primary"
              />
            </Stack> */}
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
    </>
  )
}

export default StockInSubProducts