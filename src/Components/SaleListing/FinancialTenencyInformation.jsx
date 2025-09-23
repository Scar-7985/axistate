import React, { useState } from 'react'
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { POST_API } from '../../Auth/Define';
import { useNavigate } from 'react-router-dom';


const FinancialTenencyInformation = () => {

    const navigate = useNavigate();
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

    const handleSubmit = () => {
        if (isLoading) return;
        const descData = new FormData();
        const getPid = window.localStorage.getItem("gtpid") || null;
        descData.append("pid", getPid);
        descData.append("current_occupancy", formData.current_occupancy);
        descData.append("number_of_tenants", formData.number_of_tenants);
        descData.append("tenant_names", formData.tenant_names);
        descData.append("lease_exp", formData.lease_exp);
        descData.append("noi", formData.noi);
        descData.append("operating_expenses", formData.operating_expenses);

        axios.post(`${POST_API}/property-description.php`, descData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                window.localStorage.setItem("gtpnum", 4);
                setTimeout(() => {
                    navigate("/add-sale");
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
                <h5 className="title">Financial / Tenency Information</h5>
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
                            name='lease_exp'
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
                    <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
                </div>

            </div>
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