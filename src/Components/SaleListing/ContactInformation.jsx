import axios from "axios";
import React, { useState, useEffect } from "react";
import { swalMsg } from "../SweetAlert2";
import { GET_API, POST_API } from "../../Auth/Define";
import ChipBox from "../Inputs/ChipBox";
import { useLocation, useNavigate } from "react-router-dom";

const ContactInformation = ({ prevStatus }) => {

    const navigate = useNavigate();
    const location = useLocation();
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



    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pid = params.get("pid");

        if (pid) {
            getMedia(pid);
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
        const registerData = new FormData();
        if (!updateId) {
            registerData.append("pid", updatePid);
        } else {
            registerData.append("id", updateId);
        }
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
                        navigate(`/my-listings?pid=${jsonData.pid}`);
                    } else {
                        navigate(`/my-listings?pid=${updatePid}`);
                    }
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
                <h5 className="title d-flex justify-content-between align-items-center">
                    <div>
                        Contact Information
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div>
                            <a className="btn-dark d-flex align-items-center gap-3" onClick={() => navigate(`/add-listing?pageNum=6&pid=${updatePid}`)}>
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

    );
};

export default ContactInformation;
