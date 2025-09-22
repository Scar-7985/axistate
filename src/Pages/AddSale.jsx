import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BasicList from "../Components/SaleListing/BasicList";
import Details from "../Components/SaleListing/Details"
import Description from "../Components/SaleListing/Description";
import PhotosMedia from "../Components/SaleListing/PhotosMedia";
import OmFlyer from "../Components/SaleListing/OmFlyer";
import DueDiligence from "../Components/SaleListing/DueDiligence";
import ConfidentialAgreement from "../Components/SaleListing/ConfidentialAgreement";
import ListingTeam from "../Components/SaleListing/ListingTeam";
import { isAuthenticated, SITE_LOGO } from "../Auth/Define";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserProvider"

const sideMenu = [
  { id: 1, title: "Basics" },
  { id: 2, title: "Details" },
  { id: 3, title: "Description" },
  { id: 4, title: "Photos & Videos" },
  { id: 5, title: "OM/Flyer" },
  { id: 6, title: "Due Diligence" },
  { id: 7, title: "Confidentiality Agreement" },
  { id: 8, title: "Listing Team" }
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
            pageNumber === 1
              ? <BasicList />
              : pageNumber === 2
                ? <Details />
                : pageNumber === 3
                  ? <Description />
                  : pageNumber === 4
                    ? <PhotosMedia />
                    : pageNumber === 5
                      ? <OmFlyer />
                      : pageNumber === 6
                        ? <DueDiligence />
                        : pageNumber === 7
                          ? <ConfidentialAgreement />
                          : <ListingTeam />
          }

        </div>

        {/* <div className="overlay-dashboard"></div> */}

      </div>
    </React.Fragment>
  );
};

export default AddSale;