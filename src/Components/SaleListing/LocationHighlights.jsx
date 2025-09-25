import React, { useState, useEffect } from 'react'
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { GET_API, POST_API } from '../../Auth/Define';
import { useNavigate } from 'react-router-dom';


const LocationHighlights = ({chkStatus}) => {

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
                        traffic_count: Value.traffic_count,
                        proximity_highway_transit: Value.transit,
                        nearly_businesses_anchors: Value.anchors,
                        walk_score_transit_score: Value.walk_score,
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
            getLocationHighlights(pid);
            setUpdatePid(pid);
        }

    }, []);


    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


    const handleSubmit = () => {
        if (isLoading) return;
        const descData = new FormData();

        if (!updateId) {
            descData.append("pid", updatePid);
        } else {
            descData.append("id", updateId);
        }

        descData.append("traffic_count", formData.traffic_count);
        descData.append("transit", formData.proximity_highway_transit);
        descData.append("anchors", formData.nearly_businesses_anchors);
        descData.append("walk_score", formData.walk_score_transit_score);

        axios.post(`${POST_API}/location_highlights.php`, descData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {
                    if (!updateId) {
                        navigate(`/add-listing?pageNum=5&pid=${jsonData.pid}`);
                    } else {
                        navigate(`/add-listing?pageNum=5&pid=${updatePid}`);
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
                        Location Highlights
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div>
                            <a className="btn-dark d-flex align-items-center gap-3" onClick={() => navigate(`/add-listing?pageNum=3&pid=${updatePid}`)}>
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

                    <a className="tf-btn dark" onClick={handleSubmit}>Submit</a>

                </div>

            </div>
        </div>

    )
}

export default LocationHighlights;