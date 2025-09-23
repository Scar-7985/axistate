import axios from "axios";
import React, { useState } from "react";
import { swalMsg } from "../SweetAlert2";
import { POST_API } from "../../Auth/Define";
import ChipBox from "../Inputs/ChipBox";
import { useNavigate } from "react-router-dom";

const TransactionDetails = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTenant, setSelectedTenant] = useState([]);

  const [formData, setFormData] = useState({
    sale_condition: "",
    asking_price: "",
    price_per_sqft: "",
    cap_rate: "",
    lease_rate: "",
    lease_type: "",
    available_units_spaces: "",
    ownership_type: "",
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
    registerData.append("sale_condition", formData.sale_condition);
    registerData.append("asking_price", formData.asking_price);
    registerData.append("price_per_sqft", formData.price_per_sqft);
    registerData.append("cap_rate", formData.cap_rate);
    registerData.append("lease_rate", formData.lease_rate);
    registerData.append("lease_type", formData.lease_type);
    registerData.append("available_units_spaces", formData.available_units_spaces);
    registerData.append("ownership_type", formData.ownership_type);

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
        <h5 className="title" >Transaction Details</h5>
        <hr />
        <fieldset className="box-fieldset">
          <label>
            Sale Condition:<span className="text-danger">*</span>
          </label>
          <div className="nice-select" tabindex="0">
            <span className="current">{`${formData.sale_condition !== "" ? formData.sale_condition : "Choose"}`}</span>
            <ul className="list">
              {
                SaleConditionOption.map((item, index) => {
                  return (
                    <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, sale_condition: item.title })}>
                      {item.title}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </fieldset>

        <div className="box grid-3 gap-30 mt-30">
          <fieldset className="box-fieldset">
            <label>Asking Price ($):</label>
            <input
              type="number"
              className="form-control"
              name="asking_price"
              value={formData.asking_price}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Price per Sq Ft:</label>
            <input
              type="number"
              className="form-control"
              name="price_per_sqft"
              value={formData.price_per_sqft}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Cap Rate:</label>
            <input
              type="number"
              className="form-control"
              name="cap_rate"
              value={formData.cap_rate}
              onChange={handleChange}
            />
          </fieldset>
        </div>

        <div className="box grid-3 gap-30">

          <fieldset className="box-fieldset">
            <label>Lease Rate</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.lease_rate !== "" ? formData.lease_rate : "Choose"}`}</span>
              <ul className="list">
                {
                  LeaseRateOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, lease_rate: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>

          <fieldset className="box-fieldset">
            <label>Lease Type</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.lease_type !== "" ? formData.lease_type : "Choose"}`}</span>
              <ul className="list">
                {
                  LeaseTypeOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, lease_type: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>

          <fieldset className="box-fieldset">
            <label>Available Units / Spaces</label>
            <input
              type="number"
              className="form-control"
              name="available_units_spaces"
              value={formData.available_units_spaces}
              onChange={handleChange}
            />
          </fieldset>
        </div>

        <fieldset className="box-fieldset">
          <label>Ownership Type</label>
          <div className="nice-select" tabindex="0">
            <span className="current">{`${formData.ownership_type !== "" ? formData.ownership_type : "Choose"}`}</span>
            <ul className="list">
              {
                OwnershipTypeOption.map((item, index) => {
                  return (
                    <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, ownership_type: item.title })}>
                      {item.title}
                    </li>
                  )
                })
              }

            </ul>
          </div>
        </fieldset>

        <div className="box-btn" style={{ marginTop: "60px" }}>
          <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
        </div>
      </div>

    </div>

  );
};

export default TransactionDetails;



const SaleConditionOption = [
  { title: "For Sale" },
  { title: "For Lease" },
  { title: "Build-to-Suit" },
  { title: "Ground Lease" },
];

const LeaseRateOption = [
  { title: "$" },
  { title: "Sq Ft" },
  { title: "Month or Year" },
];

const LeaseTypeOption = [
  { title: "NNN" },
  { title: "Gross" },
  { title: "Modified Gross" },
  { title: "Others" },
];

const OwnershipTypeOption = [
  { title: "Fee Simple" },
  { title: "Leasehold" },
  { title: "Condo" },
  { title: "Others" },
];