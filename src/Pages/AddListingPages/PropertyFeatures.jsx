import React, { useState, useEffect } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { swalMsg } from '../../Components/SweetAlert2';
import axios from 'axios';
import { GET_API, POST_API } from '../../Auth/Define';
import { useLocation, useNavigate } from 'react-router-dom';
import { sideMenu } from "./PropertyDetails"


const PropertyFeatures = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { PID } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        building_class: "A",
        ceiling_height: "",
        loading_docks_drive: "",
        hvac_sprinkler: "",
        utility: "",
        elevator: "Choose",
        accessibility_ada: "Choose",
    })

    const [checkList, setCheckList] = useState({
        status1: 0,
        status2: 0,
        status3: 0,
        status4: 0,
        status5: 0,
        status6: 0,
        status7: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //

    const [updateId, setUpdateID] = useState(null);
    const [updatePid, setUpdatePid] = useState(null);

    const getPropertyFeatures = (getPID) => {
        const formData = new FormData();
        formData.append("pid", getPID);
        axios.post(`${GET_API}/property-features.php`, formData)
            .then(resp => {
                console.log(resp.data);

                if (resp.data.status === 100) {
                    const Value = resp.data.value;
                    // console.log("API Response:", resp.data.value);
                    setUpdateID(Value.id);

                    setFormData({
                        building_class: Value.building_class,
                        ceiling_height: Value.ceiling_height,
                        loading_docks_drive: Value.loading_docks,
                        hvac_sprinkler: Value.hvac,
                        utility: Value.utilities,
                        elevator: Value.elevator,
                        accessibility_ada: Value.accessibility,
                    })
                } else {
                    console.log("No Existing Data:", resp.data);
                }
            })

    }

    const completedList = (getPID) => {
        const listData = new FormData();
        listData.append("pid", getPID);
        axios.post(`${GET_API}/complete-list.php`, listData).then(resp => {
            setCheckList(resp.data);
        })
    }

    useEffect(() => {
        if (!PID) {
            window.history.back();
        } else {
            getPropertyFeatures(PID);
            completedList(PID);
            setUpdatePid(PID);
        }

    }, [location]);


    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


    const handleSubmit = () => {
        if (isLoading) return;
        setIsLoading(true);
        const descData = new FormData();

        if (!updateId) {
            descData.append("pid", updatePid);
        } else {
            descData.append("id", updateId);
        }

        descData.append("building_class", formData.building_class);
        descData.append("ceiling_height", formData.ceiling_height);
        descData.append("loading_docks", formData.loading_docks_drive);
        descData.append("hvac", formData.hvac_sprinkler);
        descData.append("utilities", formData.utility);
        descData.append("elevator", formData.elevator);
        descData.append("accessibility", formData.accessibility_ada);
        axios.post(`${POST_API}/property-features.php`, descData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {

                    if (!updateId) {
                        navigate("/location-highlights", { state: { PID: jsonData.pid } });
                    } else {
                        navigate("/location-highlights", { state: { PID: updatePid } });
                    }

                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
            setIsLoading(false);
        })
    }

      const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="layout-wrap">
   <div className="sidebar-menu-dashboard" id={`add-listing-sidemenu${showSidebar ? "-open" : ""}`}>  {/* d-flex shadow  */}
                <div className="menu-box">
                    {/* <div className="title fw-6">Menu</div> */}
                    <ul className="box-menu-dashboard">
                        {
                            sideMenu.map((item, index) => {

                                const statusKey = `status${item.id}`;

                                const statusValue = Number(checkList[statusKey]);

                                const isCompleted = statusValue === item.id;

                                return (
                                    <li className={`nav-menu-item ${location.pathname === item.path ? 'active' : ''}`} key={index}>
                                        <a className="d-flex justify-content-between align-items-center nav-menu-link">
                                            <span>{index + 1}. {" "} {item.title}</span>
                                            <span
                                                className="material-symbols-outlined"
                                                style={{
                                                    fontSize: "40px",
                                                    color: !isCompleted ? "#ccc" : "green",
                                                }}
                                            >
                                                check_circle
                                            </span>
                                        </a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>

            <div className="main-content">
                <div className="main-content-inner">
                  <div class="button-show-hide show-mb w-100 text-right" onClick={() => setShowSidebar(!showSidebar)}>
                <a className="btn-dark p-2">{showSidebar ? "Hide" : "Show"} Sidebar</a>
          </div>
                    <div className="widget-box-2 mb-20 shadow">
                        <h5 className="title d-flex justify-content-between align-items-center">
                            <div>
                                Description
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>
                                    <a className="btn-dark d-flex align-items-center gap-1" onClick={() => navigate("/transaction-details", { state: { PID: PID } })}>
                                       <span class="material-symbols-outlined">
                        chevron_backward
                      </span>
                                        <div className='text'>Previous</div>

                                    </a>
                                </div>
                                <div>
                                    {
                                 Number(checkList.status3) === 3 &&
                                        <a className="btn-secondary d-flex align-items-center gap-1" onClick={() => navigate("/location-highlights", { state: { PID: PID } })}>
                                            <div className='text'>Next</div>
                                            <span class="material-symbols-outlined">
                        chevron_forward
                      </span>
                                        </a>
                                    }
                                </div>
                            </div>
                        </h5>
                        <hr />

                        <div className="box grid-3 gap-30 mt-30">
                            <fieldset className="box-fieldset">
                                <label>Building Class</label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{`${formData.building_class !== "" ? formData.building_class : "Choose"}`}</span>
                                    <ul className="list">
                                        {
                                            BuildingClassOption.map((item, index) => {
                                                return (
                                                    <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, building_class: item.title })}>
                                                        {item.title}
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Ceiling Height<span className='text-danger'>(Industrial)</span>:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="ceiling_height"
                                    value={formData.ceiling_height}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Loading Docks / Drive-ins:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="loading_docks_drive"
                                    value={formData.loading_docks_drive}
                                    onChange={handleChange}
                                />
                            </fieldset>
                        </div>

                        <div className="box grid-3 gap-30 mt-30">

                            <fieldset className="box-fieldset">
                                <label>
                                    HVAC / Sprinkler System:<span className='text-danger'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name='hvac_sprinkler'
                                    value={formData.hvac_sprinkler}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>
                                    Utilities	(Water, Gas, Sewer, Electricity):<span className='text-danger'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name='utility'
                                    value={formData.utility}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Elevator</label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{formData.elevator}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className="option" onClick={() => setFormData({ ...formData, elevator: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className="option" onClick={() => setFormData({ ...formData, elevator: "No" })}>
                                            No
                                        </li>

                                    </ul>
                                </div>
                            </fieldset>
                        </div>

                        <div className="box grid-3 gap-30">

                            <fieldset className="box box-fieldset">
                                <label>Accessibility /ADA Compliant</label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{formData.accessibility_ada}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className="option" onClick={() => setFormData({ ...formData, accessibility_ada: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className="option" onClick={() => setFormData({ ...formData, accessibility_ada: "No" })}>
                                            No
                                        </li>

                                    </ul>
                                </div>
                            </fieldset>
                        </div>

                        <div className="box-btn" style={{ marginTop: "60px" }}>

                            <a className="tf-btn dark" onClick={handleSubmit}>Submit</a>

                        </div>

                    </div>

                    {
                        isLoading &&
                        <div className="loading">
                            <div className="loader-wrapper">
                                <div className="circle"></div>
                                <i class="icon-pass icon-home icon-center"></i>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>

    )
}

export default PropertyFeatures;


const BuildingClassOption = [
    { title: "A" },
    { title: "B" },
    { title: "C" },
]