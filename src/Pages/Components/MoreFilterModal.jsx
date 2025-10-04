import React, { useState, useEffect, useRef } from 'react'
import InlineSelectOption from '../../Components/MultiCheckBox/InlineSelectOption';
import { groupedOptions } from '../Search';
import { useLocation, useNavigate } from 'react-router-dom';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import axios from 'axios';
import { GET_API } from '../../Auth/Define';

const MoreFilterModal = ({ selectedValues, setSelectedValues, handlePropertyTypes }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const applyPropertyTypes = useRef();
    const [moreFilters, setMoreFilters] = useState({
        search_input: "",
        price_min: 0,
        price_max: 10000000,
        cap_min: 0,
        cap_max: 100,
        zoning: "",
        sale_condition: "",
        ownership_type: "",
        lt_nnn: false,
        lt_gross: false,
        lt_gross_modified: false,
        occup_min: 0,
        occup_max: 100,
        num_tenants: "",
        num_floors: "",
        class_a: false,
        class_b: false,
        class_c: false,
        hvac: false,
        sprinkler: false,
        water: false,
        gas: false,
        sewer: false,
        electricity: false,
        elevator: false,
        broker: ""
    });

    const [isTypingBrokerPost, setIsTypingBrokerPost] = useState(false);
    const [brokerList, setBrokerList] = useState([]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMoreFilters({ ...moreFilters, [name]: value });
    }

    // xxxx More Filters xxxxxxx //


    const getBroker = () => {
        const formData = new FormData();
        formData.append("bname", moreFilters.broker);

        axios.post(`${GET_API}/get-broker.php`, formData).then(resp => {
            // console.log(resp.data);
            if (resp.data.status === 100) {
                console.log(resp.data.value);
                setBrokerList(resp.data.value);
            }
        })
    }


    useEffect(() => {

        if (moreFilters.broker !== "") {
            getBroker();
        } else {
            setBrokerList([]);
        }

    }, [moreFilters.broker])


    // xxxx More Filters xxxxxxx //



    const handleSubmit = () => {
        // For Property Types
        applyPropertyTypes.current.applySelection();

        const params = new URLSearchParams(location.search);

        if (moreFilters.search_input.trim() !== "") {
            params.set("search_filter", moreFilters.search_input.trim());
        } else {
            params.delete("search_filter");
        }

        if (moreFilters.price_min !== 0) {
            params.set("price_min", moreFilters.price_min);
            params.set("price_max", moreFilters.price_max);
        } else {
            params.delete("price_min");
            params.delete("price_max");
        }

        if (moreFilters.cap_min !== 0) {
            params.set("cap_min", moreFilters.cap_min);
            params.set("cap_max", moreFilters.cap_max);
        } else {
            params.delete("cap_min");
            params.delete("cap_max");
        }

        if (moreFilters.sale_condition.trim() !== "") {
            params.set("sale_condition", moreFilters.sale_condition);
        } else {
            params.delete("sale_condition");
        }

        if (moreFilters.ownership_type.trim() !== "") {
            params.set("ownership_type", moreFilters.ownership_type);
        } else {
            params.delete("ownership_type");
        }


        if (moreFilters.occup_min !== 0) {
            params.set("occupancy_min", moreFilters.occup_min);
            params.set("occupancy_max", moreFilters.occup_max);
        } else {
            params.delete("occupancy_min");
            params.delete("occupancy_max");
        }

        if (moreFilters.num_tenants.trim() !== "") {
            params.set("num_tenants", moreFilters.num_tenants);
        } else {
            params.delete("num_tenants");
        }

        if (moreFilters.zoning.trim() !== "") {
            params.set("zoning", moreFilters.zoning);
        } else {
            params.delete("zoning");
        }

        if (moreFilters.num_floors.trim() !== "") {
            params.set("number_floore", moreFilters.num_floors);
        } else {
            params.delete("number_floore");
        }

        // Lease Type
        const leaseArr = [];

        if (moreFilters.lt_nnn) leaseArr.push("NNN");
        if (moreFilters.lt_gross) leaseArr.push("Gross");
        if (moreFilters.lt_gross_modified) leaseArr.push("Gross Modified");

        const lease_type = leaseArr.join(",");

        if (lease_type) {
            params.set("lease_type", lease_type);
        } else {
            params.delete("lease_type");
        }
        // Lease Type

        // Building Class
        const classArr = [];

        if (moreFilters.class_a) classArr.push("A");
        if (moreFilters.class_b) classArr.push("B");
        if (moreFilters.class_c) classArr.push("C");

        const class_type = classArr.join(",");


        if (class_type) {
            params.set("building_class", class_type);
        } else {
            params.delete("building_class");
        }

        // Building Class

        if (moreFilters.hvac) {
            params.set("hvac", "Yes");
        } else {
            params.delete("hvac");
        }

        if (moreFilters.sprinkler) {
            params.set("sprinkler", "Yes");
        } else {
            params.delete("sprinkler");
        }

        if (moreFilters.water) {
            params.set("water", "Yes");
        } else {
            params.delete("water");
        }

        if (moreFilters.gas) {
            params.set("gas", "Yes");
        } else {
            params.delete("gas");
        }

        if (moreFilters.sewer) {
            params.set("sewer", "Yes");
        } else {
            params.delete("sewer");
        }

        if (moreFilters.electricity) {
            params.set("electricity", "Yes");
        } else {
            params.delete("electricity");
        }

        if (moreFilters.elevator) {
            params.set("elevator", "Yes");
        } else {
            params.delete("elevator");
        }

        if (moreFilters.broker && isTypingBrokerPost) {
            params.set("agent_name", moreFilters.broker);
        } else {
            params.delete("agent_name");
        }

        // XXXXXXXXXXXXXXXXXXXXXXXXX //

        navigate(`?${params.toString()}`);


    }

    useEffect(() => {

        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("search_filter");
        const price_min = params.get("price_min");
        const price_max = params.get("price_max");
        const cap_min = params.get("cap_min");
        const cap_max = params.get("cap_max");
        const zoning = params.get("zoning");
        const num_tenants = params.get("num_tenants");
        const agent_name = params.get("agent_name");
        const lease_type = params.get("lease_type");
        const building_class = params.get("building_class");
        const occupancy_min = Number(params.get("occupancy_min"));
        const occupancy_max = Number(params.get("occupancy_max"));
        const sale_condition = params.get("sale_condition");
        const ownership_type = params.get("ownership_type");
        const hvac = params.get("hvac");
        const sprinkler = params.get("sprinkler");
        const water = params.get("water");
        const gas = params.get("gas");
        const sewer = params.get("sewer");
        const electricity = params.get("electricity");
        const elevator = params.get("elevator");
        const number_floore = params.get("number_floore");


        // Handle search
        if (searchQuery) {
            params.set("search_filter", searchQuery);
            setMoreFilters((prev) => ({ ...prev, search_input: searchQuery }));
        }

        if (price_min) {
            params.set("price_min", price_min);
            params.set("price_max", price_max);

            setMoreFilters((prev) => ({ ...prev, price_min: price_min, price_max: price_max }));
        }

        if (cap_min) {
            params.set("price_min", cap_min);
            params.set("price_max", cap_max);

            setMoreFilters((prev) => ({ ...prev, cap_min: cap_min, cap_max: cap_max }));
        }

        if (zoning) {
            params.set("zoning", zoning);
            setMoreFilters((prev) => ({ ...prev, zoning: zoning }));
        }

        if (num_tenants) {
            params.set("num_tenants", num_tenants);
            setMoreFilters((prev) => ({ ...prev, num_tenants: num_tenants }));
        }

        if (agent_name) {
            params.set("agent_name", agent_name);
            setMoreFilters((prev) => ({ ...prev, broker: agent_name }));
        }


        if (lease_type) {
            params.set("lease_type", lease_type.split(","));
            setMoreFilters((prev) => ({
                ...prev,
                lt_nnn: lease_type.includes("NNN"),
                lt_gross: lease_type.includes("Gross"),
                lt_gross_modified: lease_type.includes("Gross Modified"),
            }));
        }

        if (building_class) {
            params.set("building_class", building_class.split(","));
            setMoreFilters((prev) => ({
                ...prev,
                class_a: building_class.includes("A"),
                class_b: building_class.includes("B"),
                class_c: building_class.includes("C"),
            }));
        }


        if (occupancy_min) {

            params.set("occupancy_min", occupancy_min);
            params.set("occupancy_max", occupancy_max);
            setMoreFilters(prev => ({ ...prev, occup_min: occupancy_min, occup_max: occupancy_max }));
        }

        if (sale_condition) {
            params.set("sale_condition", sale_condition);
            setMoreFilters(prev => ({ ...prev, sale_condition }));
        }

        if (ownership_type) {
            params.set("ownership_type", ownership_type);
            setMoreFilters(prev => ({ ...prev, ownership_type }));
        }

        if (hvac) {
            params.set("hvac", hvac);
            setMoreFilters(prev => ({ ...prev, hvac }));
        }

        if (sprinkler) {
            params.set("sprinkler", sprinkler);
            setMoreFilters(prev => ({ ...prev, sprinkler }));
        }

        if (water) {
            params.set("water", water);
            setMoreFilters(prev => ({ ...prev, water }));
        }

        if (gas) {
            params.set("gas", gas);
            setMoreFilters(prev => ({ ...prev, gas }));
        }

        if (sewer) {
            params.set("sewer", sewer);
            setMoreFilters(prev => ({ ...prev, sewer }));
        }

        if (electricity) {
            params.set("electricity", electricity);
            setMoreFilters(prev => ({ ...prev, electricity }));
        }

        if (elevator) {
            params.set("elevator", elevator);
            setMoreFilters(prev => ({ ...prev, elevator }));
        }

        if (number_floore) {
            params.set("number_floore", number_floore);
            setMoreFilters(prev => ({ ...prev, num_floors: number_floore }));
        }


    }, [location.search]);


    return (
        <div className="modal modal-account fade" id="searchAdvanced">
            <style>
                {
                    `
        .range-slider .range-slider__thumb {
  width: 16px;
  height: 16px;
  border: 4px solid #0d6efd;
  background: #fff;
  box-shadow: 0 0 2px rgba(0,0,0,0.3);
}


.range-slider .range-slider__range,
.range-slider .range-slider__track {
  height: 6px;
}
        `
                }
            </style>
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
                            <h4 className='mb-0'>Search</h4>
                            <input
                                type="text"
                                placeholder="Search keywords here"
                                name='search_input'
                                value={moreFilters.search_input}
                                onChange={handleChange}
                            />
                            <h4 className='mb-0'>Property Type(s)</h4>
                            <div className="checkbox-group">
                                <fieldset className="d-flex">
                                    <InlineSelectOption
                                        ref={applyPropertyTypes}
                                        Options={groupedOptions}
                                        value={selectedValues}
                                        onChange={(children, parents) => {
                                            setSelectedValues(children);
                                            handlePropertyTypes(children, parents);
                                        }}
                                        onClear={() => setSelectedValues([])}
                                    />

                                </fieldset>

                                <h4 className="mt-3">Price</h4>
                                <div className="range-group">
                                    <div>
                                        Min Price ($)
                                        <input
                                            type="number"
                                            placeholder="Min Price"
                                            name="price_min"
                                            value={moreFilters.price_min}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        Max Price ($)
                                        <div>

                                            <input
                                                type="number"
                                                placeholder="Max Price"
                                                name="price_max"
                                                value={moreFilters.price_max}
                                                onChange={handleChange}
                                            />+
                                        </div>
                                    </div>



                                </div>


                                <div className="slider-container">
                                    <RangeSlider
                                        min={0}
                                        max={10000000}
                                        step={1000}
                                        value={[Number(moreFilters.price_min), Number(moreFilters.price_max)]}
                                        onInput={(values) =>
                                            setMoreFilters((prev) => ({
                                                ...prev,
                                                price_min: values[0],
                                                price_max: values[1],
                                            }))
                                        }
                                    />
                                </div>
                                <h4 className="mt-3">Cap Rate</h4>
                                <div className="range-group">
                                    <div>

                                        Max Price ($)
                                        <input
                                            type="text"
                                            placeholder="Min %"
                                            name='cap_min'
                                            value={moreFilters.cap_min}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>

                                        Max Price ($)
                                        <input
                                            type="text"
                                            placeholder="Max %"
                                            name='cap_max'
                                            value={moreFilters.cap_max}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="slider-container">
                                    <RangeSlider
                                        min={0}
                                        max={100}
                                        step={1}
                                        value={[Number(moreFilters.cap_min), Number(moreFilters.cap_max)]}
                                        onInput={(values) =>
                                            setMoreFilters((prev) => ({
                                                ...prev,
                                                cap_min: values[0],
                                                cap_max: values[1],
                                            }))
                                        }
                                    />
                                </div>
                            </div>
                            <h4>Zoning</h4>
                            <input
                                type="text"
                                placeholder="Zoning"
                                name="zoning"
                                value={moreFilters.zoning}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="filter-group p-3">




                            <h4>Number of Tenants</h4>
                            <input
                                type="text"
                                placeholder="Number of tenants"
                                name="num_tenants"
                                value={moreFilters.num_tenants}
                                onChange={handleChange}
                            />


                            <h4>Broker/Agent</h4>
                            <input
                                type="text"
                                placeholder="Broker name"
                                name="broker"
                                value={moreFilters.broker}
                                onChange={(e) => { setMoreFilters({ ...moreFilters, broker: e.target.value }); setIsTypingBrokerPost(false) }}
                            />

                            <div>
                                {
                                    brokerList.length > 0 &&
                                    brokerList.map((item, index) => {
                                        return (
                                            <div key={index} onClick={() => { setMoreFilters({ ...moreFilters, broker: item.agent_name }); setIsTypingBrokerPost(true); }}>{item.agent_name}</div>
                                        )
                                    })
                                }
                            </div>

                            <h4 className="mt-2">Lease Type</h4>
                            <div className="btn-group">

                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" name="NNN" id="NNN" checked={moreFilters.lt_nnn} onChange={() => setMoreFilters({ ...moreFilters, lt_nnn: !moreFilters.lt_nnn })} />
                                    <label htmlFor="NNN" className='mb-0 cursor-pointer'>NNN</label>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" name="Gross" id="Gross" checked={moreFilters.lt_gross} onChange={() => setMoreFilters({ ...moreFilters, lt_gross: !moreFilters.lt_gross })} />
                                    <label htmlFor="Gross" className='mb-0 cursor-pointer'>Gross</label>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" name="Gross Modified" id="Gross Modified" checked={moreFilters.lt_gross_modified} onChange={() => setMoreFilters({ ...moreFilters, lt_gross_modified: !moreFilters.lt_gross_modified })} />
                                    <label htmlFor="Gross Modified" className='mb-0 cursor-pointer'>Gross Modified</label>
                                </div>

                            </div>

                            <h4 className="mt-2">Building Class</h4>
                            <div className="btn-group">

                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" name="A" id="A" checked={moreFilters.class_a} onChange={() => setMoreFilters({ ...moreFilters, class_a: !moreFilters.class_a })} />
                                    <label htmlFor="A" className='mb-0 cursor-pointer'>A</label>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" name="B" id="B" checked={moreFilters.class_b} onChange={() => setMoreFilters({ ...moreFilters, class_b: !moreFilters.class_b })} />
                                    <label htmlFor="B" className='mb-0 cursor-pointer'>B</label>
                                </div>

                                <div className='d-flex align-items-center'>
                                    <input type="checkbox" name="C" id="C" checked={moreFilters.class_c} onChange={() => setMoreFilters({ ...moreFilters, class_c: !moreFilters.class_c })} />
                                    <label htmlFor="C" className='mb-0 cursor-pointer'>C</label>
                                </div>

                            </div>

                        </div>

                        <div className="filter-group p-3">
                            <h4 className="mt-3">Occupancy</h4>
                            <div className="range-group">
                                <div>

                                    Max Price ($)
                                    <input
                                        type="text"
                                        placeholder="Min %"
                                        name='occup_min'
                                        value={moreFilters.occup_min}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>

                                    Max Price ($)
                                    <input
                                        type="text"
                                        placeholder="Max %"
                                        name='occup_max'
                                        value={moreFilters.occup_max}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="slider-container">
                                <RangeSlider
                                    min={0}
                                    max={100}
                                    step={1}
                                    value={[Number(moreFilters.occup_min), Number(moreFilters.occup_max)]}
                                    onInput={(values) =>
                                        setMoreFilters((prev) => ({
                                            ...prev,
                                            occup_min: values[0],
                                            occup_max: values[1],
                                        }))
                                    }
                                />
                            </div>

                            <div>
                                <h4 className="mt-3">Sale Condition</h4>
                                <select
                                    className="dropdown-list mt-2"
                                    name="sale_condition"
                                    value={moreFilters.sale_condition}
                                    onChange={handleChange}
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000ff",
                                    }}
                                >
                                    <option className="text-dark" value="">
                                        Select an option
                                    </option>
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
                                    name="ownership_type"
                                    value={moreFilters.ownership_type}
                                    onChange={handleChange}
                                    style={{
                                        fontSize: "14px",
                                        color: "#000000ff",
                                    }}
                                >
                                    <option className="text-dark" value="">
                                        Select an option
                                    </option>
                                    {[
                                        "Fee simple",
                                        "Leasehold",
                                        "Condo",
                                        "Others",

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
                                <h4 className="mt-2">Utilities</h4>
                                <div className="d-flex flex-column">

                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="hvac" id="hvac" checked={moreFilters.hvac} onChange={() => setMoreFilters({ ...moreFilters, hvac: !moreFilters.hvac })} />
                                        <label htmlFor="hvac" className='mb-0 cursor-pointer'>HVAC</label>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="sprinkler" id="sprinkler" checked={moreFilters.sprinkler} onChange={() => setMoreFilters({ ...moreFilters, sprinkler: !moreFilters.sprinkler })} />
                                        <label htmlFor="sprinkler" className='mb-0 cursor-pointer'>Sprinkler</label>
                                    </div>




                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="water" id="water" checked={moreFilters.water} onChange={() => setMoreFilters({ ...moreFilters, water: !moreFilters.water })} />
                                        <label htmlFor="water" className='mb-0 cursor-pointer'>Water</label>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="gas" id="gas" checked={moreFilters.gas} onChange={() => setMoreFilters({ ...moreFilters, gas: !moreFilters.gas })} />
                                        <label htmlFor="gas" className='mb-0 cursor-pointer'>Gas</label>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="sewer" id="sewer" checked={moreFilters.sewer} onChange={() => setMoreFilters({ ...moreFilters, sewer: !moreFilters.sewer })} />
                                        <label htmlFor="sewer" className='mb-0 cursor-pointer'>Sewer</label>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="electricity" id="electricity" checked={moreFilters.electricity} onChange={() => setMoreFilters({ ...moreFilters, electricity: !moreFilters.electricity })} />
                                        <label htmlFor="electricity" className='mb-0 cursor-pointer'>Electricity</label>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                        <input type="checkbox" name="elevator" id="elevator" checked={moreFilters.elevator} onChange={() => setMoreFilters({ ...moreFilters, elevator: !moreFilters.elevator })} />
                                        <label htmlFor="elevator" className='mb-0 cursor-pointer'>Elevator</label>
                                    </div>

                                </div>
                            </div>



                        </div>

                        <div className="filter-group p-3">









                            <h4 className=""> Financial / Tenancy Information </h4>
                            <h4> Number of Floors </h4>
                            <input
                                type="text"
                                placeholder="Number of floors"
                                name="num_floors"
                                value={moreFilters.num_floors}
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
                            Show Listings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreFilterModal;