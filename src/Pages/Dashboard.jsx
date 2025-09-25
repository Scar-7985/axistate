import React, { useContext } from 'react'
import { isAuthenticated, SITE_LOGO } from '../Auth/Define';
import { UserContext } from '../Context/UserProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import MyListings from './MyListings';

const Dashboard = () => {

    const { userData } = useContext(UserContext);
    const uName = userData?.fname + " " + userData?.lname;
    const userName = uName.length > 10 ? uName.substring(0, 10) + "..." : uName;

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
                secureLocalStorage.clear();
                swalMsg("success", "Logged out successfully.", 2000);
                setTimeout(() => {
                    navigate("/");
                    window.location.reload();
                }, 2000);
            }
        });
    }

    return (
        <div>
            <div id="wrapper">
                <div id="page" class="clearfix">
                    <div class="layout-wrap">
                        <header class="main-header fixed-header header-dashboard">
                            <div class="header-lower">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="inner-header">
                                            <div class="inner-header-left">
                                                <div class="logo-box d-flex">
                                                    <div class="logo"><a href="#">
                                                        <img src={SITE_LOGO} alt="logo" width="174" height="44" /></a></div>
                                                    <div class="button-show-hide">
                                                        <span class="icon icon-categories"></span>
                                                    </div>
                                                </div>

                                            </div>


                                            <div class="header-account inner-header-right">

                                                <div className="flat-bt-top">
                                                    {
                                                        isAuthenticated ? (
                                                            <Link to={"/add-listing"} className="tf-btn primary">
                                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                Add Listing
                                                            </Link>
                                                        ) : (
                                                            <a href="#modalLogin" data-bs-toggle="modal" className="tf-btn primary">
                                                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                Add Listing
                                                            </a>
                                                        )
                                                    }

                                                </div>

                                                <div>

                                                    {
                                                        isAuthenticated
                                                            ? (
                                                                <nav className="main-menu show navbar-expand-md">
                                                                    <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                                                        <ul className="navigation clearfix">
                                                                            <li className="dropdown2">
                                                                                <a href="#" className="d-flex align-items-center">
                                                                                    <div className="avatar avt-34 round mr-1">
                                                                                        <img src="/assets/images/avatar/avt-5.jpg" alt="avt" />
                                                                                    </div>
                                                                                    <span>
                                                                                        {userData ? userName : ""}
                                                                                    </span>
                                                                                </a>
                                                                                <ul>
                                                                                    <li><Link to="/dashboard">Dashboard</Link></li>
                                                                                    <li><Link to="/my-listings">My Listings</Link></li>
                                                                                    <li><a href='#' className='text-danger' onClick={LogOut}>Log Out</a></li>
                                                                                </ul>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </nav>
                                                            )
                                                            : (
                                                                <a href="#modalLogin" data-bs-toggle="modal" className="tf-btn btn-line btn-login">
                                                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M13.1251 5C13.1251 5.8288 12.7959 6.62366 12.2099 7.20971C11.6238 7.79576 10.8289 8.125 10.0001 8.125C9.17134 8.125 8.37649 7.79576 7.79043 7.20971C7.20438 6.62366 6.87514 5.8288 6.87514 5C6.87514 4.1712 7.20438 3.37634 7.79043 2.79029C8.37649 2.20424 9.17134 1.875 10.0001 1.875C10.8289 1.875 11.6238 2.20424 12.2099 2.79029C12.7959 3.37634 13.1251 4.1712 13.1251 5ZM3.75098 16.765C3.77776 15.1253 4.44792 13.5618 5.61696 12.4117C6.78599 11.2616 8.36022 10.6171 10.0001 10.6171C11.6401 10.6171 13.2143 11.2616 14.3833 12.4117C15.5524 13.5618 16.2225 15.1253 16.2493 16.765C14.2888 17.664 12.1569 18.1279 10.0001 18.125C7.77014 18.125 5.65348 17.6383 3.75098 16.765Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Login
                                                                </a>
                                                            )
                                                    }
                                                </div>

                                            </div>

                                            <div class="mobile-nav-toggler mobile-button"><span></span></div>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </header>
                        <div class="sidebar-menu-dashboard d-none d-lg-block">

                            <div class="user-box">
                                <p class="fw-6">Profile</p>
                                <div class="user">
                                    <div class="icon-box">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_13487_13661)">
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
                                    <div class="content">
                                        <div class="caption-2 text">Account</div>
                                        <div class="text-white fw-6">{uName ? uName : ""}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="menu-box">
                                <div class="title fw-6">Menu</div>
                                <ul class="box-menu-dashboard">
                                    <li class="nav-menu-item active">
                                        <a class="nav-menu-link" href="#">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path d="M6.75682 9.35156V15.64" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M11.0342 6.34375V15.6412" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M15.2412 12.6758V15.6412" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2939 1.83398H6.70346C3.70902 1.83398 1.83203 3.95339 1.83203 6.95371V15.0476C1.83203 18.0479 3.70029 20.1673 6.70346 20.1673H15.2939C18.2971 20.1673 20.1654 18.0479 20.1654 15.0476V6.95371C20.1654 3.95339 18.2971 1.83398 15.2939 1.83398Z" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                            </svg>
                                            Dashboards
                                        </a>
                                    </li>
                                    <li class="nav-menu-item">
                                        <a class="nav-menu-link" href="#">
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.987 14.0684C7.44168 14.0684 4.41406 14.6044 4.41406 16.7511C4.41406 18.8979 7.42247 19.4531 10.987 19.4531C14.5323 19.4531 17.5591 18.9162 17.5591 16.7703C17.5591 14.6245 14.5515 14.0684 10.987 14.0684Z" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9866 11.0056C13.3132 11.0056 15.1989 9.11897 15.1989 6.79238C15.1989 4.46579 13.3132 2.58008 10.9866 2.58008C8.66005 2.58008 6.77346 4.46579 6.77346 6.79238C6.7656 9.11111 8.6391 10.9977 10.957 11.0056H10.9866Z" stroke="#F1FAEE" stroke-width="1.42857" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                            </svg>
                                            Profile
                                        </a>
                                    </li>
                                   
                                    <li class="nav-menu-item">
                                        <a class="nav-menu-link" href="#" onClick={LogOut}>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.2">
                                                    <path d="M13.7627 6.77418V5.91893C13.7627 4.05352 12.2502 2.54102 10.3848 2.54102H5.91606C4.05156 2.54102 2.53906 4.05352 2.53906 5.91893V16.1214C2.53906 17.9868 4.05156 19.4993 5.91606 19.4993H10.394C12.2539 19.4993 13.7627 17.9914 13.7627 16.1315V15.2671" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M19.9907 11.0208H8.95312" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M17.3047 8.34766L19.9887 11.0197L17.3047 13.6927" stroke="#F1FAEE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </g>
                                            </svg>
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <div class="main-content">
                            <div class="main-content-inner">
                                {/* <div class="button-show-hide show-mb">
                                    <span class="body-1">Show Dashboard</span>
                                </div> */}
                                <div class="flat-counter-v2 tf-counter">
                                    <div class="counter-box">
                                        <div class="box-icon">
                                            <span class="icon icon-listing"></span>
                                        </div>
                                        <div class="content-box">
                                            <div class="title-count text-variant-1">Your listing</div>
                                            <div class="box-count d-flex align-items-end">
                                                <h3 class="number fw-8" data-speed="2000" data-to="17" data-inviewport="yes">3</h3>
                                                <h3 class="fw-8">22</h3>
                                                {/* <span class="text">/50 remaining</span> */}
                                            </div>

                                        </div>
                                    </div>
                                    <div class="counter-box">
                                        <div class="box-icon">
                                            <span class="icon icon-pending"></span>
                                        </div>
                                        <div class="content-box">
                                            <div class="title-count text-variant-1">Pending</div>
                                            <div class="box-count d-flex align-items-end">
                                                <h3 class="fw-8">02</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="counter-box">
                                        <div class="box-icon">
                                            <span class="icon icon-favorite"></span>
                                        </div>
                                        <div class="content-box">
                                            <div class="title-count text-variant-1">Favorites</div>
                                            <div class="d-flex align-items-end">
                                                <h3 class="fw-8">00</h3>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="counter-box">
                                        <div class="box-icon">
                                            <span class="icon icon-review"></span>
                                        </div>
                                        <div class="content-box">
                                            <div class="title-count text-variant-1">Reviews</div>
                                            <div class="d-flex align-items-end">
                                                <h3 class="fw-8">1.483</h3>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                {/* <div class="wrapper-content row">
                                    <div class="col-xl-9">
                                        <div class="widget-box-2 wd-listing">
                                            <h5 class="title">New Listing</h5>

                                            <div class="d-flex gap-4"><span class="text-primary fw-7">26</span><span class="fw-6">Results found</span></div>
                                            <div class="wrap-table">
                                                <div class="table-responsive">

                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Listing</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>

                                                            <tr class="file-delete">
                                                                <td>
                                                                    <div class="listing-box">
                                                                        <div class="images">
                                                                            <img src="images/home/house-18.jpg" alt="images" />
                                                                        </div>
                                                                        <div class="content">
                                                                            <div class="title">
                                                                                <a href="#" class="link">Gorgeous Apartment Building </a> </div>
                                                                            <div class="text-date">Posting date: March 2, 2024</div>
                                                                            <div class="text-btn text-primary">$1,500</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="status-wrap">
                                                                        <a href="#" class="btn-status"> Approved</a>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <ul class="list-action">
                                                                        <li><a class="item">
                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016" stroke="#A3ABB0" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>
                                                                            Edit</a>
                                                                        </li>
                                                                        <li><a class="item">
                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M12.2427 12.2427C13.3679 11.1175 14.0001 9.59135 14.0001 8.00004C14.0001 6.40873 13.3679 4.8826 12.2427 3.75737C11.1175 2.63214 9.59135 2 8.00004 2C6.40873 2 4.8826 2.63214 3.75737 3.75737M12.2427 12.2427C11.1175 13.3679 9.59135 14.0001 8.00004 14.0001C6.40873 14.0001 4.8826 13.3679 3.75737 12.2427C2.63214 11.1175 2 9.59135 2 8.00004C2 6.40873 2.63214 4.8826 3.75737 3.75737M12.2427 12.2427L3.75737 3.75737" stroke="#A3ABB0" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>

                                                                            Sold</a>
                                                                        </li>
                                                                        <li><a class="remove-file item">
                                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" stroke-linecap="round" stroke-linejoin="round" />
                                                                            </svg>
                                                                            Delete</a>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </div>

                                                <ul class="wd-navigation">
                                                    <li>
                                                        <a href="#" class="nav-item">
                                                            <i class="icon icon-arr-l"></i>
                                                        </a>
                                                    </li>
                                                    <li><a href="#" class="nav-item">1</a></li>
                                                    <li><a href="#" class="nav-item active">3</a></li>
                                                    <li>
                                                        <a href="#" class="nav-item">
                                                            <i class="icon icon-arr-r"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-xl-3">
                                        <div class="widget-box-2 mess-box mb-20">
                                            <h5 class="title">Messages</h5>
                                            <ul class="list-mess">
                                                {
                                                    [1, 2, 3, 4].map((item, index) => {
                                                        return (
                                                            <li class="mess-item" key={index}>
                                                                <div class="user-box">
                                                                    <div class="avatar">
                                                                        <img src="images/avatar/avt-png9.png" alt="avt" />
                                                                    </div>
                                                                    <div class="content">
                                                                        <div class="name fw-6">Themesflat {item}</div>
                                                                        <span class="caption-2 text-variant-3">{item} day ago</span>
                                                                    </div>
                                                                </div>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque vulputate tincidunt. Maecenas lorem sapien </p>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </div>

                                    </div>
                                </div> */}
                                <MyListings />
                            </div>
                        </div>

                        <div class="overlay-dashboard"></div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard;
