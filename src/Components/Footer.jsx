import React, { useEffect, useState } from 'react'
import { GET_API, SITE_LOGO } from "../Auth/Define";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {

  const [Year, setYear] = useState(2000);
  const [contactData, setContactData] = useState(null);
  const [socialData, setSocialData] = useState(null);


  const getWebSett = () => {
    axios.post(`${GET_API}/get-web-sett.php`).then(resp => {
      if (resp.data) {
        setContactData(resp.data.contact_data);
        setSocialData(resp.data.social_data);
      }
    })
  }


  useEffect(() => {
    // getWebSett();

    const date = new Date();
    const getYear = date.getFullYear();
    setYear(getYear);
  }, [])


  return (
    <footer className="footer">
      <div className="top-footer">
        <div className="container">
          <div className="content-footer-top">
            <div className="footer-logo"><Link to={"/"}>
              <img src={SITE_LOGO} alt="logo" width="166" height="48" /></Link></div>
            <div className="wd-social">
              <span>Follow Us:</span>
              <ul className="list-social d-flex align-items-center">
                <li>
                  <Link to={socialData ? socialData.facebook : "https://www.facebook.com/"} target="_blank" className="box-icon w-40 social">
                    <svg className="icon" width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.60547 9L8.00541 6.10437H5.50481V4.22531C5.50481 3.43313 5.85413 2.66094 6.97406 2.66094H8.11087V0.195625C8.11087 0.195625 7.07925 0 6.09291 0C4.03359 0 2.68753 1.38688 2.68753 3.8975V6.10437H0.398438V9H2.68753V16H5.50481V9H7.60547Z" fill="white" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to={socialData ? socialData.linkedin : "https://www.linkedin.com/"} target="_blank" className="box-icon w-40 social">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.58151 16H0.264292V5.31762H3.58151V16ZM1.92111 3.86044C0.860376 3.86044 0 2.98185 0 1.92111C7.59231e-09 1.4116 0.202403 0.92296 0.562681 0.562681C0.92296 0.202403 1.4116 0 1.92111 0C2.43063 0 2.91927 0.202403 3.27955 0.562681C3.63983 0.92296 3.84223 1.4116 3.84223 1.92111C3.84223 2.98185 2.98149 3.86044 1.92111 3.86044ZM15.9968 16H12.6867V10.7999C12.6867 9.56057 12.6617 7.97125 10.962 7.97125C9.23735 7.97125 8.97306 9.31771 8.97306 10.7106V16H5.65941V5.31762H8.84091V6.77479H8.88734C9.33021 5.93549 10.412 5.04976 12.026 5.04976C15.3832 5.04976 16.0004 7.26052 16.0004 10.132V16H15.9968Z" fill="white" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to={socialData ? socialData.twitter : "https://x.com/"} target="_blank" className="box-icon w-40 social">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.30314 5.92804L13.4029 0H12.1944L7.7663 5.14724L4.22958 0H0.150391L5.4986 7.78354L0.150391 14H1.35894L6.03514 8.56434L9.77017 14H13.8494L8.30284 5.92804H8.30314ZM6.64787 7.85211L6.10598 7.07705L1.79439 0.909771H3.65065L7.13015 5.88696L7.67204 6.66202L12.195 13.1316H10.3387L6.64787 7.85241V7.85211Z" fill="white" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to={socialData ? socialData.youtube : "https://www.youtube.com/"} target="_blank" className="box-icon w-40 social">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.6657 1.76024C15.4817 1.06737 14.9395 0.521689 14.2511 0.336504C13.0033 0 8 0 8 0C8 0 2.99669 0 1.7489 0.336504C1.06052 0.521718 0.518349 1.06737 0.334336 1.76024C0 3.01611 0 5.63636 0 5.63636C0 5.63636 0 8.25661 0.334336 9.51248C0.518349 10.2053 1.06052 10.7283 1.7489 10.9135C2.99669 11.25 8 11.25 8 11.25C8 11.25 13.0033 11.25 14.2511 10.9135C14.9395 10.7283 15.4817 10.2053 15.6657 9.51248C16 8.25661 16 5.63636 16 5.63636C16 5.63636 16 3.01611 15.6657 1.76024ZM6.36363 8.01535V3.25737L10.5454 5.63642L6.36363 8.01535Z" fill="white" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="inner-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-cl-1">
                {/* <p className="text-variant-2">Specializes in providing high-class tours for those in need. Contact Us</p> */}
                <ul className="mt-12">
                  <li className="mt-12 d-flex align-items-center gap-8">
                    <i className="icon icon-mapPinLine fs-20 text-variant-2"></i>
                    <p className="text-white">{contactData ? contactData.c_add : "United States"}</p>
                  </li>
                  <li className="mt-12 d-flex align-items-center gap-8">
                    <i className="icon icon-phone2 fs-20 text-variant-2"></i>
                    <a href="#" className="text-white caption-1">{contactData ? contactData.c_phone : "555-555-5555"}</a>
                  </li>
                  <li className="mt-12 d-flex align-items-center gap-8">
                    <i className="icon icon-mail fs-20 text-variant-2"></i>
                    <p className="text-white">{contactData ? contactData.c_email : "xyz@gmail.com"}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-cl-2 footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">Categories</div>
                <div className="tf-collapse-content">
                  <ul className="mt-10 navigation-menu-footer">
                    <li> <a href="#" className="caption-1 text-variant-2">Pricing Plans</a> </li>

                    <li> <a href="#" className="caption-1 text-variant-2">Our Services</a> </li>

                    <li> <a href="#" className="caption-1 text-variant-2">About Us</a> </li>

                    <li> <Link to={"/contact-us"} className="caption-1 text-variant-2">Contact Us</Link> </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-cl-3 footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">Our Company</div>
                <div className="tf-collapse-content">
                  <ul className="mt-10 navigation-menu-footer">
                    <li> <a href="#" className="caption-1 text-variant-2">Property For Sale</a> </li>
                    <li> <a href="#" className="caption-1 text-variant-2">Property For Rent</a> </li>
                    <li> <a href="#" className="caption-1 text-variant-2">Property For Buy</a> </li>
                    <li> <a href="#" className="caption-1 text-variant-2">Our Agents</a> </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="footer-cl-4 footer-col-block">
                <div className="fw-7 text-white footer-heading-mobile">Newsletter</div>
                <div className="tf-collapse-content">
                  <p className="mt-12 text-variant-2">Your Weekly/Monthly Dose of Knowledge and Inspiration</p>
                  <form className="mt-12" id="subscribe-form" action="#" method="post" acceptCharset="utf-8" data-mailchimp="true">
                    <div id="subscribe-content">
                      <input type="email" name="email-form" id="subscribe-email" placeholder="Your email address" />
                      <button type="button" id="subscribe-button" className="button-subscribe">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.00044 9.99935L2.72461 2.60352C8.16867 4.18685 13.3024 6.68806 17.9046 9.99935C13.3027 13.3106 8.16921 15.8118 2.72544 17.3952L5.00044 9.99935ZM5.00044 9.99935H11.2504" stroke="#1563DF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <div id="subscribe-msg"></div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="content-footer-bottom">
            <div className="copyright">©{Year} Westonik. All Rights Reserved.</div>

            <ul className="menu-bottom">
              <li><Link to={"/terms"}>Terms Of Services</Link> </li>
              <li><Link to={"/policy"}>Privacy Policy</Link> </li>

            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
