import React, { useState, useEffect } from 'react'
import SelectOption from '../Components/MultiCheckBox/SelectOption';
import axios from 'axios';
import { GET_API, SITE_LOGO } from '../Auth/Define';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from "../Components/Pagination";
import GoogleMap from '../Components/GoogleMap/GoogleMap';

const Search = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [pageNum, setPageNum] = useState(1);

    // xxxxxxxxxxxx URL Parameters xxxxxxxxxxxx //
    const navigate = useNavigate();
    const location = useLocation();

    // xxxxxxxxxxxxxxxxxxxxx Get Disply Map xxxxxxxxxxxxxxxxxxxxx //
    const sessionShowMap = window.sessionStorage.getItem("showMap") || null;
    const [showMap, setShowMap] = useState(true);
    // xxxxxxxxxxxxxxxxxxxxx Get Disply Map xxxxxxxxxxxxxxxxxxxxx //


    useEffect(() => {

        if (sessionShowMap) {
            setShowMap(sessionShowMap === "true");
        }
    }, [showMap]);
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //


    const [showSorting, setShowSorting] = useState("Recommended");
    const [selectedValues, setSelectedValues] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // Sale Properties
    const [tempSaleProperties, setTempSaleProperties] = useState([]);
    const [saleProperties, setSaleProperties] = useState([]);
    // Sale Properties

    // xxxxxxxxxx Fetch All Sale Properties xxxxxxxxxx //
    const fetchListings = (searchQuery = null) => {

        if (isLoading) return;
        setIsLoading(true);

        console.log(searchQuery);

        const REQ_API = searchQuery ? `${GET_API}/search-property.php${searchQuery}` : `${GET_API}/search-property.php`

        axios.post(REQ_API).then(resp => {
            console.log("REQUESTED API ===>", resp.data.prop_data);
            if (resp.data.status === 100) {

                // if (!searchVal) {
                setSaleProperties(resp.data.prop_data);
                // } else {
                //     const filtered = resp.data.sale_data.filter((item) => item.property_name.toLowerCase().includes(searchVal.toLowerCase()));
                //     // console.log("filtered => ", filtered);
                //     setSaleProperties(filtered);
                // }
                setTempSaleProperties(resp.data.sale_data);
                setTotalPages(resp.data.total_pages);
                setPageNum(resp.data.current_page);
            }
        }).finally(() => {
            setIsLoading(false);
        })

    }


    useEffect(() => {
        fetchListings();
    }, []);

    // xxxxxxxxxx Fetch All Sale Properties xxxxxxxxxx //

    const RunSearch = () => {
        const params = new URLSearchParams(location.search);

        if (searchValue.trim() !== "") {
            params.set("search", searchValue.trim());
        } else {
            params.delete("search");
        }

        navigate(`?${params.toString()}`);
    };

    const ViewProperty = (PID) => {
        navigate(`/view-property?pid=${PID}`);
    }

    const handlePropertyTypes = (propSubTypes, propType) => {
        const params = new URLSearchParams(location.search);


        // params.delete("types[]");
        // params.delete("subtypes[]");

        propType.forEach(type => {
            const existingOptions = groupedOptions.find(g => g.label === type);

            if (existingOptions) {
                const allSubtypes = existingOptions.options.map(opt => opt.value);
                const selectedSubs = propSubTypes.filter(sub => allSubtypes.includes(sub));

                if (selectedSubs.length === allSubtypes.length) {
                    params.append("types[]", type);
                } else if (selectedSubs.length > 0) {
                    params.append("types[]", type);
                    selectedSubs.forEach(sub => {
                        params.append("subtypes[]", sub);
                    });
                } else {
                    // if no subtypes picked, default to all
                    params.append("types[]", type);
                }
            }
        });

        const queryString = params.toString().replace(/\+/g, "%20");

        console.log(queryString);

        navigate(`${location.pathname}?${queryString}`);
    };





    // xxxxxxxxxx Pagination Starts xxxxxxxxxx //

    const handlePagination = (changePageNum) => {

        setPageNum(changePageNum);
        const params = new URLSearchParams(location.search);
        const pageQuery = params.get("page");


        params.set("page", Number(changePageNum));
        navigate(`?${params.toString()}`);


    }

    // xxxxxxxxxx Pagination Ends xxxxxxxxxx //

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const allowedParams = ["page", "search", "types[]", "subtypes[]"];
        const pageQuery = params.get("page");
        const searchQuery = params.get("search");
        const propertyType = params.getAll("types[]");
        const subPropertyType = params.getAll("subtypes[]");


        for (const [key] of params.entries()) {
            if (!allowedParams.includes(key)) {
                console.warn(" xxxxxxxxxxxxxxxxxxx Invalid query param: xxxxxxxxxxxxxxxxxxx ", key);
                navigate("/properties");
                return;
            }
        }

        if (searchQuery) {
            params.append("search", searchQuery);
            setSearchValue(searchQuery);
        }

        if (pageQuery) {
            params.append("page", pageQuery);
        }

        if (propertyType.length > 0) {
            params.append("types[]", propertyType);

            // Find all subtypes for selected property type
            let aps = groupedOptions.filter((item) => propertyType.includes(item.label));
            let allSubtypes = aps.flatMap((item) => item.options.map((opt) => opt.label));

            if (subPropertyType.length === allSubtypes.length) {
                setSelectedValues(allSubtypes);
            } else if (subPropertyType.length > 0) {
                setSelectedValues(subPropertyType);
                params.append("subtypes[]", subPropertyType);
            } else {
                setSelectedValues(allSubtypes);
            }
        }

        fetchListings(`?${params.toString()}`);

    }, [location.search]);



    const clearFilters = () => {
        navigate(`${location.pathname}`)
        setShowSorting("Recommended");
        setSelectedValues([]);
        setSearchValue("");
        fetchListings();
    }


    return (
        <React.Fragment>

            {
                !isLoading ?
                    (
                        <>



                            <div id='MobSearchBar' className='mobileSearch'>

                                <div className='searchBar'>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search Keyword"
                                        style={{ height: "40px" }}
                                        value={searchValue}
                                        onChange={(e) => {
                                            setSearchValue(e.target.value);
                                            (e.target.value.trim() === "" && setSaleProperties(tempSaleProperties));
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                RunSearch();
                                            }
                                        }}
                                    />
                                    <div className='icon' onClick={RunSearch}>
                                        <i className="icon icon-search"></i>
                                    </div>
                                </div>
                            </div>

                            <div className='filter-tab' >
                                <div className='d-flex align-items-center filter-tab-options'>


                                    <div className='propertyList'>
                                        <SelectOption
                                            placeholder={"All Types"}
                                            Options={groupedOptions}
                                            value={selectedValues}
                                            onChange={(children, parents) => {
                                                setSelectedValues(children);
                                                handlePropertyTypes(children, parents);
                                            }}
                                            onClear={() => setSelectedValues([])}
                                        />
                                    </div>
                                    <div
                                        className="tab-item hover-primary cursor-pointer"
                                        onClick={clearFilters}>
                                        Clear All
                                    </div>

                                    <a href='#searchAdvanced'
                                        data-bs-toggle="modal"
                                        className="tab-item hover-primary cursor-pointer"
                                        style={{ fontWeight: "600" }}>
                                        More Filters
                                    </a>

                                </div>
                                <div id='lap-searchbar'>
                                    <div className='searchBar'>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Keyword"
                                            style={{ height: "40px" }}
                                            value={searchValue}
                                            onChange={(e) => {
                                                setSearchValue(e.target.value);
                                                (e.target.value.trim() === "" && setSaleProperties(tempSaleProperties));
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    RunSearch();
                                                }
                                            }}
                                        />
                                        <div className='icon' onClick={RunSearch}>
                                            <i className="icon icon-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-none d-md-flex'>

                                    <div className="toggle-switch d-flex align-items-center">
                                        <span style={{ fontWeight: "600" }}>Show Map</span>
                                        <input type="checkbox" checked={showMap} onChange={() => { setShowMap(!showMap); window.sessionStorage.setItem("showMap", !showMap) }} />
                                    </div>
                                </div>
                                {/* xxxxxxxxxx Advance Filter xxxxxxxxxx */}
                                <div className="modal modal-account fade" id="searchAdvanced" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                            <div className="flat-account">

                                                <form className="form-account">
                                                    <div className="title-box">
                                                        <h4>Register</h4>
                                                        <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                                    </div>
                                                    <div className="box">
                                                        <div className="row">
                                                            <div className="wd-search-for">
                                                                <div className="grid-2 group-box group-price">
                                                                    <div className="widget-price">
                                                                        <div className="box-title-price">
                                                                            <span className="title-price fw-6">Price:</span>
                                                                            <div className="caption-price">
                                                                                <span id="slider-range-value1" className="fw-6"></span>
                                                                                <span>-</span>
                                                                                <span id="slider-range-value2" className="fw-6"></span>
                                                                            </div>
                                                                        </div>
                                                                        <div id="slider-range"></div>
                                                                        <div className="slider-labels">
                                                                            <div>
                                                                                <input type="hidden" name="min-value" />
                                                                                <input type="hidden" name="max-value" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="widget-price">
                                                                        <div className="box-title-price">
                                                                            <span className="title-price fw-6">Size:</span>
                                                                            <div className="caption-price">
                                                                                <span id="slider-range-value01" className="fw-7"></span>
                                                                                <span>-</span>
                                                                                <span id="slider-range-value02" className="fw-7"></span>
                                                                            </div>
                                                                        </div>
                                                                        <div id="slider-range2"></div>
                                                                        <div className="slider-labels">
                                                                            <div>
                                                                                <input type="hidden" name="min-value2" />
                                                                                <input type="hidden" name="max-value2" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="grid-2 group-box">
                                                                    <div className="group-select grid-2">
                                                                        <div className="box-select">
                                                                            <label className="title-select fw-6">Rooms</label>
                                                                            <div className="nice-select" tabIndex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
                                                                                    <li data-value="2" className="option selected">2</li>
                                                                                    <li data-value="3" className="option">3</li>
                                                                                    <li data-value="4" className="option">4</li>
                                                                                    <li data-value="5" className="option">5</li>
                                                                                    <li data-value="6" className="option">6</li>
                                                                                    <li data-value="7" className="option">7</li>
                                                                                    <li data-value="8" className="option">8</li>
                                                                                    <li data-value="9" className="option">9</li>
                                                                                    <li data-value="10" className="option">10</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-select">
                                                                            <label className="title-select fw-6">Bathrooms</label>
                                                                            <div className="nice-select" tabIndex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
                                                                                    <li data-value="2" className="option selected">2</li>
                                                                                    <li data-value="3" className="option">3</li>
                                                                                    <li data-value="4" className="option">4</li>
                                                                                    <li data-value="5" className="option">5</li>
                                                                                    <li data-value="6" className="option">6</li>
                                                                                    <li data-value="7" className="option">7</li>
                                                                                    <li data-value="8" className="option">8</li>
                                                                                    <li data-value="9" className="option">9</li>
                                                                                    <li data-value="10" className="option">10</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="group-select grid-2">
                                                                        <div className="box-select">
                                                                            <label className="title-select fw-6">Bedrooms</label>
                                                                            <div className="nice-select" tabIndex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
                                                                                    <li data-value="2" className="option selected">2</li>
                                                                                    <li data-value="3" className="option">3</li>
                                                                                    <li data-value="4" className="option">4</li>
                                                                                    <li data-value="5" className="option">5</li>
                                                                                    <li data-value="6" className="option">6</li>
                                                                                    <li data-value="7" className="option">7</li>
                                                                                    <li data-value="8" className="option">8</li>
                                                                                    <li data-value="9" className="option">9</li>
                                                                                    <li data-value="10" className="option">10</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="box-select">
                                                                            <label className="title-select fw-6">Type</label>
                                                                            <div className="nice-select" tabIndex="0"><span className="current">2</span>
                                                                                <ul className="list">
                                                                                    <li data-value="1" className="option">1</li>
                                                                                    <li data-value="2" className="option selected">2</li>
                                                                                    <li data-value="3" className="option">3</li>
                                                                                    <li data-value="4" className="option">4</li>
                                                                                    <li data-value="5" className="option">5</li>
                                                                                    <li data-value="6" className="option">6</li>
                                                                                    <li data-value="7" className="option">7</li>
                                                                                    <li data-value="8" className="option">8</li>
                                                                                    <li data-value="9" className="option">9</li>
                                                                                    <li data-value="10" className="option">10</li>
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
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb1" />
                                                                                <label htmlFor="cb1" className="text-cb-amenities">Air Condition</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb2" />
                                                                                <label htmlFor="cb2" className="text-cb-amenities">Cable TV</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb3" />
                                                                                <label htmlFor="cb3" className="text-cb-amenities">Ceiling Height</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb4" />
                                                                                <label htmlFor="cb4" className="text-cb-amenities">Fireplace</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb5" />
                                                                                <label htmlFor="cb5" className="text-cb-amenities">Disabled Access</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb6" />
                                                                                <label htmlFor="cb6" className="text-cb-amenities">Elevator</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb7" />
                                                                                <label htmlFor="cb7" className="text-cb-amenities">Fence</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb8" />
                                                                                <label htmlFor="cb8" className="text-cb-amenities">Garden</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb9" />
                                                                                <label htmlFor="cb9" className="text-cb-amenities">Floor</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb10" />
                                                                                <label htmlFor="cb10" className="text-cb-amenities">Furnishing</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb11" />
                                                                                <label htmlFor="cb11" className="text-cb-amenities">Garage</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb12" />
                                                                                <label htmlFor="cb12" className="text-cb-amenities">Pet Friendly</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb13" />
                                                                                <label htmlFor="cb13" className="text-cb-amenities">Heating</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb14" />
                                                                                <label htmlFor="cb14" className="text-cb-amenities">Intercom</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb15" />
                                                                                <label htmlFor="cb15" className="text-cb-amenities">Parking</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb16" />
                                                                                <label htmlFor="cb16" className="text-cb-amenities">WiFi</label>
                                                                            </fieldset>
                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb17" />
                                                                                <label htmlFor="cb17" className="text-cb-amenities">Renovation</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb18" />
                                                                                <label htmlFor="cb18" className="text-cb-amenities">Security</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb19" />
                                                                                <label htmlFor="cb19" className="text-cb-amenities">Swimming Pool</label>
                                                                            </fieldset>

                                                                        </div>
                                                                        <div className="box-amenities">
                                                                            <fieldset className="amenities-item">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb20" />
                                                                                <label htmlFor="cb20" className="text-cb-amenities">Window Type</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb21" />
                                                                                <label htmlFor="cb21" className="text-cb-amenities">Search property</label>
                                                                            </fieldset>
                                                                            <fieldset className="amenities-item mt-16">
                                                                                <input type="checkbox" className="tf-checkbox style-1" id="cb22" />
                                                                                <label htmlFor="cb22" className="text-cb-amenities">Construction Year</label>
                                                                            </fieldset>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </form>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* xxxxxxxxxx Advance Filter xxxxxxxxxx */}
                            </div>


                            <section className="wrapper-layout layout-2">
                                <div className="wrap-left pt-2" style={{ width: `${showMap ? "45%" : "100%"}` }}>
                                    <div className="box-title-listing">
                                        <h5 className="fw-8">For Sale</h5>
                                        <div className="box-filter-tab">
                                            <div className="nice-select select-filter list-sort" tabIndex="0"><span className="current">{showSorting}</span>
                                                <ul className="list">
                                                    {
                                                        ["Recommended", "Price (Low to High)", "Price (High to Low)"].map((item, index) => {
                                                            return (
                                                                <li data-value={item} className={`option ${showSorting === item ? "selected focus" : ""}`} key={index} onClick={() => setShowSorting(item)}>{item}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="flat-animate-tab">
                                        <div className="tab-content">
                                            <div className="tab-pane active show" id="gridLayout" role="tabpanel">
                                                <div className="row">
                                                    {
                                                        saleProperties.length > 0
                                                            ? (
                                                                saleProperties.map((item, index) => {
                                                                    return (
                                                                        <div className={`${!showMap ? "col-lg-3" : ""} col-md-6`} key={index}>
                                                                            <div className="axs-box" onClick={() => ViewProperty(item.pid)}>
                                                                                <div className="archive-top">
                                                                                    <span className="images-group">
                                                                                        <div className="images-style">
                                                                                            <img className="lazyload" data-src="/assets/images/home/house-7.jpg" src="/assets/images/home/house-7.jpg" alt="img" />
                                                                                        </div>
                                                                                        {/* <div className="top">
                                                                                            <ul className="d-flex gap-6">
                                                                                                <li className="flag-tag primary">Featured</li>
                                                                                                <li className="flag-tag style-1">For Sale</li>
                                                                                            </ul>
                                                                                        </div> */}
                                                                                        <div className="bottom">
                                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                <path d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                                            </svg>
                                                                                            {item.city + ', ' + item.state}
                                                                                        </div>
                                                                                    </span>

                                                                                </div>
                                                                                <div className="archive-bottom">
                                                                                    <div className="content-top">
                                                                                        <h6 className="text-capitalize">
                                                                                            <a className="link">
                                                                                                {item.project_name}
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
                                                                                                <img src="/assets/images/avatar/avt-png1.png" alt="avt" />
                                                                                            </div>
                                                                                            <span>Testing User</span>
                                                                                        </div>
                                                                                        <h6 className="price">{`${'$' + ' ' + item.asking_price}`}</h6>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            ) : (
                                                                <div className="col-12">
                                                                    <h6 className='text-center text-warning w-100'>
                                                                        <img src="/assets/images/no-data.jpg" alt="" style={{ height: "300px" }} />
                                                                    </h6>
                                                                </div>
                                                            )
                                                    }
                                                </div>

                                                <div className='text-center py-2'>
                                                    {/* <ReactPaginate
                                        pageCount={totalPages}
                                        forcePage={pageNum - 1}
                                        containerClassName="react-pagination"
                                        activeClassName="selected"
                                        previousClassName="prev"
                                        nextClassName="next"
                                        disabledClassName="disabled"
                                        onPageChange={(e) => {
                                            console.log("Page clicked:", e);
                                            handlePagination(e.selected + 1);
                                        }}
                                    /> */}
                                                    <Pagination
                                                        totalPages={totalPages}
                                                        currentPage={pageNum}
                                                        onPageChange={(pNum) => handlePagination(pNum)}
                                                    />
                                                </div>
                                                <div className='mt-30 text-center'>
                                                    Footer Here
                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>
                                {/* xxxxx Map Here xxxxx */}
                                {
                                    showMap &&

                                    <div className="wrap-right">
                                        {/* <GoogleMap /> */}
                                    </div>
                                }

                            </section>
                        </>
                    ) : (
                        <div className="loading">
                            <div className="spinner-wrapper">
                                <span className="spinner-text">Loading</span>
                                <span className="spinner"></span>
                            </div>
                        </div>
                    )

            }

        </React.Fragment>
    )
}

export default Search;



const groupedOptions = [
    {
        label: 'Retail',
        options: [
            { id: 1, value: 'Gas Station Area', label: 'Gas Station' },
            { id: 2, value: 'Bank Area', label: 'Bank' },
            { id: 3, value: 'Convenience Store Area', label: 'Convenience Store' },
            { id: 4, value: 'Day Care / Nursery Area', label: 'Day Care / Nursery' },
            { id: 5, value: 'QSR / Fast Food Area', label: 'QSR / Fast Food' },
            { id: 6, value: 'Grocery Store Area', label: 'Grocery Store' },
            { id: 7, value: 'Pharmacy / Drug Area', label: 'Pharmacy / Drug Store' },
            { id: 8, value: 'Restaurant / Café Area', label: 'Restaurant / Café' },
            { id: 9, value: 'Shopping Center Area', label: 'Shopping Center' },
            { id: 10, value: 'Big Box / Anchor Store Area', label: 'Big Box / Anchor Store' },
            { id: 11, value: 'Factory Outlet Area', label: 'Factory Outlet' },
            { id: 12, value: 'Theme Center Area', label: 'Theme Center' },
            { id: 13, value: 'Strip Center / Neighborhood Center Area', label: 'Strip Center / Neighborhood Center' },
            { id: 14, value: 'Lifestyle Center Area', label: 'Lifestyle Center' },
            { id: 15, value: 'Mixed-Use Retail Area', label: 'Mixed-Use Retail' },
            { id: 16, value: 'Standalone Store / Pad Site Area', label: 'Standalone Store / Pad Site' },
            { id: 17, value: 'Fitness / Gym Area', label: 'Fitness / Gym' },
            { id: 18, value: 'Specialty Retail Area', label: 'Specialty Retail' },
        ],
    },
    {
        label: 'Office',
        options: [
            { value: 'High-Rise Office Area', label: 'High-Rise Office' },
            { value: 'Mid-Rise Office Area', label: 'Mid-Rise Office' },
            { value: 'Low-Rise / Garden Office Area', label: 'Low-Rise / Garden Office' },
            { value: 'Suburban Office Park Area', label: 'Suburban Office Park' },
            { value: 'Medical Office Area', label: 'Medical Office' },
            { value: 'Co-Working / Shared Office Area', label: 'Co-Working / Shared Office' },
            { value: 'Flex Office Area', label: 'Flex Office' },
        ],
    },
    {
        label: 'Multifamily',
        options: [
            { value: 'Apartment Complex (Low-, Mid-, High-rise) Area', label: 'Apartment Complex (Low-, Mid-, High-rise)' },
            { value: 'Student Housing Area', label: 'Student Housing' },
            { value: 'Senior / Assisted Living Housing Area', label: 'Senior / Assisted Living Housing' },
            { value: 'Duplex / Triplex / Fourplex Area', label: 'Duplex / Triplex / Fourplex' },
            { value: 'Condominiums / Co-ops Area', label: 'Condominiums / Co-ops' },
        ],
    },
    {
        label: 'Industrial',
        options: [
            { value: 'Warehouse / Distribution Area', label: 'Warehouse / Distribution' },
            { value: 'Manufacturing Facility Area', label: 'Manufacturing Facility' },
            { value: 'Flex Industrial Area', label: 'Flex Industrial' },
            { value: 'Cold Storage Area', label: 'Cold Storage' },
            { value: 'Data Center Area', label: 'Data Center' },
            { value: 'R&D Facility / Laboratory Area', label: 'R&D Facility / Laboratory' },
            { value: 'Bulk / Logistics Hub Area', label: 'Bulk / Logistics Hub' },
        ],
    },
    {
        label: 'Office',
        options: [
            { value: 'Traditional Office', label: 'Traditional Office' },
            { value: 'Executive Office', label: 'Executive Office' },
            { value: 'Medical Office', label: 'Medical Office' },
            { value: 'Creative Office', label: 'Creative Office' },
        ],
    },
    {
        label: 'Hospitality / Hotels',
        options: [
            { value: 'Hotel (Full Service) Area', label: 'Hotel (Full Service)' },
            { value: 'Limited Service Hotel Area', label: 'Limited Service Hotel' },
            { value: 'Motel Area', label: 'Motel' },
            { value: 'Resort Area', label: 'Resort' },
            { value: 'Extended Stay Area', label: 'Extended Stay' },
        ],
    },
    {
        label: 'Multifamily',
        options: [
            { value: 'Traditional Office', label: 'Traditional Office' },
            { value: 'Executive Office', label: 'Executive Office' },
            { value: 'Medical Office', label: 'Medical Office' },
            { value: 'Creative Office', label: 'Creative Office' },
        ],
    },
    {
        label: 'Land',
        options: [
            { value: 'Raw / Vacant Land Area', label: 'Raw / Vacant Land' },
            { value: 'Development Land (zoned / permitted) Area', label: 'Development Land (zoned / permitted)' },
            { value: 'Outlot / Pad Site Area', label: 'Outlot / Pad Site' },
            { value: 'Land with Partial Improvements Area', label: 'Land with Partial Improvements' },
        ],
    },
];