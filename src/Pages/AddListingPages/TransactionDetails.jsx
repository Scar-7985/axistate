import axios from "axios";
import React, { useState, useEffect } from "react";
import { swalMsg } from "../../Components/SweetAlert2";
import { GET_API, POST_API } from "../../Auth/Define";
import ChipBox from "../../Components/Inputs/ChipBox";
import { useLocation, useNavigate } from "react-router-dom";
import { sideMenu } from "./PropertyDetails"

const TransactionDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { PID } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);

  const [selectedTenant, setSelectedTenant] = useState([]);

  const [updateId, setUpdateID] = useState(null);
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
  const [inlineError, setInlineError] = useState(null);

  const [checkList, setCheckList] = useState({
    status1: 0,
    status2: 0,
    status3: 0,
    status4: 0,
    status5: 0,
    status6: 0,
    status7: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


  const [updatePid, setUpdatePid] = useState(null);

  const getPropertyDetails = (currentPid) => {

    const formData = new FormData();
    formData.append("pid", currentPid);
    axios.post(`${GET_API}/transation_details.php`, formData)
      .then(resp => {
        console.log(resp.data);

        if (resp.data.status === 100) {
          const Value = resp.data.value;
          // console.log("API Response:", resp.data.value);
          setUpdateID(Value.id);

          setFormData({
            sale_condition: Value.sale_condition,
            asking_price: Value.asking_price,
            price_per_sqft: Value.price_pr_sq_ft,
            cap_rate: Value.cap_rate,
            lease_rate: Value.lease_rate,
            lease_type: Value.lease_type,
            available_units_spaces: Value.spaces,
            ownership_type: Value.ownership_type,
          })
        } else {
          console.log("API Error:", resp.data);
        }
      })

  }


  const completedList = (getPID) => {
    const listData = new FormData();
    listData.append("pid", getPID);
    axios.post(`${GET_API}/complete-list.php`, listData).then(resp => {
      setCheckList(resp.data);
    })
  }

  useEffect(() => {
    if (!PID) {
      window.history.back();
    } else {
      getPropertyDetails(PID);
      completedList(PID);
      setUpdatePid(PID);
    }

  }, [location]);

  // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


  const handleSubmit = () => {
    if (isLoading) return;
    setIsLoading(true);
    setInlineError(null);
    const registerData = new FormData();

    if (updateId) {
      registerData.append("id", updateId);
    }

    registerData.append("pid", PID);

    registerData.append("sale_condition", formData.sale_condition);
    registerData.append("asking_price", formData.asking_price);
    registerData.append("price_pr_sq_ft", formData.price_per_sqft);
    registerData.append("cap_rate", formData.cap_rate);
    registerData.append("lease_rate", formData.lease_rate);
    registerData.append("lease_type", formData.lease_type);
    registerData.append("spaces", formData.available_units_spaces);
    registerData.append("ownership_type", formData.ownership_type);

    axios.post(`${POST_API}/transation_details.php`, registerData).then(resp => {
      const jsonData = resp.data;
      console.log(resp.data);

      if (jsonData.status === 100) {

        swalMsg("success", resp.data.msg, 2000);

        setTimeout(() => {
          if (!updateId) {
            navigate("/property-features", { state: { PID: jsonData.pid } });
          } else {
            navigate("/property-features", { state: { PID: PID } });
          }
        }, 1000);

      } else {
        setInlineError({
          statusType: Number(jsonData.status),
          msg: jsonData.msg
        });
        swalMsg("error", resp.data.msg, 2000);
      }
      setIsLoading(false);
    })
  }

  return (
    <div className="layout-wrap">
      <div className="sidebar-menu-dashboard d-flex shadow ">
        <div className="menu-box">
          {/* <div className="title fw-6">Menu</div> */}
          <ul className="box-menu-dashboard">
            {
              sideMenu.map((item, index) => {

                const statusKey = `status${item.id}`;

                const statusValue = Number(checkList[statusKey]);

                const isCompleted = statusValue === item.id;

                return (
                  <li className={`nav-menu-item ${location.pathname === item.path ? 'active' : ''}`} key={index}>
                    <a className="d-flex justify-content-between align-items-center nav-menu-link">
                      <span>{index + 1}. {" "} {item.title}</span>
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontSize: "40px",
                          color: !isCompleted ? "#ccc" : "green",
                        }}
                      >
                        check_circle
                      </span>
                    </a>
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>

      <div className="main-content">
        <div className="main-content-inner">
          <div className="widget-box-2 mb-20 shadow">
            <h5 className="title d-flex justify-content-between align-items-center">
              <div>
                Transaction Details
              </div>
              <div className='d-flex align-items-center gap-2'>
                <div>

                  <a className="btn-dark d-flex align-items-center gap-1" onClick={() => navigate("/property-details", { state: { PID: PID } })}>
                   <span class="material-symbols-outlined">
                        chevron_backward
                      </span>
                    <div className='text'>Previous</div>

                  </a>

                </div>
                <div>
                  {
                    Number(checkList.status2) === 2 &&
                    <a className="btn-secondary d-flex align-items-center gap-1" onClick={() => navigate("/property-features", { state: { PID: PID } })}>
                      <div className='text'>Next</div>
                      <span class="material-symbols-outlined">
                        chevron_forward
                      </span>
                    </a>
                  }
                </div>
              </div>
            </h5>
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