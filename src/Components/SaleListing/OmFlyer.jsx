import axios from 'axios';
import React, { useState } from 'react';
import { POST_API } from '../../Auth/Define';
import { swalMsg } from '../SweetAlert2';
import { useNavigate } from 'react-router-dom';

const OmFlyer = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [offeringFile, setOfferingFile] = useState(null);
    const [flyerFile, setFlyerFile] = useState(null);
    const [offeringType, setOfferingType] = useState("Public OM");

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            if (type === 'offering') setOfferingFile(file);
            else if (type === 'flyer') setFlyerFile(file);
        } else {
            alert("Only PDF files are allowed.");
        }
    };

    const removeFile = (type) => {
        if (type === 'offering') setOfferingFile(null);
        else if (type === 'flyer') setFlyerFile(null);
    };

    const offeringTypeOption = [
        { id: 1, value: 'Public OM', label: 'Public OM' },
        { id: 2, value: 'Private OM (CA Required)', label: 'Private OM (CA Required)' },
        { id: 3, value: 'Private OM (CA and approval required)', label: 'Private OM (CA and approval required)' },
    ];

    const handleSubmit = () => {
        if (isLoading) return;
        if (!offeringFile && !flyerFile) {
            // changePage
            swalMsg("success", "Change Page Success", 2000);

        }

        const OMFl = new FormData();
        const getPid = window.localStorage.getItem("gtpid") || null;
        OMFl.append("pid", getPid);
        OMFl.append("offering_memo", offeringFile)
        OMFl.append("flyer", flyerFile)
        OMFl.append("memo_type", offeringType)
        axios.post(`${POST_API}/omflyer.php`, OMFl).then(resp => {
            const jsonData = resp.data;
            // console.log(jsonData);

            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                window.localStorage.setItem("gtpnum", 6);
                setTimeout(() => {
                    navigate("/add-sale");
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
        })
        setIsLoading(false);
    }

    return (
        <div className="main-content-inner">
            <div className="widget-box-2 mb-20">
                <h5 className="title">Offering Memorandum & Flyer</h5>
                <hr />

                <div className="box grid-2 gap-30 mt-30">

                    {/* Offering Memorandum */}
                    <fieldset className="box-fieldset">
                        <label>Offering Memorandum</label>
                        <div className="box-floor-img uploadfile d-flex flex-column align-items-start mt-20">
                            <div className="btn-upload tf-btn primary">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.375 13.125L6.67417 8.82583C6.84828 8.65172 7.05498 8.51361 7.28246 8.41938C7.50995 8.32515 7.75377 8.27665 8 8.27665C8.24623 8.27665 8.49005 8.32515 8.71754 8.41938C8.94502 8.51361 9.15172 8.65172 9.32583 8.82583L13.625 13.125M12.375 11.875L13.5492 10.7008C13.7233 10.5267 13.93 10.3886 14.1575 10.2944C14.385 10.2001 14.6288 10.1516 14.875 10.1516C15.1212 10.1516 15.365 10.2001 15.5925 10.2944C15.82 10.3886 16.0267 10.5267 16.2008 10.7008L18.625 13.125M3.625 16.25H17.375C17.7065 16.25 18.0245 16.1183 18.2589 15.8839C18.4933 15.6495 18.625 15.3315 18.625 15V5C18.625 4.66848 18.4933 4.35054 18.2589 4.11612C18.0245 3.8817 17.7065 3.75 17.375 3.75H3.625C3.29348 3.75 2.97554 3.8817 2.74112 4.11612C2.5067 4.35054 2.375 4.66848 2.375 5V15C2.375 15.3315 2.5067 15.6495 2.74112 15.8839C2.97554 16.1183 3.29348 16.25 3.625 16.25ZM12.375 6.875H12.3817V6.88167H12.375V6.875ZM12.6875 6.875C12.6875 6.95788 12.6546 7.03737 12.596 7.09597C12.5374 7.15458 12.4579 7.1875 12.375 7.1875C12.2921 7.1875 12.2126 7.15458 12.154 7.09597C12.0954 7.03737 12.0625 6.95788 12.0625 6.875C12.0625 6.79212 12.0954 6.71263 12.154 6.65403C12.2126 6.59542 12.2921 6.5625 12.375 6.5625C12.4579 6.5625 12.5374 6.59542 12.596 6.65403C12.6546 6.71263 12.6875 6.79212 12.6875 6.875Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Choose File
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="ip-file"
                                    onChange={(e) => handleFileChange(e, 'offering')}
                                />
                            </div>

                            {offeringFile && (
                                <div className="box-img-upload d-flex flex-column align-items-center">
                                    <div className="item-upload file-delete">
                                        <img
                                            src="/assets/images/logo/pdf.png"
                                            alt="PDF"
                                            style={{ objectFit: "contain" }}
                                        />
                                        <span
                                            className="icon icon-trash remove-file"
                                            onClick={() => removeFile('offering')}
                                            style={{ cursor: "pointer", marginTop: 10 }}
                                        ></span>
                                    </div>
                                    <div className='text-muted'>{offeringFile.name.length > 14 ? offeringFile.name.substring(0, 14) + "..." : offeringFile.name}</div>
                                </div>
                            )}
                        </div>
                        {
                            offeringFile &&
                            <React.Fragment>
                                <div className="nice-select" tabindex="0" style={{ marginTop: "20px" }}>
                                    <span className="current">{offeringType}</span>
                                    <ul className="list" style={{ maxHeight: "250px" }}>
                                        {
                                            offeringTypeOption.map((item, index) => {
                                                return <li data-value={index} className={`option ${item.label === offeringType ? "selected focus" : ""}`}
                                                    onClick={() => setOfferingType(item.label)} key={index}>{item.label}</li>
                                            })
                                        }
                                    </ul>
                                </div>
                                <p className='mt-10 text-muted' style={{ fontWeight: "500" }}>
                                    If your OM is behind a Confidentiality Agreement select "Private OM"
                                </p>
                            </React.Fragment>
                        }
                    </fieldset>

                    {/* Flyer */}
                    <fieldset className="box-fieldset">
                        <label>Flyer</label>
                        <div className="box-floor-img uploadfile d-flex flex-column align-items-start mt-20">
                            <div className="btn-upload tf-btn primary">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.375 13.125L6.67417 8.82583C6.84828 8.65172 7.05498 8.51361 7.28246 8.41938C7.50995 8.32515 7.75377 8.27665 8 8.27665C8.24623 8.27665 8.49005 8.32515 8.71754 8.41938C8.94502 8.51361 9.15172 8.65172 9.32583 8.82583L13.625 13.125M12.375 11.875L13.5492 10.7008C13.7233 10.5267 13.93 10.3886 14.1575 10.2944C14.385 10.2001 14.6288 10.1516 14.875 10.1516C15.1212 10.1516 15.365 10.2001 15.5925 10.2944C15.82 10.3886 16.0267 10.5267 16.2008 10.7008L18.625 13.125M3.625 16.25H17.375C17.7065 16.25 18.0245 16.1183 18.2589 15.8839C18.4933 15.6495 18.625 15.3315 18.625 15V5C18.625 4.66848 18.4933 4.35054 18.2589 4.11612C18.0245 3.8817 17.7065 3.75 17.375 3.75H3.625C3.29348 3.75 2.97554 3.8817 2.74112 4.11612C2.5067 4.35054 2.375 4.66848 2.375 5V15C2.375 15.3315 2.5067 15.6495 2.74112 15.8839C2.97554 16.1183 3.29348 16.25 3.625 16.25ZM12.375 6.875H12.3817V6.88167H12.375V6.875ZM12.6875 6.875C12.6875 6.95788 12.6546 7.03737 12.596 7.09597C12.5374 7.15458 12.4579 7.1875 12.375 7.1875C12.2921 7.1875 12.2126 7.15458 12.154 7.09597C12.0954 7.03737 12.0625 6.95788 12.0625 6.875C12.0625 6.79212 12.0954 6.71263 12.154 6.65403C12.2126 6.59542 12.2921 6.5625 12.375 6.5625C12.4579 6.5625 12.5374 6.59542 12.596 6.65403C12.6546 6.71263 12.6875 6.79212 12.6875 6.875Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Choose File
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="ip-file"
                                    onChange={(e) => handleFileChange(e, 'flyer')}
                                />
                            </div>

                            {flyerFile && (
                                <div className="box-img-upload d-flex flex-column align-items-center">
                                    <div className="item-upload file-delete">
                                        <img
                                            src="/assets/images/logo/pdf.png"
                                            alt="PDF"
                                            style={{ objectFit: "contain" }}
                                        />
                                        <span
                                            className="icon icon-trash remove-file"
                                            onClick={() => removeFile('flyer')}
                                            style={{ cursor: "pointer", marginTop: 10 }}
                                        ></span>
                                    </div>
                                    <div>{flyerFile.name.length > 14 ? flyerFile.name.substring(0, 14) + "..." : flyerFile.name}</div>
                                </div>
                            )}
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="box-btn mt-30">
                <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
            </div>
        </div>
    );
};

export default OmFlyer;
