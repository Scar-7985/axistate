import axios from "axios";
import React, { useState } from "react";
import { swalMsg } from "../SweetAlert2";
import { POST_API } from "../../Auth/Define";
import ChipBox from "../Inputs/ChipBox";
import { useNavigate } from "react-router-dom";

const ContactInformation = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedTenant, setSelectedTenant] = useState([]);

    const [formData, setFormData] = useState({
        lister_name: "",
        company: "",
        phone: "",
        email: "",
        website: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
        if (isLoading) return;
        const registerData = new FormData();
        const getPid = window.localStorage.getItem("gtpid") || null;
        registerData.append("pid", getPid);
        registerData.append("lister_name", formData.lister_name);
        registerData.append("company", formData.company);
        registerData.append("phone", formData.phone);
        registerData.append("email", formData.email);
        registerData.append("website", formData.website);

        axios.post(`${POST_API}/basic-details.php`, registerData).then(resp => {
            const jsonData = resp.data;
            console.log(resp.data);

            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                window.localStorage.setItem("gtpnum", 3);
                setTimeout(() => {
                    navigate("/add-sale");
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
        })
        setIsLoading(false);
    }

    return (
        <div className="main-content-inner">
            <div className="widget-box-2 mb-20 shadow">
                <h5 className="title" >Contact Information</h5>
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
                    <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
                </div>
            </div>

        </div>

    );
};

export default ContactInformation;
