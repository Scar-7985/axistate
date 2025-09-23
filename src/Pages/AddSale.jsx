import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PropertyDetails } from "../Components/SaleListing/PropertyDetails";
import ConfidentialAgreement from "../Components/SaleListing/ConfidentialAgreement";
import ListingTeam from "../Components/SaleListing/ListingTeam";
import { isAuthenticated, SITE_LOGO } from "../Auth/Define";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserProvider"
import TransactionDetails from "../Components/SaleListing/TransactionDetails";
import PropertyFeatures from "../Components/SaleListing/PropertyFeatures";
import LocationHighlights from "../Components/SaleListing/LocationHighlights";
import FinancialTenencyInformation from "../Components/SaleListing/FinancialTenencyInformation";
import AttachmentsMedia from "../Components/SaleListing/AttachmentsMedia";
import OmFlyer from "../Components/SaleListing/OmFlyer";
import ContactInformation from "../Components/SaleListing/ContactInformation";

const sideMenu = [
  { id: 1, title: "Property Details" },
  { id: 2, title: "Transaction Details" },
  { id: 3, title: "Property Features" },
  { id: 4, title: "Location Highlights" },
  { id: 5, title: "Financial / Tenancy Information" },
  { id: 6, title: "Attachments / Media" },
  { id: 7, title: "Contact Information" },
];


const AddSale = () => {

  const navigate = useNavigate();

  const getPageNum = window.localStorage.getItem("gtpnum") || null;
  const getChangePage = window.localStorage.getItem("gtchngpg") || null;
  const getPid = window.localStorage.getItem("gtpid") || null;


  const { userData } = useContext(UserContext);
  const uName = userData?.fname + " " + userData?.lname;
  const userName = uName.length > 10 ? uName.substring(0, 10) + "..." : uName;

  const [pageNumber, setPageNumber] = useState(1);
  const [canChangePage, setCanChangePage] = useState(false);

  // console.log(getPageNum);


  useEffect(() => {
    if (getPageNum) {
      setPageNumber(Number(getPageNum));
    }
    if (getChangePage) {
      setCanChangePage(true);
    }
  }, [getPageNum]);

  const [score, setScore] = useState(0);

  useEffect(() => {
    setScore(80);
  }, []);

  const getStrokeColor = (score) => {
    if (score <= 25) return "red";
    if (score <= 50) return "blue";
    if (score <= 75) return "orange";
    if (score >= 75 && score <= 99) return "purple";
    return "green";
  };

  return (
    <React.Fragment>


      <div className="layout-wrap">

        <div className="sidebar-menu-dashboard">
          <div className="menu-box">
            {/* <div className="title fw-6">Menu</div> */}
            <ul className="box-menu-dashboard">
              {
                sideMenu.map((item, index) => {
                  return (
                    <li className={`nav-menu-item ${pageNumber === item.id ? 'active' : ''}`} key={index}>
                      <a className="nav-menu-link" onClick={() => { canChangePage ? setPageNumber(item.id) : null }}>
                        <span>{index + 1}.</span>
                        {item.title}
                      </a>
                    </li>
                  )
                })
              }

            </ul>
          </div>

        </div>

        <div className="main-content">
        {
          pageNumber === 7
          ? <ContactInformation />
          : pageNumber === 6
          ? <AttachmentsMedia />
          : pageNumber === 5
          ? <FinancialTenencyInformation />
          : pageNumber === 4
          ? <LocationHighlights />
          : pageNumber === 3
          ? <PropertyFeatures />
          : pageNumber === 2
          ? <TransactionDetails />
          : <PropertyDetails />
        }
      

        </div>

        {/* <div className="overlay-dashboard"></div> */}

      </div>
    </React.Fragment>
  );
};

export default AddSale;