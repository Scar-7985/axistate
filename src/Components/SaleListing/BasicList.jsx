import React, { useState, useEffect } from 'react'
import ChipBox from "../Inputs/ChipBox"
import axios from 'axios';
import { isAuthenticated, POST_API } from '../../Auth/Define';
import { Countries, USAStates } from '../Reigons';
import { swalMsg } from '../SweetAlert2';
import { useNavigate } from 'react-router-dom';

const BasicList = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState([]);
  const [selectedSubProperty, setSelectedSubProperty] = useState([]);

  // Insert sub-property only wich have same main category property //
  const [showSubProperty, setShowSubProperty] = useState([]);
  // Insert sub-property only wich have same main category property //

  const propertyOptions = [
    { id: 1, value: 'Retail Area', label: 'Retail' },
    { id: 2, value: 'Multifamily Area', label: 'Multifamily' },
    { id: 3, value: 'Office Area', label: 'Office' },
    { id: 4, value: 'Industrial Area', label: 'Industrial' },
    { id: 5, value: 'Hospitality Area', label: 'Hospitality' },
    { id: 6, value: 'Self Storage Area', label: 'Self Storage' },
    { id: 7, value: 'Business For Sale Area', label: 'Business For Sale' },
  ];

  const subPropertyOptions = [
    { id: 1, cat_id: 1, value: 'Housing Area', label: 'Student Housing' },
    { id: 2, cat_id: 2, value: 'Rental Area', label: 'Single Family Rental Folio' },
    { id: 3, cat_id: 3, value: 'Park Area', label: 'RV Park' },
    { id: 4, cat_id: 4, value: 'Apartment Area', label: 'Apartment Building' },
    { id: 5, cat_id: 5, value: 'Bank Area', label: 'Bank' },
    { id: 6, cat_id: 6, value: 'Store Area', label: 'Convenience Store' },
    { id: 7, cat_id: 7, value: 'Business For Sale Area', label: 'Grocery Store' },
  ];


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
    propertyName: "",
    country: "United States",
    streetAddress: "",
    streetAddress2: "",
    zipCode: "",
    city: "",
    state: "California",
    latitude: "",
    longitude: "",
    reminder: "",
    diligance: "",
    expration_date: "",
    closing_days: "",
    earn_deposit: "",
    max_price: "",
    min_price: "",
    asking_price: "",
  });

  const [showUnpriced, setShowUnprised] = useState(false);

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
    PropertyData.append("property_name", formData.propertyName);
    PropertyData.append("street_address", formData.streetAddress);
    PropertyData.append("street_address2", formData.streetAddress2);
    PropertyData.append("zip_code", formData.zipCode);
    PropertyData.append("city", formData.city);
    PropertyData.append("state", formData.state);
    PropertyData.append("country", formData.country);
    PropertyData.append("latitude", formData.latitude);
    PropertyData.append("longitude", formData.longitude);
    PropertyData.append("reminder", formData.reminder);
    PropertyData.append("diligance", formData.diligance);
    PropertyData.append("expration_date", formData.expration_date);
    PropertyData.append("closing_days", formData.closing_days);
    PropertyData.append("earn_deposit", formData.earn_deposit);
    if (showUnpriced) {
      PropertyData.append("asking_price", formData.asking_price);
    } else {
      PropertyData.append("max_price", formData.max_price);
      PropertyData.append("min_price", formData.min_price);
    }
    axios.post(`${POST_API}/save-property.php`, PropertyData).then(resp => {
      const jsonData = resp.data;
      if (jsonData.status === 100) {
        swalMsg("success", resp.data.msg, 2000);
        window.localStorage.setItem("gtpnum", 2);
        window.localStorage.setItem("gtchngpg", true);
        window.localStorage.setItem("gtpid", resp.data.pid);
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

      <div className="widget-box-2 mb-20">
        <h5 className="title">Property Basics</h5>
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
              limit={5}
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
              limit={3}
              limitMsg="Cannot add more"
            />
          </fieldset>
          <fieldset className="box box-fieldset">
            <label>Property Name:</label>
            <input type="text" name='propertyName' value={formData.propertyName} onChange={handleChange} />
          </fieldset>
          <div>
            <h5 className='title'>Address</h5>
            <hr />
          </div>
          <fieldset className="box-fieldset">
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

          <div className="box grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Street Address 2:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter street address"
                name='streetAddress2'
                value={formData.streetAddress2}
                onChange={handleChange}
              />
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
          </div>


          <div className="box grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Longitude:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Longitude"
                name='longitude'
                value={formData.longitude}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Latitude:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter latitude"
                name='latitude'
                value={formData.latitude}
                onChange={handleChange}
              />
            </fieldset>
          </div>


          {/* <div className="box grid-3 gap-30">
            <fieldset className="box-fieldset">
              <label>
                Full Address:<span className='text-danger'>*</span>
              </label>
              <input type="text" className="form-control" placeholder="Enter property full address" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Zip Code:<span className='text-danger'>*</span>
              </label>
              <input type="text" className="form-control" placeholder="Enter property zip code" />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Country:<span className='text-danger'>*</span>
              </label>
              <div className="nice-select" tabindex="0"><span className="current">United States</span>
                <ul className="list">
                  <li data-value="1" className="option selected">United States</li>
                  <li data-value="2" className="option">United Kingdom</li>
                  <li data-value="3" className="option">Russia</li>
                </ul>
              </div>
            </fieldset>
          </div>
          <div className="box grid-2 gap-30">
            <fieldset className="box-fieldset">
              <label>
                Province/State:<span className='text-danger'>*</span>
              </label>
              <div className="nice-select" tabindex="0"><span className="current">None</span>
                <ul className="list">
                  <li data-value="1" className="option selected">None</li>
                  <li data-value="2" className="option">Texas</li>
                  <li data-value="3" className="option">New York</li>
                </ul>
              </div>
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Neighborhood:<span className='text-danger'>*</span>
              </label>
              <div className="nice-select" tabindex="0"><span className="current">None</span>
                <ul className="list">
                  <li data-value="1" className="option selected">None</li>
                  <li data-value="2" className="option">Little Italy</li>
                  <li data-value="3" className="option"> Bedford Park</li>
                </ul>
              </div>
            </fieldset>
          </div>
          <div className="box box-fieldset">
            <label>Location:<span className='text-danger'>*</span></label>
            <div className="box-ip">
              <input type="text" className="form-control" value="None" />
              <a href="#" className="btn-location"><i className="icon icon-location"></i></a>
            </div>
            <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d135905.11693909427!2d-73.95165795400088!3d41.17584829642291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727094281524!5m2!1sen!2s" height="456" style={{ border: "0" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

          </div> */}



        </div>
      </div>
      <div className="widget-box-2 mb-20">
        <h5 className="title">Asking Price and Terms</h5>
        <hr />
        <div className="box-price-property">
          <div className="box grid-2 gap-30">

            <div className="box grid-1 gap-30">
              <fieldset className="box-fieldset">
                <label>Asking Price:<span className='text-danger'>*</span></label>

                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter price"
                    disabled={showUnpriced === true}
                    name='asking_price'
                    value={formData.asking_price}
                    onChange={handleChange}
                  />
                  <div style={{
                    position: "absolute", right: "0",
                    top: "50%", transform: "translateY(-50%)",
                    backgroundColor: "#F6F6F6",
                    cursor: "pointer",
                    height: "100%",
                    padding: "0 10px",
                    display: "flex",
                    alignItems: "center",
                    borderTopRightRadius: "26px",
                    borderBottomRightRadius: "26px"
                  }}>
                    <input type="checkbox" checked={showUnpriced} onChange={() => setShowUnprised(!showUnpriced)} className='form-checkbox' />
                    <span style={{ marginLeft: "6px", fontWeight: "500", fontSize: "14px" }}>Unpriced</span>
                  </div>
                </div>
              </fieldset>
              {/* Show Unpriced Options */}
              {
                showUnpriced &&
                <div className="box grid-2 gap-30 mt-30">
                  <fieldset className="box-fieldset">
                    <label>
                      Min Price:<span className='text-danger'>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder='Min price'
                    />
                  </fieldset>
                  <fieldset className="box-fieldset">
                    <label>
                      Max Price:<span className='text-danger'>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder='Max price'
                    />
                  </fieldset>
                </div>
              }
            </div>

            <fieldset className="box-fieldset">
              <label>
                Earnest money deposit:
              </label>
              <input
                type="text"
                name='earn_deposit'
                value={formData.earn_deposit}
                onChange={handleChange}
              />

            </fieldset>



          </div>



          <div className="grid-2 gap-30">
            <fieldset className="box-fieldset">
              <label>
                Due diligence period (days):<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder='Number of days'
                name='diligance'
                value={formData.diligance}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Closing Period (Days):<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder='Number of days'
                name='closing_days'
                value={formData.closing_days}
                onChange={handleChange}
              />
            </fieldset>

          </div>

          <h5 className="title mt-30">Listing Expiration</h5>
          <hr />
          <div className="box-price-property">
            <div className="grid-2 gap-30">
              <fieldset className="box-fieldset">
                <label>
                  Expiration Date:<span className='text-danger'>*</span>
                </label>
                <input
                  type="date"
                  name='expration_date'
                  value={formData.expration_date}
                  onChange={handleChange}
                />

              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Send me a reminder:<span className='text-danger'>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder='Reminder days in number'
                  name='reminder'
                  value={formData.reminder}
                  onChange={handleChange}
                />
              </fieldset>

            </div>
          </div>

        </div>
      </div>

      <div className="box-btn mt-30">
        <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
      </div>
    </div>
  )
}

export default BasicList;
