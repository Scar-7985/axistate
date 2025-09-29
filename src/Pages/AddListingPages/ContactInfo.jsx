import axios from "axios";
import React, { useState, useEffect } from "react";
import { swalMsg } from '../../Components/SweetAlert2';
import { GET_API, POST_API } from "../../Auth/Define";
import { useLocation, useNavigate } from "react-router-dom";
import { sideMenu } from "./PropertyDetails"

const ContactInfo = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { PID } = location.state;
    console.log(PID);

    const [isLoading, setIsLoading] = useState(false);

    const [selectedTenant, setSelectedTenant] = useState([]);

    const [formData, setFormData] = useState({
        lister_name: "",
        company: "",
        phone: "",
        email: "",
        website: "",
    });

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

    const getMedia = (currentPid) => {
        const formData = new FormData();
        formData.append("pid", currentPid);
        axios.post(`${GET_API}/contact-info.php`, formData)
            .then(resp => {
                console.log("Return Date ===> ", resp.data);

                if (resp.data.status === 100) {
                    const Value = resp.data.value;
                    // console.log("API Response:", resp.data.value);
                    setUpdateID(Value.id);

                    setFormData({
                        lister_name: Value.agent_name,
                        company: Value.company,
                        phone: Value.phone,
                        email: Value.email,
                        website: Value.website,
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
            getMedia(PID);
            completedList(PID);
            setUpdatePid(PID);
        }
    }, [location.search]);

    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //

    const handleSubmit = () => {
        if (isLoading) return;
        const registerData = new FormData();
        if (updateId) {
            registerData.append("id", updateId);
        }
        registerData.append("pid", PID);
        registerData.append("agent_name", formData.lister_name);
        registerData.append("company", formData.company);
        registerData.append("phone", formData.phone);
        registerData.append("email", formData.email);
        registerData.append("website", formData.website);

        axios.post(`${POST_API}/contact-info.php`, registerData).then(resp => {
            const jsonData = resp.data;
            console.log(resp.data);

            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {
                    if (!updateId) {
                        navigate("/my-listings", { state: { PID: jsonData.pid } })
                    } else {
                        navigate("/my-listings", { state: { PID: PID } })
                    }
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
        })
        setIsLoading(false);
    }

    return (
        <div className="layout-wrap">
            <div className="sidebar-menu-dashboard d-flex shadow">
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
                    <div className="widget-box-2 mb-20 shadow">
                        <h5 className="title d-flex justify-content-between align-items-center">
                            <div>
                                Contact Information
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>
                                    <a className="btn-dark d-flex align-items-center gap-3" onClick={() => navigate("/media", { state: { PID: PID } })}>
                                        <span class="material-symbols-outlined">
                                            arrow_back
                                        </span>
                                        <div className='text'>Previous</div>

                                    </a>
                                </div>
                            </div>
                        </h5>
                        <hr />
                        <fieldset className="box-fieldset">
                            <label>
                                Listing	Broker / Agent Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="lister_name"
                                value={formData.lister_name}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset className="box-fieldset mt-30">
                            <label>
                                Company:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <div className="box grid-2 gap-30 mt-30">
                            <fieldset className="box-fieldset">
                                <label>Phone:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </fieldset>
                        </div>


                        <fieldset className="box-fieldset">
                            <label>Website</label>
                            <input
                                type="text"
                                className="form-control"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                            />
                        </fieldset>

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

    );
};

export default ContactInfo;
