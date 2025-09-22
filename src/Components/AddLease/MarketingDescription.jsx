import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { isAuthenticated, POST_API } from '../../Auth/Define';
import axios from 'axios';
import { swalMsg } from '../SweetAlert2';
import { useNavigate } from 'react-router-dom';

const MarketingDescription = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    marktDescription: "",
    buildingHighlights: ""
  });

  const handleSubmit = () => {
    if (isLoading) return;
    setIsLoading(true);
    const getLid = window.localStorage.getItem("gtlid") || null;
    const PropertyData = new FormData();
    PropertyData.append("cuid", isAuthenticated);
    PropertyData.append("lid", getLid);
    PropertyData.append("description", formData.description);
    PropertyData.append("investment_hlt", formData.buildingHighlights);
    PropertyData.append("marketing_dsp", formData.marktDescription);
    axios.post(`${POST_API}/lease-description.php`, PropertyData).then(resp => {
      const jsonData = resp.data;
      if (jsonData.status === 100) {
        swalMsg("success", resp.data.msg, 2000);
        window.localStorage.setItem("gtlpnum", 3);
        window.localStorage.setItem("gtlchngpg", true);
        window.localStorage.setItem("gtlid", resp.data.lid);
        setTimeout(() => {
          navigate("/add-lease");
        }, 1000);
      } else {
        swalMsg("error", resp.data.msg, 2000);
      }

    })
    setIsLoading(false);
  }

  return (
    <div className="main-content-inner">
      <div className="widget-box-2 mb-20">
        <h5 className="title">Marketing Description</h5>
        <hr />
        <div className="box-info-property">
          <fieldset className="box box-fieldset">
            <label>
              Description:<span className='text-danger'>*</span>
            </label>
            <input
              type="text"
              name='description'
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </fieldset>
        </div>
      </div>
      <div className="widget-box-2 mb-20">

        <fieldset className="box box-fieldset">
          <label>
            Marketing Description:<span className='text-danger'>*</span>
          </label>
          <ReactQuill theme="snow" className='mt-10' value={formData.marktDescription} onChange={(value) => setFormData({ ...formData, marktDescription: value })} placeholder='Type here...' style={{ height: '300px' }} />
        </fieldset>

      </div>
      <div className="widget-box-2 mb-20">
        <fieldset className="box box-fieldset">
          <label>
            Building Highlights:<span className='text-danger'>*</span>
          </label>
          <ReactQuill theme="snow" className='mt-10' value={formData.buildingHighlights} onChange={(value) => setFormData({ ...formData, buildingHighlights: value })} placeholder='Type here...' style={{ height: '300px' }} />
        </fieldset>
      </div>

      <div className="box-btn mt-30">
        <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
      </div>
    </div>
  )
}

export default MarketingDescription