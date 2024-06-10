import React, { useEffect, useState } from "react";
import { getAllStockUrl } from "../../../Utils/Constants";
import { ApiCall } from "../../Services/Api";
import { SlideMotion } from "../../Components/FramerMotion";
import Loader from "../../Components/Loader";
import { Button } from "react-bootstrap";
import { Pagination, Stack } from "@mui/material";

function StockReport() {
  const [allStock, setAllStock] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);
  const startIndex = (params.page - 1) * params.limit;

  //get all stock report
  const getAllStock = async () => {
    setIsLoading(true);
    try {
      const response = await ApiCall("get", getAllStockUrl, {}, params);
      if (response.status === 200) {
        setAllStock(response?.data?.stock);
        setTotalPages(response?.data?.totalPages);
        setIsLoading(false);
      } else {
        console.error("Error fetching products list. Unexpected status:");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products list:", error);
    }
  };
  const handlePageChange = (event, newPage) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: newPage,
    }));
  };
  useEffect(() => {
    getAllStock();
  }, [params]);
  return (
    <>
      <SlideMotion>
        <div className="col-xl-12 mt-4">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
                <h3
                  className="card-title fw-semibold mb-0"
                  style={{ color: "#F7AE15", margin: 0 }}
                >
                  Stocks Report
                </h3>
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
                      <th>Date and Time</th>
                      <th>Product Code</th>
                      <th>Product Name</th>
                      <th>Franchise</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th> In/Out</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStock?.length ? (
                      <>
                        {allStock.map((stocks, index) => (
                          <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              {moment(stocks?.createdAt).format(
                                " Do MMMM  YYYY , HH:mm a"
                              )}
                            </td>
                            <td>
                              {stocks?.product?.productCode?.toUpperCase()}
                            </td>
                            <td>
                              {stocks?.product?.productName?.toUpperCase()}
                            </td>
                            <td>
                              {stocks?.franchise?.franchiseName?.toUpperCase()}
                            </td>
                            <td>
                              {stocks?.product?.categoryName?.toUpperCase()}
                            </td>
                            <td>{stocks?.product?.price}</td>

                            <td>{stocks?.quantity}</td>
                            <td>
                              {stocks?.type === "remove" ? (
                                <span
                                  className="badge bg-danger rounded-8 fw-semibold  "
                                  style={{
                                    height: "30px",
                                    width: "65px",
                                    display: "flex",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Stock Out
                                </span>
                              ) : stocks?.type === "add" ? (
                                <span
                                  className="badge bg-success rounded-8 fw-semibold"
                                  style={{
                                    height: "30px",
                                    width: "65px",
                                    display: "flex",
                                    textAlign: "center",
                                    padding: "10px",
                                  }}
                                >
                                  Stock In
                                </span>
                              ) : (
                                <span>-</span>
                              )}
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
                  defaultPage={0}
                  boundaryCount={0}
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
    </>
  );
}

export default StockReport;
