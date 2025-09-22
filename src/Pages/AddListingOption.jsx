import React from 'react'
import { Link } from 'react-router-dom'

const AddListingOption = () => {
    return (
        <div className="layout-wrap">
            <div className="main-content p-0">
                <div className="main-content-inner">

                    <section className="flat-section py-3">
                        <div className="container flat-header-wrapper-about">
                            <div className="row justify-content-center">
                                <div className="col-lg-8 text-center">
                                    <h2 className="title">Add Listings for Free</h2>
                                    <p className="text-variant-1">
                                        Add all your listings for free and start capturing leads today! </p>


                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="flat-counter-v2 tf-counter mt-5" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                        <Link to={"/add-sale"} className="counter-box shadow">
                            <div className="box-icon">
                                <span className="icon icon-listing"></span>
                            </div>
                            <div className="content-box">
                                <h5 className="fw-8">For Sale </h5>
                                <div className="box-count d-flex align-items-end">
                                    <span className="text">Takes about 5 Minutes</span>
                                </div>
                            </div>
                        </Link>
                        <Link className="counter-box shadow" to={"/add-lease"}>
                            <div className="box-icon">
                                <span className="icon icon-pending"></span>
                            </div>
                            <div className="content-box">
                                <h5 className="fw-8">For Lease</h5>
                                <div className="box-count d-flex align-items-end">
                                    <span className="text">Takes about 5 Minutes</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddListingOption
