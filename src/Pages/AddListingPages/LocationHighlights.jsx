import React, { useState, useEffect } from 'react'
import { swalMsg } from '../../Components/SweetAlert2';
import axios from 'axios';
import { GET_API, POST_API } from '../../Auth/Define';
import { useLocation, useNavigate } from 'react-router-dom';
import { sideMenu } from "./PropertyDetails"

const LocationHighlights = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { PID } = location.state || {};
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        longitude: "",
        latitude: "",
        traffic_count: "",
        proximity_highway_transit: "No",
        proximity_distance: "",
        nearly_businesses_anchors: "",
        walk_score_transit_score: "",
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

    const getLocationHighlights = (currentPid) => {
        const formData = new FormData();
        formData.append("pid", currentPid);
        axios.post(`${GET_API}/location_highlights.php`, formData)
            .then(resp => {
                console.log(resp.data);

                if (resp.data.status === 100) {
                    const Value = resp.data.value;
                    // console.log("API Response:", resp.data.value);
                    setUpdateID(Value.id);

                    setFormData({
                        longitude: Value.longitude,
                        latitude: Value.latitude,
                        traffic_count: Value.traffic_count,
                        proximity_highway_transit: Value.transit,
                        proximity_distance: Value.proximity_distance,
                        nearly_businesses_anchors: Value.anchors,
                        walk_score_transit_score: Value.walk_score,
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
            getLocationHighlights(PID);
            completedList(PID);
            setUpdatePid(PID);
        }

    }, [location]);



    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


    const handleSubmit = () => {
        if (isLoading) return;
        const descData = new FormData();

        if (updateId) {
            descData.append("id", updateId);
        }
        descData.append("pid", PID);

        descData.append("longitude", formData.longitude);
        descData.append("latitude", formData.latitude);
        descData.append("traffic_count", formData.traffic_count);
        descData.append("transit", formData.proximity_highway_transit);
        descData.append("proximity_distance", formData.proximity_distance);
        descData.append("anchors", formData.nearly_businesses_anchors);
        descData.append("walk_score", formData.walk_score_transit_score);

        axios.post(`${POST_API}/location_highlights.php`, descData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {
                    if (!updateId) {
                        navigate("/financial-tenency", { state: { PID: jsonData.pid } });
                    } else {
                        navigate("/financial-tenency", { state: { PID: PID } });
                    }
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
        })
        setIsLoading(true);
    }

    const [locLoading, setLocLoading] = useState(false);

    const getLocation = () => {
        if (locLoading) return;
        setLocLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    setFormData({ ...formData, longitude: long, latitude: lat });
                    setLocLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocLoading(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLocLoading(false);
        }
    };



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
                    <div className="button-show-hide show-mb w-100 text-right" onClick={() => setShowSidebar(!showSidebar)}>
                        <a className="btn-dark p-2">{showSidebar ? "Hide" : "Show"} Sidebar</a>
                    </div>
                    <div className="widget-box-2 mb-20 shadow">
                        <h5 className="title d-flex justify-content-between align-item-center">
                            <div>
                                Location Highlights
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>
                                    <a className="btn-dark d-flex align-items-center gap-1" onClick={() => navigate("/property-features", { state: { PID: PID } })}>
                                        <span className="material-symbols-outlined">
                                            chevron_backward
                                        </span>
                                        <div className='text'>Previous</div>

                                    </a>
                                </div>
                                <div>
                                    {
                                        Number(checkList.status4) === 4 &&
                                        <a className="btn-secondary d-flex align-items-center gap-1" onClick={() => navigate("/financial-tenency", { state: { PID: PID } })}>
                                            <div className='text'>Next</div>
                                            <span className="material-symbols-outlined">
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
                                <label>Traffic Count:<span className='text-danger'>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="traffic_count"
                                    value={formData.traffic_count}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Proximity to Highways / Transit:<span className='text-danger'>*</span></label>
                                <div className="nice-select " tabIndex="0">
                                    <span className="current">{formData.proximity_highway_transit}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className={`option ${formData.proximity_highway_transit === "Yes" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, proximity_highway_transit: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className={`option ${formData.proximity_highway_transit === "No" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, proximity_highway_transit: "No" })}>
                                            No
                                        </li>

                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Distance:<span className='text-danger'>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="proximity_distance"
                                    value={formData.proximity_distance}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Nearby Businesses / Anchors:<span className='text-danger'>*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nearly_businesses_anchors"
                                    value={formData.nearly_businesses_anchors}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>
                                    Walk Score / Transit Score:<span className='text-danger'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name='walk_score_transit_score'
                                    value={formData.walk_score_transit_score}
                                    onChange={handleChange}
                                />
                            </fieldset>
                        </div>


                        <div className="box grid-2 gap-30 mt-30">
                            <fieldset className="box-fieldset">
                                <label>Longitude:<span className='text-danger'>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <div className="box-fieldset">
                                <label>Latitude:<span className='text-danger'>*</span></label>
                                <div className="box-ip">
                                    <input type="text" className="form-control" name='latitude' value={formData.latitude} onChange={handleChange} />
                                    <span className="btn-location cursor-pointer" onClick={getLocation}>
                                        {
                                            locLoading ?
                                                (
                                                    <span className="material-symbols-outlined">
                                                        emergency_share
                                                    </span>
                                                ) : (
                                                    <span className="material-symbols-outlined">
                                                        location_on
                                                    </span>
                                                )
                                        }
                                    </span>
                                </div>

                            </div>
                        </div>
                        <iframe className="map"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d135905.11693909427!2d-73.95165795400088!3d41.17584829642291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727094281524!5m2!1sen!2s" height="456" style={{ border: "0", width: "100%" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>


                        <div className="box-btn" style={{ marginTop: "60px" }}>

                            <a className="tf-btn dark" onClick={handleSubmit}>Submit</a>

                        </div>

                    </div>

                    {
                        isLoading &&
                        <div className="loading">
                            <div className="loader-wrapper">
                                <div className="circle"></div>
                                <i className="icon-pass icon-home icon-center"></i>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>

    )
}

export default LocationHighlights;