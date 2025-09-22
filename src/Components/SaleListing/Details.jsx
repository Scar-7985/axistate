import axios from "axios";
import React, { useState } from "react";
import { swalMsg } from "../SweetAlert2";
import { POST_API } from "../../Auth/Define";
import ChipBox from "../Inputs/ChipBox";
import { useNavigate } from "react-router-dom";

const Details = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const SaleConditionOption = [
    { title: "N/A" },
    { title: "1013 Exchange" },
    { title: "For sale by owner" },
    { title: "Bank owned foreclosure" },
    { title: "Distressed" },
    { title: "Sale for Leaseback" },
  ];

  const BrandOption = [
    { title: "Dollar Generals" },
    { title: " Wall Greens" },
    { title: " CVC Pharmacy" },
  ];

  const ClassOption = [
    { title: "N/A" },
    { title: "A" },
    { title: "B" },
    { title: "C" },
    { title: "D" },
  ];
  const LotSizeOption = [
    { title: "N/A" },
    { title: "acres" },
    { title: "sq ft" },
  ];
  const BrokerOption = [
    { title: "N/A" },
    { title: "Yes" },
    { title: "No" },
  ];
  const InvTypeOption = [
    { title: "N/A" },
    { title: "Institutional" },
    { title: "Owner/User" },
  ];
  const LeaseTypeOption = [
    { title: "N/A" },
    { title: "Net" },
    { title: "NN" },
    { title: "NN+" },
  ];
  const [selectedTenant, setSelectedTenant] = useState([]);
  const TenantCredit = [
    { id: 1, value: 'Credit Rated', label: 'Credit' },
    { id: 2, value: 'Franchisee', label: 'Franchisee' },
  ];

  const TenancyOption = [
    { id: 1, value: 'Tenancy 1', label: 'Credit' },
    { id: 2, value: 'Tenancy 2', label: 'Franchisee' },
  ];
  const grounLeaseOption = [
    { id: 1, value: 'Lease 1', label: 'Credit' },
    { id: 2, value: 'Lease 2', label: 'Franchisee' },
  ];
  const parkingOption = [
    { id: 1, value: 'Lease 1', label: 'Credit' },
    { id: 2, value: 'Lease 2', label: 'Franchisee' },
  ];
  const rentBumpOption = [
    { id: 1, value: 'Lease 1', label: 'Credit' },
    { id: 2, value: 'Lease 2', label: 'Franchisee' },
  ];



  const [formData, setFormData] = useState({
    saleCondition: "",
    brand: "",
    ownership: "",
    class: "",
    squareFeet: "",
    netRentable: "",
    airRights: "",
    units: "",
    pumps: "",
    pads: "",
    beds: "",
    year_built: "",
    year_renovated: "",
    buildings: "",
    stories: "",
    zoning: "",
    lotMeasurement: "",
    lotSize: "",
    APN: "",
    brokerCo: "",
    invType: "",
    invSubType: "",
    tenancy: "",
    numTenancy: "",
    occupancy: "",
    occupancyDate: "",
    netOperatingIncome: "",
    capRate: "",
    proForma: "",
    proFormaCap: "",
    price: "",
    priceSqFt: "",
    priceSf: "",
    leaseExpiration: "",
    leaseCommen: "",
    leaseType: "",
    leaseoption: "",
    leaseTerm: "",
    remainingTerm: "",
    groundLease: "",
    groundLeaseExp: "",
    groundLeaseRemain: "",
    parkingType: "",
    rentBumps: "",
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
    registerData.append("sale_condition", formData.saleCondition);
    registerData.append("brand", formData.brand);
    registerData.append("ownership", formData.ownership);
    registerData.append("class", formData.class);
    registerData.append("square_feet", formData.squareFeet);
    registerData.append("net_rentable", formData.netRentable);
    registerData.append("air_rights", formData.airRights);
    registerData.append("units", formData.units);
    registerData.append("pumps", formData.pumps);
    registerData.append("built_year", formData.year_built);
    registerData.append("renovate", formData.year_renovated);
    registerData.append("builing", formData.buildings);
    registerData.append("stories", formData.stories);
    registerData.append("zoning", formData.zoning);
    registerData.append("measurement", formData.lotMeasurement);
    registerData.append("lot_size", formData.lotSize);
    registerData.append("apn", formData.APN);
    registerData.append("agent_co", formData.brokerCo);
    registerData.append("inv_type", formData.invType);
    registerData.append("inv_subtype", formData.invSubType);
    registerData.append("occupancy", formData.occupancy);
    registerData.append("occupancy_date", formData.occupancyDate);
    registerData.append("opt_income", formData.netOperatingIncome);
    registerData.append("cap_rate", formData.capRate);
    registerData.append("pro_forma", formData.proForma);
    registerData.append("pro_forma_cap", formData.proFormaCap);
    registerData.append("price_sqft", formData.priceSqFt);
    registerData.append("price_sf", formData.priceSf);
    registerData.append("lease_type", formData.leaseType);
    if (selectedTenant.length > 0) {
      const joinTenants = selectedTenant.map((item) => item.label).join(", ");
      registerData.append("tenant_credit", joinTenants);
    }
    registerData.append("tenancy", formData.tenancy);
    registerData.append("num_of_tenants", formData.numTenancy);
    registerData.append("lease_commen", formData.leaseCommen);
    registerData.append("lease_expiration", formData.groundLeaseExp);
    registerData.append("lease_term", formData.leaseTerm);
    registerData.append("remaining_term", formData.remainingTerm);
    registerData.append("lease_options", formData.leaseoption);
    registerData.append("ground_lease", formData.groundLease);
    // registerData.append("ground_lease_expiration", "formData.licenceNumber");
    registerData.append("lease_remaining", formData.groundLeaseRemain);
    registerData.append("parking_type", formData.parkingType);
    registerData.append("rent_bumps", formData.rentBumps);
    // Not Added Yet
    registerData.append("bads", "no input");
    registerData.append("pads", "no input");
    registerData.append("dock_high", "no input");
    registerData.append("docks", "no input");
    registerData.append("ceiling_height", "no input");
    registerData.append("keyss", "no input");
    registerData.append("unite_type", "no input");
    registerData.append("price_keys", "no input");
    registerData.append("rent_details", "no input");

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
      <div className="widget-box-2 mb-20">
        <h5 className="title" >Details</h5>
        <h6 onClick={handleSubmit}>Property Details</h6> <hr />
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>
              Property Type:<span>*</span>
            </label>
            <div className="nice-select" tabindex="0">
              <span className="current">Choose</span>
              <ul className="list">
                <li data-value="1" className="option">
                  Apartment
                </li>
                <li data-value="2" className="option">
                  Villa
                </li>
              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>
              Property Subtype:<span>*</span>
            </label>
            <div className="nice-select" tabindex="0">
              <span className="current">Choose</span>
              <ul className="list">
                <li data-value="1" className="option">
                  For Rent
                </li>
                <li data-value="2" className="option">
                  For Sale
                </li>
              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>
              Sale Condition:<span>*</span>
            </label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.saleCondition !== "" ? formData.saleCondition : "Choose"}`}</span>
              <ul className="list">
                {
                  SaleConditionOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, saleCondition: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">

          <fieldset className="box-fieldset">
            <label>Tenant/Brand</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.brand !== "" ? formData.brand : "Choose"}`}</span>
              <ul className="list">
                {
                  BrandOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, brand: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Ownership:</label>
            <input
              type="text"
              className="form-control"
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Class</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.class !== "" ? formData.class : "Choose"}`}</span>
              <ul className="list">
                {
                  ClassOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, class: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Square feet</label>
            <input
              type="text"
              className="form-control"
              name="squareFeet"
              value={formData.squareFeet}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Net rentable (sq ft)</label>
            <input
              type="text"
              className="form-control"
              name="netRentable"
              value={formData.netRentable}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Air rights (sq ft)</label>
            <input
              type="text"
              className="form-control"
              name="airRights"
              value={formData.airRights}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Units</label>
            <input
              type="text"
              className="form-control"
              name="units"
              value={formData.units}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Pumps</label>
            <input
              type="text"
              className="form-control"
              name="pumps"
              value={formData.pumps}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Year(s) built</label>
            <input
              type="text"
              className="form-control"
              name="year_built"
              value={formData.year_built}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Year(s) renovated</label>
            <input
              type="text"
              className="form-control"
              name="year_renovated"
              value={formData.year_renovated}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Buildings</label>
            <input
              type="text"
              className="form-control"
              name="buildings"
              value={formData.buildings}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Stories</label>
            <input
              type="text"
              className="form-control"
              name="stories"
              value={formData.stories}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Zoning</label>
            <input
              type="text"
              className="form-control"
              name="zoning"
              value={formData.zoning}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Lot size measurement</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.lotMeasurement !== "" ? formData.lotMeasurement : "Choose"}`}</span>
              <ul className="list">
                {
                  LotSizeOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, lotMeasurement: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Lot size</label>
            <input
              type="text"
              className="form-control"
              name="lotSize"
              value={formData.lotSize}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>APN</label>
            <input
              type="text"
              className="form-control"
              name="APN"
              value={formData.APN}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Broker/Agent Co-op</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.brokerCo !== "" ? formData.brokerCo : "Choose"}`}</span>
              <ul className="list">
                {
                  BrokerOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, brokerCo: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="widget-box-2 mb-20">
        <h6>Investment Details</h6> <hr />
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Investment type</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.invType !== "" ? formData.invType : "Choose"}`}</span>
              <ul className="list">
                {
                  InvTypeOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, invType: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Investment sub type</label>
            <input type="text" name="invSubType" value={formData.invSubType} onChange={handleChange} />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Occupancy</label>
            <input type="text" name="occupancy" value={formData.occupancy} onChange={handleChange} />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Occupancy date</label>
            <input type="date" name="occupancyDate" value={formData.occupancyDate} onChange={handleChange} />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Net operating income</label>
            <input type="text" name="netOperatingIncome" value={formData.netOperatingIncome} onChange={handleChange} />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Cap rate</label>
            <input type="text" name="capRate" value={formData.capRate} onChange={handleChange} />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Pro-forma NOI</label>
            <input type="text" name="proForma" value={formData.proForma} onChange={handleChange} />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Pro-forma cap rate</label>
            <input type="text" name="proFormaCap" value={formData.proFormaCap} onChange={handleChange} />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Price / SqFt</label>
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Price/SF (Land Value)</label>
            <input type="text" name="priceSf" value={formData.priceSf} onChange={handleChange} />
          </fieldset>
        </div>
      </div>

      <div className="widget-box-2 mb-20">
        <h6>Lease and Tenant Information</h6> <hr />
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Lease type</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.leaseType !== "" ? formData.leaseType : "Choose"}`}</span>
              <ul className="list">
                {
                  LeaseTypeOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, leaseType: item.title })}>
                        {item.title}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            {/* Add Multi Select */}
            <label>Tenant credit</label>
            <ChipBox
              options={TenantCredit}
              value={selectedTenant}
              onChange={setSelectedTenant}
              placeholder="Select"
              limit={5}
              limitMsg="Cannot add more"
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Tenancy</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.tenancy !== "" ? formData.tenancy : "Choose"}`}</span>
              <ul className="list">
                {
                  TenancyOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, tenancy: item.label })}>
                        {item.label}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Number of tenants</label>
            <input
              type="text"
              className="form-control"
              name="numTenancy"
              value={formData.numTenancy}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Lease commencement</label>
            <input
              type="date"
              className="form-control"
              name="leaseCommen"
              value={formData.leaseCommen}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Lease expiration</label>
            <input
              type="date"
              className="form-control"
              name="leaseExpiration"
              value={formData.leaseExpiration}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Lease term (years)</label>
            <input
              type="text"
              className="form-control"
              name="leaseTerm"
              value={formData.leaseTerm}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Remaining term (years)</label>
            <input
              type="text"
              className="form-control"
              name="remainingTerm"
              value={formData.remainingTerm}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Lease options</label>
            <input
              type="text"
              className="form-control"
              name="leaseoption"
              value={formData.leaseoption}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Ground Lease</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.groundLease !== "" ? formData.groundLease : "Choose"}`}</span>
              <ul className="list">
                {
                  grounLeaseOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, groundLease: item.value })}>
                        {item.value}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Ground lease expiration</label>
            <input
              type="date"
              className="form-control"
              name="groundLeaseExp"
              value={formData.groundLeaseExp}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Ground lease remaining</label>
            <input
              type="text"
              className="form-control"
              name="groundLeaseRemain"
              value={formData.groundLeaseRemain}
              onChange={handleChange}
            />
          </fieldset>
        </div>
        <div className="box grid-3 gap-30">
          <fieldset className="box-fieldset">
            <label>Parking type</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.parkingType !== "" ? formData.parkingType : "Choose"}`}</span>
              <ul className="list">
                {
                  parkingOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, parkingType: item.value })}>
                        {item.label}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
          <fieldset className="box-fieldset">
            <label>Rent Bumps</label>
            <div className="nice-select" tabindex="0">
              <span className="current">{`${formData.rentBumps !== "" ? formData.rentBumps : "Choose"}`}</span>
              <ul className="list">
                {
                  rentBumpOption.map((item, index) => {
                    return (
                      <li data-value={index} className="option" key={index} onClick={() => setFormData({ ...formData, rentBumps: item.value })}>
                        {item.value}
                      </li>
                    )
                  })
                }

              </ul>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="box-btn mt-30">
        <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
      </div>
    </div>

  );
};

export default Details;

