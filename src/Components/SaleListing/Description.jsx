import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { POST_API } from '../../Auth/Define';
import { useNavigate } from 'react-router-dom';


const Description = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        subHeader: "",
        market: "",
        investment: "",
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
        descData.append("sub_header", formData.subHeader);
        descData.append("marketing_dsp", formData.market);
        descData.append("investment_hlt", formData.investment);
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
            <div className="widget-box-2 mb-20">
                <h5 className="title">Description</h5>
                <hr />
                <div className="box-info-property">
                    <fieldset className="box box-fieldset">
                        <label>
                            Subheader:<span className='text-danger'>*</span>
                        </label>
                        <input
                            type="text"
                            name='subHeader'
                            value={formData.subHeader}
                            onChange={handleChange}
                        />
                    </fieldset>
                </div>
            </div>
            <div className="widget-box-2 mb-20">

                <fieldset className="box box-fieldset">
                    <label>
                        Marketing Description:<span className='text-danger'>*</span>
                    </label>
                    <ReactQuill theme="snow" className='mt-10' value={formData.market} onChange={(value) => setFormData({ ...formData, market: value })} placeholder='Type here...' style={{ height: '300px' }} />
                </fieldset>

            </div>
            <div className="widget-box-2 mb-20">
                <fieldset className="box box-fieldset">
                    <label>
                        Investment Highlights:<span className='text-danger'>*</span>
                    </label>
                    <ReactQuill theme="snow" className='mt-10' value={formData.investment} onChange={(value) => setFormData({ ...formData, investment: value })} placeholder='Type here...' style={{ height: '300px' }} />
                </fieldset>
            </div>

            <div className="box-btn mt-30">
                <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
            </div>
        </div>

    )
}

export default Description;
