import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MyContext } from "../../Services/Context";
import { useNavigate } from "react-router-dom";
import { dashboardDataUrl } from "../../../Utils/Constants";
import { ApiCall } from "../../Services/Api";
import { SlideMotion } from "../../Components/FramerMotion";
import Loader from "../../Components/Loader";

function Home() {
  const navigate = useNavigate();
  const {} = useContext(MyContext);
  const [dashboardData, SetDashBoardData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //get all dashboard data
  const getAllDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await ApiCall("get", dashboardDataUrl);
      if (response.status === 200) {
        SetDashBoardData(response?.data);
        setIsLoading(false);
      } else {
        console.error("Error fetching data list. Unexpected status:");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data list:", error);
    }
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
    getAllDashboard();
  }, []);

  return (
    <>
      <SlideMotion>
        {isLoading ? (
          <Loader  />
        ) : (
          <div className="container-fluid mt-4">
            <div className="row">
              <div className="col-xl-4 col-md-6">
                <div className="card" style={{ background: "#001529" }}>
                  <div className="card-body">
                    <h4
                      className="header-title mt-0 mb-4"
                      style={{ height: "70%", color: "white" }}
                    >
                      Total Categories
                    </h4>
                    <div className="widget-chart-1">
                      <div className="widget-detail-1 text-end">
                        <h2
                          className="fw-normal pt-2 mb-1"
                          style={{ color: "white" }}
                        >
                          {dashboardData?.totalCategories||"0"}{" "}
                        </h2>
                        <div className="progress progress-bar-alt-success progress-sm">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={77}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "77%", background: "#D7A322" }}
                          >
                            <span className="visually-hidden">
                              77% Complete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end col */}
            
                  <div className="col-xl-4 col-md-6">
                <div className="card" style={{ background: "#001529" }}>
                  <div className="card-body">
                    <h4
                      className="header-title mt-0 mb-4"
                      style={{ height: "70%", color: "white" }}
                    >
                      Total Franchise
                    </h4>
                    <div className="widget-chart-1">
                      <div className="widget-detail-1 text-end">
                        <h2
                          className="fw-normal pt-2 mb-1"
                          style={{ color: "white" }}
                        >
                          {dashboardData?.totalfranchise||"0"}{" "}
                        </h2>
                        <div className="progress progress-bar-alt-success progress-sm">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={77}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "77%", background: "#D7A322" }}
                          >
                            <span className="visually-hidden">
                              77% Complete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end col */}
              
              <div className="col-xl-4 col-md-6">
                <div className="card" style={{ background: "#001529" }}>
                  <div className="card-body">
                    <h4
                      className="header-title mt-0 mb-4"
                      style={{ height: "70%", color: "white" }}
                    >
                      Total Products
                    </h4>
                    <div className="widget-chart-1">
                      <div className="widget-detail-1 text-end">
                        <h2
                          className="fw-normal pt-2 mb-1"
                          style={{ color: "white" }}
                        >
                          {dashboardData?.totalProducts||"0"}{" "}
                        </h2>
                        <div className="progress progress-bar-alt-success progress-sm">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow={77}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{ width: "77%", background: "#D7A322" }}
                          >
                            <span className="visually-hidden">
                              77% Complete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SlideMotion>
    </>
  );
}

export default Home;
