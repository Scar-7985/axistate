import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { USAStates } from "./Reigons"
import axios from 'axios';
import { SetIsAuthenticated, POST_API } from '../Auth/Define';
import { swalMsg } from './SweetAlert2';
import { isAuthenticated, SITE_LOGO } from '../Auth/Define';
import Swal from 'sweetalert2';
import { UserContext } from '../Context/UserProvider';

const Header = () => {

    const { userData } = useContext(UserContext);
    const uName = userData?.fname + " " + userData?.lname;
    const userName = uName.length > 10 ? uName.substring(0, 10) + "..." : uName;


    const location = useLocation();


    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [showForgotPass, setShowForgotPass] = useState(0);

    const showMobileMenu = () => {
        const getBody = document.querySelector("body");
        if (showMenu) {
            getBody.classList.remove("mobile-menu-visible");
            setShowMenu(false);
        } else {
            getBody.classList.add("mobile-menu-visible");
            setShowMenu(true);
        }
    }

    useEffect(() => {
        const modal = document.getElementById("modalLogin");
        const handleClose = () => setShowForgotPass(0);

        if (modal) {
            modal.addEventListener("hidden.bs.modal", handleClose);
        }

        return () => {
            if (modal) {
                modal.removeEventListener("hidden.bs.modal", handleClose);
            }
        };
    }, []);

    const [showLotp, setShowLotp] = useState(false);
    const [showSotp, setShowSotp] = useState(false);
    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        email: "",
        pass: "",
        indusRole: "2",
        phone: "",
        officeZip: "",
        website: "",
        otp: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Sign Up
    const handleSubmit = () => {
        setLoading(true);
        const registerData = new FormData();
        registerData.append("fname", formData.fName);
        registerData.append("lname", formData.lName);
        registerData.append("email", formData.email);
        registerData.append("phone", formData.phone);
        registerData.append("password", formData.pass);
        registerData.append("user_type", formData.indusRole);
        registerData.append("zipcode", formData.officeZip);
        registerData.append("website", formData.website);
        if (showSotp) {
            registerData.append("otp", formData.otp);
        }
        axios.post(`${POST_API}/${showSotp ? "email-verify.php" : "signup.php"}`, registerData).then(resp => {
            const jsonData = resp.data;
            console.log(jsonData);

            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                if (!showSotp) {
                    setShowSotp(true);
                } else {
                    const UID = jsonData.cuid;
                    SetIsAuthenticated("AXID", UID);

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
            setLoading(false);
        })

    };
    // Sign Up

    const [loginData, setLoginData] = useState({ email: "", pass: "", otp: "", newPass: "", confirmPass: "" });
    const handlelogChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    const handleLogin = () => {
        setLoading(true);
        const registerData = new FormData();
        registerData.append("email", loginData.email);
        if (showLotp) {
            registerData.append("otp", loginData.otp);
            registerData.append("login_status", 1);
        }
        axios.post(`${POST_API}/${showLotp ? "email-verify.php" : "login.php"}`, registerData).then(resp => {
            const jsonData = resp.data;
            console.log(jsonData);

            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                if (!showLotp) {
                    setShowLotp(true);
                } else {
                    const UID = jsonData.cuid;
                    SetIsAuthenticated("AXID", UID);
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }

            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
            setLoading(false);
        })
    }


    const handleForgetPass = () => {
        setLoading(true);
        const forgotPassData = new FormData();
        forgotPassData.append("email", loginData.email);
        if (showForgotPass === 2) {
            forgotPassData.append("otp", loginData.otp);
            if (loginData.newPass.length < 6) {
                swalMsg("success", "Password should be atleast 6 digit", 2000);

                return;
            } else if (loginData.newPass.length > 15) {
                swalMsg("success", "Password cannot be more that 15 digit", 2000);

                return;
            }
            forgotPassData.append("password", loginData.newPass);
            forgotPassData.append("cpassword", loginData.confirmPass);
        }
        axios.post(`${POST_API}/forget-password-step${showForgotPass === 1 ? "one" : "two"}.php`, forgotPassData).then(resp => {
            const jsonData = resp.data;
            console.log(jsonData);

            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);

                setShowForgotPass(2);


            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
            setLoading(false);
        })

    }


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


    const MobileNavigate = (path) => {
        showMobileMenu();
        setTimeout(() => {
            navigate(path);
        }, 200);
    }


    return (
        <header id="header" className="main-header header-fixed fixed-header">
            <div className="header-lower">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="inner-header">
                            <div className="inner-header-left">
                                <div className="logo-box flex">
                                    <div className="logo">
                                        <Link to={"/"}>
                                            <img src={SITE_LOGO} alt="logo" width="166" height="40" />
                                        </Link>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="nav-outer flex align-center">
                                    <nav className="main-menu show navbar-expand-md">
                                        <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                            <ul className="navigation clearfix">
                                                {/*  <li className="dropdown home current">
                                                    <Link to="/">Home</Link>
                                                   <ul>
                                                        <li className="current"><a href="index.html">Homepage 01</a></li>
                                                        <li><a href="home-02.html">Homepage 02</a></li>
                                                        <li><a href="home-03.html">Homepage 03</a></li>
                                                        <li><a href="home-04.html">Homepage 04</a></li>
                                                        <li><a href="home-05.html">Homepage 05</a></li>
                                                        <li><a href="home-06.html">Homepage 06</a></li>
                                                    </ul>
                                                </li> */}
                                                {/* <li className="dropdown2"><a href="#">Properties</a>
                                                    <ul>
                                                        <li><Link to="property-details">Property Details 1</Link></li>
                                                    </ul>
                                                </li> */}
                                                {/* <li className="dropdown2"><a href="#">Pages</a>
                                                    <ul>
                                                        <li><Link to="#">About Us</Link></li>
                                                        <li><Link to="#">Our Services</Link></li>
                                                        <li><Link to="#">Pricing</Link></li>
                                                        <li><Link to="/contact-us">Contact Us</Link></li>
                                                        <li><Link to="#">FAQs</Link></li>
                                                        <li><Link to="#">Privacy Policy</Link></li>

                                                    </ul>
                                                </li>
                                                <li className="dropdown2"><a href="#">Settings</a>
                                                    <ul>
                                                        <li><Link to="#">Dashboard</Link></li>
                                                        <li><Link to="/my-listings">My Listings</Link></li>
                                                        <li><Link to="#">Message</Link></li>
                                                        <li><Link to="#">My Favorites</Link></li>
                                                        <li><Link to="#">Reviews</Link></li>
                                                        <li><Link to="/account-details">My Profile</Link></li>
                                                        <li><Link to="/add-listing">Add Listing</Link></li>
                                                    </ul>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                            <div className="inner-header-right header-account">

                                {
                                    location.pathname !== "/add-sale" &&

                                    <div className="flat-bt-top">
                                        {
                                            isAuthenticated ? (
                                                <Link to={location.pathname === "/property-details" ? (window.location.href) : "/property-details"} className="tf-btn primary">
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
                                }

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
                                                                <li><Link to="/settings">Dashboard</Link></li>
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

                            <div className="mobile-nav-toggler mobile-button" onClick={showMobileMenu}><span></span></div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="close-btn" onClick={showMobileMenu}><span className="icon flaticon-cancel-1"></span></div>
            <div className="mobile-menu">
                <div className="menu-backdrop"></div>
                <nav className="menu-box">
                    <div className="nav-logo">
                        <Link to={"/"}>
                            <img src={SITE_LOGO} alt="nav-logo" width="174" style={{ height: "60px" }} />
                        </Link>
                    </div>
                    <div className="bottom-canvas">


                        <div className="mobi-icon-box">
                            <div className="box d-flex align-items-center">
                                <span className="material-symbols-outlined mr-2">forms_add_on</span>

                                <a onClick={() => {
                                    if (isAuthenticated) {
                                        navigate("/property-details");
                                    } else {
                                        document.querySelector("#opnLogin").click();
                                    }
                                    setTimeout(() => {
                                        document.querySelector(".close-btn").click();
                                    }, 200);
                                }}>Add Listing</a>
                            </div>
                            {
                                isAuthenticated &&
                                <React.Fragment>
                                    <div className="box d-flex align-items-center" onClick={() => MobileNavigate("/settings")}>
                                        <span className="material-symbols-outlined mr-2">dashboard</span>
                                        <div>Dashboard</div>
                                    </div>
                                    <div className="box d-flex align-items-center" onClick={() => MobileNavigate("/my-listings")}>
                                        <span className="material-symbols-outlined mr-2">lists</span>
                                        <div>My Listings</div>
                                    </div>
                                    <div className="box d-flex align-items-center">
                                        <span className="material-symbols-outlined mr-2">mail</span>
                                        <div>axisestate@gmail.com</div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>

                        <div className="menu-outer"></div>
                        {
                            isAuthenticated
                                ? (
                                    <div className="button-mobi-sell">
                                        <a className="tf-btn d-flex align-items-center" onClick={LogOut}>
                                            <span className="material-symbols-outlined">
                                                logout
                                            </span>
                                            <span>
                                                Log Out
                                            </span>
                                        </a>
                                    </div>
                                )
                                : (
                                    <div className="button-mobi-sell">
                                        <a className="tf-btn primary d-none" id='opnLogin' href="#modalLogin" data-bs-toggle="modal">Login/ Signup</a>
                                        <a className="tf-btn primary" onClick={() => {
                                            document.querySelector("#opnLogin").click();
                                            setTimeout(() => {
                                                document.querySelector(".close-btn").click();
                                            }, 200);
                                        }}>Login/ Signup</a>
                                    </div>
                                )
                        }



                    </div>
                </nav>
            </div>


            <style>
                {`
              .modal-backdrop {
              --bs-backdrop-zindex: none;
              }                
                `}
            </style>

            {/* xxxxxxxxxxxxxxx Login Modal xxxxxxxxxxxxxxx */}
            <div className="modal modal-account fade" id="modalLogin" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="flat-account">
                            <div className="banner-account">
                                <img src="/assets/images/banner/banner-account1.jpg" alt="banner" />
                            </div>

                            {
                                showForgotPass === 0
                                    ? (
                                        <div className="form-account">
                                            {/* ========= Login Form ========= */}
                                            <div className="title-box">
                                                <h4>{showLotp
                                                    ? <>
                                                        Verify OTP sent to <h6 className='text-danger'>{loginData.email}</h6>
                                                    </> : "Login"}</h4>
                                                <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                            </div>
                                            {
                                                showLotp ? (
                                                    <div className="box">
                                                        <fieldset className="box-fieldset">
                                                            <label>OTP</label>
                                                            <div className="ip-field">
                                                                <svg
                                                                    className="icon"
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <rect
                                                                        x="4"
                                                                        y="10"
                                                                        width="16"
                                                                        height="10"
                                                                        rx="2"
                                                                        stroke="#A3ABB0"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                    <path
                                                                        d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                                                                        stroke="#A3ABB0"
                                                                        strokeWidth="1.5"
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                    />
                                                                </svg>


                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Your otp"
                                                                    name='otp'
                                                                    value={loginData.otp}
                                                                    onChange={handlelogChange}
                                                                />
                                                            </div>
                                                        </fieldset>

                                                    </div>
                                                ) : (
                                                    <div className="box">
                                                        <fieldset className="box-fieldset">
                                                            <label>Email</label>
                                                            <div className="ip-field">
                                                                <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M13.4869 14.0435C12.9628 13.3497 12.2848 12.787 11.5063 12.3998C10.7277 12.0126 9.86989 11.8115 9.00038 11.8123C8.13086 11.8115 7.27304 12.0126 6.49449 12.3998C5.71594 12.787 5.03793 13.3497 4.51388 14.0435M13.4869 14.0435C14.5095 13.1339 15.2307 11.9349 15.5563 10.6056C15.8818 9.27625 15.7956 7.87934 15.309 6.60014C14.8224 5.32093 13.9584 4.21986 12.8317 3.44295C11.7049 2.66604 10.3686 2.25 9 2.25C7.63137 2.25 6.29508 2.66604 5.16833 3.44295C4.04158 4.21986 3.17762 5.32093 2.69103 6.60014C2.20443 7.87934 2.11819 9.27625 2.44374 10.6056C2.76929 11.9349 3.49125 13.1339 4.51388 14.0435M13.4869 14.0435C12.2524 15.1447 10.6546 15.7521 9.00038 15.7498C7.3459 15.7523 5.74855 15.1448 4.51388 14.0435M11.2504 7.31228C11.2504 7.90902 11.0133 8.48131 10.5914 8.90327C10.1694 9.32523 9.59711 9.56228 9.00038 9.56228C8.40364 9.56228 7.83134 9.32523 7.40939 8.90327C6.98743 8.48131 6.75038 7.90902 6.75038 7.31228C6.75038 6.71554 6.98743 6.14325 7.40939 5.72129C7.83134 5.29933 8.40364 5.06228 9.00038 5.06228C9.59711 5.06228 10.1694 5.29933 10.5914 5.72129C11.0133 6.14325 11.2504 6.71554 11.2504 7.31228Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Your email"
                                                                    name='email'
                                                                    value={loginData.email}
                                                                    onChange={handlelogChange}
                                                                />
                                                            </div>
                                                            {/* <div className="text-forgot text-end text-primary" >
                                                                <a onClick={() => setShowForgotPass(1)}>Forgot password ?</a>
                                                            </div> */}
                                                        </fieldset>

                                                    </div>
                                                )
                                            }

                                            <div className="box box-btn">
                                                <div className="tf-btn primary w-100 cursor-pointer" onClick={handleLogin}>Login</div>
                                                {
                                                    !showLotp &&
                                                    <div className="text text-center">Don’t you have an account? <a href="#modalRegister" data-bs-toggle="modal" className="text-primary">Register</a></div>
                                                }
                                            </div>

                                        </div>
                                    )
                                    : showForgotPass === 1
                                        ? (
                                            <div className="form-account">
                                                {/* ========= Forgot Password Form ========= */}
                                                <div className="title-box">
                                                    <h4>Forgot Password ?</h4>
                                                    <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                                </div>
                                                <div className="box">
                                                    <fieldset className="box-fieldset">
                                                        <label>Email</label>
                                                        <div className="ip-field">
                                                            <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.4869 14.0435C12.9628 13.3497 12.2848 12.787 11.5063 12.3998C10.7277 12.0126 9.86989 11.8115 9.00038 11.8123C8.13086 11.8115 7.27304 12.0126 6.49449 12.3998C5.71594 12.787 5.03793 13.3497 4.51388 14.0435M13.4869 14.0435C14.5095 13.1339 15.2307 11.9349 15.5563 10.6056C15.8818 9.27625 15.7956 7.87934 15.309 6.60014C14.8224 5.32093 13.9584 4.21986 12.8317 3.44295C11.7049 2.66604 10.3686 2.25 9 2.25C7.63137 2.25 6.29508 2.66604 5.16833 3.44295C4.04158 4.21986 3.17762 5.32093 2.69103 6.60014C2.20443 7.87934 2.11819 9.27625 2.44374 10.6056C2.76929 11.9349 3.49125 13.1339 4.51388 14.0435M13.4869 14.0435C12.2524 15.1447 10.6546 15.7521 9.00038 15.7498C7.3459 15.7523 5.74855 15.1448 4.51388 14.0435M11.2504 7.31228C11.2504 7.90902 11.0133 8.48131 10.5914 8.90327C10.1694 9.32523 9.59711 9.56228 9.00038 9.56228C8.40364 9.56228 7.83134 9.32523 7.40939 8.90327C6.98743 8.48131 6.75038 7.90902 6.75038 7.31228C6.75038 6.71554 6.98743 6.14325 7.40939 5.72129C7.83134 5.29933 8.40364 5.06228 9.00038 5.06228C9.59711 5.06228 10.1694 5.29933 10.5914 5.72129C11.0133 6.14325 11.2504 6.71554 11.2504 7.31228Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Your email"
                                                                name='email'
                                                                value={loginData.email}
                                                                onChange={handlelogChange}
                                                            />
                                                        </div>
                                                    </fieldset>
                                                </div>
                                                <div className="box box-btn">
                                                    <div className="tf-btn primary w-100 cursor-pointer" onClick={handleForgetPass}>Send OTP</div>
                                                </div>

                                            </div>
                                        ) : (
                                            <div className="form-account">
                                                {/* ========= Confirm & Update Password Form ========= */}
                                                <div className="title-box" style={{ marginBottom: "20px" }}>
                                                    <h4>Verify OTP</h4>
                                                    <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                                </div>
                                                <div className="text text-center">OTP has been sent to <span className='text-primary'>{loginData.email}</span> </div>
                                                <div className="box" style={{ marginTop: "40px" }}>
                                                    <fieldset className="box-fieldset">
                                                        <label>Enter OTP</label>
                                                        <div className="ip-field">
                                                            <svg
                                                                className="icon"
                                                                width="18"
                                                                height="18"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <rect
                                                                    x="4"
                                                                    y="10"
                                                                    width="16"
                                                                    height="10"
                                                                    rx="2"
                                                                    stroke="#A3ABB0"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                                <path
                                                                    d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                                                                    stroke="#A3ABB0"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>

                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Your OTP"
                                                                name='otp'
                                                                value={loginData.otp}
                                                                onChange={handlelogChange}
                                                            />
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="box-fieldset">
                                                        <div className='d-flex justify-content-between'>
                                                            <label>New Password</label>
                                                            <span style={{ fontSize: "10px", fontWeight: "600" }}>Password should be between (6 - 15)</span>
                                                        </div>
                                                        <div className="ip-field">
                                                            <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <input
                                                                type="password"
                                                                className="form-control"
                                                                placeholder="New password"
                                                                name='newPass'
                                                                value={loginData.newPass}
                                                                onChange={handlelogChange}
                                                            />
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="box-fieldset">
                                                        <label>Confirm Password</label>
                                                        <div className="ip-field">
                                                            <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M12.375 7.875V5.0625C12.375 4.16739 12.0194 3.30895 11.3865 2.67601C10.7535 2.04308 9.89511 1.6875 9 1.6875C8.10489 1.6875 7.24645 2.04308 6.61351 2.67601C5.98058 3.30895 5.625 4.16739 5.625 5.0625V7.875M5.0625 16.3125H12.9375C13.3851 16.3125 13.8143 16.1347 14.1307 15.8182C14.4472 15.5018 14.625 15.0726 14.625 14.625V9.5625C14.625 9.11495 14.4472 8.68573 14.1307 8.36926C13.8143 8.05279 13.3851 7.875 12.9375 7.875H5.0625C4.61495 7.875 4.18573 8.05279 3.86926 8.36926C3.55279 8.68573 3.375 9.11495 3.375 9.5625V14.625C3.375 15.0726 3.55279 15.5018 3.86926 15.8182C4.18573 16.1347 4.61495 16.3125 5.0625 16.3125Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            <input
                                                                type={`${showConfirmPass ? "text" : "password"}`}
                                                                className="form-control"
                                                                placeholder="Confirm password"
                                                                name='confirmPass'
                                                                value={loginData.confirmPass}
                                                                onChange={handlelogChange}
                                                            />
                                                            <div
                                                                style={{
                                                                    position: "absolute", right: "18px",
                                                                    top: "50%", transform: "translateY(-50%)",
                                                                    cursor: "pointer"
                                                                }} onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                                                {
                                                                    showConfirmPass
                                                                        ? (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a3abb0"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                                                                        ) : (
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#a3abb0"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                                                                        )
                                                                }



                                                            </div>
                                                        </div>
                                                    </fieldset>

                                                </div>
                                                <div className="box box-btn">
                                                    <div className="tf-btn primary w-100 cursor-pointer" onClick={handleForgetPass}>Login</div>
                                                </div>
                                            </div>
                                        )
                            }





                        </div>
                    </div>
                </div>
            </div>


            {/* xxxxxxxxxxxxxxx Registeration Modal xxxxxxxxxxxxxxx */}
            <div className="modal modal-account fade" id="modalRegister" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="flat-account">
                            <div className="banner-account">
                                <img src="/assets/images/banner/banner-account2.jpg" alt="banner" />
                            </div>
                            <div className="form-account">
                                <div className="title-box">

                                    <h4>
                                        {showSotp ? (
                                            <>
                                                Verify OTP sent to <h6 className="text-danger">{formData.email}</h6>
                                            </>
                                        ) : (
                                            "Register"
                                        )}
                                    </h4>

                                    <span className="close-modal icon-close2" data-bs-dismiss="modal"></span>
                                </div>

                                {
                                    !showSotp ? (

                                        <div className="box">
                                            <div className="row">

                                                <fieldset className="box-fieldset col-6">
                                                    <label>First name <span className='text-danger'>*</span></label>
                                                    <div className="ip-field">
                                                        <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.4869 14.0435C12.9628 13.3497 12.2848 12.787 11.5063 12.3998C10.7277 12.0126 9.86989 11.8115 9.00038 11.8123C8.13086 11.8115 7.27304 12.0126 6.49449 12.3998C5.71594 12.787 5.03793 13.3497 4.51388 14.0435M13.4869 14.0435C14.5095 13.1339 15.2307 11.9349 15.5563 10.6056C15.8818 9.27625 15.7956 7.87934 15.309 6.60014C14.8224 5.32093 13.9584 4.21986 12.8317 3.44295C11.7049 2.66604 10.3686 2.25 9 2.25C7.63137 2.25 6.29508 2.66604 5.16833 3.44295C4.04158 4.21986 3.17762 5.32093 2.69103 6.60014C2.20443 7.87934 2.11819 9.27625 2.44374 10.6056C2.76929 11.9349 3.49125 13.1339 4.51388 14.0435M13.4869 14.0435C12.2524 15.1447 10.6546 15.7521 9.00038 15.7498C7.3459 15.7523 5.74855 15.1448 4.51388 14.0435M11.2504 7.31228C11.2504 7.90902 11.0133 8.48131 10.5914 8.90327C10.1694 9.32523 9.59711 9.56228 9.00038 9.56228C8.40364 9.56228 7.83134 9.32523 7.40939 8.90327C6.98743 8.48131 6.75038 7.90902 6.75038 7.31228C6.75038 6.71554 6.98743 6.14325 7.40939 5.72129C7.83134 5.29933 8.40364 5.06228 9.00038 5.06228C9.59711 5.06228 10.1694 5.29933 10.5914 5.72129C11.0133 6.14325 11.2504 6.71554 11.2504 7.31228Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="First name"
                                                            name='fName'
                                                            value={formData.fName}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </fieldset>
                                                <fieldset className="box-fieldset col-6">
                                                    <label>Last name <span className='text-danger'>*</span></label>
                                                    <div className="ip-field">
                                                        <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M13.4869 14.0435C12.9628 13.3497 12.2848 12.787 11.5063 12.3998C10.7277 12.0126 9.86989 11.8115 9.00038 11.8123C8.13086 11.8115 7.27304 12.0126 6.49449 12.3998C5.71594 12.787 5.03793 13.3497 4.51388 14.0435M13.4869 14.0435C14.5095 13.1339 15.2307 11.9349 15.5563 10.6056C15.8818 9.27625 15.7956 7.87934 15.309 6.60014C14.8224 5.32093 13.9584 4.21986 12.8317 3.44295C11.7049 2.66604 10.3686 2.25 9 2.25C7.63137 2.25 6.29508 2.66604 5.16833 3.44295C4.04158 4.21986 3.17762 5.32093 2.69103 6.60014C2.20443 7.87934 2.11819 9.27625 2.44374 10.6056C2.76929 11.9349 3.49125 13.1339 4.51388 14.0435M13.4869 14.0435C12.2524 15.1447 10.6546 15.7521 9.00038 15.7498C7.3459 15.7523 5.74855 15.1448 4.51388 14.0435M11.2504 7.31228C11.2504 7.90902 11.0133 8.48131 10.5914 8.90327C10.1694 9.32523 9.59711 9.56228 9.00038 9.56228C8.40364 9.56228 7.83134 9.32523 7.40939 8.90327C6.98743 8.48131 6.75038 7.90902 6.75038 7.31228C6.75038 6.71554 6.98743 6.14325 7.40939 5.72129C7.83134 5.29933 8.40364 5.06228 9.00038 5.06228C9.59711 5.06228 10.1694 5.29933 10.5914 5.72129C11.0133 6.14325 11.2504 6.71554 11.2504 7.31228Z" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Last name"
                                                            name='lName'
                                                            value={formData.lName}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </fieldset>
                                            </div>
                                            <fieldset className="box-fieldset">
                                                <label>Email <span className='text-danger'>*</span></label>
                                                <div className="ip-field">
                                                    <svg
                                                        className="icon"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                                            stroke="#A3ABB0"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M22 6L12 13L2 6"
                                                            stroke="#A3ABB0"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Email address"
                                                        name='email'
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </fieldset>
                                            <fieldset className="box-fieldset">
                                                <label>Industry Role: <span className='text-danger'>*</span></label>
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">{Number(formData.indusRole) === 2 ? "Buyer" : "Seller"}</span>
                                                    <ul className="list">
                                                        <li data-value="2" className={`option ${Number(formData.indusRole) === 2 ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, indusRole: 2 })}>
                                                            Buyer
                                                        </li>
                                                        <li data-value="3" className={`option ${Number(formData.indusRole) === 3 ? "selected focus" : ""}`} onClick={() => setFormData({ ...formData, indusRole: 3 })}>
                                                            Seller
                                                        </li>

                                                    </ul>
                                                </div>
                                            </fieldset>

                                            <fieldset className="box-fieldset">
                                                <label>Phone <span className='text-danger'>*</span></label>
                                                <div className="ip-field">
                                                    <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M22 16.92V21a1 1 0 0 1-1.09 1A19.91 19.91 0 0 1 3 4.09 1 1 0 0 1 4 3h4.09a1 1 0 0 1 1 .75l1.2 5a1 1 0 0 1-.27.95l-2.2 2.2a16 16 0 0 0 6.61 6.61l2.2-2.2a1 1 0 0 1 .95-.27l5 1.2a1 1 0 0 1 .75 1z" stroke="#A3ABB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>

                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="555-555-5555"
                                                        name='phone'
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </fieldset>
                                            <fieldset className="box-fieldset">
                                                <label>Office Zip <span className='text-danger'>*</span></label>
                                                <div className="ip-field">
                                                    <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 21C12 21 5 13.93 5 9.5C5 6.46 7.46 4 10.5 4C13.54 4 16 6.46 16 9.5C16 13.93 9 21 9 21H12Z" stroke="#A3ABB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <circle cx="10.5" cy="9.5" r="1.5" fill="#A3ABB0" />
                                                    </svg>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="222333"
                                                        name='officeZip'
                                                        value={formData.officeZip}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </fieldset>
                                            <fieldset className="box-fieldset">
                                                <label>Website</label>
                                                <div className="ip-field">
                                                    <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8 0-.34.02-.67.06-1h3.9a15.35 15.35 0 0 0 0 2h3.9v2H9.05a7.98 7.98 0 0 0 2.95 5.74V20Zm0-16v1.26A7.97 7.97 0 0 0 9.05 10H6.06a8.005 8.005 0 0 1 5.94-6ZM12 12h3.95a15.35 15.35 0 0 1 0 2H12v-2Zm0-2V8h3.95a7.97 7.97 0 0 1 0 2H12Zm0-6c4.41 0 8 3.59 8 8 0 .34-.02.67-.06 1h-3.9a15.35 15.35 0 0 0 0-2h-3.9V4Zm0 16v-1.26A7.97 7.97 0 0 0 14.95 14h2.99A8.005 8.005 0 0 1 12 20Z" fill="#A3ABB0" />
                                                    </svg>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="https://www.example.com"
                                                        name='website'
                                                        value={formData.website}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </fieldset>


                                        </div>
                                    ) : (
                                        <div className="box">

                                            <fieldset className="box-fieldset">
                                                <label>OTP <span className='text-danger'>*</span></label>
                                                <div className="ip-field">
                                                    <svg
                                                        className="icon"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="4"
                                                            y="10"
                                                            width="16"
                                                            height="10"
                                                            rx="2"
                                                            stroke="#A3ABB0"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10"
                                                            stroke="#A3ABB0"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>



                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Your otp"
                                                        name='otp'
                                                        value={formData.otp}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </fieldset>
                                        </div>
                                    )}
                                <div className="box box-btn">
                                    <div className="tf-btn primary w-100" disabled={loading} style={{ cursor: "pointer" }} onClick={handleSubmit}>{showSotp ? "Verify OTP" : "Sign Up"}</div>
                                    {
                                        !showSotp &&
                                        <div className="text text-center">Do you have an account?
                                            <a href="#modalLogin" data-bs-toggle="modal" className="text-primary">Login</a>
                                        </div>
                                    }
                                </div>
                                {/* <p className="box text-center caption-2">or login with</p>
                                <div className="group-btn">
                                    <a href="#" className="btn-social">
                                        <img src="images/logo/google.jpg" alt="img" />
                                        Google
                                    </a>
                                    <a href="#" className="btn-social">
                                        <img src="images/logo/fb.jpg" alt="img" />
                                        Facebook
                                    </a>

                                </div> */}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;