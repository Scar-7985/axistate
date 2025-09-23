import React, { useState } from 'react'
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { POST_API } from '../../Auth/Define';
import { useNavigate } from 'react-router-dom';


const LocationHighlights = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        traffic_count: "",
        proximity_highway_transit: "",
        nearly_businesses_anchors: "",
        walk_score_transit_score: "",
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
        descData.append("traffic_count", formData.traffic_count);
        descData.append("proximity_highway_transit", formData.proximity_highway_transit);
        descData.append("nearly_businesses_anchors", formData.nearly_businesses_anchors);
        descData.append("walk_score_transit_score", formData.walk_score_transit_score);

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
                <h5 className="title">Location Highlights</h5>
                <hr />

                <div className="box grid-3 gap-30 mt-30">
                    <fieldset className="box-fieldset">
                        <label>Traffic Count:</label>
                         <input
                            type="number"
                            className="form-control"
                            name="traffic_count"
                            value={formData.traffic_count}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="box-fieldset">
                        <label>Proximity to Highways / Transit:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="proximity_highway_transit"
                            value={formData.proximity_highway_transit}
                            onChange={handleChange}
                        />
                    </fieldset>
                    <fieldset className="box-fieldset">
                        <label>Nearby Businesses / Anchors:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nearly_businesses_anchors"
                            value={formData.nearly_businesses_anchors}
                            onChange={handleChange}
                        />
                    </fieldset>
                </div>

                <div className="box grid-3 gap-30 mt-30">

                    <fieldset className="box-fieldset">
                        <label>
                            Walk Score / Transit Score:
                        </label>
                        <input
                            type="text"
                            name='walk_score_transit_score'
                            value={formData.walk_score_transit_score}
                            onChange={handleChange}
                        />
                    </fieldset>
                </div>


                <div className="box-btn" style={{ marginTop: "60px" }}>
                    <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
                </div>

            </div>
        </div>

    )
}

export default LocationHighlights;