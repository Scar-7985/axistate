import React, { useState, useEffect } from 'react'
import SelectOption from '../Components/MultiCheckBox/SelectOption';
import axios from 'axios';
import { GET_API, MEDIA_URL, SITE_LOGO, numberWithCommas } from '../Auth/Define';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from "../Components/Pagination";
import GoogleMap from '../Components/GoogleMap/GoogleMap';
import MoreFilterModal from './Components/MoreFilterModal';

const Search = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [totalPages, setTotalPages] = useState(1);
    const [pageNum, setPageNum] = useState(1);
    const [showMap, setShowMap] = useState(true);

    // xxxxxxxxxxxx URL Parameters xxxxxxxxxxxx //
    const navigate = useNavigate();
    const location = useLocation();

    const [showSorting, setShowSorting] = useState("Recommended");
    const [selectedValues, setSelectedValues] = useState([]);

    // Sale Properties
    const [tempSaleProperties, setTempSaleProperties] = useState([]);
    const [saleProperties, setSaleProperties] = useState([]);

    // console.log(tempSaleProperties);
    // console.log(saleProperties);

    // Sale Properties

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxx Filtration Variables & Settings xxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //

    const [searchValue, setSearchValue] = useState("");

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxx Filtration Variables & Settings xxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //


    const fetchListings = (searchQuery = null, moreFilter = false) => {

        if (isLoading) return;
        const DisplayMap = window.localStorage.getItem("showMap") ? true : false;
        setShowMap(DisplayMap);
        setIsLoading(true);


        const REQ_API = moreFilter ? `${GET_API}/more-filter.php${searchQuery}` : (searchQuery ? `${GET_API}/search-property.php${searchQuery}` : `${GET_API}/search-property.php`)

        axios.post(REQ_API).then(resp => {
            // console.log("REQUESTED API ===>", resp.data.prop_data);
            if (resp.data.status === 100) {


                setSaleProperties(resp.data.prop_data);
                setTempSaleProperties(resp.data.prop_data);
                setTotalPages(resp.data.total_pages);
                setPageNum(resp.data.current_page);
            } else {
                setSaleProperties([]);
            }
        }).finally(() => {
            setIsLoading(false);
        });

    }


    useEffect(() => {
        fetchListings();
    }, []);

    const RunSearch = () => {
        const params = new URLSearchParams(location.search);

        if (searchValue.trim() !== "") {
            params.set("search", searchValue.trim());
        } else {
            params.delete("search");
        }

        navigate(`?${params.toString()}`);
    };

    const ViewProperty = (getPID) => {
        navigate("/view-property", { state: { PID: getPID } });
    }



    const handlePropertyTypes = (propSubTypes, propType) => {
        const params = new URLSearchParams(location.search);
        params.delete("ptype[]");
        params.delete("subtype[]");

        propType.forEach(type => {
            const existingOptions = groupedOptions.find(g => g.label === type);

            if (existingOptions) {
                const allSubtypes = existingOptions.options.map(opt => opt.value);
                const selectedSubs = propSubTypes.filter(sub => allSubtypes.includes(sub));

                if (selectedSubs.length === allSubtypes.length) {
                    // all subtypes selected → only append parent
                    params.append("ptype[]", type);
                } else if (selectedSubs.length > 0) {
                    // some subtypes selected → append parent + each subtype
                    params.append("ptype[]", type);
                    selectedSubs.forEach(sub => {
                        params.append("subtype[]", sub);
                    });
                } else {
                    // no subtype selected → just parent
                    params.append("ptype[]", type);
                }
            }
        });

        const queryString = params.toString().replace(/\+/g, "%20");
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
        const closeMoreFilter = document.querySelector("#close-more-filter");
        closeMoreFilter?.click();

        const params = new URLSearchParams(location.search);

        // Basic Filters
        const allowedParams = [
            "page", "search", "ptype[]", "subtype[]",
            "price_min", "price_max", "cap_min", "cap_max", "search_filter", "sale_condition", 
            "ownership_type", "occupancy_min", "occupancy_max", "num_tenants", "zoning", "number_floore", "lease_type", "building_class",
            "hvac", "sprinkler", "water", "gas", "sewer", "electricity", "elevator", "agent_name",
        ];
        // Advance Filters
        const specialParams = [
            "search_filter", "price_min", "price_max", "cap_min", "cap_max", "sale_condition", 
            "ownership_type", "occupancy_min", "occupancy_max", "num_tenants", "zoning", "number_floore", "lease_type", "building_class",
            "hvac", "sprinkler", "water", "gas", "sewer", "electricity", "elevator", "agent_name",
        ];

        const pageQuery = params.get("page");
        const searchQuery = params.get("search");
        const propertyType = params.getAll("ptype[]");
        const subPropertyType = params.getAll("subtype[]");

        // Validation: block unknown params
        for (const [key] of params.entries()) {
            if (!allowedParams.includes(key)) {
                console.warn("❌ Invalid query param:", key);
                navigate("/properties");
                return;
            }
        }

        // Handle search
        if (searchQuery) {
            params.set("search", searchQuery);
            setSearchValue(searchQuery);
        }

        // Handle page
        if (pageQuery) {
            params.set("page", pageQuery);
        }

        // Handle property type and subtypes
        if (propertyType.length > 0) {
            params.delete("ptype[]");
            propertyType.forEach(pt => params.append("ptype[]", pt));

            let aps = groupedOptions.filter((item) => propertyType.includes(item.label));
            let allSubtypes = aps.flatMap((item) => item.options.map((opt) => opt.value));

            if (subPropertyType.length === allSubtypes.length) {
                setSelectedValues(allSubtypes);
            } else if (subPropertyType.length > 0) {
                setSelectedValues(subPropertyType);
                params.delete("subtype[]");
                subPropertyType.forEach(st => params.append("subtype[]", st));
            } else {
                setSelectedValues(allSubtypes);
            }
        }

        // Check if any special params are present
        const hasSpecial = [...params.keys()].some((key) => specialParams.includes(key));

        if (hasSpecial) {
            fetchListings(`?${params.toString()}`, true);
        } else {
            fetchListings(`?${params.toString()}`);
        }
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

                            <div className='filter-tab'>
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
                                        <input type="checkbox" checked={showMap} onChange={() => { setShowMap(!showMap); window.localStorage.setItem("showMap", !showMap) }} />
                                    </div>
                                </div>
                                {/* xxxxxxxxxx Advance Filter xxxxxxxxxx */}
                                <MoreFilterModal selectedValues={selectedValues} setSelectedValues={setSelectedValues} handlePropertyTypes={handlePropertyTypes} />
                                {/* xxxxxxxxxx Advance Filter xxxxxxxxxx */}
                            </div>


                            <section className="wrapper-layout layout-2">
                                <div className="wrap-left pt-2" style={{ width: `${showMap ? "45%" : "100%"}`, height: "calc(100vh - 190px)" }}>
                                    {/* <div className="box-title-listing">
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
                                    </div> */}


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
                                                                                            <img className="lazyload" data-src={`${MEDIA_URL}/${item.banner}`} src={`${MEDIA_URL}/${item.banner}`} alt="img" />
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
                                                                                        <h6 className="price">{`${item.asking_price ? ('$' + ' ' + numberWithCommas(item.asking_price)) : "Unpriced"}`}</h6>
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



export const groupedOptions = [
    {
        label: 'Retail',
        options: [
            { value: 'Gas Station' },
            { value: 'Bank' },
            { value: 'Convenience Store' },
            { value: 'Day Care / Nursery' },
            { value: 'QSR / Fast Food' },
            { value: 'Grocery Store' },
            { value: 'Pharmacy / Drug Store' },
            { value: 'Restaurant / Café' },
            { value: 'Shopping Center' },
            { value: 'Big Box / Anchor Store' },
            { value: 'Factory Outlet' },
            { value: 'Theme Center' },
            { value: 'Strip Center / Neighborhood Center' },
            { value: 'Lifestyle Center' },
            { value: 'Mixed-Use Retail' },
            { value: 'Standalone Store / Pad Site' },
            { value: 'Fitness / Gym' },
            { value: 'Specialty Retail' },
        ],
    },
    {
        label: 'Office',
        options: [
            { value: 'High-Rise Office' },
            { value: 'Mid-Rise Office' },
            { value: 'Low-Rise / Garden Office' },
            { value: 'Suburban Office Park' },
            { value: 'Medical Office' },
            { value: 'Co-Working / Shared Office' },
            { value: 'Flex Office' },
        ],
    },
    {
        label: 'Industrial',
        options: [
            { value: 'Warehouse / Distribution' },
            { value: 'Manufacturing Facility' },
            { value: 'Flex Industrial' },
            { value: 'Cold Storage' },
            { value: 'Data Center' },
            { value: 'R&D Facility / Laboratory' },
            { value: 'Bulk / Logistics Hub' },
        ],
    },
    {
        label: 'Hospitality / Hotels',
        options: [
            { value: 'Hotel (Full Service)' },
            { value: 'Limited Service Hotel' },
            { value: 'Motel' },
            { value: 'Resort' },
            { value: 'Extended Stay' },
        ],
    },
    {
        label: 'Multifamily',
        options: [
            { value: 'Apartment Complex (Low-, Mid-, High-rise)' },
            { value: 'Student Housing' },
            { value: 'Senior / Assisted Living Housing' },
            { value: 'Duplex / Triplex / Fourplex' },
            { value: 'Condominiums / Co-ops' },
        ],
    },
    {
        label: 'Land',
        options: [
            { value: 'Raw / Vacant Land' },
            { value: 'Development Land (zoned / permitted)' },
            { value: 'Outlot / Pad Site' },
            { value: 'Land with Partial Improvements' },
        ],
    },
];
