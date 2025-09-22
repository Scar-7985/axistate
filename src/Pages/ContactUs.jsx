import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_API, POST_API } from "../Auth/Define";
import { Link } from 'react-router-dom';
import { swalMsg } from "../Components/SweetAlert2";

const ContactUs = () => {

    const [isloading, setIsLoading] = useState(false);
    const [contactData, setContactData] = useState(null);
    const [socialData, setSocialData] = useState(null);
    const [faqsData, setFaqsData] = useState([]);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });


    const getWebSett = () => {
        axios.post(`${GET_API}/get-web-sett.php`).then(resp => {
            // console.log(resp.data);

            if (resp.data) {
                setContactData(resp.data.contact_data);
                setSocialData(resp.data.social_data);
            }
        })
    }

    const getFaqs = () => {
        axios.post(`${GET_API}/get-faq.php`).then(resp => {
            console.log(resp.data);

            if (resp.data) {
                setFaqsData(resp.data);
            }
        })
    }

    useEffect(() => {
        getWebSett();
        getFaqs();
    }, []);

    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isloading) return;
        const contactData = new FormData();
        contactData.append("name", formData.fullname);
        contactData.append("email", formData.email);
        contactData.append("phone", formData.phone);
        contactData.append("subject", formData.subject);
        contactData.append("message", formData.message);

        axios.post(`${POST_API}/contact.php`, contactData).then(resp => {
            if (resp.data.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setFormData({
                    fullname: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                })
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
            setIsLoading(false);
        })
    }

    return (
        <div>
            <section className="flat-title-page" style={{ backgroundImage: 'url(assets/images/page-title/page-title-4.jpg)' }}>
                <div className="container">
                    <div className="breadcrumb-content">
                        <ul className="breadcrumb">
                            <li><Link to={"/"} className="text-white">Home</Link></li>
                            <li className="text-white">/ Contact Us</li>
                        </ul>
                        <h1 className="text-center text-white title">Contact Us</h1>
                    </div>
                </div>
            </section>

            <section className="flat-section flat-contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="contact-content">
                                <h4>Drop Us A Line</h4>
                                {/* <p className="body-2 text-variant-1">Feel free to connect with us through our online channels for updates, news, and more.</p> */}
                                <form onSubmit={handleFormSubmit} className="form-contact">
                                    <div className="box grid-2">
                                        <fieldset>
                                            <label for="name">Full Name:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Your full name"
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleChange}

                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label for="email">Email Address:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                    </div>
                                    <div className="box grid-2">
                                        <fieldset>
                                            <label for="phone">Phone:</label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                placeholder="ex 012345678"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                        <fieldset>
                                            <label for="subject">Subject:</label>
                                            <input
                                                type="text"
                                                className="form-control style-1"
                                                placeholder="Enter Keyword"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                            />
                                        </fieldset>
                                    </div>
                                    <fieldset>
                                        <label for="message">Your Message:</label>
                                        <textarea
                                            className="form-control"
                                            cols="30"
                                            rows="10"
                                            placeholder="Message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </fieldset>
                                    <div className="send-wrap mt-4">
                                        <button className="tf-btn primary size-1" type="submit">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="contact-info">
                                <h4>Contact Us</h4>
                                <ul>
                                    <li className="box">
                                        <h6 className="title">Address:</h6>
                                        <p className="text-variant-1">{contactData ? contactData.c_add : "United States"}</p>
                                    </li>
                                    <li className="box">
                                        <h6 className="title">Infomation:</h6>
                                        <p className="text-variant-1">{contactData ? contactData.c_phone : "555-555-5555"} <br /> {contactData ? contactData.c_email : "xyz@gmail.com"}</p>
                                    </li>
                                    <li className="box">
                                        <h6 className="title">Follow Us:</h6>
                                        <ul className="box-social">
                                            <li>
                                                <Link to={socialData ? socialData.facebook : "https://www.facebook.com/"} className="item">
                                                    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z" fill="#161E2D" />
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={socialData ? socialData.linkedin : "https://www.linkedin.com/"} className="item">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.58151 16H0.264292V5.31762H3.58151V16ZM1.92111 3.86044C0.860376 3.86044 0 2.98185 0 1.92111C7.59231e-09 1.4116 0.202403 0.92296 0.562681 0.562681C0.92296 0.202403 1.4116 0 1.92111 0C2.43063 0 2.91927 0.202403 3.27955 0.562681C3.63983 0.92296 3.84223 1.4116 3.84223 1.92111C3.84223 2.98185 2.98149 3.86044 1.92111 3.86044ZM15.9968 16H12.6867V10.7999C12.6867 9.56057 12.6617 7.97125 10.962 7.97125C9.23735 7.97125 8.97306 9.31771 8.97306 10.7106V16H5.65941V5.31762H8.84091V6.77479H8.88734C9.33021 5.93549 10.412 5.04976 12.026 5.04976C15.3832 5.04976 16.0004 7.26052 16.0004 10.132V16H15.9968Z" fill="#161E2D" />
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={socialData ? socialData.twitter : "https://x.com/"} className="item">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8.30314 5.92804L13.4029 0H12.1944L7.7663 5.14724L4.22958 0H0.150391L5.4986 7.78354L0.150391 14H1.35894L6.03514 8.56434L9.77017 14H13.8494L8.30284 5.92804H8.30314ZM6.64787 7.85211L6.10598 7.07705L1.79439 0.909771H3.65065L7.13015 5.88696L7.67204 6.66202L12.195 13.1316H10.3387L6.64787 7.85241V7.85211Z" fill="#161E2D" />
                                                    </svg>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={socialData ? socialData.youtube : "https://www.youtube.com/"} className="item">
                                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M15.6657 1.76024C15.4817 1.06737 14.9395 0.521689 14.2511 0.336504C13.0033 0 8 0 8 0C8 0 2.99669 0 1.7489 0.336504C1.06052 0.521718 0.518349 1.06737 0.334336 1.76024C0 3.01611 0 5.63636 0 5.63636C0 5.63636 0 8.25661 0.334336 9.51248C0.518349 10.2053 1.06052 10.7283 1.7489 10.9135C2.99669 11.25 8 11.25 8 11.25C8 11.25 13.0033 11.25 14.2511 10.9135C14.9395 10.7283 15.4817 10.2053 15.6657 9.51248C16 8.25661 16 5.63636 16 5.63636C16 5.63636 16 3.01611 15.6657 1.76024ZM6.36363 8.01535V3.25737L10.5454 5.63642L6.36363 8.01535Z" fill="#161E2D" />
                                                    </svg>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* map */}

            {/* <section className="">
                <div id="map-contact" className="map-contact"  data-map-zoom="16" data-map-scroll="true"></div>
            </section> */}

            <section className="">
                <div
                    id="map-contact"
                    className="map-contact"
                    style={{ height: "500px", width: "100vw" }}
                    dangerouslySetInnerHTML={{
                        __html: contactData ? decodeHtml(contactData.c_map) : ""
                    }}
                />
            </section>




            {/* faq  */}
            <section className="flat-section">
                <div className="container">
                    <div className="tf-faq">
                        <div className="box-title style-1 text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                            <div className="text-subtitle text-primary">Faqs</div>
                            <h3 className="title mt-4">Frequently Asked Questions</h3>
                        </div>
                        <ul className="box-faq" id="wrapper-faq">

                            {
                                faqsData.length > 0 && faqsData.map((item, index) => {
                                    return (
                                        <li className="faq-item shadow-sm">
                                            <a href={`#accordion-faq-${index}`} className={`faq-header ${index !== 0 ? "collapsed" : ""} `} data-bs-toggle="collapse" aria-expanded="false" aria-controls={`accordion-faq-${index}`}>
                                                {item.title}
                                            </a>
                                            <div id={`accordion-faq-${index}`} className={`collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#wrapper-faq">
                                                <p className="faq-body" dangerouslySetInnerHTML={{ __html: decodeHtml(item.content) }} />
                                            </div>
                                        </li>
                                    )
                                })
                            }





                        </ul>

                    </div>
                </div>
            </section>
            {/* end faq  */}
        </div>
    )
}

export default ContactUs;