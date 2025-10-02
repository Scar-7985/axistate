import React, { useState, useEffect } from 'react'
import InlineSelectOption from '../../Components/MultiCheckBox/InlineSelectOption';
import { groupedOptions } from '../Search';

const MoreFilterModal = ({ selectedValues }) => {

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

    return (
        <div className="modal modal-account fade" id="searchAdvanced">
            <div className="modal-dialog modal-dialog-centered custom-modal-width">
                <div className="modal-content">
                    <span
                        className="close-modal icon-close2 mx-3 mt-2"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        id='close-more-filter'
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
                                    <InlineSelectOption
                                        Options={groupedOptions}
                                        value={selectedValues}
                                        onChange={(children, parents) => {
                                            setSelectedValues(children);
                                            handlePropertyTypes(children, parents);
                                        }}
                                        onClear={() => setSelectedValues([])}
                                    />

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
                            Show Listing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreFilterModal;