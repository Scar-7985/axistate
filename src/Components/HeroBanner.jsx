import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useNavigate } from "react-router-dom";

const HeroBanner = () => {

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const categories = [
    { title: "Apartment", icon: "icon-apartment1", property: 234 },
    { title: "Villa", icon: "icon-apartment1", property: 234 },
    { title: "Studio", icon: "icon-apartment1", property: 234 },
    { title: "Office", icon: "icon-office1", property: 234 },
    { title: "Townhouse", icon: "icon-townhouse", property: 234 },
    { title: "Commercial", icon: "icon-commercial", property: 234 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties${searchValue ? ("?search=" + searchValue) : ""}`);
  };



  return (
    <section className="flat-slider home-1">
      <div className="container relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="slider-content">
              <div className="heading text-center">
                <h1 className="title-large text-white animationtext slide">
                  Find Your
                  <span className="tf-text s1 cd-words-wrapper" style={{ marginLeft: "20px" }}>
                    <span className="item-text is-visible">Dream Property</span>
                    <span className="item-text is-hidden">Perfect Property</span>
                  </span>
                </h1>
                <p
                  className="subtitle text-white body-2 wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  We are a real estate agency that will help you find the best
                  residence you dream of, let’s discuss for your dream property?
                </p>
              </div>
              <div className="flat-tab flat-tab-form">
                {/* <ul
                  className="nav-tab-form style-1 justify-content-center"
                  role="tablist"
                >
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#"
                      className="nav-link-item active"
                      data-bs-toggle="tab"
                    >
                      For Sale
                    </a>
                  </li>
                  <li className="nav-tab-item" role="presentation">
                    <a
                      href="#"
                      className="nav-link-item"
                      data-bs-toggle="tab"
                    >
                      For Lease
                    </a>
                  </li>
                </ul> */}
                <div className="tab-content">
                  <div className="tab-pane fade active show" role="tabpanel">
                    <div className="form-sl">
                      <form onSubmit={handleSearch}
                      >
                        <div className="wd-find-select px-5">
                          <div className="inner-group">

                            <div className="form-group-3 form-style border-bottom">
                              <label>Keyword</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search Keyword."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="box-btn-advanced">

                            <button type="submit"

                              className="tf-btn btn-line filter-advanced pull-right"

                            >
                              Search <i className="icon icon-search"></i>{" "}
                            </button>
                          </div>
                        </div>
                        <div className="wd-search-form">
                          <div className="grid-2 group-box group-price">
                            <div className="widget-price">
                              <div className="box-title-price">
                                <span className="title-price fw-6">Price:</span>
                                <div className="caption-price">
                                  <span
                                    id="slider-range-value1"
                                    className="fw-6"
                                  ></span>
                                  <span>-</span>
                                  <span
                                    id="slider-range-value2"
                                    className="fw-6"
                                  ></span>
                                </div>
                              </div>
                              <div id="slider-range"></div>
                              <div className="slider-labels">
                                <div>
                                  <input
                                    type="hidden"
                                    name="min-value"

                                  />
                                  <input
                                    type="hidden"
                                    name="max-value"

                                  />
                                </div>
                              </div>
                            </div>

                            <div className="widget-price">
                              <div className="box-title-price">
                                <span className="title-price fw-6">Size:</span>
                                <div className="caption-price">
                                  <span
                                    id="slider-range-value01"
                                    className="fw-7"
                                  ></span>
                                  <span>-</span>
                                  <span
                                    id="slider-range-value02"
                                    className="fw-7"
                                  ></span>
                                </div>
                              </div>
                              <div id="slider-range2"></div>
                              <div className="slider-labels">
                                <div>
                                  <input
                                    type="hidden"
                                    name="min-value2"

                                  />
                                  <input
                                    type="hidden"
                                    name="max-value2"

                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid-2 group-box">
                            <div className="group-select grid-2">
                              <div className="box-select">
                                <label className="title-select fw-6">Rooms</label>
                                <div className="nice-select" tabIndex="0">
                                  <span className="current">2</span>
                                  <ul className="list">
                                    <li data-value="1" className="option">
                                      1
                                    </li>
                                    <li
                                      data-value="2"
                                      className="option selected"
                                    >
                                      2
                                    </li>
                                    <li data-value="3" className="option">
                                      3
                                    </li>
                                    <li data-value="4" className="option">
                                      4
                                    </li>
                                    <li data-value="5" className="option">
                                      5
                                    </li>
                                    <li data-value="6" className="option">
                                      6
                                    </li>
                                    <li data-value="7" className="option">
                                      7
                                    </li>
                                    <li data-value="8" className="option">
                                      8
                                    </li>
                                    <li data-value="9" className="option">
                                      9
                                    </li>
                                    <li data-value="10" className="option">
                                      10
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="box-select">
                                <label className="title-select fw-6">
                                  Bathrooms
                                </label>
                                <div className="nice-select" tabIndex="0">
                                  <span className="current">2</span>
                                  <ul className="list">
                                    <li data-value="1" className="option">
                                      1
                                    </li>
                                    <li
                                      data-value="2"
                                      className="option selected"
                                    >
                                      2
                                    </li>
                                    <li data-value="3" className="option">
                                      3
                                    </li>
                                    <li data-value="4" className="option">
                                      4
                                    </li>
                                    <li data-value="5" className="option">
                                      5
                                    </li>
                                    <li data-value="6" className="option">
                                      6
                                    </li>
                                    <li data-value="7" className="option">
                                      7
                                    </li>
                                    <li data-value="8" className="option">
                                      8
                                    </li>
                                    <li data-value="9" className="option">
                                      9
                                    </li>
                                    <li data-value="10" className="option">
                                      10
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="group-select grid-2">
                              <div className="box-select">
                                <label className="title-select fw-6">
                                  Bedrooms
                                </label>
                                <div className="nice-select" tabIndex="0">
                                  <span className="current">2</span>
                                  <ul className="list">
                                    <li data-value="1" className="option">
                                      1
                                    </li>
                                    <li
                                      data-value="2"
                                      className="option selected"
                                    >
                                      2
                                    </li>
                                    <li data-value="3" className="option">
                                      3
                                    </li>
                                    <li data-value="4" className="option">
                                      4
                                    </li>
                                    <li data-value="5" className="option">
                                      5
                                    </li>
                                    <li data-value="6" className="option">
                                      6
                                    </li>
                                    <li data-value="7" className="option">
                                      7
                                    </li>
                                    <li data-value="8" className="option">
                                      8
                                    </li>
                                    <li data-value="9" className="option">
                                      9
                                    </li>
                                    <li data-value="10" className="option">
                                      10
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              <div className="box-select">
                                <label className="title-select fw-6">Type</label>
                                <div className="nice-select" tabIndex="0">
                                  <span className="current">2</span>
                                  <ul className="list">
                                    <li data-value="1" className="option">
                                      1
                                    </li>
                                    <li
                                      data-value="2"
                                      className="option selected"
                                    >
                                      2
                                    </li>
                                    <li data-value="3" className="option">
                                      3
                                    </li>
                                    <li data-value="4" className="option">
                                      4
                                    </li>
                                    <li data-value="5" className="option">
                                      5
                                    </li>
                                    <li data-value="6" className="option">
                                      6
                                    </li>
                                    <li data-value="7" className="option">
                                      7
                                    </li>
                                    <li data-value="8" className="option">
                                      8
                                    </li>
                                    <li data-value="9" className="option">
                                      9
                                    </li>
                                    <li data-value="10" className="option">
                                      10
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="group-checkbox">
                            <div className="text-1 text-black-2">Amenities:</div>
                            <div className="group-amenities grid-6">
                              <div className="box-amenities">
                                <fieldset className="amenities-item">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb1"
                                  // checked
                                  />
                                  <label htmlFor="cb1" className="text-cb-amenities">
                                    Air Condition
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb2"
                                  />
                                  <label htmlFor="cb2" className="text-cb-amenities">
                                    Cable TV
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb3"
                                  />
                                  <label htmlFor="cb3" className="text-cb-amenities">
                                    Ceiling Height
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb4"
                                  />
                                  <label htmlFor="cb4" className="text-cb-amenities">
                                    Fireplace
                                  </label>
                                </fieldset>
                              </div>
                              <div className="box-amenities">
                                <fieldset className="amenities-item">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb5"
                                  />
                                  <label htmlFor="cb5" className="text-cb-amenities">
                                    Disabled Access
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb6"
                                  />
                                  <label htmlFor="cb6" className="text-cb-amenities">
                                    Elevator
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb7"
                                  />
                                  <label htmlFor="cb7" className="text-cb-amenities">
                                    Fence
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb8"
                                  />
                                  <label htmlFor="cb8" className="text-cb-amenities">
                                    Garden
                                  </label>
                                </fieldset>
                              </div>
                              <div className="box-amenities">
                                <fieldset className="amenities-item">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb9"
                                  />
                                  <label htmlFor="cb9" className="text-cb-amenities">
                                    Floor
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb10"
                                  />
                                  <label htmlFor="cb10" className="text-cb-amenities">
                                    Furnishing
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb11"
                                  />
                                  <label htmlFor="cb11" className="text-cb-amenities">
                                    Garage
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb12"
                                  />
                                  <label htmlFor="cb12" className="text-cb-amenities">
                                    Pet Friendly
                                  </label>
                                </fieldset>
                              </div>
                              <div className="box-amenities">
                                <fieldset className="amenities-item">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb13"
                                  />
                                  <label htmlFor="cb13" className="text-cb-amenities">
                                    Heating
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb14"
                                  />
                                  <label htmlFor="cb14" className="text-cb-amenities">
                                    Intercom
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb15"
                                  />
                                  <label htmlFor="cb15" className="text-cb-amenities">
                                    Parking
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb16"
                                  />
                                  <label htmlFor="cb16" className="text-cb-amenities">
                                    WiFi
                                  </label>
                                </fieldset>
                              </div>
                              <div className="box-amenities">
                                <fieldset className="amenities-item">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb17"
                                  />
                                  <label htmlFor="cb17" className="text-cb-amenities">
                                    Renovation
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb18"
                                  />
                                  <label htmlFor="cb18" className="text-cb-amenities">
                                    Security
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb19"
                                  />
                                  <label htmlFor="cb19" className="text-cb-amenities">
                                    Swimming Pool
                                  </label>
                                </fieldset>
                              </div>
                              <div className="box-amenities">
                                <fieldset className="amenities-item">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb20"
                                  />
                                  <label htmlFor="cb20" className="text-cb-amenities">
                                    Window Type
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb21"
                                  />
                                  <label htmlFor="cb21" className="text-cb-amenities">
                                    Search property
                                  </label>
                                </fieldset>
                                <fieldset className="amenities-item mt-16">
                                  <input
                                    type="checkbox"
                                    className="tf-checkbox style-1"
                                    id="cb22"
                                  />
                                  <label htmlFor="cb22" className="text-cb-amenities">
                                    Construction Year
                                  </label>
                                </fieldset>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
    </section>
  );
};

export default HeroBanner;
