import React, { useEffect } from 'react'
import { GET_API } from '../Auth/Define'
import axios from 'axios'
import TrustedCompanies from '../Components/TrustedCompanies'
import Testimonial from '../Components/Testimonial'

const Terms = () => {

    const getTerms = () => {
        axios.post(`${GET_API}/get-web-sett.php`).then(resp => {
            console.log(resp.data);
        })
    }

    useEffect(() => {
        getTerms();
    }, []);

    return (
        <div>
              <section class="flat-title-page" style={{backgroundImage: "url(assets/images/page-title/page-title-5.jpg)"}}>
                <div class="container">
                    <div class="breadcrumb-content">
                        <ul class="breadcrumb">
                            <li><a href="index.html" class="text-white">Home</a></li>
                            <li class="text-white">/ Our Services</li>
                        </ul>
                        <h1 class="text-center text-white title">Our Services</h1>
                    </div>
                </div>
            </section>

            <section class="flat-section">
                <div class="container">
                    <div class="box-title text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                        <div class="text-subtitle text-primary">Explore Cities</div>
                        <h3 class="title mt-4">Our Location For You</h3>
                    </div>
                    <div class="tf-grid-layout md-col-3 wow fadeInUpSmall" data-wow-delay=".4s" data-wow-duration="2000ms">
                        <div class="box-service">
                            <div class="image">
                                <img class="lazyload" data-src="assets/images/service/home-1.png" src="assets/images/service/home-1.png" alt="image-location" />
                            </div>
                            <div class="content">
                                <h5 class="title">Buy A New Home</h5>
                                <p class="description">Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.</p>
                                <a href="sidebar-grid.html" class="tf-btn btn-line">Learn More <span class="icon icon-arrow-right2"></span></a>
                            </div>
                        </div>
                        <div class="box-service">
                            <div class="image">
                                <img class="lazyload" data-src="assets/images/service/home-2.png" src="assets/images/service/home-2.png" alt="image-location" />
                            </div>
                            <div class="content">
                                <h5 class="title">Sell a home</h5>
                                <p class="description">Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale.</p>
                                <a href="sidebar-grid.html" class="tf-btn btn-line">Learn More <span class="icon icon-arrow-right2"></span></a>
                            </div>
                        </div>
                        <div class="box-service">
                            <div class="image">
                                <img class="lazyload" data-src="assets/images/service/home-3.png" src="assets/images/service/home-3.png" alt="image-location" />
                            </div>
                            <div class="content">
                                <h5 class="title">Rent a home</h5>
                                <p class="description">Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.</p>
                                <a href="sidebar-grid.html" class="tf-btn btn-line">Learn More <span class="icon icon-arrow-right2"></span></a>
                            </div>
                        </div>
                    </div>
                     
                </div>
            </section>

            <section class="flat-section pt-0">
                <div class="container2">
                    <h6 class="mb-20 text-center text-capitalize text-black-4">Trusted by over 150+ major companies</h6>
                   <TrustedCompanies />
                </div>
            </section>

            <section class="flat-section bg-primary-new flat-testimonial">
                <div class="box-title px-15">
                    <div class="text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                        <div class="text-subtitle text-primary">Our Testimonials</div>
                        <h3 class="title mt-4">What’s people say’s</h3>
                        <p class="desc text-variant-1">Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.</p>
                    </div>
                </div>        
               <Testimonial />    
            </section>

            <section class="flat-section">
                <div class="container"> 
                    <div class="tf-faq">
                        <div class="box-title style-1 text-center wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                            <div class="text-subtitle text-primary">Faqs</div>
                            <h3 class="title mt-4">Frequently Asked Questions</h3>
                        </div>
                        <ul class="box-faq" id="wrapper-faq">
                            <li class="faq-item">
                                <a href="#accordion-faq-one" class="faq-header collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion-faq-one">
                                    Why should I use your services?
                                </a>
                                <div id="accordion-faq-one" class="collapse" data-bs-parent="#wrapper-faq">
                                    <p class="faq-body">
                                        Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
                                    </p>
                                </div>
                            </li>
                            <li class="faq-item active">
                                <a href="#accordion-faq-two" class="faq-header" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion-faq-two">
                                    How do I get started with your services?
                                </a>
                                <div id="accordion-faq-two" class="collapse show" data-bs-parent="#wrapper-faq">
                                    <p class="faq-body">
                                        Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
                                    </p>
                                </div>
                            </li>
                            <li class="faq-item">
                                <a href="#accordion-faq-three" class="faq-header collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion-faq-three">
                                    How secure are your services?
                                </a>
                                <div id="accordion-faq-three" class="collapse" data-bs-parent="#wrapper-faq">
                                    <p class="faq-body">
                                        Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
                                    </p>
                                </div>
                            </li>
                            <li class="faq-item">
                                <a href="#accordion-faq-four" class="faq-header collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion-faq-four">
                                    Is there customer support available?
                                </a>
                                <div id="accordion-faq-four" class="collapse" data-bs-parent="#wrapper-faq">
                                    <p class="faq-body">
                                        Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
                                    </p>
                                </div>
                            </li>
                            <li class="faq-item">
                                <a href="#accordion-faq-five" class="faq-header collapsed" data-bs-toggle="collapse" aria-expanded="false" aria-controls="accordion-faq-five">
                                    How can I update my account information?
                                </a>
                                <div id="accordion-faq-five" class="collapse" data-bs-parent="#wrapper-faq">
                                    <p class="faq-body">
                                        Once your account is set up and you've familiarized yourself with the platform, you are ready to start using our services. Whether it's accessing specific features, making transactions, or utilizing our tools, you'll find everything you need at your fingertips.
                                    </p>
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </section>

            <section class="flat-section pt-0 flat-banner wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                <div class="container">
                    <div class="wrap-banner bg-primary-new">
                        <div class="box-left">
                            <div class="box-title">
                                <div class="text-subtitle text-primary">Become Partners</div>
                                <h3 class="mt-4 fw-8">List your Properties on Homelengo, join Us Now!</h3>
                            </div>
                            <a href="contact.html" class="tf-btn btn-view primary size-1 hover-btn-view">Become A Hosting <span class="icon icon-arrow-right2"></span></a>
                        </div>
                        <div class="box-right">
                            <img src="assets/images/banner/banner.png" alt="image" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Terms;