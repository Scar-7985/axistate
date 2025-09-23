import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { POST_API } from '../../Auth/Define';
import { useNavigate } from 'react-router-dom';


const PropertyFeatures = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        building_class: "A",
        ceiling_height: "",
        loading_docks_drive: "",
        hvac_sprinkler: "",
        utility: "",
        elevator: "",
        accessibility_ada: "",
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
        descData.append("building_class", formData.building_class);
        descData.append("ceiling_height", formData.ceiling_height);
        descData.append("loading_docks_drive", formData.loading_docks_drive);
        descData.append("hvac_sprinkler", formData.hvac_sprinkler);
        descData.append("utility", formData.utility);
        descData.append("elevator", formData.elevator);
        descData.append("accessibility_ada", formData.accessibility_ada);
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
                <h5 className="title">Description</h5>
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
                            <span className="current">Choose</span>
                            <ul className="list">
                                <li data-value="Yes" className="option" onClick={() => setFormData({ ...formData, elevator: item.title })}>
                                    Yes
                                </li>
                                <li data-value="No" className="option" onClick={() => setFormData({ ...formData, elevator: item.title })}>
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
                            <span className="current">Choose</span>
                            <ul className="list">
                                <li data-value="Yes" className="option" onClick={() => setFormData({ ...formData, accessibility_ada: item.title })}>
                                    Yes
                                </li>
                                <li data-value="No" className="option" onClick={() => setFormData({ ...formData, accessibility_ada: item.title })}>
                                    No
                                </li>

                            </ul>
                        </div>
                    </fieldset>
                </div>





            <div className="box-btn" style={{marginTop: "60px"}}>
                <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
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