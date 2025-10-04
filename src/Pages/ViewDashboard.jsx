import React, { useState, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Components/ViewDashboard.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import axios from "axios";
import { GET_API, IMAGE_URL, MEDIA_URL } from "../Auth/Define";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const ViewDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("impressions");
  const { PID } = location.state || {};

  const [showSidebar, setShowSidebar] = useState(false);
  const [propertyData, setPropertyData] = useState({});

  const getStrokeColor = (score) => {
    if (score <= 25) return "red";
    if (score <= 50) return "blue";
    if (score <= 75) return "orange";
    if (score >= 75 && score <= 99) return "purple";
    return "green";
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("pid", PID);
    axios.post(`${GET_API}/view-property.php`, formData).then((resp) => {

      if (resp.data.status === 100) {
        setPropertyData(resp.data.value);
      }
    });
  }, [PID]);

  return (
    <div>
      <div id="wrapper">
        <div id="page" className="clearfix">
          <div className="layout-wrap">
            {/* sidebar  */}

            <div
              className="sidebar-menu-dashboard"
              id={`add-listing-sidemenu${showSidebar ? "-open" : ""}`}
            >
              {" "}
              {/* d-flex shadow  */}
              <div className="flat-account">
                <div className="banner-account">
                  <img
                    src={`${MEDIA_URL}/${propertyData.banner}`}
                    alt="banner"
                    style={{ height: "200px" }}
                  />
                </div>
              </div>
              <div className="menu-box">
                <div className="title fw-6">Menu</div>
                <ul className="box-menu-dashboard">
                  <li
                    className="nav-menu-item"
                  >
                    <span className="nav-menu-link">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.2">
                          <path
                            d="M6.75682 9.35156V15.64"
                            stroke="#F1FAEE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.0342 6.34375V15.6412"
                            stroke="#F1FAEE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M15.2412 12.6758V15.6412"
                            stroke="#F1FAEE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.2939 1.83398H6.70346C3.70902 1.83398 1.83203 3.95339 1.83203 6.95371V15.0476C1.83203 18.0479 3.70029 20.1673 6.70346 20.1673H15.2939C18.2971 20.1673 20.1654 18.0479 20.1654 15.0476V6.95371C20.1654 3.95339 18.2971 1.83398 15.2939 1.83398Z"
                            stroke="#F1FAEE"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                      Overview
                    </span>
                  </li>
                  <li
                    className="nav-menu-item cursor-pointer"                       
                    onClick={() =>
                      navigate("/property-details", { state: { PID: PID } })
                    }
                  >
                    <span className="nav-menu-link">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.2">
                          <path
                            d="M10.533 2.55664H7.10561C4.28686 2.55664 2.51953 4.55222 2.51953 7.37739V14.9986C2.51953 17.8237 4.27861 19.8193 7.10561 19.8193H15.1943C18.0222 19.8193 19.7813 17.8237 19.7813 14.9986V11.3062"
                            stroke="#F1FAEE"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M8.09012 10.0111L14.9404 3.16086C15.7938 2.30836 17.177 2.30836 18.0305 3.16086L19.146 4.27644C19.9995 5.12986 19.9995 6.51403 19.146 7.36653L12.2628 14.2498C11.8897 14.6229 11.3837 14.8328 10.8557 14.8328H7.42188L7.50804 11.3678C7.52087 10.8581 7.72896 10.3723 8.09012 10.0111Z"
                            stroke="#F1FAEE"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M13.8984 4.21875L18.0839 8.40425"
                            stroke="#F1FAEE"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                      </svg>
                      Edit Property
                    </span>
                  </li>
                </ul>
                <div className="search-score-box m-2">
                  <div className="score-progress">
                    <svg width="120" height="120">
                      <circle
                        className="progress-ring__background"
                        stroke="#e6e6e6"
                        strokeWidth="5"
                        fill="transparent"
                        r="50"
                        cx="60"
                        cy="60"
                      />
                      <circle
                        className="progress-ring__circle"
                        stroke={getStrokeColor(propertyData.complete_score)}
                        strokeWidth="5"
                        fill="transparent"
                        r="50"
                        cx="60"
                        cy="60"
                        style={{
                          strokeDasharray: 2 * Math.PI * 50,
                          strokeDashoffset:
                            2 *
                            Math.PI *
                            50 *
                            (1 - propertyData.complete_score / 100),
                        }}
                      />
                      <text
                        x="60"
                        y="65"
                        textAnchor="middle"
                        fill="#ffffffff"
                        fontSize="20"
                        fontWeight="bold"
                      >
                        {propertyData.complete_score}%
                      </text>
                    </svg>
                    <div className="text-white text-center mt-2">
                      Search Score
                    </div>
                  </div>
                  {propertyData.complete_score === 100 && (
                    <div>
                      <div className="text-white">Just Starting</div>
                      <p className="small mt-2 text-white">
                        The more fields you complete, the higher your listing
                        appears in search.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* sidebar  */}

            <div className="main-content">
              <div className="main-content-inner ">
                <div
                  className="button-show-hide show-mb w-100 text-right"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  <a className="btn-dark p-2">
                    {showSidebar ? "Hide" : "Show"} Sidebar
                  </a>
                </div>

                {/* <DashboardView pid={PID} /> */}

                <div className="widget-box-2 wd-listing shadow">
                  <div className="header">
                    <h3>Overview</h3>
                    {/* <span className="time-filter">All Time ▼</span> */}

                    {/* <div style={{ width: "200px" }}>
                      <fieldset class="box-fieldset">
                        <div class="nice-select" tabindex="0">
                          <span class="current">All Time</span>
                          <ul class="list">
                            <li data-value="1" class="option selected">
                              Test Day
                            </li>
                            <li data-value="2" class="option">
                              Test Month
                            </li>
                            <li data-value="3" class="option">
                              Test Year
                            </li>
                          </ul>
                        </div>
                      </fieldset>
                    </div> */}
                  </div>
                  <p className="subtitle1">
                    Shows total activity, email campaign events, and key
                    property updates like price change
                  </p>

                  {/* Tabs */}
                  <div className="tabs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.key}
                        className={`tab ${
                          activeTab === tab.key ? "active" : ""
                        }`}
                        onClick={() => setActiveTab(tab.key)}
                      >
                        <h2>{tab.value}</h2>
                        <p>{tab.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="tab-content1">
                    {activeTab === "impressions" && (
                      // <p>📊 Impressions data will be shown here.</p>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={data}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="view"
                            stroke="#2563eb"
                            strokeWidth={3}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    )}
                    {activeTab === "pageviews" && (
                      <p>📈 Page Views statistics will be shown here.</p>
                    )}
                    {activeTab === "visitors" && (
                      <p>👥 Visitors details will be shown.</p>
                    )}
                    {activeTab === "openedoms" && (
                      <p>📄 Opened OMs report will be shown.</p>
                    )}
                    {activeTab === "executedcas" && (
                      <p>✅ Executed CAs details will be displayed.</p>
                    )}
                  </div>
                </div>
                <div className="row p-3">
                  <div className="col-4 widget-box-2 wd-listing shadow">
                    <div className="header">
                      <h3>Status</h3>
                      {/* <a className="time-filter text-primary" style={{ fontWeight: "bold" }}>Active</a> */}
                      {propertyData.a_status === 1 ? (
                        <p className="text-success">Active</p>
                      ) : (
                        <p className="text-danger">Pending</p>
                      )}
                    </div>
                    <div className="">
                      Asking Price:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {propertyData.asking_price
                          ? "$ " + propertyData.asking_price
                          : "Unpriced"}
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="time-filter">
                        Date Posted:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {propertyData.date}
                        </span>
                      </p>
                    </div>
                    <a
                      className="tf-btn rounded mt-3"
                      onClick={() =>
                        navigate("/property-details", { state: { PID: PID } })
                      }
                    >
                      Edit Property
                    </a>
                  </div>
                  {propertyData.complete_score === 100 && (
                    <div className="col-7 ml-3 widget-box-2 wd-listing shadow">
                      <div className="header">
                        <h3>Recommendations</h3>
                      </div>

                      <div className="abc">
                        <Swiper
                          modules={[Navigation, Pagination, Autoplay]}
                          navigation
                          pagination={{ clickable: true }}
                          loop={true}
                          spaceBetween={30}
                          slidesPerView={1}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                        >
                          <SwiperSlide>
                            <div className="recommend-slide">
                              <div className="circle-score">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 640 640"
                                >
                                  <path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" />
                                </svg>
                              </div>
                              <div className="recommend-text">
                                <h5>Improve search score</h5>
                                <p>
                                  Add property details to improve your listing
                                  search appearances.
                                </p>
                                {/* <button className="btn btn-outline-primary mb-3">
                      Improve Score
                    </button> */}
                                <a className="tf-btn rounded mt-3">
                                  Improve Score
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="recommend-slide">
                              <div className="circle-score">
                                <div className="circle-score">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 640 640"
                                  >
                                    <path d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="recommend-text">
                                <h5>Get 6x more deals with PRO</h5>
                                <p>
                                  Add property details to improve your listing
                                  search appearances.
                                </p>
                                <a className="tf-btn rounded mt-3">
                                  Improve Score
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>

                          <SwiperSlide>
                            <div className="recommend-slide">
                              <div className="recommend-slide">
                                <svg width="120" height="120">
                                  <circle
                                    className="progress-ring__background"
                                    stroke="#e6e6e6"
                                    strokeWidth="5"
                                    fill="transparent"
                                    r="50"
                                    cx="60"
                                    cy="60"
                                  />
                                  <circle
                                    className="progress-ring__circle"
                                    stroke={getStrokeColor(score)}
                                    strokeWidth="5"
                                    fill="transparent"
                                    r="50"
                                    cx="60"
                                    cy="60"
                                    style={{
                                      strokeDasharray: 2 * Math.PI * 50,
                                      strokeDashoffset:
                                        2 * Math.PI * 50 * (1 - score / 100),
                                    }}
                                  />
                                  <text
                                    x="60"
                                    y="65"
                                    textAnchor="middle"
                                    // fill="#ffffffff"
                                    fontSize="20"
                                    fontWeight="bold"
                                  >
                                    {score}%
                                  </text>
                                </svg>
                              </div>
                              <div className="recommend-text">
                                <h5>Boost Listing Engagement</h5>
                                <p>
                                  Send marketing campaigns to increase property
                                  engagement.
                                </p>

                                <a className="tf-btn rounded mt-3">
                                  Send Campaign
                                </a>
                              </div>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="overlay-dashboard"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDashboard;

const tabs = [
  { key: "impressions", label: "Impressions", value: 0 },
  { key: "pageviews", label: "Page Views", value: 0 },
  { key: "visitors", label: "Visitors", value: 0 },
  { key: "openedoms", label: "Opened OMs", value: 0 },
  { key: "executedcas", label: "Executed CAs", value: 0 },
];

const data = [
  { month: "Jan", view: 500 },
  { month: "Feb", view: 800 },
  { month: "Mar", view: 1200 },
  { month: "Apr", view: 1500 },
];