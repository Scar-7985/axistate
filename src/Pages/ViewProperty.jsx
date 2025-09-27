import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ValuationCalculator from '../Components/ValuationCalculator';
import axios from 'axios';
import { GET_API, IMAGE_URL, MEDIA_URL } from '../Auth/Define';
import { Link, useLocation } from 'react-router-dom';

const ViewProperty = () => {

    const location = useLocation();
    const [propertyData, setPropertyData] = useState(null);
    const [images, setImages] = useState([]);
    const [sitePlan, setSitePlan] = useState([]);
    const [brochure, setBrochure] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const tempImages = [
        "/assets/images/slider/baner-single-1.jpg",
        "/assets/images/slider/baner-single-2.jpg",
    ];

    const getArray = (getData) => {
        let newData = getData;

        if (newData.includes("@@")) {
            newData = newData.replace(/@@$/, "").split("@@");
        } else {
            newData = [newData];
        }

        return newData;
    };


    const fetchListings = (getPID) => {
        if (isLoading) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append("pid", getPID);
        axios.post(`${GET_API}/view-property.php`, formData).then(resp => {

            if (resp.data.status === 100) {
                console.log(resp.data.value);
                setPropertyData(resp.data.value);
                setBrochure(resp.data.value.brochure);
                const findImages = getArray(resp.data.value.photos);
                setImages(findImages);

                const findSitePlan = getArray(resp.data.value.site_plan);

                setSitePlan(findSitePlan);

            }
            setIsLoading(false);
        })
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pid = params.get("pid");

        if (pid) {
            fetchListings(pid);
        } else {
            window.history.back();
        }

    }, [location.search])




    return (
        <React.Fragment>
            {
                !isLoading ? (
                    <React.Fragment>
                        {
                            propertyData &&
                            <section className="flat-slider-detail-v2 flat-slider-wrap">
                                <section className="flat-slider-detail-v2 flat-slider-wrap">
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={0}
                                        slidesPerView={1}

                                        navigation={{
                                            nextEl: ".nav-prev-location", // ← reverse here
                                            prevEl: ".nav-next-location", // ← reverse here
                                        }}
                                        pagination={{
                                            el: ".sw-pagination-location",
                                            clickable: true,
                                        }}
                                        breakpoints={{
                                            320: { slidesPerView: 1 },
                                            768: { slidesPerView: 1 },
                                            1024: { slidesPerView: 1 },
                                        }}
                                        className="tf-sw-location"
                                        dir="ltr"
                                    >

                                        {

                                            images.length > 0
                                                ? (
                                                    images.map((src, index) => (
                                                        <SwiperSlide key={index}>
                                                            <a
                                                                href={`${MEDIA_URL}/${src}`}
                                                                target='_blank'
                                                                data-fancybox="gallery"
                                                                className="box-img-detail d-block"
                                                                style={{ height: "calc(100vh - 400px)" }}
                                                            >
                                                                <img
                                                                    src={`${MEDIA_URL}/${src}`}
                                                                    loading="lazy"
                                                                    alt={`img-property-${index}`}
                                                                    style={{
                                                                        width: "100%",
                                                                        height: "100%",
                                                                        objectFit: "contain"   // keeps aspect ratio, no zoom
                                                                    }}
                                                                />
                                                            </a>

                                                        </SwiperSlide>
                                                    ))
                                                ) : (
                                                    tempImages.map((src, index) => (
                                                        <SwiperSlide key={index}>
                                                            <a data-fancybox="gallery" className="box-img-detail d-block">
                                                                <img src={src} loading='lazy' alt={`img-property-${index}`} />
                                                            </a>
                                                        </SwiperSlide>
                                                    ))
                                                )

                                        }



                                    </Swiper>

                                    {/* Custom Navigation Arrows */}
                                    <div className="box-navigation">
                                        <div className="navigation swiper-nav-next nav-next-location">
                                            <span className="icon icon-arr-l"></span>
                                        </div>
                                        <div className="navigation swiper-nav-prev nav-prev-location">
                                            <span className="icon icon-arr-r"></span>
                                        </div>
                                    </div>

                                    {/* Pagination */}
                                    <div className="sw-pagination sw-pagination-location text-center"></div>
                                </section>
                            </section>

                        }

                        {
                            propertyData &&
                            <section className="flat-section-v3 flat-property-detail-v2">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-8 col-lg-7">
                                            <div className="single-property-element">
                                                <div className="header-property-detail">
                                                    <div className="content-top d-flex justify-content-between align-items-center">
                                                        <h3 className="title link fw-8">{propertyData.property_name}</h3>
                                                        <div className="box-price d-flex align-items-end">
                                                            <h3 className="fw-8">{'$' + ' ' + propertyData.asking_price}</h3>
                                                            <span className="body-1 text-variant-1">/month</span>
                                                        </div>
                                                    </div>
                                                    <div className="content-bottom">
                                                        <div className="box-left">
                                                            <div className="info-box">
                                                                <p className="meta-item mb-8"><span className="icon icon-mapPin">
                                                                </span>
                                                                    <span className="text-variant-1">
                                                                        {propertyData.address + ' ' + ',' + propertyData.city + ' ' + ',' + propertyData.state}

                                                                        {/*  + ' ' + ',' + propertyData.country */}
                                                                    </span></p>

                                                                <ul className="meta">
                                                                    <li className="meta-item">
                                                                        <i className="icon icon-bed"></i>
                                                                        <span className="text-variant-1">Beds:</span>
                                                                        <span className="fw-6">3</span>
                                                                    </li>
                                                                    <li className="meta-item">
                                                                        <i className="icon icon-bath"></i>
                                                                        <span className="text-variant-1">Baths:</span>
                                                                        <span className="fw-6">2</span>
                                                                    </li>
                                                                    <li className="meta-item">
                                                                        <i className="icon icon-sqft"></i>
                                                                        <span className="text-variant-1">Sqft:</span>
                                                                        <span className="fw-6">1150</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <ul className="icon-box">
                                                            <li><a className="item">
                                                                <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M15.75 6.1875C15.75 4.32375 14.1758 2.8125 12.234 2.8125C10.7828 2.8125 9.53625 3.657 9 4.86225C8.46375 3.657 7.21725 2.8125 5.76525 2.8125C3.825 2.8125 2.25 4.32375 2.25 6.1875C2.25 11.6025 9 15.1875 9 15.1875C9 15.1875 15.75 11.6025 15.75 6.1875Z" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>

                                                            </a></li>
                                                            <li><a className="item">
                                                                <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5.625 15.75L2.25 12.375M2.25 12.375L5.625 9M2.25 12.375H12.375M12.375 2.25L15.75 5.625M15.75 5.625L12.375 9M15.75 5.625H5.625" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>

                                                            </a></li>
                                                            <li><a className="item">
                                                                <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5.41251 8.18022C5.23091 7.85345 4.94594 7.59624 4.60234 7.44895C4.25874 7.30167 3.87596 7.27265 3.51408 7.36645C3.1522 7.46025 2.83171 7.67157 2.60293 7.96722C2.37414 8.26287 2.25 8.62613 2.25 8.99997C2.25 9.37381 2.37414 9.73706 2.60293 10.0327C2.83171 10.3284 3.1522 10.5397 3.51408 10.6335C3.87596 10.7273 4.25874 10.6983 4.60234 10.551C4.94594 10.4037 5.23091 10.1465 5.41251 9.81972M5.41251 8.18022C5.54751 8.42322 5.62476 8.70222 5.62476 8.99997C5.62476 9.29772 5.54751 9.57747 5.41251 9.81972M5.41251 8.18022L12.587 4.19472M5.41251 9.81972L12.587 13.8052M12.587 4.19472C12.6922 4.39282 12.8358 4.56797 13.0095 4.70991C13.1832 4.85186 13.3834 4.95776 13.5985 5.02143C13.8135 5.08509 14.0392 5.10523 14.2621 5.08069C14.4851 5.05614 14.7009 4.98739 14.897 4.87846C15.093 4.76953 15.2654 4.62261 15.404 4.44628C15.5427 4.26995 15.6448 4.06775 15.7043 3.85151C15.7639 3.63526 15.7798 3.40931 15.751 3.18686C15.7222 2.96442 15.6494 2.74994 15.5368 2.55597C15.3148 2.17372 14.9518 1.89382 14.5256 1.77643C14.0995 1.65904 13.6443 1.71352 13.2579 1.92818C12.8715 2.14284 12.5848 2.50053 12.4593 2.92436C12.3339 3.34819 12.3797 3.80433 12.587 4.19472ZM12.587 13.8052C12.4794 13.999 12.4109 14.2121 12.3856 14.4323C12.3603 14.6525 12.3787 14.8756 12.4396 15.0887C12.5005 15.3019 12.6028 15.5009 12.7406 15.6746C12.8784 15.8482 13.0491 15.9929 13.2429 16.1006C13.4367 16.2082 13.6498 16.2767 13.87 16.302C14.0902 16.3273 14.3133 16.3089 14.5264 16.248C14.7396 16.1871 14.9386 16.0848 15.1122 15.947C15.2858 15.8092 15.4306 15.6385 15.5383 15.4447C15.7557 15.0534 15.8087 14.5917 15.6857 14.1612C15.5627 13.7307 15.2737 13.3668 14.8824 13.1493C14.491 12.9319 14.0293 12.8789 13.5989 13.0019C13.1684 13.1249 12.8044 13.4139 12.587 13.8052Z" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </a></li>
                                                            <li><a className="item">
                                                                <svg className="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5.04 10.3718C4.86 10.3943 4.68 10.4183 4.5 10.4438M5.04 10.3718C7.66969 10.0418 10.3303 10.0418 12.96 10.3718M5.04 10.3718L4.755 13.5M12.96 10.3718C13.14 10.3943 13.32 10.4183 13.5 10.4438M12.96 10.3718L13.245 13.5L13.4167 15.3923C13.4274 15.509 13.4136 15.6267 13.3762 15.7378C13.3388 15.8489 13.2787 15.951 13.1996 16.0376C13.1206 16.1242 13.0244 16.1933 12.9172 16.2407C12.8099 16.288 12.694 16.3125 12.5767 16.3125H5.42325C4.92675 16.3125 4.53825 15.8865 4.58325 15.3923L4.755 13.5M4.755 13.5H3.9375C3.48995 13.5 3.06072 13.3222 2.74426 13.0057C2.42779 12.6893 2.25 12.2601 2.25 11.8125V7.092C2.25 6.28125 2.826 5.58075 3.62775 5.46075C4.10471 5.3894 4.58306 5.32764 5.0625 5.2755M13.2435 13.5H14.0618C14.2834 13.5001 14.5029 13.4565 14.7078 13.3718C14.9126 13.287 15.0987 13.1627 15.2555 13.006C15.4123 12.8493 15.5366 12.6632 15.6215 12.4585C15.7063 12.2537 15.75 12.0342 15.75 11.8125V7.092C15.75 6.28125 15.174 5.58075 14.3723 5.46075C13.8953 5.38941 13.4169 5.32764 12.9375 5.2755M12.9375 5.2755C10.3202 4.99073 7.67978 4.99073 5.0625 5.2755M12.9375 5.2755V2.53125C12.9375 2.0655 12.5595 1.6875 12.0938 1.6875H5.90625C5.4405 1.6875 5.0625 2.0655 5.0625 2.53125V5.2755M13.5 7.875H13.506V7.881H13.5V7.875ZM11.25 7.875H11.256V7.881H11.25V7.875Z" stroke="#A3ABB0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </a></li>

                                                        </ul>

                                                    </div>
                                                </div>
                                                {/* <div className="single-property-desc">
                                                    <h6 className="fw-6 title">Description</h6>
                                                    <p className="text-variant-1">Located around an hour away from Paris, between the Perche and the Iton valley, in a beautiful wooded park bordered by a charming stream, this country property immediately seduces with its bucolic and soothing environment.</p>
                                                    <p className="mt-8 text-variant-1">An ideal choice for sports and leisure enthusiasts who will be able to take advantage of its swimming pool (11m x 5m), tennis court, gym and sauna.</p>
                                                    <a className="btn-view"><span className="text">View More</span> </a>
                                                </div> */}
                                                <div className="single-property-overview">
                                                    <h6 className="title fw-6">Overview</h6>
                                                    <ul className="info-box">
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-house-line"></i></a>
                                                            <div className="content">
                                                                <span className="label">ID:</span>
                                                                <span>2297</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-sliders-horizontal"></i></a>
                                                            <div className="content">
                                                                <span className="label">Type:</span>
                                                                <span>House</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-garage"></i></a>
                                                            <div className="content">
                                                                <span className="label">Garages:</span>
                                                                <span>1</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-bed1"></i></a>
                                                            <div className="content">
                                                                <span className="label">Bedrooms:</span>
                                                                <span>2 Rooms</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-bathtub"></i></a>
                                                            <div className="content">
                                                                <span className="label">Bathrooms:</span>
                                                                <span>2 Rooms</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-crop"></i></a>
                                                            <div className="content">
                                                                <span className="label">Land Size:</span>
                                                                <span>2,000 SqFt</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-hammer"></i></a>
                                                            <div className="content">
                                                                <span className="label">Year Built:</span>
                                                                <span>2024</span>
                                                            </div>
                                                        </li>
                                                        <li className="item">
                                                            <a className="box-icon w-52"><i className="icon icon-ruler"></i></a>
                                                            <div className="content">
                                                                <span className="label">Size:</span>
                                                                <span>900 SqFt</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </div>

                                            {/* Valuation Calculator */}
                                            {/* <ValuationCalculator /> */}
                                            {/* Valuation Calculator */}

                                            {/* <div className="single-property-element single-property-video">
                                                <h6 className="title fw-6">Video</h6>
                                                <div className="img-video">
                                                    <img src="/assets/images/banner/img-video.jpg" alt="img-video" />
                                                    <a href="https://youtu.be/MLpWrANjFbI" target='_blank' data-fancybox="gallery2" className="btn-video"> <span className="icon icon-play"></span></a>
                                                </div>
                                            </div> */}
                                            <div className="single-property-element single-property-info">
                                                <h6 className="title fw-6">Property Details</h6>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">ID:</span>
                                                            <div className="content text-black-3">#1234</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Beds</span>
                                                            <div className="content text-black-3">7.328</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Price</span>
                                                            <div className="content text-black-3">$7,500</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Year built</span>
                                                            <div className="content text-black-3">2024</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Size</span>
                                                            <div className="content text-black-3">150 sqft</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Type</span>
                                                            <div className="content text-black-3">Villa</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Rooms</span>
                                                            <div className="content text-black-3">9</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Status</span>
                                                            <div className="content text-black-3">For sale</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Baths</span>
                                                            <div className="content text-black-3">3</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="inner-box">
                                                            <span className="label text-black-3">Garage</span>
                                                            <div className="content text-black-3">1</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {/* <div className="single-property-element single-property-feature">
                                                <h6 className="title fw-6">Amenities and features</h6>
                                                <div className="wrap-feature">
                                                    <div className="box-feature">
                                                        <ul>
                                                            <li className="feature-item">
                                                                Smoke alarm
                                                            </li>
                                                            <li className="feature-item">
                                                                Carbon monoxide alarm
                                                            </li>
                                                            <li className="feature-item">
                                                                First aid kit
                                                            </li>
                                                            <li className="feature-item">
                                                                Self check-in with lockbox
                                                            </li>
                                                            <li className="feature-item">
                                                                Security cameras
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="box-feature">
                                                        <ul>
                                                            <li className="feature-item">
                                                                Hangers
                                                            </li>
                                                            <li className="feature-item">
                                                                Bed linens
                                                            </li>
                                                            <li className="feature-item">
                                                                Extra pillows & blankets
                                                            </li>
                                                            <li className="feature-item">
                                                                Iron
                                                            </li>
                                                            <li className="feature-item">
                                                                TV with standard cable
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="box-feature">
                                                        <ul>
                                                            <li className="feature-item">
                                                                Refrigerator
                                                            </li>
                                                            <li className="feature-item">
                                                                Microwave
                                                            </li>
                                                            <li className="feature-item">
                                                                Dishwasher
                                                            </li>
                                                            <li className="feature-item">
                                                                Coffee maker
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="single-property-element single-property-floor">
                                                <h6 className="title fw-6">Site plans</h6>
                                                <ul className="box-floor" id="parent-floor">
                                                    {
                                                        sitePlan.length > 0 &&
                                                        sitePlan.map((item, index) => {
                                                            return (
                                                                <li className="floor-item">
                                                                    <div className={`floor-header ${index === 0 ? "" : "collapsed"}`} data-bs-target={`#floor-${index}`} data-bs-toggle="collapse" aria-expanded="false" aria-controls={`floor-${index}`} role="button">
                                                                        <div className="inner-left">
                                                                            <i className="icon icon-arr-r"></i>
                                                                            <span className="text-btn">Site Plan {index + 1}</span>
                                                                        </div>
                                                                        {/* <ul className="inner-right">
                                                                            <li className="d-flex align-items-center gap-8">
                                                                                <i className="icon icon-bed"></i>
                                                                                2 Bedroom
                                                                            </li>
                                                                            <li className="d-flex align-items-center gap-8">
                                                                                <i className="icon icon-bath"></i>
                                                                                2 Bathroom
                                                                            </li>
                                                                        </ul> */}
                                                                    </div>
                                                                    <div id={`floor-${index}`} className={`collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#parent-floor">
                                                                        <div className="faq-body">
                                                                            <div className="box-img">
                                                                                <img src={`${MEDIA_URL}/${item}`} loading='lazy' alt="img-floor" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>

                                            <div className="single-property-element single-property-map">
                                                <h6 className="title fw-6">Map location</h6>
                                                <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d135905.11693909427!2d-73.95165795400088!3d41.17584829642291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1727094281524!5m2!1sen!2s" height="478" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                                <div className="info-map">
                                                    <ul className="box-left">
                                                        <li>
                                                            <span className="label fw-6">Address</span>
                                                            <div className="text text-variant-1">150 sqft</div>
                                                        </li>
                                                        <li>
                                                            <span className="label fw-6">City</span>
                                                            <div className="text text-variant-1">#1234</div>
                                                        </li>
                                                        <li>
                                                            <span className="label fw-6">State/county</span>
                                                            <div className="text text-variant-1">$7,500</div>
                                                        </li>
                                                    </ul>
                                                    <ul className="box-right">
                                                        <li>
                                                            <span className="label fw-6">Postal code</span>
                                                            <div className="text text-variant-1">7.328</div>
                                                        </li>
                                                        <li>
                                                            <span className="label fw-6">Area</span>
                                                            <div className="text text-variant-1">7.328</div>
                                                        </li>
                                                        <li>
                                                            <span className="label fw-6">Country</span>
                                                            <div className="text text-variant-1">2024</div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            {/* <div className="single-property-element single-property-explore">
                                                <h6 className="title fw-6">Explore Property</h6>
                                                <div className="box-img">
                                                    <img src="/assets/images/banner/img-explore.jpg" alt="img" />
                                                    <div className="box-icon">
                                                        <span className="icon icon-360"></span>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {/* <div className="single-property-element single-property-nearby">
                                                <h6 className="title fw-6">What’s nearby?</h6>
                                                <p>Explore nearby amenities to precisely locate your property and identify surrounding conveniences, providing a comprehensive overview of the living environment and the property's convenience.</p>
                                                <div className="row box-nearby">
                                                    <div className="col-md-5">
                                                        <ul className="box-left">
                                                            <li className="item-nearby">
                                                                <span className="label">School:</span>
                                                                <span className="fw-7">0.7 km</span>
                                                            </li>
                                                            <li className="item-nearby">
                                                                <span className="label">University:</span>
                                                                <span className="fw-7">1.3 km</span>
                                                            </li>
                                                            <li className="item-nearby">
                                                                <span className="label">Grocery center:</span>
                                                                <span className="fw-7">0.6 km</span>
                                                            </li>
                                                            <li className="item-nearby">
                                                                <span className="label">Market:</span>
                                                                <span className="fw-7">1.1 km</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <ul className="box-right">
                                                            <li className="item-nearby">
                                                                <span className="label">Hospital:</span>
                                                                <span className="fw-7">0.4 km</span>
                                                            </li>
                                                            <li className="item-nearby">
                                                                <span className="label">Metro station:</span>
                                                                <span className="fw-7">1.8 km</span>
                                                            </li>
                                                            <li className="item-nearby">
                                                                <span className="label">Gym, wellness:</span>
                                                                <span className="fw-7">1.3 km</span>
                                                            </li>
                                                            <li className="item-nearby">
                                                                <span className="label">River:</span>
                                                                <span className="fw-7">2.1 km</span>
                                                            </li>
                                                        </ul>
                                                    </div>


                                                </div>

                                            </div> */}

                                            {/* <div className="single-property-element single-wrapper-review">
                                                <h6 className="title fw-6">Guest reviews</h6>
                                                <form className="wrap-review">
                                                    <ul className="box-review">
                                                        <li className="list-review-item">
                                                            <div className="avatar avt-60">
                                                                <img src="/assets/images/avatar/avt-2.jpg" alt="avatar" />
                                                            </div>
                                                            <div className="content">
                                                                <div className="box-head">
                                                                    <div className="d-flex align-items-center flex-wrap justify-content-between gap-8">
                                                                        <h6>Floyd Miles</h6>
                                                                        <ul className="list-star">
                                                                            <li className="icon icon-star"></li>
                                                                            <li className="icon icon-star"></li>
                                                                            <li className="icon icon-star"></li>
                                                                            <li className="icon icon-star"></li>
                                                                            <li className="icon icon-star"></li>
                                                                        </ul>
                                                                    </div>
                                                                    <p className="mt-4 caption-2 text-variant-2">August 13, 2024</p>
                                                                </div>
                                                                <p>It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable. Live support is helpful, solved my issue in no time.</p>
                                                                <div className="box-img">
                                                                    <div className="img">
                                                                        <img src="/assets/images/blog/review1.jpg" alt="review" />
                                                                    </div>
                                                                    <div className="img">
                                                                        <img src="/assets/images/blog/review2.jpg" alt="review" />
                                                                    </div>
                                                                    <div className="img">
                                                                        <img src="/assets/images/blog/review3.jpg" alt="review" />
                                                                    </div>
                                                                </div>
                                                                <div className="action mt-12">
                                                                    <div className="d-flex align-items-center gap-6">
                                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M12.375 6.75H10.6875M4.66949 14.0625C4.66124 14.025 4.64849 13.9875 4.63049 13.9515C4.18724 13.0515 3.93749 12.039 3.93749 10.9687C3.93587 9.89238 4.19282 8.83136 4.68674 7.875M4.66949 14.0625C4.72649 14.3362 4.53224 14.625 4.23824 14.625H3.55724C2.89049 14.625 2.27249 14.2365 2.07824 13.599C1.82399 12.7665 1.68749 11.8837 1.68749 10.9687C1.68749 9.804 1.90874 8.69175 2.31074 7.67025C2.54024 7.08975 3.12524 6.75 3.74999 6.75H4.53974C4.89374 6.75 5.09849 7.167 4.91474 7.47C4.83434 7.60234 4.7578 7.73742 4.68674 7.875M4.66949 14.0625H5.63999C6.0027 14.0623 6.36307 14.1205 6.70724 14.235L9.04274 15.015C9.38691 15.1295 9.74728 15.1877 10.11 15.1875H13.122C13.5855 15.1875 14.0347 15.0022 14.3257 14.6407C15.6143 13.0434 16.3156 11.0523 16.3125 9C16.3125 8.6745 16.2952 8.35275 16.2615 8.03625C16.1797 7.2705 15.4905 6.75 14.721 6.75H12.3765C11.913 6.75 11.6332 6.207 11.8327 5.7885C12.191 5.03444 12.3763 4.20985 12.375 3.375C12.375 2.92745 12.1972 2.49823 11.8807 2.18176C11.5643 1.86529 11.135 1.6875 10.6875 1.6875C10.5383 1.6875 10.3952 1.74676 10.2897 1.85225C10.1843 1.95774 10.125 2.10082 10.125 2.25V2.72475C10.125 3.1545 10.0425 3.57975 9.88349 3.97875C9.65549 4.54875 9.18599 4.97625 8.64374 5.265C7.81128 5.7092 7.0807 6.32228 6.49874 7.065C6.12524 7.5405 5.57924 7.875 4.97474 7.875H4.68674" stroke="#7C818B" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <span className="font-rubik">Useful</span>
                                                                    </div>
                                                                    <div className="d-flex align-items-center gap-6">
                                                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M5.62501 11.25H7.31251M13.3305 3.9375C13.3388 3.975 13.3515 4.0125 13.3695 4.0485C13.8128 4.9485 14.0625 5.961 14.0625 7.03125C14.0641 8.10762 13.8072 9.16864 13.3133 10.125M13.3305 3.9375C13.2735 3.66375 13.4678 3.375 13.7618 3.375H14.4428C15.1095 3.375 15.7275 3.7635 15.9218 4.401C16.176 5.2335 16.3125 6.11625 16.3125 7.03125C16.3125 8.196 16.0913 9.30825 15.6893 10.3298C15.4598 10.9103 14.8748 11.25 14.25 11.25H13.4603C13.1063 11.25 12.9015 10.833 13.0853 10.53C13.1657 10.3977 13.2422 10.2626 13.3133 10.125M13.3305 3.9375H12.36C11.9973 3.93772 11.6369 3.87948 11.2928 3.765L8.95726 2.985C8.61309 2.87053 8.25272 2.81228 7.89001 2.8125H4.87801C4.41451 2.8125 3.96526 2.99775 3.67426 3.35925C2.38572 4.95658 1.68441 6.94774 1.68751 9C1.68751 9.3255 1.70476 9.64725 1.73851 9.96375C1.82026 10.7295 2.50951 11.25 3.27901 11.25H5.62351C6.08701 11.25 6.36676 11.793 6.16726 12.2115C5.80897 12.9656 5.6237 13.7902 5.62501 14.625C5.62501 15.0726 5.8028 15.5018 6.11927 15.8182C6.43574 16.1347 6.86496 16.3125 7.31251 16.3125C7.46169 16.3125 7.60477 16.2532 7.71026 16.1477C7.81575 16.0423 7.87501 15.8992 7.87501 15.75V15.2753C7.87501 14.8455 7.95751 14.4203 8.11651 14.0213C8.34451 13.4513 8.81401 13.0238 9.35626 12.735C10.1887 12.2908 10.9193 11.6777 11.5013 10.935C11.8748 10.4595 12.4208 10.125 13.0253 10.125H13.3133" stroke="#7C818B" strokeLinecap="round" strokeLinejoin="round" />
                                                                        </svg>
                                                                        <span className="font-rubik">Not helpful </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="list-review-item">
                                                            <button className="tf-btn btn-line">View All Reviews</button>
                                                        </li>
                                                    </ul>
                                                </form>
                                                <div className="wrap-form-comment">
                                                    <h5 className="text-black-2">Leave A comment</h5>
                                                    <p className="text-variant-1 mt-8">Your email address will not be published. Required fields are marked *</p>
                                                    <div className="comments">
                                                        <div className="respond-comment">
                                                            <form className="comment-form form-submit">
                                                                <div className="form-wg group-ip">
                                                                    <fieldset>
                                                                        <label className="sub-ip">Name</label>
                                                                        <input type="text" className="form-control" name="text" placeholder="Your name" required="" />
                                                                    </fieldset>
                                                                    <fieldset>
                                                                        <label className="sub-ip">Email</label>
                                                                        <input type="email" className="form-control" name="email" placeholder="Your email" required="" />
                                                                    </fieldset>
                                                                </div>
                                                                <fieldset className="form-wg">
                                                                    <label className="sub-ip">Review</label>
                                                                    <textarea name="message" rows="4" tabIndex="4"
                                                                        placeholder="Write comment " aria-required="true"></textarea>
                                                                </fieldset>
                                                                <button className="form-wg tf-btn primary w-100" name="submit" type="submit">
                                                                    <span>Post Comment</span>
                                                                </button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="col-xl-4 col-lg-5">
                                            <div className="single-sidebar fixed-sidebar">
                                                <div className="single-property-element single-property-attachments">
                                                    <h6 className="title fw-6">File Attachments</h6>
                                                    <div className="row">
                                                        <div className="col-12 mb-2">
                                                            <span className="attachments-item">
                                                                <Link to={`${MEDIA_URL}/${brochure}`} target='_blank' className="box-icon w-60">
                                                                    <img src="/assets/images/home/file-1.png" alt="file" />
                                                                </Link>
                                                                <span>{brochure}</span>
                                                                <a href={`${MEDIA_URL}/${brochure}`} download>
                                                                    <i className="icon icon-download"></i>
                                                                </a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="widget-box single-property-contact">
                                                    <h6 className="title fw-6">Contact To Buy</h6>
                                                    <div className="box-avatar">
                                                        <div className="avatar avt-100 round">
                                                            <img src="/assets/images/avatar/avt-lg-single.jpg" alt="avatar" />
                                                        </div>
                                                        <div className="info">
                                                            <h6 className="name">Shara Conner</h6>
                                                            <ul className="list">
                                                                <li className="d-flex align-items-center gap-4 text-variant-1"><i className="icon icon-phone"></i>1-333-345-6868</li>
                                                                <li className="d-flex align-items-center gap-4 text-variant-1"><i className="icon icon-mail"></i>axistate@gmail.com</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className='mt-3'>
                                                        <div className="ip-group mt-2">
                                                            <input type="text" placeholder="Jony Dane" className="form-control" />
                                                        </div>
                                                        <div className="ip-group mt-2">
                                                            <input type="text" placeholder="ex 0123456789" className="form-control" />
                                                        </div>
                                                        <div className="ip-group mt-2">
                                                            <input type="text" placeholder="axistate@gmail.com" className="form-control" />
                                                        </div>
                                                        <div className="ip-group mt-2">
                                                            <textarea name="message" rows="4" tabindex="4"
                                                                placeholder="Message" aria-required="true"></textarea>
                                                        </div>
                                                        <button type="submit" className="tf-btn btn-view primary hover-btn-view w-100 mt-4">Find Properties <span className="icon icon-arrow-right2"></span></button>
                                                    </div>
                                                </div>

                                                <div className="widget-box single-property-whychoose">
                                                    <h6 className="title fw-6">Why Choose Us?</h6>
                                                    <ul className="box-whychoose">
                                                        <li className="item-why">
                                                            <i className="icon icon-secure"></i>
                                                            Secure Booking
                                                        </li>
                                                        <li className="item-why">
                                                            <i className="icon icon-guarantee"></i>
                                                            Best Price Guarantee
                                                        </li>
                                                        <li className="item-why">
                                                            <i className="icon icon-booking"></i>
                                                            Easy Booking Process
                                                        </li>
                                                        <li className="item-why">
                                                            <i className="icon icon-support"></i>
                                                            Available Support 24/7
                                                        </li>
                                                    </ul>
                                                </div>
                                                {/* <div className="box-latest-property bg-white">
                                                    <h5 className="fw-6 title">Latest Propeties</h5>
                                                    <ul>
                                                        <li className="latest-property-item">
                                                            <a className="images-style">
                                                                <img src="/assets/images/home/house-8.jpg" alt="img" />
                                                            </a>
                                                            <div className="content">
                                                                <div className="text-capitalize text-btn"><a className="link">Casa Lomas de Machalí Machas</a></div>

                                                                <div className="mt-10 text-btn">$7250,00</div>
                                                            </div>
                                                        </li>
                                                        <li className="latest-property-item">
                                                            <a className="images-style">
                                                                <img src="/assets/images/home/house-3.jpg" alt="img" />
                                                            </a>
                                                            <div className="content">
                                                                <div className="text-capitalize text-btn"><a className="link">Casa Lomas de Machalí Machas</a></div>

                                                                <div className="mt-10 text-btn">$7250,00</div>
                                                            </div>
                                                        </li>
                                                        <li className="latest-property-item">
                                                            <a className="images-style">
                                                                <img src="/assets/images/home/house-28.jpg" alt="img" />
                                                            </a>
                                                            <div className="content">
                                                                <div className="text-capitalize text-btn"><a className="link">Casa Lomas de Machalí Machas</a></div>

                                                                <div className="mt-10 text-btn">$7250,00</div>
                                                            </div>
                                                        </li>
                                                        <li className="latest-property-item">
                                                            <a className="images-style">
                                                                <img src="/assets/images/home/house-29.jpg" alt="img" />
                                                            </a>
                                                            <div className="content">
                                                                <div className="text-capitalize text-btn"><a className="link">Casa Lomas de Machalí Machas</a></div>

                                                                <div className="mt-10 text-btn">$7250,00</div>
                                                            </div>
                                                        </li>
                                                        <li className="latest-property-item">
                                                            <a className="images-style">
                                                                <img src="/assets/images/home/house-19.jpg" alt="img" />
                                                            </a>
                                                            <div className="content">
                                                                <div className="text-capitalize text-btn"><a className="link">Casa Lomas de Machalí Machas</a></div>

                                                                <div className="mt-10 text-btn">$7250,00</div>
                                                            </div>
                                                        </li>
                                                    </ul>


                                                </div> */}
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </section>
                        }
                    </React.Fragment>
                ) : (
                    <div className="loading">
                        <div className="spinner-wrapper">
                            <span className="spinner-text">Loading</span>
                            <span className="spinner"></span>
                        </div>
                    </div>
                )
            }

        </React.Fragment>
    )
}

export default ViewProperty;