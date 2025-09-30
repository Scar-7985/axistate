import React, { useState, useEffect } from 'react'
import SelectOption from '../Components/MultiCheckBox/SelectOption';
import axios from 'axios';
import { GET_API, MEDIA_URL, SITE_LOGO } from '../Auth/Define';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from "../Components/Pagination";
import GoogleMap from '../Components/GoogleMap/GoogleMap';

const Search = () => {

    // xxxx More Filters xxxxxxx //

    const [showMenu, setShowMenu] = useState(false);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(100);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);
    const [minCap, setMinCap] = useState(0);
    const [maxCap, setMaxCap] = useState(100);
    const [activeThumb, setActiveThumb] = useState(null);
    const [activeTab, setActiveTab] = useState("time");

    const [unitTab, setUnitTab] = useState("Units");

    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        buildingName: "",
        minYear: 0,
        maxYear: 100,
        minValue: 0,
        maxValue: 100,
        minPrice: 0,
        maxPrice: 100,
        minCap: 0,
        maxCap: 100,
        broker: "",
        minSF: "",
        maxSF: "",
        minDoller: "",
        maxDoller: "",
        minAcres: "",
        maxAcres: "",
        tenancy: [],
        LeaseType: [],
        tenantCredit: [],
        class: [],
        activeListings: false,
        onMarket: false,
        auction: false,
        highestBest: false,
        callForOffers: false,
        contractPending: false,
        underContract: false,
        agentCo: false,
        owner: false,
        opportunityZone: false,
        type: "",
        min: "",
        max: "",
        yearBuilt: "",
        lotSize: "",
        buildingSize: "",
        floors: "",
        parkingSpaces: "",
        saleCond: "",
        ownershipType: "",
        ceilingHeight: "",
        loadingDocks: "",
        hvac: "",
        utilities: "",
        elevator: "",
        accessibility: "",
        trafficCount: "",
        highways: "",
        nearbyBusinesses: "",
        walkScore: "",
        numberTenants: "",
        leaseExp: "",
        noi: "",
        zoning: "",

    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            type: unitTab, // ✅ ensure type always matches current tab
        }));
    };

    // tab change
    const handleTabClick = (tab) => {
        setUnitTab(tab);
        setFormData((prev) => ({
            ...prev,
            type: tab, // ✅ update type on tab change
        }));
    };
    const handleSubmit = async () => {
        let finalData = { ...formData }; // baaki ka data same rakha

        if (activeTab === "time") {
            delete finalData.startDate;
            delete finalData.endDate;
        } else if (activeTab === "custom") {
            delete finalData.timePeriod;
        }

        console.log(finalData);
    };
    const handleClassClick = (value) => {
        setFormData((prev) => ({
            ...prev,
            class: prev.class.includes(value)
                ? prev.class.filter((item) => item !== value) // already selected → remove
                : [...prev.class, value], // not selected → add
        }));
    };

    const handleTenancyClick = (value) => {
        setFormData((prev) => ({
            ...prev,
            tenancy: prev.tenancy.includes(value)
                ? prev.tenancy.filter((item) => item !== value)
                : [...prev.tenancy, value],
        }));
    };
    const handleLeaseTypeClick = (value) => {
        setFormData((prev) => ({
            ...prev,
            LeaseType: prev.LeaseType.includes(value)
                ? prev.LeaseType.filter((item) => item !== value)
                : [...prev.LeaseType, value],
        }));
    };
    const handleTenantCreditClick = (value) => {
        setFormData((prev) => ({
            ...prev,
            tenantCredit: prev.tenantCredit.includes(value)
                ? prev.tenantCredit.filter((item) => item !== value)
                : [...prev.tenantCredit, value],
        }));
    };

    const handleMinChange = (e) => {
        const value = Math.min(Number(e.target.value), maxValue);
        setMinValue(value);
        setActiveThumb("min");

        setFormData((prev) => ({
            ...prev,
            minValue: value,
        }));
    };

    const handleMaxChange = (e) => {
        const value = Math.max(Number(e.target.value), minValue);
        setMaxValue(value);
        setActiveThumb("max");

        setFormData((prev) => ({
            ...prev,
            maxValue: value,
        }));
    };

    // year

    const handleMinYearChange = (e) => {
        const value = Math.min(Number(e.target.value), maxYear);
        setMinYear(value);
        setActiveThumb("min");

        setFormData((prev) => ({
            ...prev,
            minYear: value,
        }));
    };

    const handleMaxYearChange = (e) => {
        const value = Math.max(Number(e.target.value), minYear);
        setMaxYear(value);
        setActiveThumb("max");

        setFormData((prev) => ({
            ...prev,
            maxYear: value,
        }));
    };

    // price

    const handleMinPriceChange = (e) => {
        const value = Math.min(Number(e.target.value), maxPrice);
        setMinPrice(value);
        setActiveThumb("min");

        setFormData((prev) => ({
            ...prev,
            minPrice: value,
        }));
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(Number(e.target.value), minPrice);
        setMaxPrice(value);
        setActiveThumb("max");

        setFormData((prev) => ({
            ...prev,
            maxPrice: value,
        }));
    };

    // cap

    const handleMinCapChange = (e) => {
        const value = Math.min(Number(e.target.value), maxCap);
        setMinCap(value);
        setActiveThumb("min");

        setFormData((prev) => ({
            ...prev,
            minCap: value,
        }));
    };

    const handleMaxCapChange = (e) => {
        const value = Math.max(Number(e.target.value), minCap);
        setMaxCap(value);
        setActiveThumb("max");

        setFormData((prev) => ({
            ...prev,
            maxCap: value,
        }));
    };

    const tabs = ["Units", "Keys", "Beds", "Pads", "Pumps"];

    const handleParentChange = (e) => {
        const checked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            activeListings: checked,
            onMarket: checked,
            auction: checked,
            highestBest: checked,
            callForOffers: checked,
        }));
    };

    const handleChildChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    // Independent checkbox change
    const handleIndependentChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };

    useEffect(() => {
        const allChecked =
            formData.onMarket &&
            formData.auction &&
            formData.highestBest &&
            formData.callForOffers;

        const noneChecked =
            !formData.onMarket &&
            !formData.auction &&
            !formData.highestBest &&
            !formData.callForOffers;

        if (allChecked) {
            setFormData((prev) => ({ ...prev, activeListings: true }));
        } else if (noneChecked) {
            setFormData((prev) => ({ ...prev, activeListings: false }));
        } else {
            setFormData((prev) => ({ ...prev, activeListings: false }));
        }
    }, [
        formData.onMarket,
        formData.auction,
        formData.highestBest,
        formData.callForOffers,
    ]);

    const handleOtherChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };
    const handleOpportunityChange = (e) => {
        const { name, checked } = e.target;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    };


    // xxxx More Filters xxxxxxx //

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

    console.log(tempSaleProperties);
    // console.log(saleProperties);

    // Sale Properties

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxx Filtration Variables & Settings xxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //

    const [searchValue, setSearchValue] = useState("");

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxx Filtration Variables & Settings xxxxxxxxxxxxxxx //
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx //


    const fetchListings = (searchQuery = null) => {

        if (isLoading) return;
        const DisplayMap = window.localStorage.getItem("showMap") ? true : false;
        setShowMap(DisplayMap);
        setIsLoading(true);


        const REQ_API = searchQuery ? `${GET_API}/search-property.php${searchQuery}` : `${GET_API}/search-property.php`

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

    const ViewProperty = (PID) => {
        navigate(`/view-property?pid=${PID}`);
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
        const params = new URLSearchParams(location.search);
        const allowedParams = ["page", "search", "ptype[]", "subtype[]"];
        const pageQuery = params.get("page");
        const searchQuery = params.get("search");
        const propertyType = params.getAll("ptype[]");
        const subPropertyType = params.getAll("subtype[]");


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

            params.append("ptype[]", propertyType);

            // Find all subtypes for selected property type
            let aps = groupedOptions.filter((item) => propertyType.includes(item.label));
            let allSubtypes = aps.flatMap((item) => item.options.map((opt) => opt.value));

            if (subPropertyType.length === allSubtypes.length) {
                setSelectedValues(allSubtypes);
            } else if (subPropertyType.length > 0) {
                setSelectedValues(subPropertyType);
                params.append("subtype[]", subPropertyType);
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
                                        <input type="checkbox" checked={showMap} onChange={() => { setShowMap(!showMap); window.localStorage.setItem("showMap", !showMap) }} />
                                    </div>
                                </div>
                                {/* xxxxxxxxxx Advance Filter xxxxxxxxxx */}
                                <div className="modal modal-account fade" id="searchAdvanced">
                                    <div className="modal-dialog modal-dialog-centered custom-modal-width">
                                        <div className="modal-content">
                                            <span
                                                className="close-modal icon-close2 mx-3 mt-2"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></span>
                                            <div className="filter-grid">
                                                <div
                                                    className="filter-group p-3"
                                                    style={{ background: "#F6F6F6" }}
                                                >
                                                    <h4>Location(s)</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="City, State, County, Zip Code"
                                                    />
                                                    <input type="text" value="House Springs, MO" />
                                                    <h4>Keywords</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Ex: New construction or three-story"
                                                    />
                                                    <h4>Property Type(s)</h4>
                                                    <div className="checkbox-group">
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb1"
                                                                checked
                                                            />
                                                            <label for="cb1" className="text-cb-amenities">
                                                                All
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb2"
                                                            />
                                                            <label for="cb2" className="text-cb-amenities">
                                                                Retail
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb3"
                                                            />
                                                            <label for="cb3" className="text-cb-amenities">
                                                                Multifamily
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb4"
                                                            />
                                                            <label for="cb4" className="text-cb-amenities">
                                                                Office
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb5"
                                                            />
                                                            <label for="cb5" className="text-cb-amenities">
                                                                Industrial
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb6"
                                                            />
                                                            <label for="cb6" className="text-cb-amenities">
                                                                Hospitality
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb7"
                                                            />
                                                            <label for="cb7" className="text-cb-amenities">
                                                                Mixed Use
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb8"
                                                            />
                                                            <label for="cb8" className="text-cb-amenities">
                                                                Land
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb9"
                                                            />
                                                            <label for="cb9" className="text-cb-amenities">
                                                                Self Storage
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb10"
                                                            />
                                                            <label for="cb10" className="text-cb-amenities">
                                                                Mobile Home Park
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb11"
                                                            />
                                                            <label for="cb11" className="text-cb-amenities">
                                                                Senior Living
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb12"
                                                            />
                                                            <label for="cb12" className="text-cb-amenities">
                                                                Special Purpose
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb13"
                                                            />
                                                            <label for="cb13" className="text-cb-amenities">
                                                                Note/Loan
                                                            </label>
                                                        </fieldset>
                                                        <fieldset className="d-flex">
                                                            <input
                                                                type="checkbox"
                                                                className="tf-checkbox style-1"
                                                                id="cb14"
                                                            />
                                                            <label for="cb14" className="text-cb-amenities">
                                                                Business for Sale
                                                            </label>
                                                        </fieldset>

                                                        <h4 className="mt-3">Asking Price</h4>
                                                        <div className="range-group">
                                                            <div>

                                                                Min Price($)


                                                                <input
                                                                    type="text"
                                                                    placeholder="Min Price"
                                                                    value={minPrice}
                                                                    onChange={handleMinPriceChange}
                                                                />
                                                            </div>
                                                            <div>
                                                                Max Price($)
                                                                <input
                                                                    type="text"
                                                                    placeholder="Max Price"
                                                                    value={maxPrice}
                                                                    onChange={handleMaxPriceChange}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="slider-container">
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={minPrice}
                                                                onChange={handleMinPriceChange}
                                                                className={`thumb thumb-left ${activeThumb === "min" ? "active" : ""
                                                                    }`}
                                                            />
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={maxPrice}
                                                                onChange={handleMaxPriceChange}
                                                                className={`thumb thumb-right ${activeThumb === "max" ? "active" : ""
                                                                    }`}
                                                            />

                                                            <div className="slider">
                                                                <div className="track" />
                                                                <div
                                                                    className="range"
                                                                    style={{
                                                                        left: `${minPrice}%`,
                                                                        width: `${maxPrice - minPrice}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <h4 className="mt-3">Cap Rate</h4>
                                                        <div className="range-group">
                                                            <input
                                                                type="text"
                                                                placeholder="Min %"
                                                                value={minCap}
                                                                onChange={handleMinCapChange}
                                                            />
                                                            <input
                                                                type="text"
                                                                placeholder="Max %"
                                                                value={maxCap}
                                                                onChange={handleMaxCapChange}
                                                            />
                                                        </div>

                                                        <div className="slider-container">
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={minCap}
                                                                onChange={handleMinCapChange}
                                                                className={`thumb thumb-left ${activeThumb === "min" ? "active" : ""
                                                                    }`}
                                                            />
                                                            <input
                                                                type="range"
                                                                min="0"
                                                                max="100"
                                                                value={maxCap}
                                                                onChange={handleMaxCapChange}
                                                                className={`thumb thumb-right ${activeThumb === "max" ? "active" : ""
                                                                    }`}
                                                            />

                                                            <div className="slider">
                                                                <div className="track" />
                                                                <div
                                                                    className="range"
                                                                    style={{
                                                                        left: `${minCap}%`,
                                                                        width: `${maxCap - minCap}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="filter-group p-3">
                                                    <h4>Building Name / Project Name</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Builidng name / project name"
                                                        name="buildingName"
                                                        value={formData.buildingName}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Year Built / Renovated</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Year Built / Renovated"
                                                        name="yearBuilt"
                                                        value={formData.yearBuilt}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Lot Size</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Acres/Sq Ft)"
                                                        name="lotSize"
                                                        value={formData.lotSize}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Building Size</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Sq Ft)"
                                                        name="buildingSize"
                                                        value={formData.buildingSize}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Number of Floors</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Number of floors"
                                                        name="floors"
                                                        value={formData.floors}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Parking Spaces / Ratio</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Parking Spaces"
                                                        name="parkingSpaces"
                                                        value={formData.parkingSpaces}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Remaining Term</h4>
                                                    <div className="range-group">
                                                        <input
                                                            type="number"
                                                            placeholder="Min Years"
                                                            name="minYear"
                                                            value={minYear}
                                                            onChange={handleMinYearChange}
                                                        />
                                                        <input
                                                            type="number"
                                                            placeholder="Max Years"
                                                            name="maxYear"
                                                            value={maxYear}
                                                            onChange={handleMaxYearChange}
                                                        />
                                                    </div>

                                                    <div className="slider-container">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={minYear}
                                                            onChange={handleMinYearChange}
                                                            className={`thumb thumb-left ${activeThumb === "min" ? "active" : ""
                                                                }`}
                                                        />
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={maxYear}
                                                            onChange={handleMaxYearChange}
                                                            className={`thumb thumb-right ${activeThumb === "max" ? "active" : ""
                                                                }`}
                                                        />

                                                        <div className="slider">
                                                            <div className="track" />
                                                            <div
                                                                className="range"
                                                                style={{
                                                                    left: `${minYear}%`,
                                                                    width: `${maxYear - minYear}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <h4>Broker/Agent</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Ex: Glen Kunofsky"
                                                        name="broker"
                                                        value={formData.broker}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Zoning</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Zoning"
                                                        name="zoning"
                                                        value={formData.zoning}
                                                        onChange={handleChange}
                                                    />

                                                    <h4>Tenancy</h4>
                                                    <div className="btn-group">
                                                        {["Net", "MNN", "Multi"].map((val) => {
                                                            const isSelected = formData.tenancy?.includes(val);
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={val}
                                                                    onClick={() => handleTenancyClick(val)}
                                                                    className={`btn ${isSelected
                                                                        ? "btn-primary"
                                                                        : "btn-outline-primary"
                                                                        }`}
                                                                    style={{
                                                                        backgroundColor: isSelected ? "#0d6efd" : "",
                                                                        color: isSelected ? "#fff" : "#acacacff",
                                                                        borderColor: "#b9b9b9ff",
                                                                        margin: 2,
                                                                        borderRadius: "5px",
                                                                    }}
                                                                >
                                                                    {val}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <h4 className="mt-2">Lease Type</h4>
                                                    <div className="btn-group">
                                                        {[
                                                            "NNN",
                                                            "Gross",
                                                            "Modified Gross",

                                                        ].map((val) => {
                                                            const isSelected = formData.LeaseType?.includes(val);
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={val}
                                                                    onClick={() => handleLeaseTypeClick(val)}
                                                                    className={`btn ${isSelected
                                                                        ? "btn-primary"
                                                                        : "btn-outline-primary"
                                                                        }`}
                                                                    style={{
                                                                        backgroundColor: isSelected ? "#0d6efd" : "",
                                                                        color: isSelected ? "#fff" : "#acacacff",
                                                                        borderColor: "#b9b9b9ff",
                                                                        margin: 2,
                                                                        borderRadius: "5px",
                                                                    }}
                                                                >
                                                                    {val}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {/* <h4>Unit Measurements</h4>

                      <div
                        className="tab-container"
                        style={{ display: "flex", gap: "12px" }}
                      >
                        {tabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => {
                              handleTabClick(tab);
                            }}
                            className={`p-2 tab ${
                              unitTab === tab ? "active" : ""
                            }`}
                            style={{
                              padding: "8px 16px",
                              borderRadius: "6px",
                              border: "1px solid #ccc",
                              background: unitTab === tab ? "#007bff" : "#fff",
                              color: unitTab === tab ? "#fff" : "#000",
                              cursor: "pointer",
                            }}
                          >
                            {tab}
                          </button>
                        ))}
                      </div> */}

                                                    {/* {"unitTab" && (
                        <div
                          style={{
                            marginTop: "20px",
                            display: "flex",
                            gap: "10px",
                          }}
                          className="align-items-center"
                        >
                          <input
                            type="number"
                            name="min"
                            value={formData.min}
                            onChange={handleChange}
                            placeholder={`Min ${unitTab.toLowerCase()}`}
                            style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "6px",
                            }}
                          />
                          -
                          <input
                            type="number"
                            name="max"
                            value={formData.max}
                            onChange={handleChange}
                            placeholder={`Max ${unitTab.toLowerCase()}`}
                            style={{
                              padding: "8px",
                              border: "1px solid #ccc",
                              borderRadius: "6px",
                            }}
                          />
                        </div>
                      )} */}
                                                </div>

                                                <div className="filter-group p-3">
                                                    <h4>Additional Property Details</h4>
                                                    <div className="range-group">
                                                        <input
                                                            type="text"
                                                            placeholder="Min SF"
                                                            name="minSF"
                                                            value={formData.minSF}
                                                            onChange={handleChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Max SF"
                                                            name="maxSF"
                                                            value={formData.maxSF}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="range-group">
                                                        <input
                                                            type="text"
                                                            placeholder="Min $ / SF"
                                                            name="minDoller"
                                                            value={formData.minDoller}
                                                            onChange={handleChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Max $ / SF"
                                                            name="maxDoller"
                                                            value={formData.maxDoller}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="range-group">
                                                        <input
                                                            type="text"
                                                            placeholder="Min acres"
                                                            name="minAcres"
                                                            value={formData.minAcres}
                                                            onChange={handleChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Max acres"
                                                            name="maxAcres"
                                                            value={formData.maxAcres}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <h4>Tenant Credit</h4>
                                                    <div className="btn-group">
                                                        {[
                                                            "Credit Rated",
                                                            "Corporate Guarantee",
                                                            "Franchisee",
                                                            "No Credit Rating",
                                                        ].map((val) => {
                                                            const isSelected =
                                                                formData.tenantCredit?.includes(val);
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={val}
                                                                    onClick={() => handleTenantCreditClick(val)}
                                                                    className={`btn ${isSelected
                                                                        ? "btn-primary"
                                                                        : "btn-outline-primary"
                                                                        }`}
                                                                    style={{
                                                                        backgroundColor: isSelected ? "#0d6efd" : "",
                                                                        color: isSelected ? "#fff" : "#acacacff",
                                                                        borderColor: "#b9b9b9ff",
                                                                        margin: 2,
                                                                        borderRadius: "5px",
                                                                    }}
                                                                >
                                                                    {val}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>

                                                    <h4 className="mt-3">Occupancy</h4>
                                                    <div className="range-group">
                                                        <input
                                                            type="text"
                                                            placeholder="Min %"
                                                            value={minValue}
                                                            onChange={handleMinChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Max %"
                                                            value={maxValue}
                                                            onChange={handleMaxChange}
                                                        />
                                                    </div>

                                                    <div className="slider-container">
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={minValue}
                                                            onChange={handleMinChange}
                                                            className={`thumb thumb-left ${activeThumb === "min" ? "active" : ""
                                                                }`}
                                                        />
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="100"
                                                            value={maxValue}
                                                            onChange={handleMaxChange}
                                                            className={`thumb thumb-right ${activeThumb === "max" ? "active" : ""
                                                                }`}
                                                        />

                                                        <div className="slider">
                                                            <div className="track" />
                                                            <div
                                                                className="range"
                                                                style={{
                                                                    left: `${minValue}%`,
                                                                    width: `${maxValue - minValue}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div>
                                                        <h4 className="mt-3">Sale Condition</h4>
                                                        <select
                                                            className="dropdown-list mt-2"
                                                            name="saleCond"
                                                            value={formData.saleCond}
                                                            onChange={handleChange}
                                                            style={{
                                                                fontSize: "14px",
                                                                color: "#000000ff",
                                                            }}
                                                        >
                                                            {[
                                                                "For sale",
                                                                "Lease",
                                                                "Built to suit",
                                                                "Ground lease",
                                                            ].map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                    className="text-dark"
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <h4 className="mt-3">Ownership Type</h4>
                                                        <select
                                                            className="dropdown-list mt-2"
                                                            name="ownershipType"
                                                            value={formData.ownershipType}
                                                            onChange={handleChange}
                                                            style={{
                                                                fontSize: "14px",
                                                                color: "#000000ff",
                                                            }}
                                                        >
                                                            {[
                                                                "Fee simple",
                                                                "Leasehold",
                                                                "Condo",

                                                            ].map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                    className="text-dark"
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <h4 className="mt-3">Traffic Count</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Traffic Count"
                                                        name="trafficCount"
                                                        value={formData.trafficCount}
                                                        onChange={handleChange}
                                                    />
                                                    <h4 className="mt-3">Proximity to Highways / Transit</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Proximity to Highways / Transit"
                                                        name="highways"
                                                        value={formData.highways}
                                                        onChange={handleChange}
                                                    />
                                                    <h4 className="mt-3">Nearby Businesses / Anchors</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Nearby Businesses / Anchors"
                                                        name="nearbyBusinesses"
                                                        value={formData.nearbyBusinesses}
                                                        onChange={handleChange}
                                                    />
                                                    <h4 className="mt-3">Walk Score / Transit Score</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Walk Score / Transit Score"
                                                        name="walkScore"
                                                        value={formData.walkScore}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <div className="filter-group p-3">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h4> Property Features </h4>
                                                    </div>

                                                    <h4>Ceiling Height (Industrial)</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Ceiling Height (Industrial)"
                                                        name="ceilingHeight"
                                                        value={formData.ceilingHeight}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>Loading Docks / Drive-ins</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Loading Docks / Drive-ins"
                                                        name="loadingDocks"
                                                        value={formData.loadingDocks}
                                                        onChange={handleChange}
                                                    />
                                                    <h4>HVAC / Sprinkler System</h4>
                                                    <input
                                                        type="text"
                                                        placeholder="HVAC / Sprinkler System"
                                                        name="hvac"
                                                        value={formData.hvac}
                                                        onChange={handleChange}
                                                    />
                                                    <div>
                                                        <h4 className="mt-3">Utilities</h4>
                                                        <select
                                                            className="dropdown-list mt-2"
                                                            name="utilities"
                                                            value={formData.utilities}
                                                            onChange={handleChange}
                                                            style={{
                                                                fontSize: "14px",
                                                                color: "#000000ff",
                                                            }}
                                                        >
                                                            {[
                                                                "Water",
                                                                "Gas",
                                                                "Sewer",
                                                                "Electricity",
                                                            ].map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                    className="text-dark"
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <h4 className="mt-3">Elevator</h4>
                                                        <select
                                                            className="dropdown-list mt-2"
                                                            name="elevator"
                                                            value={formData.elevator}
                                                            onChange={handleChange}
                                                            style={{
                                                                fontSize: "14px",
                                                                color: "#000000ff",
                                                            }}
                                                        >
                                                            {[
                                                                "Yes",
                                                                "No",
                                                            ].map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                    className="text-dark"
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <h4 className="mt-3">Accessibility / ADA Compliant</h4>
                                                        <select
                                                            className="dropdown-list mt-2"
                                                            name="accessibility"
                                                            value={formData.accessibility}
                                                            onChange={handleChange}
                                                            style={{
                                                                fontSize: "14px",
                                                                color: "#000000ff",
                                                            }}
                                                        >
                                                            {[
                                                                "Yes",
                                                                "No",
                                                            ].map((item) => (
                                                                <option
                                                                    key={item}
                                                                    value={item}
                                                                    className="text-dark"
                                                                >
                                                                    {item}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <h4 className="mt-3">Class</h4>
                                                    <div
                                                        className="btn-group"
                                                        role="group"
                                                        aria-label="Class"
                                                    >
                                                        {["A", "B", "C", "D"].map((val) => {
                                                            const isSelected = formData.class?.includes(val);
                                                            return (
                                                                <button
                                                                    type="button"
                                                                    key={val}
                                                                    onClick={() => handleClassClick(val)}
                                                                    className={`btn ${isSelected
                                                                        ? "btn-primary"
                                                                        : "btn-outline-primary"
                                                                        }`}
                                                                    style={{
                                                                        backgroundColor: isSelected ? "#0d6efd" : "",
                                                                        color: isSelected ? "#fff" : "#acacacff",
                                                                        borderColor: "#b9b9b9ff",
                                                                        margin: 2,
                                                                        borderRadius: "5px",
                                                                    }}
                                                                >
                                                                    {val}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    <h4 className=""> Financial / Tenancy Information </h4>
                                                    <h4> Number of Tenants </h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Number of Tenants"
                                                        name="numberTenants"
                                                        value={formData.numberTenants}
                                                        onChange={handleChange}
                                                    />
                                                    <h4> Lease Expiration(s) </h4>
                                                    <input
                                                        type="text"
                                                        placeholder="Lease Expiration(s)"
                                                        name="leaseExp"
                                                        value={formData.leaseExp}
                                                        onChange={handleChange}
                                                    />
                                                    <h4> NOI (Net Operating Income) </h4>
                                                    <input
                                                        type="text"
                                                        placeholder="NOI (Net Operating Income) "
                                                        name="noi"
                                                        value={formData.noi}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="position-relative mt-3">
                                                <button
                                                    className="tf-btn primary pointer-cursor position-absolute bottom-0 end-0 translate-middle"
                                                    style={{ width: "200px" }}
                                                    onClick={handleSubmit}
                                                >
                                                    add 999+ Listings
                                                </button>
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
