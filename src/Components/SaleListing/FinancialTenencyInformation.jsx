import React, { useState, useEffect } from 'react'
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { GET_API, POST_API } from '../../Auth/Define';
import { useLocation, useNavigate } from 'react-router-dom';

const FinancialTenencyInformation = ({ chkStatus, prevStatus, callList }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        current_occupancy: "",
        number_of_tenants: "",
        tenant_names: "",
        lease_exp: "",
        noi: "",
        operating_expenses: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

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

                    setFormData({
                        current_occupancy: Value.occupancy,
                        number_of_tenants: Value.num_of_tenants,
                        tenant_names: Value.tenant_names,
                        lease_exp: Value.lease_expiration,
                        noi: Value.noi,
                        operating_expenses: Value.op_expenses,
                    })
                } else {
                    console.log("No Existing Data:", resp.data);
                }
            })

    }


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pid = params.get("pid");

        if (pid) {
            getFinanceTenenceInfo(pid);
            setUpdatePid(pid);
        }

    }, [location.search]);

    useEffect(() => {
        if (prevStatus === 101) {
            window.history.back();
        }
    }, [prevStatus]);

    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //

    const handleSubmit = () => {
        if (isLoading) return;
        const descData = new FormData();
        if (!updateId) {
            descData.append("pid", updatePid);
        } else {
            descData.append("id", updateId);
        }
        descData.append("occupancy", formData.current_occupancy);
        descData.append("num_of_tenants", formData.number_of_tenants);
        descData.append("tenant_names", formData.tenant_names);
        descData.append("lease_expiration", formData.lease_exp);
        descData.append("noi", formData.noi);
        descData.append("op_expenses", formData.operating_expenses);

        axios.post(`${POST_API}/tenancy-lnformation.php`, descData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                callList();
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {
                    if (!updateId) {
                        navigate(`/add-listing?pageNum=6&pid=${jsonData.pid}`);
                    } else {
                        navigate(`/add-listing?pageNum=6&pid=${updatePid}`);
                    }
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
        })
        setIsLoading(true);
    }

    return (

        <div className="main-content-inner">
            <div className="widget-box-2 mb-20 shadow">
                <h5 className="title d-flex justify-content-between align-item-center">
                    <div>
                        Financial / Tenency Information
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div>
                            <a className="btn-dark d-flex align-items-center gap-3" onClick={() => navigate(`/add-listing?pageNum=4&pid=${updatePid}`)}>
                                <span class="material-symbols-outlined">
                                    arrow_back
                                </span>
                                <div className='text'>Previous</div>

                            </a>
                        </div>
                        <div>
                            {
                                Number(chkStatus) === 1 &&
                                <a className="btn-secondary d-flex align-items-center gap-3" onClick={handleSubmit}>
                                    <div className='text'>Next</div>
                                    <span class="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </a>
                            }
                        </div>
                    </div>
                </h5>
                <hr />

                <div className="box grid-3 gap-30 mt-30">
                    <fieldset className="box-fieldset">
                        <label>Current Occupancy (%):</label>
                        <input
                            type="number"
                            className="form-control"
                            name="current_occupancy"
                            value={formData.current_occupancy}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="box-fieldset">
                        <label>Number of Tenents:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="number_of_tenants"
                            value={formData.number_of_tenants}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="box-fieldset">
                        <label>Tenent Names (If Allowed):</label>
                        <input
                            type="text"
                            className="form-control"
                            name="tenant_names"
                            value={formData.tenant_names}
                            onChange={handleChange}
                        />
                    </fieldset>
                </div>

                <div className="box grid-3 gap-30 mt-30">

                    <fieldset className="box-fieldset">
                        <label>
                            Lease Expiration(s):
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
                            NOI (Net Operating Income):
                        </label>
                        <input
                            type="text"
                            name='noi'
                            value={formData.noi}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="box-fieldset">
                        <label>Operating Expenses</label>
                        <div className="nice-select" tabindex="0">
                            <span className="current">{`${formData.operating_expenses !== "" ? formData.operating_expenses : "Choose"}`}</span>
                            <ul className="list">
                                {
                                    OperatingExpenseOption.map((item, index) => {
                                        return (
                                            <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, operating_expenses: item.title })}>
                                                {item.title}
                                            </li>
                                        )
                                    })
                                }

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

    )
}

export default FinancialTenencyInformation;

const OperatingExpenseOption = [
    { title: "CAM" },
    { title: "Taxes" },
    { title: "Insurance" },
    { title: "Utilities" },
];