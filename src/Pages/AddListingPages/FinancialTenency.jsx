import React, { useState, useEffect } from 'react'
import { swalMsg } from '../../Components/SweetAlert2';
import axios from 'axios';
import { GET_API, POST_API } from '../../Auth/Define';
import { useLocation, useNavigate } from 'react-router-dom';
import { sideMenu } from "./PropertyDetails"

const FinancialTenency = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { PID } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        current_occupancy: "",
        number_of_tenants: 0,
        tenant_names: [],
        lease_exp: "",
        noi: "",
        cam: "No",
        taxes: "No",
        insurance: "No",
        utilities: "No",
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

    const handleChange = (e, index = null) => {
        const { name, value } = e.target;

        if (name.startsWith("tenant_names")) {
            const updatedNames = [...formData.tenant_names];
            updatedNames[index] = value; // replace only the changed index
            setFormData({ ...formData, tenant_names: updatedNames });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //

    const [updateId, setUpdateID] = useState(null);
    const [updatePid, setUpdatePid] = useState(null);

    const getFinanceTenenceInfo = (currentPid) => {
        const formData = new FormData();
        formData.append("pid", currentPid);
        axios.post(`${GET_API}/tenancy-lnformation.php`, formData)
            .then(resp => {
                console.log(resp.data);

                if (resp.data.status === 100) {
                    const Value = resp.data.value;
                    // console.log("API Response:", resp.data.value);
                    setUpdateID(Value.id);

                    const tenantNames = Value.tenant_names.split("@@");

                    setFormData({
                        current_occupancy: Value.occupancy,
                        number_of_tenants: Value.num_of_tenants,
                        tenant_names: tenantNames,
                        lease_exp: Value.lease_expiration,
                        noi: Value.noi,
                        cam: Value.cam,
                        taxes: Value.taxes,
                        insurance: Value.insurance,
                        utilities: Value.utilities,
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
            getFinanceTenenceInfo(PID);
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

        const tenantNames = formData.tenant_names.join("@@");

        descData.append("pid", PID);
        descData.append("occupancy", formData.current_occupancy);
        descData.append("num_of_tenants", formData.number_of_tenants);
        descData.append("tenant_names", tenantNames);
        descData.append("lease_expiration", formData.lease_exp);
        descData.append("noi", formData.noi);
        descData.append("cam", formData.cam);
        descData.append("taxes", formData.taxes);
        descData.append("insurance", formData.insurance);
        descData.append("utilities", formData.utilities);

        axios.post(`${POST_API}/tenancy-lnformation.php`, descData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {
                    if (!updateId) {
                        navigate("/media", { state: { PID: jsonData.pid } });
                    } else {
                        navigate("/media", { state: { PID: PID } });
                    }
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
        })
        setIsLoading(true);
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
                        <h5 className="title d-flex justify-content-between align-item-center">
                            <div>
                                Financial / Tenency Information
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div>
                                    <a className="btn-dark d-flex align-items-center gap-1" onClick={() => navigate("/location-highlights", { state: { PID: PID } })}>
                                        <span class="material-symbols-outlined">
                                            chevron_backward
                                        </span>
                                        <div className='text'>Previous</div>
                                    </a>
                                </div>
                                <div>
                                    {
                                        Number(checkList.status5) === 5 &&
                                        <a className="btn-secondary d-flex align-items-center gap-1" onClick={() => navigate("/media", { state: { PID: PID } })}>
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
                                <label>Current Occupancy (%):<span className='text-danger'>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="current_occupancy"
                                    value={formData.current_occupancy}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Number of Tenents:<span className='text-danger'>*</span></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="number_of_tenants"
                                    value={formData.number_of_tenants}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            {[...Array(Number(formData.number_of_tenants) || 0)].map((_, index) => (
                                <fieldset className="box-fieldset" key={index}>
                                    <label>Tenant Name {index + 1}:<span className='text-danger'>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name={`tenant_names${index}`}
                                        value={formData.tenant_names[index] || ""}
                                        onChange={(e) => handleChange(e, index)}
                                    />
                                </fieldset>
                            ))}




                            <fieldset className="box-fieldset">
                                <label>
                                    Lease Expiration(s):<span className='text-danger'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name='lease_exp'
                                    value={formData.lease_exp}
                                    onChange={handleChange}
                                />
                            </fieldset>

                            <fieldset className="box-fieldset">
                                <label>
                                    NOI (Net Operating Income):<span className='text-danger'>*</span>
                                </label>
                                <input
                                    type="text"
                                    name='noi'
                                    value={formData.noi}
                                    onChange={handleChange}
                                />
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>CAM: <span className='text-danger'>*</span></label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{formData.cam}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className={`option ${formData.cam === "Yes" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, cam: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className={`option ${formData.cam === "No" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, cam: "No" })}>
                                            No
                                        </li>

                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Taxes: <span className='text-danger'>*</span></label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{formData.taxes}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className={`option ${formData.taxes === "Yes" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, taxes: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className={`option ${formData.taxes === "No" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, taxes: "No" })}>
                                            No
                                        </li>

                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Insurance: <span className='text-danger'>*</span></label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{formData.insurance}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className={`option ${formData.insurance === "Yes" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, insurance: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className={`option ${formData.insurance === "No" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, insurance: "No" })}>
                                            No
                                        </li>
                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset className="box-fieldset">
                                <label>Utilities: <span className='text-danger'>*</span></label>
                                <div className="nice-select" tabindex="0">
                                    <span className="current">{formData.utilities}</span>
                                    <ul className="list">
                                        <li data-value="Yes" className={`option ${formData.utilities === "Yes" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, utilities: "Yes" })}>
                                            Yes
                                        </li>
                                        <li data-value="No" className={`option ${formData.utilities === "No" ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, utilities: "No" })}>
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

export default FinancialTenency;

const OperatingExpenseOption = [
    { title: "CAM" },
    { title: "Taxes" },
    { title: "Insurance" },
    { title: "Utilities" },
];