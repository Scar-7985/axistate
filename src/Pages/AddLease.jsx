import React, { useState, useEffect } from "react";
import BuildingInfo from "../Components/AddLease/BuildingInfo";
import MarketingDescription from "../Components/AddLease/MarketingDescription";
import PhotosVideo from "../Components/AddLease/PhotosVideo";
import Brochure from "../Components/AddLease/Brochure";
import ListingTeam from "../Components/AddLease/ListingTeam";
import { isAuthenticated } from "../Auth/Define";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserProvider"

const sideMenu = [
  { id: 1, title: "Building Info" },
  { id: 2, title: "Marketing Description" },
  { id: 3, title: "Photos & Videos" },
  { id: 4, title: "Brochure" },
  { id: 5, title: "Listing Team" }
];


const AddLease = () => {

  const getPageNum = window.localStorage.getItem("gtlpnum") || null;
  const getChangePage = window.localStorage.getItem("gtlchngpg") || null;
  const getLid = window.localStorage.getItem("gtlid") || null;

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
      <header id="header" className="main-header header-fixed fixed-header">
        <div className="header-lower">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-header">
                <div className="inner-header-left">

                  <div className="logo-box flex">
                    <div className="logo">
                      <Link to={"/"}>
                        <img src="/assets/images/logo/logo@2x.png" alt="logo" width="166" height="48" />
                      </Link>
                    </div>
                  </div>


                </div>
                <div className="nav-outer flex align-center">
                  <nav className="main-menu show navbar-expand-md">
                    <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                      <ul className="navigation clearfix">
                        <li className="dropdown2"><a href="#">Add Listing for Lease</a>
                          <ul>
                            <li><Link to="property-details">Property Details 1</Link></li>
                            <li><Link to="property-details">Property Details 2</Link></li>
                            <li><Link to="property-details">Property Details 3</Link></li>
                            <li><Link to="property-details">Property Details 4</Link></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
                <div className="inner-header-right header-account">


                  <a className="tf-btn btn-line btn-login">
                    <span style={{ color: "#9CA9B8", fontWeight: "400" }}>Hello!</span> {userName}
                  </a>



                </div>


              </div>
            </div>
          </div>
        </div>

      </header>

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
              ? <BuildingInfo />
              : pageNumber === 2
                ? <MarketingDescription />
                : pageNumber === 3
                  ? <PhotosVideo />
                  : pageNumber === 4
                    ? <Brochure />
                    : <ListingTeam />
          }

        </div>

        <div className="overlay-dashboard"></div>

      </div>
    </React.Fragment>
  );
};

export default AddLease;