import React, { useState, useEffect } from 'react'
import ChipBox from "../../Components/Inputs/ChipBox"
import axios from 'axios';
import { GET_API, isAuthenticated, POST_API } from '../../Auth/Define';
import { Countries, USAStates } from '../../Components/Reigons';
import { swalMsg } from '../../Components/SweetAlert2';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyDetails = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { PID } = location.state || {};

  console.log(PID);
  

  const [checkList, setCheckList] = useState({
    status1: 0,
    status2: 0,
    status3: 0,
    status4: 0,
    status5: 0,
    status6: 0,
    status7: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectedSubProperty, setSelectedSubProperty] = useState([]);

  // Insert sub-property only wich have same main category property //
  const [showSubProperty, setShowSubProperty] = useState([]);
  // Insert sub-property only wich have same main category property //

  useEffect(() => {
    const AllId = selectedProperty.map((item) => item.id);

    const filteredSubPropertyData = subPropertyOptions.filter((item) =>
      AllId.includes(item.cat_id)
    );

    // Replace the whole array to remove unlinked sub-properties
    setShowSubProperty(filteredSubPropertyData);

    setSelectedSubProperty((prev) =>
      prev.filter((item) => AllId.includes(item.cat_id))
    );

  }, [selectedProperty]);

  const [updateId, setUpdateID] = useState(null);

  const [formData, setFormData] = useState({
    property_name: "",
    street_address: "",
    country: "United States",
    city: "",
    state: "California",
    zip: "",
    zoning: "",
    year_built: "",
    lot_size: "",
    building_size: "",
    num_floors: "",
    parking_spaces: "",
  });

  const [inlineError, setInlineError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //

  const getArray = (getData) => {
    const newData = getData.split(", ");
    return newData;
  }
  // console.log(selectedProperty);



  const getPropertyDetails = (currentPid) => {

    const formData = new FormData();
    formData.append("pid", currentPid);
    axios.post(`${GET_API}/property-details.php`, formData)
      .then(resp => {
        if (resp.data.status === 100) {
          const Value = resp.data.value;
          // console.log("API Response:", resp.data.value);
          setUpdateID(Value.id);
          const pType = getArray(Value.p_type);
          const psubType = getArray(Value.psub_type);

          const prevSelectedProperty = propertyOptions.filter((item) =>
            pType.includes(item.label)
          );

          const prevSubSelectedProperty = subPropertyOptions.filter((item) =>
            psubType.includes(item.label)
          );

          setSelectedProperty(prevSelectedProperty);
          setSelectedSubProperty(prevSubSelectedProperty);

          setFormData({
            property_name: Value.project_name,
            street_address: Value.address,
            country: Value.country,
            city: Value.city,
            state: Value.state,
            zip: Value.zip,
            zoning: Value.zoning,
            year_built: Value.built_year,
            lot_size: Value.lot_size,
            building_size: Value.building_size,
            num_floors: Value.number_floore,
            parking_spaces: Value.parking_space,
          })
        } else {
          // window.history.back();
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
    if (PID) {
      getPropertyDetails(PID);
      completedList(PID);
    }
  }, [location]);



  // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


  // xxxxxxxxxxxxxxxx Submit Property xxxxxxxxxxxxxxxx //

  const handleSubmit = () => {
    if (isLoading) return;
    setIsLoading(true);
    setInlineError(null);
    const PropertyData = new FormData();

    PropertyData.append("cuid", isAuthenticated);
    if (updateId) {
      PropertyData.append("id", updateId);
    }

    if (selectedProperty.length > 0) {
      const propertyType = selectedProperty.map((item) => item.label).join(", ");
      PropertyData.append("p_type", propertyType);
    }
    if (selectedSubProperty.length > 0) {
      const propertySubType = selectedSubProperty.map((item) => item.label).join(", ");
      PropertyData.append("psub_type", propertySubType);
    }

    PropertyData.append("project_name", formData.property_name);
    PropertyData.append("address", formData.street_address);
    PropertyData.append("country", formData.country);
    PropertyData.append("city", formData.city);
    PropertyData.append("state", formData.state);
    PropertyData.append("zip", formData.zip);
    PropertyData.append("zoning", formData.zoning);
    PropertyData.append("built_year", formData.year_built);
    PropertyData.append("lot_size", formData.lot_size);
    PropertyData.append("building_size", formData.building_size);
    PropertyData.append("number_floore", formData.num_floors);
    PropertyData.append("parking_space", formData.parking_spaces);

    axios.post(`${POST_API}/property-details.php`, PropertyData).then(resp => {
      const jsonData = resp.data;
      console.log(jsonData);

      if (jsonData.status === 100) {
        swalMsg("success", resp.data.msg, 2000);

        setTimeout(() => {
          if (!updateId) {
            navigate("/transaction-details", { state: { PID: jsonData.pid } });
          } else {
            navigate("/transaction-details", { state: { PID: PID } });
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

  // xxxxxxxxxxxxxxxx Submit Property xxxxxxxxxxxxxxxx //

  const [showSidebar, setShowSidebar] = useState(false);


  return (
    <div className="layout-wrap">
      <div className="sidebar-menu-dashboard" id={`add-listing-sidemenu${showSidebar ? "-open" : ""}`}>  {/* d-flex shadow  */}
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

          <div class="button-show-hide show-mb w-100 text-right" onClick={() => setShowSidebar(!showSidebar)}>
            <a className="btn-dark p-2">{showSidebar ? "Hide" : "Show"} Sidebar</a>
          </div>

          <div className="widget-box-2 mb-20 shadow">
            <h5 className="title d-flex justify-content-between align-items-center">
              <div>
                Property Details
              </div>


              <div>
                {
                  Number(checkList.status1) === 1 &&
                  <a className="btn-secondary d-flex align-items-center gap-1" onClick={() => navigate("/transaction-details", { state: { PID: PID } })}>
                    <div className='text'>Next</div>
                    <span class="material-symbols-outlined">
                      chevron_forward
                    </span>
                  </a>
                }
              </div>
            </h5>
            <hr />
            <div className="box-info-property">
              <fieldset className="box box-fieldset">
                <label>
                  Property type:<span className='text-danger'>*</span>
                </label>
                <ChipBox
                  options={propertyOptions}
                  value={selectedProperty}
                  onChange={setSelectedProperty}
                  placeholder="Select"
                  limit={3}
                  limitMsg="Cannot add more"
                />
                {
                  inlineError && (inlineError.statusType === 1) &&
                  <span className='text-danger'>{inlineError.msg}</span>
                }
              </fieldset>

              <fieldset className="box box-fieldset">
                <label>Property Subtype:<span className='text-danger'>*</span></label>
                <ChipBox
                  options={showSubProperty}
                  value={selectedSubProperty}
                  onChange={setSelectedSubProperty}
                  placeholder="Select"
                  limit={4}
                  limitMsg="Cannot add more"
                />
                {
                  inlineError && (inlineError.statusType === 2) &&
                  <span className='text-danger'>{inlineError.msg}</span>
                }
              </fieldset>
              <fieldset className="box box-fieldset">
                <label>Building / Project Name:<span className='text-danger'>*</span></label>
                <input type="text" name='property_name' placeholder='' value={formData.property_name} onChange={handleChange} />
                {
                  inlineError && (inlineError.statusType === 3) &&
                  <span className='text-danger'>{inlineError.msg}</span>
                }
              </fieldset>
              <div>
                {/* <h5 className='title'>Address</h5>
            <hr /> */}
              </div>

              <fieldset className="box-fieldset mt-30">
                <label>
                  Street Address:<span className='text-danger'>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter street address"
                  name='street_address'
                  value={formData.street_address}
                  onChange={handleChange}
                />
                {
                  inlineError && (inlineError.statusType === 4) &&
                  <span className='text-danger'>{inlineError.msg}</span>
                }
              </fieldset>


              <fieldset className="box-fieldset mt-30">
                <label>
                  Country:<span className='text-danger'>*</span>
                </label>
                <div className="nice-select" tabIndex="0">
                  <span className="current">{formData.country}</span>
                  <ul className="list" style={{ maxHeight: "250px" }}>
                    {
                      Countries.map((item, index) => {
                        return <li data-value={index} className={`option ${item.label === formData.country ? "selected focus" : ""}`}
                          onClick={() => setFormData({ ...formData, country: item.label })} key={index}>{item.label}</li>
                      })
                    }
                  </ul>
                </div>

              </fieldset>

              <div className="box grid-3 gap-30 mt-30">
                <fieldset className="box-fieldset">
                  <label>
                    City:<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your city"
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 5) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>
                    State:<span className='text-danger'>*</span>
                  </label>
                  <div className="nice-select" tabIndex="0">
                    <span className="current">{formData.state}</span>
                    <ul className="list" style={{ maxHeight: "250px" }}>
                      {
                        USAStates.map((item, index) => {
                          return <li data-value={index} className={`option ${item.title === formData.state ? "selected focus" : ""}`}
                            onClick={() => setFormData({ ...formData, state: item.title })} key={index}>{item.title}</li>
                        })
                      }
                    </ul>
                  </div>
                  {
                    inlineError && (inlineError.statusType === 6) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>


                <fieldset className="box-fieldset">
                  <label>
                    Zip Code:<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Zip code here"
                    name='zip'
                    value={formData.zip}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 7) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>

              </div>


              <div className="box grid-2 gap-30 mt-30">


                <fieldset className="box-fieldset">
                  <label>
                    Zoning:<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="zoning"
                    name='zoning'
                    value={formData.zoning}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 8) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>
                    Year Built/ Renovated:<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Built/ Renovated Year"
                    name='year_built'
                    value={formData.year_built}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 9) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
              </div>

              <div className="box grid-2 gap-30 mt-30">

                <fieldset className="box-fieldset">
                  <label>
                    Lot Size (Acres / Sq Ft.):<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter lot size"
                    name='lot_size'
                    value={formData.lot_size}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 10) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>
                    Building Size (Sq Ft.):<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter building size"
                    name='building_size'
                    value={formData.building_size}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 11) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
              </div>

              <div className="box grid-2 gap-30 mt-30">

                <fieldset className="box-fieldset">
                  <label>
                    Number of Floors:<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter number of floors"
                    name='num_floors'
                    value={formData.num_floors}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 12) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
                <fieldset className="box-fieldset">
                  <label>
                    Parking Spaces / Ratio:<span className='text-danger'>*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter parking space / ratio"
                    name='parking_spaces'
                    value={formData.parking_spaces}
                    onChange={handleChange}
                  />
                  {
                    inlineError && (inlineError.statusType === 13) &&
                    <span className='text-danger'>{inlineError.msg}</span>
                  }
                </fieldset>
              </div>

              <div className="box grid-2 gap-30 mt-30">


              </div>

              <div className="box-btn" style={{ marginTop: "60px" }}>
                <a className="tf-btn dark" onClick={handleSubmit}>Submit</a>
              </div>

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
  )
}

export default PropertyDetails;


export const propertyOptions = [
  { id: 1, value: 'Retail', label: 'Retail' },
  { id: 2, value: 'Office Area', label: 'Office' },
  { id: 3, value: 'Industrial Area', label: 'Industrial' },
  { id: 4, value: 'Hospitality / Hotels Area', label: 'Hospitality / Hotels' },
  { id: 5, value: 'Multifamily Area', label: 'Multifamily' },
  { id: 6, value: 'Land Area', label: 'Land' },
];

export const subPropertyOptions = [
  // Retail
  { id: 1, cat_id: 1, value: 'Gas Station Area', label: 'Gas Station' },
  { id: 2, cat_id: 1, value: 'Bank Area', label: 'Bank' },
  { id: 3, cat_id: 1, value: 'Convenience Store Area', label: 'Convenience Store' },
  { id: 4, cat_id: 1, value: 'Day Care / Nursery Area', label: 'Day Care / Nursery' },
  { id: 5, cat_id: 1, value: 'QSR / Fast Food Area', label: 'QSR / Fast Food' },
  { id: 6, cat_id: 1, value: 'Grocery Store Area', label: 'Grocery Store' },
  { id: 7, cat_id: 1, value: 'Pharmacy / Drug Area', label: 'Pharmacy / Drug Store' },
  { id: 8, cat_id: 1, value: 'Restaurant / Café Area', label: 'Restaurant / Café' },
  { id: 9, cat_id: 1, value: 'Shopping Center Area', label: 'Shopping Center' },
  { id: 10, cat_id: 1, value: 'Big Box / Anchor Store Area', label: 'Big Box / Anchor Store' },
  { id: 11, cat_id: 1, value: 'Factory Outlet Area', label: 'Factory Outlet' },
  { id: 12, cat_id: 1, value: 'Theme Center Area', label: 'Theme Center' },
  { id: 13, cat_id: 1, value: 'Strip Center / Neighborhood Center Area', label: 'Strip Center / Neighborhood Center' },
  { id: 14, cat_id: 1, value: 'Lifestyle Center Area', label: 'Lifestyle Center' },
  { id: 15, cat_id: 1, value: 'Mixed-Use Retail Area', label: 'Mixed-Use Retail' },
  { id: 16, cat_id: 1, value: 'Standalone Store / Pad Site Area', label: 'Standalone Store / Pad Site' },
  { id: 17, cat_id: 1, value: 'Fitness / Gym Area', label: 'Fitness / Gym' },
  { id: 18, cat_id: 1, value: 'Specialty Retail Area', label: 'Specialty Retail' },

  // Office
  { id: 19, cat_id: 2, value: 'High-Rise Office Area', label: 'High-Rise Office' },
  { id: 20, cat_id: 2, value: 'Mid-Rise Office Area', label: 'Mid-Rise Office' },
  { id: 21, cat_id: 2, value: 'Low-Rise / Garden Office Area', label: 'Low-Rise / Garden Office' },
  { id: 22, cat_id: 2, value: 'Suburban Office Park Area', label: 'Suburban Office Park' },
  { id: 23, cat_id: 2, value: 'Medical Office Area', label: 'Medical Office' },
  { id: 24, cat_id: 2, value: 'Co-Working / Shared Office Area', label: 'Co-Working / Shared Office' },
  { id: 25, cat_id: 2, value: 'Flex Office Area', label: 'Flex Office' },

  // Industrial
  { id: 26, cat_id: 3, value: 'Warehouse / Distribution Area', label: 'Warehouse / Distribution' },
  { id: 27, cat_id: 3, value: 'Manufacturing Facility Area', label: 'Manufacturing Facility' },
  { id: 28, cat_id: 3, value: 'Flex Industrial Area', label: 'Flex Industrial' },
  { id: 29, cat_id: 3, value: 'Cold Storage Area', label: 'Cold Storage' },
  { id: 30, cat_id: 3, value: 'Data Center Area', label: 'Data Center' },
  { id: 31, cat_id: 3, value: 'R&D Facility / Laboratory Area', label: 'R&D Facility / Laboratory' },
  { id: 32, cat_id: 3, value: 'Bulk / Logistics Hub Area', label: 'Bulk / Logistics Hub' },

  // Hospitality / Hotels
  { id: 33, cat_id: 4, value: 'Hotel (Full Service) Area', label: 'Hotel (Full Service)' },
  { id: 34, cat_id: 4, value: 'Limited Service Hotel Area', label: 'Limited Service Hotel' },
  { id: 35, cat_id: 4, value: 'Motel Area', label: 'Motel' },
  { id: 36, cat_id: 4, value: 'Resort Area', label: 'Resort' },
  { id: 37, cat_id: 4, value: 'Extended Stay Area', label: 'Extended Stay' },

  // Multifamily
  { id: 38, cat_id: 5, value: 'Apartment Complex (Low-, Mid-, High-rise) Area', label: 'Apartment Complex (Low-, Mid-, High-rise)' },
  { id: 39, cat_id: 5, value: 'Student Housing Area', label: 'Student Housing' },
  { id: 40, cat_id: 5, value: 'Senior / Assisted Living Housing Area', label: 'Senior / Assisted Living Housing' },
  { id: 41, cat_id: 5, value: 'Duplex / Triplex / Fourplex Area', label: 'Duplex / Triplex / Fourplex' },
  { id: 42, cat_id: 5, value: 'Condominiums / Co-ops Area', label: 'Condominiums / Co-ops' },

  // Land
  { id: 43, cat_id: 6, value: 'Raw / Vacant Land Area', label: 'Raw / Vacant Land' },
  { id: 44, cat_id: 6, value: 'Development Land (zoned / permitted) Area', label: 'Development Land (zoned / permitted)' },
  { id: 45, cat_id: 6, value: 'Outlot / Pad Site Area', label: 'Outlot / Pad Site' },
  { id: 46, cat_id: 6, value: 'Land with Partial Improvements Area', label: 'Land with Partial Improvements' },
];



export const sideMenu = [
  { id: 1, title: "Property Details", path: "/property-details" },
  { id: 2, title: "Transaction Details", path: "/transaction-details" },
  { id: 3, title: "Property Features", path: "/property-features" },
  { id: 4, title: "Location Highlights", path: "/location-highlights" },
  { id: 5, title: "Financial / Tenancy Information", path: "/financial-tenency" },
  { id: 6, title: "Attachments / Media", path: "/media" },
  { id: 7, title: "Contact Information", path: "/contact-info" },
];