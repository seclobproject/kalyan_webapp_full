import React, { useContext, useEffect, useState } from "react";
import { SlideMotion } from "../../Components/FramerMotion";
import { Button, Form } from "react-bootstrap";
import Loader from "../../Components/Loader";
import { MyContext } from "../../Services/Context";
import ModalComponent from "../../Components/ModalComponents";
import { ApiCall } from "../../Services/Api";
import { addProductURl, deleteProductUrl, editProductUrl, getAllCategoryUrl, getAllFranchiseUrl, getProductUrl, productFilterUrl } from "../../../Utils/Constants";
import toast from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import Select from 'react-select';
function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [addProductModal, setAddProductModal] = useState({
    show: false,
    id: null,
  });
  const [validated, setValidated] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  console.log("al",allProducts);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [allCategory, setAllCatgeory] = useState([]);
  const [allFranchise, setAllFranchise] = useState([]);
  const [addProductData, setAddProductData] = useState({
    quantity:0
    
  });
  const [params, setParams] = useState({
    page: 1,
    pageSize: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const { Check_Validation } = useContext(MyContext);
  const [filter, setFilter] = useState();

  //get all products
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", getProductUrl,{},params);
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

  // add & edit product
  const addOrEditproducts = async (e) => {
    setIsLoading(true);
    setIsLoadingButton(true);
    try {
      if (addProductData?._id) {
        const response = await ApiCall(
          "put",
          `${editProductUrl}/${addProductData?._id}`,
          addProductData
        );
        if (response.status === 200) {
          setAddProductModal(false);
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          getAllProducts()
          toast.success(response?.data?.message);
        } else {
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          toast.error(response?.response?.data?.message);
          getAllProducts()
        }
      } else {
        const response = await ApiCall("post", addProductURl, addProductData);
        if (response.status === 200) {
          setAddProductModal(false);
          setIsLoadingButton(false);
          setValidated(false);
          getAllProducts()
          toast.success(response?.data?.message);
        } else {
          setIsLoading(false);
          setIsLoadingButton(false);
          setValidated(false);
          toast.error(response?.response?.data?.message);

       
        }
      }
    } catch (error) {
      console.error("Error adding product :", error);
      toast.error("product adding failed", false);

    }
    finally{
      setIsLoadingButton(false);
    }
  };

// for dropdown
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

    // delete catgeory
  const deleteProducts = async () => {
      try {
        const response = await ApiCall(
          "delete",
          `${deleteProductUrl}/${deleteModal.id}`
        );
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setDeleteModal(false);
          getAllProducts();
        } else {
          toast.error(response?.response?.data?.message);
        }
      } catch (error) {
        console.error("Error in deleting :", error);
      }
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };
  // const handleFilterAndSetFilterStatus = (e) => {
  //   const filterStatus = e.target.value;

  //   setFilter(filterStatus);
  //   const newFilteredData = allUser.filter((item) => {
  //     return filterStatus ? item.userStatus === filterStatus : true;
  //   });
  //   setFilteredData(newFilteredData);
  // };
  useEffect(() => {
    getAllCategory();
    getAllFranchises();
getAllProducts();
   

  }, [params,]);
  return (
    <>
      <SlideMotion>
        <div className="col-xl-12 mt-4">
          <div className="card">
            <div className="card-body">
            <div className="px-4 py-3 border-bottom">
  <div className="d-flex align-items-center justify-content-between">
    <h3 className="card-title fw-semibold mb-0" style={{ color: "#F7AE15", margin: 0 }}>
      Products
    </h3>
    <div>
      <Button
                  style={{background:"#001529",border: "1px solid"}}
                  className="mt-2 mt-md-0"
        onClick={() => {
          setAddProductModal({ show: true });
          setAddProductData({});
          setValidated(false);
        }}
      >
        Add Products
      </Button>
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
                      <th>Category</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Actions</th>
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
                                {products?.productCode?.toUpperCase()}
                              </td>  
                              <td>
                                {products?.name?.toUpperCase()}
                              </td>
                                <td>
                                {products?.category?.categoryName?.toUpperCase()}
                              </td>
                              
                              <td style={{ width: "300px", height: "100px", overflow: "hidden", whiteSpace: "pre-wrap" }}>
  <p style={{ margin: 0 }}>  {products?.description}</p>
</td>
                              <td>
                                {products?.quantity}
                              </td>
                              <td>
                                {products?.price}
                              </td>
                          
                              <td>
  
      <i className="fs-4 fas fa-pencil-alt"
       onClick={() => {
        setAddProductModal({
          show: true,
          id: products?._id,
        });
        setAddProductData(products);
      }}
      style={{ cursor: 'pointer',color: "red"  }}
      ></i>
 
 {products?.quantity <= 0 ? (
    <i 
      className="fs-4 fas fa-trash-alt ms-2" 
      onClick={() => {
        setDeleteModal({
          show: true,
          id: products._id,
        });
      }} 
      style={{ cursor: 'pointer', color: "red" }}
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
                            <b>No Products Found</b>{" "}
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
        show={addProductModal.show}
        onHide={() => {
          setAddProductModal({ show: false, id: null });
        }}
        title={<h4 style={{ color: "#F7AE15", margin: 0 }}>{addProductData?._id?'Update Products':'Add Products'}</h4>}
        centered
        width={"700px"}
      >
     <Form
  noValidate
  validated={validated}
  onSubmit={(e) => Check_Validation(e,addOrEditproducts, setValidated)}
>
  <div className="d-flex mb-2">
  <div className="flex-grow-1 me-2">
      <label htmlFor="productCode" className="form-label">
        Product Code
      </label>
      <input
        id="productCode"
        className="form-control"
        placeholder="Enter product code"
        value={addProductData?.productCode}
        onChange={(e) => {
          setAddProductData({
            ...addProductData,
            productCode: e.target.value,
          });
        }}
        required
      />
      <Form.Control.Feedback type="invalid">
        Please enter Product code.
      </Form.Control.Feedback>
    </div>
    <div className=" flex-grow-1">
      <label htmlFor="productName" className="form-label">
        Product Name
      </label>
      <input
        id="productName"
        className="form-control"
        placeholder="Enter product name"
        value={addProductData?.name}
        onChange={(e) => {
          setAddProductData({
            ...addProductData,
            name: e.target.value,
          });
        }}
        required
      />
      <Form.Control.Feedback type="invalid">
        Please enter product name.
      </Form.Control.Feedback>
    </div>
   
  </div>

  <div className="d-flex mb-2">
    <div className=" flex-grow-1  me-2">
      <label htmlFor="categoryName" className="form-label">
        Category Name
      </label>
      <select
  id="categoryName"
  className="form-control"
  value={addProductData?.category?.categoryId || ""}
  onChange={(e) => {
    const selectedCategory = allCategory.find(
      (item) => item._id === e.target.value
    );
    setAddProductData({
      ...addProductData,
      category: {
        categoryId: selectedCategory._id,
        categoryName: selectedCategory.categoryName,
      },
    });
  }}
  required
>
  <option value="">Select category name</option>
  {allCategory?.map((item, index) => (
    <option key={index} value={item._id}>
      {item.categoryName}
    </option>
  ))}
</select>

      <Form.Control.Feedback type="invalid">
        Please enter category name.
      </Form.Control.Feedback>
    </div>
    <div className="flex-grow-1">
      <label htmlFor="priceInput" className="form-label">
        Price
      </label>
      <input
      type="number"
        id="priceInput"
        className="form-control"
        placeholder="Enter price"
        value={addProductData?.price}
              onChange={(e) => {
                const value = e.target.value;
                setAddProductData({
                  ...addProductData,
                  price: value === '' ? '' : Number(value),
                });
              }}
        required
      />
      <Form.Control.Feedback type="invalid">
        Please enter price.
      </Form.Control.Feedback>
    </div>
  </div>



  <div className="me-2 flex-grow-1">
      <label htmlFor="productDescription" className="form-label">
        Product Description
      </label>
      <textarea
      style={{height:"150%"}}
        id="productDescription"
        className="form-control"
        placeholder="Enter product description"
        value={addProductData?.description}
        onChange={(e) => {
          setAddProductData({
            ...addProductData,
            description: e.target.value,
          });
        }}
      />
      <Form.Control.Feedback type="invalid">
        Please enter product description.
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
        : addProductData?._id
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
            setAddProductModal({ show: false, id: null });
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
                Are you sure you want to delete this product?
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
                  deleteProducts();
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

export default Products;
