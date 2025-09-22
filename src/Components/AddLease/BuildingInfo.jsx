import React, { useState, useEffect } from 'react'
import ChipBox from "../Inputs/ChipBox"
import axios from 'axios';
import { isAuthenticated, POST_API } from '../../Auth/Define';
import { Countries, USAStates } from '../Reigons';
import { swalMsg } from '../SweetAlert2';
import { useNavigate } from 'react-router-dom';

const BuildingInfo = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState([]);
  const [selectedSubSpace, setSelectedSubSpace] = useState([]);

  // Insert sub-property only wich have same main category property //
  const [showSubSpace, setShowSubSpace] = useState([]);
  // Insert sub-property only wich have same main category property //

  const spaceOptions = [
    { id: 1, value: 'Retail Area', label: 'Retail' },
    { id: 2, value: 'Multifamily Area', label: 'Multifamily' },
    { id: 3, value: 'Office Area', label: 'Office' },
    { id: 4, value: 'Industrial Area', label: 'Industrial' },
    { id: 5, value: 'Hospitality Area', label: 'Hospitality' },
    { id: 6, value: 'Self Storage Area', label: 'Self Storage' },
    { id: 7, value: 'Business For Sale Area', label: 'Business For Sale' },
  ];

  const subSpaceOptions = [
    { id: 1, cat_id: 1, value: 'Housing Area', label: 'Student Housing' },
    { id: 2, cat_id: 2, value: 'Rental Area', label: 'Single Family Rental Folio' },
    { id: 3, cat_id: 3, value: 'Park Area', label: 'RV Park' },
    { id: 4, cat_id: 4, value: 'Apartment Area', label: 'Apartment Building' },
    { id: 5, cat_id: 5, value: 'Bank Area', label: 'Bank' },
    { id: 6, cat_id: 6, value: 'Store Area', label: 'Convenience Store' },
    { id: 7, cat_id: 7, value: 'Business For Sale Area', label: 'Grocery Store' },
  ];


  useEffect(() => {
    const AllId = selectedSpace.map((item) => item.id);

    const filteredSubSpaceData = subSpaceOptions.filter((item) =>
      AllId.includes(item.cat_id)
    );

    // Replace the whole array to remove unlinked sub-properties
    setShowSubSpace(filteredSubSpaceData);

    setSelectedSubSpace((prev) =>
      prev.filter((item) => AllId.includes(item.cat_id))
    );

  }, [selectedSpace]);


  const [formData, setFormData] = useState({
    spaceName: "",
    tenancy: "Single",
    country: "United States",
    address: "",
    longitude: "",
    latitude: "",
    submarket: "",
    submarketCluster: "",
    rateType: "",
    listingType: "Direct",
    rsf: "",
    usf: "",
    leaseType: "Select",
    officeAvailable: "",
    rate: "",
    totalCam: "",
    expenseRate: "",
    totalRate: "",
    totalMonthlyRate: "",
    leaseTerm: "Select",
    parking: "",
    floorplans: null,
    totalBuildingSqft: "",
    loadFactor: "",
    vacantSqft: "",
    buildingFar: "",
    landAcres: "",
    lotSize: "",
    lotSizeMeasurement: "acres",
    class: "N/A",
    yearBuilt: "",
    yearRenovated: "",
    buildings: "",
    stories: "",
    clearHeight: "",
    frontage: "",
    taxes: "",
    loadingDocks: "",
    dockHighDoors: "",
    driveIns: "",
    totalParkingSpaces: "",
    power: "",
    elevators: "N/A",
    collectionStreet: "",
    crossStreet: "",
    zoning: "",
    apn: "",
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

    if (selectedSpace.length > 0) {
      const propertyType = selectedSpace.map((item) => item.label).join(", ");
      PropertyData.append("space_type", propertyType);
    }
    if (selectedSubSpace.length > 0) {
      const propertySubType = selectedSubSpace.map((item) => item.label).join(", ");
      PropertyData.append("space_subtype", propertySubType);
    }
    PropertyData.append("space_name", formData.spaceName);
    PropertyData.append("tenancy", formData.tenancy);
    PropertyData.append("longitude", formData.longitude);
    PropertyData.append("latitude", formData.latitude);
    PropertyData.append("submarket", formData.submarket);
    PropertyData.append("submarket_cluster", formData.submarketCluster);
    PropertyData.append("address", formData.address);
    PropertyData.append("rate_type", formData.rateType);
    PropertyData.append("listing_type", formData.listingType);
    PropertyData.append("rsf", formData.rsf); // rent square feet
    // PropertyData.append("rsf_min", formData.earn_deposit);
    // PropertyData.append("rsf_ax", formData.earn_deposit);
    PropertyData.append("usf", formData.usf);
    PropertyData.append("lease_type", formData.leaseType);
    PropertyData.append("office_available", formData.officeAvailable);
    PropertyData.append("rate", formData.rate);
    // PropertyData.append("rate_min", formData.rate_min);
    // PropertyData.append("rate_max", formData.rate_max);
    PropertyData.append("total_cam", formData.totalCam);
    PropertyData.append("expense_rate", formData.expenseRate);
    PropertyData.append("total_rate", formData.totalRate);
    PropertyData.append("monthly_rate", formData.totalMonthlyRate);
    PropertyData.append("lease_term", formData.leaseTerm);
    PropertyData.append("parking", formData.parking);
    PropertyData.append("floorplans", formData.floorplans);
    PropertyData.append("total_building", formData.totalBuildingSqft);
    PropertyData.append("vacant_sqrt", formData.vacantSqft);
    PropertyData.append("land_acres", formData.landAcres);
    PropertyData.append("lot_size", formData.lotSize);
    // PropertyData.append("lot_min", formData.lotMin);
    // PropertyData.append("lot_max", formData.lotMax);
    PropertyData.append("lot_measurement", formData.lotSizeMeasurement);
    PropertyData.append("taxes", formData.taxes);
    PropertyData.append("parking_spaces", formData.parking);
    PropertyData.append("power", formData.power);
    PropertyData.append("cross_street", formData.crossStreet);
    PropertyData.append("zoing", formData.zoning);
    PropertyData.append("apn", formData.apn);

    // if (showUnpriced) {
    //   PropertyData.append("asking_price", formData.asking_price);
    // } else {
    //   PropertyData.append("max_price", formData.max_price);
    //   PropertyData.append("min_price", formData.min_price);
    // }

    axios.post(`${POST_API}/lease_info.php`, PropertyData).then(resp => {
      const jsonData = resp.data;
      if (jsonData.status === 100) {
        swalMsg("success", resp.data.msg, 2000);
        window.localStorage.setItem("gtlpnum", 2);
        window.localStorage.setItem("gtlchngpg", true);
        window.localStorage.setItem("gtlid", resp.data.lid);
        setTimeout(() => {
          navigate("/add-lease");
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
        <h5 className="title">Basics Info</h5>
        <hr />
        <div className="box-info-property">
          <div className="box grid-2 gap-30 mt-30">
            <fieldset className="box box-fieldset">
              <label>
                Space  type:<span className='text-danger'>*</span>
              </label>
              <ChipBox
                options={spaceOptions}
                value={selectedSpace}
                onChange={setSelectedSpace}
                placeholder="Select"
                limit={5}
                limitMsg="Cannot add more"
              />
            </fieldset>

            <fieldset className="box box-fieldset">
              <label>Space Subtype:</label>
              <ChipBox
                options={showSubSpace}
                value={selectedSubSpace}
                onChange={setSelectedSubSpace}
                placeholder="Select"
                limit={3}
                limitMsg="Cannot add more"
              />
            </fieldset>
          </div>
          <div className="box grid-2 gap-30 mt-30">
            <fieldset className="box box-fieldset">
              <label>Space Name:</label>
              <input type="text" name='spaceName' placeholder='Enter space name' value={formData.spaceName} onChange={handleChange} />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Tenancy:<span className='text-danger'>*</span>
              </label>
              <div className="nice-select" tabIndex="0">
                <span className="current">{formData.tenancy}</span>
                <ul className="list" style={{ maxHeight: "250px" }}>
                  <li data-value={"Single"} className={`option  selected focus`}
                    onClick={() => setFormData({ ...formData, tenancy: "Single" })}>Single</li>
                  <li data-value={"Multi"} className={`option`}
                    onClick={() => setFormData({ ...formData, tenancy: "Multi" })}>Multi</li>
                </ul>
              </div>
            </fieldset>
          </div>
          <div>
            <h5 className='title'>Address</h5>
            <hr />
          </div>
          <fieldset className="box-fieldset">
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

          <fieldset className="box-fieldset mt-30">
            <label>
              Address:<span className='text-danger'>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              name='address'
              value={formData.address}
              onChange={handleChange}
            />
          </fieldset>




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

          <div className="box grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Submarket:
              </label>
              <input
                type="text"
                className="form-control"
                name='submarket'
                value={formData.submarket}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Submarket Cluster:
              </label>
              <input
                type="text"
                className="form-control"
                name='submarketCluster'
                value={formData.submarketCluster}
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
              <div className="nice-select" tabIndex="0"><span className="current">United States</span>
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
              <div className="nice-select" tabIndex="0"><span className="current">None</span>
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
              <div className="nice-select" tabIndex="0"><span className="current">None</span>
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
      <div className="widget-box-2 mb-20 shadow">
        <h5 className="title">Space Details</h5>
        <hr />
        <div className="box-price-property">

          <div className="grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Rate Type:<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='rateType'
                value={formData.rateType}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Listing Type:<span className='text-danger'>*</span>
              </label>
              <div className="nice-select" tabIndex="0">
                <span className="current">{formData.listingType}</span>
                <ul className="list" style={{ maxHeight: "250px" }}>
                  {
                    ["Direct", "Sublet"].map((item, index) => {
                      return (
                        <li data-value={index} className={`option ${item === formData.listingType ? "selected focus" : ""}`}
                          onClick={() => setFormData({ ...formData, listingType: item })} key={index}>{item}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </fieldset>

          </div>

          <div className="grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                RSF (Rentable SQFT):
              </label>
              <input
                type="text"
                className="form-control"
                name='rsf'
                value={formData.rsf}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                USF (Usable SQFT):<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='usf'
                value={formData.usf}
                onChange={handleChange}
              />
            </fieldset>

          </div>

          <div className="grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Lease Type:
              </label>
              <div className="nice-select" tabIndex="0">
                <span className="current">{formData.leaseType}</span>
                <ul className="list" style={{ maxHeight: "250px" }}>
                  {
                    ["Net", "NNN", "Gross", "Modified Gross", "Full Service"].map((item, index) => {
                      return (
                        <li data-value={index} className={`option ${item === formData.leaseType ? "selected focus" : ""}`}
                          onClick={() => setFormData({ ...formData, leaseType: "Net" })} key={index}>{item}</li>
                      )
                    })
                  }

                </ul>
              </div>
            </fieldset>

            <fieldset className="box-fieldset">
              <label>
                Office Available:<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='officeAvailable'
                value={formData.officeAvailable}
                onChange={handleChange}
              />
            </fieldset>



          </div>

          <div className="grid-2 gap-30 mt-30">

            <fieldset className="box-fieldset">
              <label>
                Rate (per Sq Ft):<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='rate'
                value={formData.rate}
                onChange={handleChange}
              />
            </fieldset>

            <fieldset className="box-fieldset">
              <label>
                Total CAM (Per SF/MO):
              </label>
              <input
                type="text"
                className="form-control"
                name='totalCam'
                value={formData.totalCam}
                onChange={handleChange}
              />
            </fieldset>


          </div>

          <div className="grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Expense Rate (Per SF/MO):<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='expenseRate'
                value={formData.expenseRate}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Total Rate:
              </label>
              <input
                type="text"
                className="form-control"
                name='totalRate'
                value={formData.totalRate}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className="grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Total Monthly Rate:<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='totalMonthlyRate'
                value={formData.totalMonthlyRate}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="box-fieldset">
              <label>
                Lease Term:
              </label>
              <div className="nice-select" tabIndex="0">
                <span className="current">{formData.leaseTerm}</span>
                <ul className="list" style={{ maxHeight: "250px" }}>
                  {
                    ["Monthly", "Short Terms", "Long Term", "1-2 Years", "2-4 Years", "5+ Years", "Negotiable", "Flexible"].map((item, index) => {
                      return (
                        <li data-value={index} className={`option ${item === formData.leaseTerm ? "selected focus" : ""}`}
                          onClick={() => setFormData({ ...formData, leaseTerm: item })} key={index}>{item}</li>
                      )
                    })
                  }
                </ul>
              </div>
            </fieldset>


          </div>
          <div className="grid-2 gap-30 mt-30">
            <fieldset className="box-fieldset">
              <label>
                Parking:<span className='text-danger'>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name='parking'
                value={formData.parking}
                onChange={handleChange}
              />
            </fieldset>
          </div>

          <div className='d-none' style={{ marginTop: "80px" }}>
            <hr />
            <div className='text-center mx-auto mt-5'>Click the document icon below to upload your space's floorplan. You can also drag and drop it into the grey square below to upload.</div>

          </div>


          <div style={{ marginTop: "80px" }}></div>
          <h5 className="title">Building Details</h5>
          <span className='mt-5' style={{ fontWeight: "600" }}>Building Size</span>
          <hr />
          <div className="box-price-property">

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Total Building SQFT:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='totalBuildingSqft'
                  value={formData.totalBuildingSqft}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Load Factor:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='loadFactor'
                  value={formData.loadFactor}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Vacant SQFT:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='vacantSqft'
                  value={formData.vacantSqft}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Building FAR:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='buildingFar'
                  value={formData.buildingFar}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Land Acres:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='landAcres'
                  value={formData.landAcres}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Lot Size:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='lotSize'
                  value={formData.lotSize}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Lot Size Measurement:
                </label>
                <div className="nice-select" tabIndex="0">
                  <span className="current">{formData.lotSizeMeasurement}</span>
                  <ul className="list" style={{ maxHeight: "250px" }}>
                    {
                      ["acres", "sq ft"].map((item, index) => {
                        return (
                          <li data-value={index} className={`option ${item === formData.lotSizeMeasurement ? "selected focus" : ""}`}
                            onClick={() => setFormData({ ...formData, lotSizeMeasurement: item })} key={index}>{item}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </fieldset>

            </div>

            <div style={{ marginTop: "50px" }}>
              <h6 className='title'>Building Specs</h6>
              <hr />
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Class:
                </label>
                <div className="nice-select" tabIndex="0">
                  <span className="current">{formData.class}</span>
                  <ul className="list" style={{ maxHeight: "250px" }}>
                    {
                      ["A", "B", "C", "D"].map((item, index) => {
                        return (
                          <li data-value={index} className={`option ${item === formData.class ? "selected focus" : ""}`}
                            onClick={() => setFormData({ ...formData, class: item })} key={index}>{item}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Year Built:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='yearBuilt'
                  value={formData.yearBuilt}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Year Renovated:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='yearRenovated'
                  value={formData.yearRenovated}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Buildings:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='buildings'
                  value={formData.buildings}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Stories:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='stories'
                  value={formData.stories}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Clear Height:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='clearHeight'
                  value={formData.clearHeight}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Frontage:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='frontage'
                  value={formData.frontage}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Taxes (const per SQFT):
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='taxes'
                  value={formData.taxes}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Loading Docks:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='loadingDocks'
                  value={formData.loadingDocks}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Dock High Doors:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='dockHighDoors'
                  value={formData.dockHighDoors}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Drive Ins:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='driveIns'
                  value={formData.driveIns}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Dock High Doors:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='totalParkingSpaces'
                  value={formData.totalParkingSpaces}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Power:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='power'
                  value={formData.power}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Elevators?
                </label>
                <div className="nice-select" tabIndex="0">
                  <span className="current">{formData.elevators}</span>
                  <ul className="list" style={{ maxHeight: "250px" }}>
                    {
                      ["Yes", "No"].map((item, index) => {
                        return (
                          <li data-value={index} className={`option ${item === formData.elevators ? "selected focus" : ""}`}
                            onClick={() => setFormData({ ...formData, elevators: item })} key={index}>{item}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </fieldset>
            </div>

          </div>



          <div style={{ marginTop: "80px" }}></div>
          <h6 className='mt-5'>Location Details</h6>
          <hr />
          <div className="box-price-property">

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Collection Street:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='collectionStreet'
                  value={formData.collectionStreet}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  Cross Street:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='crossStreet'
                  value={formData.crossStreet}
                  onChange={handleChange}
                />
              </fieldset>
            </div>

            <div className="grid-2 gap-30 mt-30">
              <fieldset className="box-fieldset">
                <label>
                  Zoning:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='zoning'
                  value={formData.zoning}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="box-fieldset">
                <label>
                  APN:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='apn'
                  value={formData.apn}
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

export default BuildingInfo;
