import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";



const Testimonial = () => {
    return (
       <div dir="ltr" class="swiper tf-sw-testimonial" data-preview="4.5" data-tablet="2" data-mobile-sm="2" data-mobile="1" data-space="15" data-space-md="30" data-space-lg="30" data-centered="true" data-loop="true">
          
                <Swiper
                    loop={true}
                    centeredSlides={true}
                    spaceBetween={30}
                    // autoplay={{
                    //     delay: 4000,
                    //     disableOnInteraction: false,
                    // }}
                    breakpoints={{
                        320: { slidesPerView: 1 },  // mobile
                        576: { slidesPerView: 2 },  // small tablet
                        768: { slidesPerView: 2 },  // tablet
                        1024: { slidesPerView: 4.5 }, // desktop (like your data-preview)
                    }}
                    modules={[Autoplay]}
                    className="tf-sw-testimonial"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="box-tes-item">
                                <span className="icon icon-quote"></span>
                                <p className="note body-2">{item.text}</p>

                                <div className="box-avt d-flex align-items-center gap-12">
                                    <div className="avatar avt-60 round">
                                        <img src={item.avatar} alt={item.name} />
                                    </div>
                                    <div className="info">
                                        <h6>{item.name}</h6>
                                        <p className="caption-2 text-variant-1 mt-4">{item.role}</p>
                                        <ul className="list-star">
                                            {Array.from({ length: item.rating }).map((_, i) => (
                                                <li key={i} className="icon icon-star"></li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
        </div>
    );
};

export default Testimonial;



const testimonials = [
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Courtney Henry",
        role: "CEO Themesflat",
        avatar: "assets/images/avatar/avt-png1.png",
        rating: 5,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Esther Howard",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png2.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Albert Flores",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png3.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Courtney Henry",
        role: "CEO Themesflat",
        avatar: "assets/images/avatar/avt-png4.png",
        rating: 5,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Esther Howard",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png5.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Albert Flores",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png6.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Courtney Henry",
        role: "CEO Themesflat",
        avatar: "assets/images/avatar/avt-png1.png",
        rating: 5,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Esther Howard",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png2.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Albert Flores",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png3.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Courtney Henry",
        role: "CEO Themesflat",
        avatar: "assets/images/avatar/avt-png4.png",
        rating: 5,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Esther Howard",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png5.png",
        rating: 4,
    },
    {
        text: "My experience with property management services has exceeded expectations. They efficiently manage properties with a professional and attentive approach in every situation. I feel reassured that any issue will be resolved promptly and effectively.",
        name: "Albert Flores",
        role: "Founder StartupX",
        avatar: "assets/images/avatar/avt-png6.png",
        rating: 4,
    },
  
];





 <div dir="ltr" class="swiper tf-sw-testimonial" data-preview="4.5" data-tablet="2" data-mobile-sm="2" data-mobile="1" data-space="15" data-space-md="30" data-space-lg="30" data-centered="true" data-loop="true">

                </div> 