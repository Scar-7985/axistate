import React, { useContext, useState, useEffect } from 'react'
import { isAuthenticated, SITE_LOGO } from '../Auth/Define';
import { UserContext } from '../Context/UserProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { swalMsg } from '../Components/SweetAlert2';
import MyListings from './MyListings';
import Profile from './SubPages/Profile';
import Dashboard from './SubPages/Dashboard';
import Header from '../Components/Header';

const Settings = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = useContext(UserContext);
    const uName = userData?.fname + " " + userData?.lname;
    const userName = uName.length > 10 ? uName.substring(0, 10) + "..." : uName;
    const [pageType, setPageType] = useState("dashboard");

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageType = params.get("type");
        if (pageType) {
            setPageType(pageType);
        }
    }, [location.search])

    const LogOut = () => {
        Swal.fire({
            title: "Log out?",
            text: "Are you sure!",
            imageUrl: "/assets/images/logo/logout.png",
            imageWidth: 60,
            imageHeight: 60,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!",
        }).then((result) => {
            if (result.isConfirmed) {
                window.localStorage.clear();
                swalMsg("success", "Logged out successfully.", 2000);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 2000);
            }
        });
    }

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div>
            <div id="wrapper">
                <div id="page" className="clearfix">
                    <div className="layout-wrap">
                        <Header />
                        <div className="sidebar-menu-dashboard" id={`add-listing-sidemenu${showSidebar ? "-open" : ""}`}>  {/* d-flex shadow  */}

                            <div className="user-box">
                                <p className="fw-6">Profile</p>
                                <div className="user">
                                    <div className="icon-box">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip0_13487_13661)">
                                                <path d="M10.0007 9.99947C10.9357 9.99947 11.8496 9.72222 12.627 9.20278C13.4044 8.68334 14.0103 7.94504 14.3681 7.08124C14.7259 6.21745 14.8196 5.26695 14.6372 4.34995C14.4547 3.43295 14.0045 2.59063 13.3434 1.92951C12.6823 1.26839 11.84 0.81816 10.923 0.635757C10.006 0.453354 9.05546 0.54697 8.19166 0.904766C7.32787 1.26256 6.58957 1.86847 6.07013 2.64586C5.55069 3.42326 5.27344 4.33723 5.27344 5.2722C5.27469 6.52556 5.77314 7.72723 6.65941 8.6135C7.54567 9.49976 8.74734 9.99821 10.0007 9.99947ZM10.0007 2.12068C10.624 2.12068 11.2333 2.30551 11.7516 2.65181C12.2699 2.9981 12.6738 3.4903 12.9123 4.06616C13.1509 4.64203 13.2133 5.27569 13.0917 5.88702C12.9701 6.49836 12.6699 7.05991 12.2292 7.50065C11.7884 7.9414 11.2269 8.24155 10.6155 8.36315C10.0042 8.48476 9.37054 8.42235 8.79468 8.18382C8.21881 7.94528 7.72661 7.54135 7.38032 7.02308C7.03403 6.50482 6.8492 5.89551 6.8492 5.2722C6.8492 4.43636 7.18123 3.63476 7.77225 3.04374C8.36328 2.45271 9.16488 2.12068 10.0007 2.12068Z" fill="white" />
                                                <path d="M10.0011 11.5762C8.12108 11.5783 6.31869 12.326 4.98934 13.6554C3.65999 14.9847 2.91224 16.7871 2.91016 18.6671C2.91016 18.876 2.99316 19.0764 3.14092 19.2242C3.28868 19.372 3.48908 19.455 3.69803 19.455C3.90699 19.455 4.10739 19.372 4.25515 19.2242C4.4029 19.0764 4.48591 18.876 4.48591 18.6671C4.48591 17.2044 5.06697 15.8016 6.10126 14.7673C7.13555 13.733 8.53835 13.1519 10.0011 13.1519C11.4638 13.1519 12.8666 13.733 13.9009 14.7673C14.9352 15.8016 15.5162 17.2044 15.5162 18.6671C15.5162 18.876 15.5992 19.0764 15.747 19.2242C15.8947 19.372 16.0951 19.455 16.3041 19.455C16.513 19.455 16.7134 19.372 16.8612 19.2242C17.009 19.0764 17.092 18.876 17.092 18.6671C17.0899 16.7871 16.3421 14.9847 15.0128 13.6554C13.6834 12.326 11.881 11.5783 10.0011 11.5762Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_13487_13661">
                                                    <rect width="18.9091" height="18.9091" fill="white" transform="translate(0.546875 0.544922)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                    <div className="content">
                                        <div className="caption-2 text">Account</div>
                                        <div className="text-white fw-6">{userData ? uName : ""}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-box">
                                <div className="title fw-6">Menu</div>
                                <ul className="box-menu-dashboard">
                                    <li className={`nav-menu-item ${pageType === "dashboard" ? "active" : ""}`}>
                                        <span className="nav-menu-link" onClick={() => navigate(`/settings?type=dashboard`)}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path d="M6.75682 9.35156V15.64" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11.0342 6.34375V15.6412" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M15.2412 12.6758V15.6412" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.2939 1.83398H6.70346C3.70902 1.83398 1.83203 3.95339 1.83203 6.95371V15.0476C1.83203 18.0479 3.70029 20.1673 6.70346 20.1673H15.2939C18.2971 20.1673 20.1654 18.0479 20.1654 15.0476V6.95371C20.1654 3.95339 18.2971 1.83398 15.2939 1.83398Z" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                            Dashboards
                                        </span>
                                    </li>
                                    <li className={`nav-menu-item ${pageType === "profile" ? "active" : ""}`}>
                                        <span className="nav-menu-link" onClick={() => navigate(`/settings?type=profile`)}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.987 14.0684C7.44168 14.0684 4.41406 14.6044 4.41406 16.7511C4.41406 18.8979 7.42247 19.4531 10.987 19.4531C14.5323 19.4531 17.5591 18.9162 17.5591 16.7703C17.5591 14.6245 14.5515 14.0684 10.987 14.0684Z" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.9866 11.0056C13.3132 11.0056 15.1989 9.11897 15.1989 6.79238C15.1989 4.46579 13.3132 2.58008 10.9866 2.58008C8.66005 2.58008 6.77346 4.46579 6.77346 6.79238C6.7656 9.11111 8.6391 10.9977 10.957 11.0056H10.9866Z" stroke="#F1FAEE" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                            Profile
                                        </span>
                                    </li>

                                    <li className="nav-menu-item">
                                        <a className="nav-menu-link" href="#" onClick={LogOut}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path d="M13.7627 6.77418V5.91893C13.7627 4.05352 12.2502 2.54102 10.3848 2.54102H5.91606C4.05156 2.54102 2.53906 4.05352 2.53906 5.91893V16.1214C2.53906 17.9868 4.05156 19.4993 5.91606 19.4993H10.394C12.2539 19.4993 13.7627 17.9914 13.7627 16.1315V15.2671" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M19.9907 11.0208H8.95312" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M17.3047 8.34766L19.9887 11.0197L17.3047 13.6927" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </g>
                                            </svg>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div className="main-content">
                            <div className="main-content-inner">
                                <div className="button-show-hide show-mb w-100 text-right" onClick={() => setShowSidebar(!showSidebar)}>
                                    <a className="btn-dark p-2">{showSidebar ? "Hide" : "Show"} Sidebar</a>
                                </div>

                                {pageType === "profile" ? <Profile /> : <Dashboard />}


                            </div>
                        </div>

                        <div className="overlay-dashboard"></div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Settings;
