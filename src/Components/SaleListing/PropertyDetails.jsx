import React, { useState, useEffect } from 'react'
import ChipBox from "../Inputs/ChipBox"
import axios from 'axios';
import { isAuthenticated, POST_API } from '../../Auth/Define';
import { Countries, USAStates } from '../Reigons';
import { swalMsg } from '../SweetAlert2';
import { useNavigate } from 'react-router-dom';

export const PropertyDetails = () => {

  const navigate = useNavigate();
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }


  const handleSubmit = () => {
    if (isLoading) return;
    setIsLoading(true);
    const PropertyData = new FormData();

    PropertyData.append("cuid", isAuthenticated);

    if (selectedProperty.length > 0) {
      const propertyType = selectedProperty.map((item) => item.label).join(", ");
      PropertyData.append("property_type", propertyType);
    }
    if (selectedSubProperty.length > 0) {
      const propertySubType = selectedSubProperty.map((item) => item.label).join(", ");
      PropertyData.append("property_subtype", propertySubType);
    }

    PropertyData.append("property_name", formData.property_name);
    PropertyData.append("street_address", formData.street_address);
    PropertyData.append("country", formData.country);
    PropertyData.append("city", formData.city);
    PropertyData.append("state", formData.state);
    PropertyData.append("zip", formData.zip);
    PropertyData.append("zoning", formData.zoning);
    PropertyData.append("year_built", formData.year_built);
    PropertyData.append("lot_size", formData.lot_size);
    PropertyData.append("building_size", formData.building_size);
    PropertyData.append("num_floors", formData.num_floors);
    PropertyData.append("parking_spaces", formData.parking_spaces);

    axios.post(`${POST_API}/property-details.php`, PropertyData).then(resp => {
      const jsonData = resp.data;
      console.log(jsonData);
      
      // if (jsonData.status === 100) {
      //   swalMsg("success", resp.data.msg, 2000);
      //   window.localStorage.setItem("gtpnum", 2);
      //   window.localStorage.setItem("gtchngpg", true);
      //   window.localStorage.setItem("gtpid", resp.data.pid);
      //   setTimeout(() => {
      //     navigate("/add-sale");
      //   }, 1000);
      // } else {
      //   swalMsg("error", resp.data.msg, 2000);
      // }

    })
    setIsLoading(false);
  }



  return (
    <div className="main-content-inner">

      <div className="widget-box-2 mb-20 shadow">
        <h5 className="title">Property Details</h5>
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
          </fieldset>

          <fieldset className="box box-fieldset">
            <label>Property Subtype:</label>
            <ChipBox
              options={showSubProperty}
              value={selectedSubProperty}
              onChange={setSelectedSubProperty}
              placeholder="Select"
              limit={4}
              limitMsg="Cannot add more"
            />
          </fieldset>
          <fieldset className="box box-fieldset">
            <label>Building / Project Name:</label>
            <input type="text" name='propertyName' placeholder='' value={formData.propertyName} onChange={handleChange} />
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
              name='streetAddress'
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </fieldset>


          <fieldset className="box-fieldset mt-30">
            <label>
              Country:<span className='text-danger'>*</span>
            </label>
            <div className="nice-select" tabindex="0">
              <span className="current">{formData.country}</span>
              <ul className="list" style={{ maxHeight: "250px" }}>
                {
                  Countries.map((item, index) => {
                    return <li data-value={index} className={`option ${item.label === formData.country ? "selected focus" : ""}`}
                      onClick={() => setFormData({ ...formData, country: item.label })}>{item.label}</li>
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
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                State:<span className='text-danger'>*</span>
              </label>
              <div className="nice-select" tabindex="0">
                <span className="current">{formData.state}</span>
                <ul className="list" style={{ maxHeight: "250px" }}>
                  {
                    USAStates.map((item, index) => {
                      return <li data-value={index} className={`option ${item.title === formData.state ? "selected focus" : ""}`}
                        onClick={() => setFormData({ ...formData, state: item.title })}>{item.title}</li>
                    })
                  }
                </ul>
              </div>
            </fieldset>


            <fieldset className="box-fieldset">
              <label>
                Zip Code:<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Zip code here"
                name='zipCode'
                value={formData.zipCode}
                onChange={handleChange}
              />
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
            </fieldset>
             <fieldset className="box-fieldset">
              <label>
                Year Built/ Renovated:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Built/ Renovated Year"
                name='year_built'
                value={formData.year_built}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className="box grid-2 gap-30 mt-30">
           
            <fieldset className="box-fieldset">
              <label>
                Lot Size (Acres / Sq Ft.):
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter lot size"
                name='lot_size'
                value={formData.lot_size}
                onChange={handleChange}
              />
            </fieldset>
              <fieldset className="box-fieldset">
              <label>
                Building Size (Sq Ft.):
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter building size"
                name='building_size'
                value={formData.building_size}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className="box grid-2 gap-30 mt-30">
          
            <fieldset className="box-fieldset">
              <label>
                Number of Floors:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter number of floors"
                name='num_floors'
                value={formData.num_floors}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Parking Spaces / Ratio:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter parking space / ratio"
                name='parking_spaces'
                value={formData.parking_spaces}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className="box grid-2 gap-30 mt-30">
            

          </div>

          <div className="box-btn" style={{ marginTop: "60px" }}>
            <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
          </div>

        </div>
      </div>

    </div>
  )
}



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