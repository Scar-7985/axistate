import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import HeroBanner from "../Components/HeroBanner";
import axios from "axios";
import { GET_API, POST_API } from "../Auth/Define";

const Home = () => {

  const agents = [
    {
      name: "Chris Patt",
      title: "Administrative Staff",
      image: "/assets/images/agents/agent-1.jpg",
    },
    {
      name: "Esther Howard",
      title: "Administrative Staff",
      image: "/assets/images/agents/agent-2.jpg",
    },
    {
      name: "Darrell Steward",
      title: "Administrative Staff",
      image: "/assets/images/agents/agent-3.jpg",
    },
    {
      name: "Robert Fox",
      title: "Administrative Staff",
      image: "/assets/images/agents/agent-4.jpg",
    },
  ];




  return (
    <div>


      <HeroBanner />

      {/* Hero Section End */}

      {/* Featured Section*/}
      <section className="flat-section flat-recommended">
        <div className="container">
          <div className="box-title text-center wow fadeInUp">
            <div className="text-subtitle text-primary">Featured Properties</div>
            <h3 className="title mt-4">Recommended For You</h3>
          </div>
          <div
            className="flat-tab-recommended flat-animate-tab wow fadeInUp"
            data-wow-delay=".2s"
          >
            <ul
              className="nav-tab-recommended justify-content-md-center"
              role="tablist"
            >
              <li className="nav-tab-item" role="presentation">
                {/* <a href="#viewAll" className="nav-link-item" data-bs-toggle="tab">
                 Find
                </a> */}
                <a className="tf-btn btn-line btn-login">Find</a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a className="tf-btn btn-line btn-login">Research</a>
              </li>
              <li className="nav-tab-item" role="presentation">
                <a className="tf-btn btn-line btn-login">List</a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active show" id="viewAll" role="tabpanel">
                <div className="row">
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <Link to={"/property-search"} className="axs-box">
                      <div className="archive-top">
                        <a href="property-details-v1.html" className="images-group">
                          <div className="images-style">
                            <img
                              className="lazyload"
                              data-src="/assets/images/home/house-13.jpg"
                              src="/assets/images/home/house-13.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
                          <div className="bottom">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            145 Brooklyn Ave, Califonia, New York
                          </div>
                        </a>
                      </div>
                      <div className="archive-bottom">
                        <div className="content-top">
                          <h6 className="text-capitalize">
                            <a href="property-details-v1.html" className="link">
                              {" "}
                              Casa Lomas de Machalí Machas
                            </a>
                          </h6>
                          <ul className="meta-list">
                            <li className="item">
                              <i className="icon icon-bed"></i>
                              <span className="text-variant-1">Beds:</span>
                              <span className="fw-6">3</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-bath"></i>
                              <span className="text-variant-1">Baths:</span>
                              <span className="fw-6">2</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-sqft"></i>
                              <span className="text-variant-1">Sqft:</span>
                              <span className="fw-6">1150</span>
                            </li>
                          </ul>
                        </div>

                        <div className="content-bottom">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                src="/assets/images/avatar/avt-png1.png"
                                alt="avt"
                              />
                            </div>
                            <span>Arlene McCoy</span>
                          </div>
                          <h6 className="price">$7250,00</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <Link to={"/property-search"} className="axs-box">
                      <div className="archive-top">
                        <a href="property-details-v1.html" className="images-group">
                          <div className="images-style">
                            <img
                              className="lazyload"
                              data-src="/assets/images/home/house-14.jpg"
                              src="/assets/images/home/house-14.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
                          <div className="bottom">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            145 Brooklyn Ave, Califonia, New York
                          </div>
                        </a>
                      </div>
                      <div className="archive-bottom">
                        <div className="content-top">
                          <h6 className="text-capitalize">
                            <a href="property-details-v1.html" className="link">
                              {" "}
                              Casa Lomas de Machalí Machas
                            </a>
                          </h6>
                          <ul className="meta-list">
                            <li className="item">
                              <i className="icon icon-bed"></i>
                              <span className="text-variant-1">Beds:</span>
                              <span className="fw-6">3</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-bath"></i>
                              <span className="text-variant-1">Baths:</span>
                              <span className="fw-6">2</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-sqft"></i>
                              <span className="text-variant-1">Sqft:</span>
                              <span className="fw-6">1150</span>
                            </li>
                          </ul>
                        </div>

                        <div className="content-bottom">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                src="/assets/images/avatar/avt-png2.png"
                                alt="avt"
                              />
                            </div>
                            <span>Arlene McCoy</span>
                          </div>
                          <h6 className="price">$7250,00</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <Link to={"/property-search"} className="axs-box">
                      <div className="archive-top">
                        <a href="property-details-v1.html" className="images-group">
                          <div className="images-style">
                            <img
                              className="lazyload"
                              data-src="/assets/images/home/house-15.jpg"
                              src="/assets/images/home/house-15.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
                          <div className="bottom">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            145 Brooklyn Ave, Califonia, New York
                          </div>
                        </a>
                      </div>
                      <div className="archive-bottom">
                        <div className="content-top">
                          <h6 className="text-capitalize">
                            <a href="property-details-v1.html" className="link">
                              {" "}
                              Casa Lomas de Machalí Machas
                            </a>
                          </h6>
                          <ul className="meta-list">
                            <li className="item">
                              <i className="icon icon-bed"></i>
                              <span className="text-variant-1">Beds:</span>
                              <span className="fw-6">3</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-bath"></i>
                              <span className="text-variant-1">Baths:</span>
                              <span className="fw-6">2</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-sqft"></i>
                              <span className="text-variant-1">Sqft:</span>
                              <span className="fw-6">1150</span>
                            </li>
                          </ul>
                        </div>

                        <div className="content-bottom">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                src="/assets/images/avatar/avt-png3.png"
                                alt="avt"
                              />
                            </div>
                            <span>Arlene McCoy</span>
                          </div>
                          <h6 className="price">$7250,00</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <Link to={"/property-search"} className="axs-box">
                      <div className="archive-top">
                        <a href="property-details-v1.html" className="images-group">
                          <div className="images-style">
                            <img
                              className="lazyload"
                              data-src="/assets/images/home/house-16.jpg"
                              src="/assets/images/home/house-16.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
                          <div className="bottom">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            145 Brooklyn Ave, Califonia, New York
                          </div>
                        </a>
                      </div>
                      <div className="archive-bottom">
                        <div className="content-top">
                          <h6 className="text-capitalize">
                            <a href="property-details-v1.html" className="link">
                              {" "}
                              Casa Lomas de Machalí Machas
                            </a>
                          </h6>
                          <ul className="meta-list">
                            <li className="item">
                              <i className="icon icon-bed"></i>
                              <span className="text-variant-1">Beds:</span>
                              <span className="fw-6">3</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-bath"></i>
                              <span className="text-variant-1">Baths:</span>
                              <span className="fw-6">2</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-sqft"></i>
                              <span className="text-variant-1">Sqft:</span>
                              <span className="fw-6">1150</span>
                            </li>
                          </ul>
                        </div>

                        <div className="content-bottom">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                src="/assets/images/avatar/avt-png4.png"
                                alt="avt"
                              />
                            </div>
                            <span>Arlene McCoy</span>
                          </div>
                          <h6 className="price">$7250,00</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <Link to={"/property-search"} className="axs-box">
                      <div className="archive-top">
                        <a href="property-details-v1.html" className="images-group">
                          <div className="images-style">
                            <img
                              className="lazyload"
                              data-src="/assets/images/home/house-17.jpg"
                              src="/assets/images/home/house-17.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
                          <div className="bottom">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            145 Brooklyn Ave, Califonia, New York
                          </div>
                        </a>
                      </div>
                      <div className="archive-bottom">
                        <div className="content-top">
                          <h6 className="text-capitalize">
                            <a href="property-details-v1.html" className="link">
                              {" "}
                              Casa Lomas de Machalí Machas
                            </a>
                          </h6>
                          <ul className="meta-list">
                            <li className="item">
                              <i className="icon icon-bed"></i>
                              <span className="text-variant-1">Beds:</span>
                              <span className="fw-6">3</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-bath"></i>
                              <span className="text-variant-1">Baths:</span>
                              <span className="fw-6">2</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-sqft"></i>
                              <span className="text-variant-1">Sqft:</span>
                              <span className="fw-6">1150</span>
                            </li>
                          </ul>
                        </div>

                        <div className="content-bottom">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                src="/assets/images/avatar/avt-png5.png"
                                alt="avt"
                              />
                            </div>
                            <span>Arlene McCoy</span>
                          </div>
                          <h6 className="price">$7250,00</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-6">
                    <Link to={"/property-search"} className="axs-box">
                      <div className="archive-top">
                        <a href="property-details-v1.html" className="images-group">
                          <div className="images-style">
                            <img
                              className="lazyload"
                              data-src="/assets/images/home/house-18.jpg"
                              src="/assets/images/home/house-18.jpg"
                              alt="img"
                            />
                          </div>
                          <div className="top">
                            <ul className="d-flex gap-6">
                              <li className="flag-tag primary">Featured</li>
                              <li className="flag-tag style-1">For Sale</li>
                            </ul>
                          </div>
                          <div className="bottom">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            145 Brooklyn Ave, Califonia, New York
                          </div>
                        </a>
                      </div>
                      <div className="archive-bottom">
                        <div className="content-top">
                          <h6 className="text-capitalize">
                            <a href="property-details-v1.html" className="link">
                              {" "}
                              Casa Lomas de Machalí Machas
                            </a>
                          </h6>
                          <ul className="meta-list">
                            <li className="item">
                              <i className="icon icon-bed"></i>
                              <span className="text-variant-1">Beds:</span>
                              <span className="fw-6">3</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-bath"></i>
                              <span className="text-variant-1">Baths:</span>
                              <span className="fw-6">2</span>
                            </li>
                            <li className="item">
                              <i className="icon icon-sqft"></i>
                              <span className="text-variant-1">Sqft:</span>
                              <span className="fw-6">1150</span>
                            </li>
                          </ul>
                        </div>

                        <div className="content-bottom">
                          <div className="d-flex gap-8 align-items-center">
                            <div className="avatar avt-40 round">
                              <img
                                src="/assets/images/avatar/avt-png6.png"
                                alt="avt"
                              />
                            </div>
                            <span>Arlene McCoy</span>
                          </div>
                          <h6 className="price">$7250,00</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="text-center">
                  <Link to={"/properties"}
                    className="tf-btn btn-view primary size-1 hover-btn-view"
                  >
                    View All Properties{" "}
                    <span className="icon icon-arrow-right2"></span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section End*/}

      {/* Services  Section */}
      <section className="flat-section p-0">
        <div className="container">
          <div className="box-title text-center wow fadeInUp">
            <div className="text-subtitle text-primary">Our Services</div>
            <h3 className="mt-4 title">What We Do?</h3>
          </div>
          <div
            className="tf-grid-layout md-col-3 wow fadeInUp"
            data-wow-delay=".2s"
          >
            <div className="box-service">
              <div className="image">
                <img
                  className="lazyload"
                  data-src="/assets/images/service/home-1.png"
                  src="/assets/images/service/home-1.png"
                  alt="image-location"
                />
              </div>
              <div className="content">
                <h5 className="title">Buy A New Home</h5>
                <p className="description">
                  Discover your dream home effortlessly. Explore diverse
                  properties and expert guidance for a seamless buying
                  experience.
                </p>
                <a href="#" className="tf-btn btn-line">
                  Learn More <span className="icon icon-arrow-right2"></span>
                </a>
              </div>
            </div>
            <div className="box-service">
              <div className="image">
                <img
                  className="lazyload"
                  data-src="/assets/images/service/home-2.png"
                  src="/assets/images/service/home-2.png"
                  alt="image-location"
                />
              </div>
              <div className="content">
                <h5 className="title">Sell a home</h5>
                <p className="description">
                  Sell confidently with expert guidance and effective
                  strategies, showcasing your property's best features for a
                  successful sale.
                </p>
                <a href="#" className="tf-btn btn-line">
                  Learn More <span className="icon icon-arrow-right2"></span>
                </a>
              </div>
            </div>
            <div className="box-service">
              <div className="image">
                <img
                  className="lazyload"
                  data-src="/assets/images/service/home-3.png"
                  src="/assets/images/service/home-3.png"
                  alt="image-location"
                />
              </div>
              <div className="content">
                <h5 className="title">Rent a home</h5>
                <p className="description">
                  Discover your perfect rental effortlessly. Explore a diverse
                  variety of listings tailored precisely to suit your unique
                  lifestyle needs.
                </p>
                <a href="#" className="tf-btn btn-line">
                  Learn More <span className="icon icon-arrow-right2"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Service Section End*/}

      {/* Benefit  Section */}
      <section className="mt-5 mx-5 bg-primary-new radius-30">
        <div className="flat-img-with-text">
          <div className="content-left img-animation wow">
            <img
              className="lazyload"
              data-src="/assets/images/banner/img-w-text1.jpg"
              src="/assets/images/banner/img-w-text1.jpg"
              alt=""
            />
          </div>
          <div className="content-right">
            <div className="box-title wow fadeInUp">
              <div className="text-subtitle text-primary">Our Benifit</div>
              <h3 className="title mt-4">Why Choose Axistate</h3>
              <p className="desc text-variant-1">
                Our seasoned team excels in real estate with years of successful
                market <br /> navigation, offering informed decisions and
                optimal results.
              </p>
            </div>
            <div className="flat-service wow fadeInUp" data-wow-delay=".2s">
              <a href="#" className="box-benefit hover-btn-view">
                <div className="icon-box">
                  <span className="icon icon-proven"></span>
                </div>
                <div className="content">
                  <h5 className="title">Proven Expertise</h5>
                  <p className="description">
                    Our seasoned team excels in real estate with years of
                    successful market navigation, offering informed decisions
                    and optimal results.
                  </p>
                </div>
              </a>
              <a href="#" className="box-benefit hover-btn-view">
                <div className="icon-box">
                  <span className="icon icon-customize"></span>
                </div>
                <div className="content">
                  <h5 className="title">Customized Solutions</h5>
                  <p className="description">
                    We pride ourselves on crafting personalized strategies to
                    match your unique goals, ensuring a seamless real estate
                    journey.
                  </p>
                </div>
              </a>
              <a href="#" className="box-benefit hover-btn-view">
                <div className="icon-box">
                  <span className="icon icon-partnership"></span>
                </div>
                <div className="content">
                  <h5 className="title">Transparent Partnerships</h5>
                  <p className="description">
                    Transparency is key in our client relationships. We
                    prioritize clear communication and ethical practices,
                    fostering trust and reliability throughout.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Benefit  Section End */}



      {/* Agents Section  */}
      <section className="flat-section flat-agents">
        <div className="container">
          <div className="box-title text-center">
            <div className="text-subtitle text-primary">Our Teams</div>
            <h3 className="title mt-4">Meet Our Agents</h3>
          </div>

          <Swiper
            modules={[Pagination]}
            spaceBetween={15}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              576: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {agents.map((agent, index) => (
              <SwiperSlide key={index}>
                <div className="box-agent hover-img">
                  <a href="#" className="box-img img-style">
                    <img src={agent.image} alt={agent.name} />
                    <ul className="agent-social">
                      <li>
                        <span className="icon icon-facebook"></span>
                      </li>
                      <li>
                        <span className="icon icon-x"></span>
                      </li>
                      <li>
                        <span className="icon icon-linkedin"></span>
                      </li>
                      <li>
                        <span className="icon icon-instargram"></span>
                      </li>
                    </ul>
                  </a>
                  <div className="content">
                    <div className="info">
                      <h5>
                        <a className="link" href="#">
                          {agent.name}
                        </a>
                      </h5>
                      <p className="text-variant-1">{agent.title}</p>
                    </div>
                    <div className="box-icon">
                      <span className="icon icon-phone"></span>
                      <span className="icon icon-mail"></span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Agents Section  End*/}
    </div>
  );
};

export default Home;