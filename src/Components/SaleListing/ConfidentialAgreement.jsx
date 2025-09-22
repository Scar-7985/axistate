import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { POST_API } from "../../Auth/Define";
import { swalMsg } from "../SweetAlert2";
import { useNavigate } from "react-router-dom";

const ConfidentialAgreement = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showBrokerCA, setShowBrokerCA] = useState(false);

  const [uploadCA, setUploadCA] = useState(false);
  const [principalDesc, setPrincipleDesc] = useState("");
  const [principalImage, setPrincipalImage] = useState(null);


  const [uploadBrokerCA, setUploadBrokerCA] = useState(false);
  const [brokerDesc, setBrokerDesc] = useState("");
  const [setting, setSetting] = useState("No Principal Info");
  const [brokerImage, setBrokerImage] = useState(null);


  const handleSubmit = () => {
    if (isLoading) return;

    setIsLoading(true);

    const agreementData = new FormData();
    const getPid = window.localStorage.getItem("gtpid") || null;
    agreementData.append("pid", getPid);

    // Send Image or type agreement
    if (uploadCA) {
      agreementData.append("pri_img", principalImage);
    } else {
      agreementData.append("pri_agreement", principalDesc);
    }

    // Send these if broker/agent is required
    if (showBrokerCA) {
      agreementData.append("info_setting", setting);
      // Send Image or type agreement
      if (uploadBrokerCA) {
        agreementData.append("agent_img", brokerImage);
      } else {
        agreementData.append("agent_agreement", brokerDesc);
      }
    }


    axios.post(`${POST_API}/agreement.php`, agreementData).then(resp => {
      const jsonData = resp.data;
      console.log(jsonData);

      if (jsonData.status === 100) {
        swalMsg("success", resp.data.msg, 2000);
        window.localStorage.setItem("gtpnum", 8);
        setTimeout(() => {
          navigate("/add-sale");
        }, 1000);
      } else {
        swalMsg("error", resp.data.msg, 2000);
      }
    });
    setIsLoading(false);
  };


  return (
    <div className="main-content-inner">

      <div className="widget-box-2 mb-20">
        <h6 className="title mb-0">Confidentiality or Non-Disclosure Agreement</h6>
        <p className="text-muted" >Copy and paste your confidentiality or non-disclosure agreement below. If you have one CA for principals and one for broker/agents check the box below to reveal an additional field. These CAs are required in order to access your DD vault, private OM and private property.</p>
        <hr />
        <div className="box-info-property mt-30">
          <fieldset className="box box-fieldset d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <input
                type="checkbox"
                className="tf-checkbox style-1 me-2"
                id="cb1"
                checked={showBrokerCA}
                onChange={() => setShowBrokerCA(!showBrokerCA)}
              />
              <label htmlFor="cb1">
                Principal and Broker/Agent CA/NDA
              </label>
            </div>
            <div>
              <span>
                Want to enter your CA or NDA?
              </span>
              <div className="btn-upload tf-btn primary cursor-pointer" style={{ marginLeft: "4px" }} onClick={() => setUploadCA(!uploadCA)}>
                {
                  uploadCA ? "Enter CA/NDA" : "Upload CA/NDA"
                }
              </div>
            </div>
          </fieldset>
          <fieldset className="box box-fieldset">
            <label>
              {showBrokerCA ? "Principal CA" : "Confidentiality or Non-Disclosure Agreement"}
            </label>
            {
              !uploadCA
                ? (
                  <div>

                    <ReactQuill
                      theme="snow"
                      value={principalDesc}
                      onChange={setPrincipleDesc}
                      placeholder="Type here..."
                      style={{ height: "300px" }}
                    />
                  </div>
                )
                : (
                  <div className="box-uploadfile text-center mt-30">
                    {
                      principalImage &&

                      <div className="box-img-upload d-flex flex-column align-items-center mb-2">
                        <div className="item-upload file-delete">
                          <img src="/assets/images/logo/pdf.png" alt="img" style={{ objectFit: "contain" }} />
                        </div>
                        <span>
                          {principalImage.name.length > 15 ? principalImage.name.substring(0, 15) + "..." : principalImage.name}
                        </span>
                      </div>
                    }
                    <div className="uploadfile p-4">
                      <div className="btn-upload tf-btn primary">
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Add Files
                        <input
                          type="file"
                          className="ip-file"
                          onChange={(e) => setPrincipalImage(e.target.files[0])}
                        />


                      </div>
                      <p className="file-name fw-5">
                        Drop File Here Or Click Upload <br />
                      </p>
                    </div>

                  </div>
                )
            }
          </fieldset>
        </div>
      </div>

      {
        showBrokerCA &&

        <div className="widget-box-2 mb-20">
          <h6 className="title">Broker/Agent and Principal CA/NDA Info Settings</h6>
          <fieldset className="box box-fieldset d-flex">
            <label htmlFor="set1" className="d-flex" onClick={() => setSetting("No Principal Info")}>
              <input
                type="radio"
                className="tf-radio style-1 me-2"
                id="set1"
                checked={setting === "No Principal Info"}
              />
              <span>

                No Principal Info
              </span>
            </label>
            <label htmlFor="set2" className="d-flex" style={{ marginLeft: "10px" }} onClick={() => setSetting("Info Optional")}>
              <input
                type="radio"
                className="tf-radio style-1 me-2"
                id="set2"
                checked={setting === "Info Optional"}
              />
              <span>


                Info Optional

              </span>
            </label>
            <label htmlFor="set3" className="d-flex" style={{ marginLeft: "10px" }} onClick={() => setSetting("Info Required")}>
              <input
                type="radio"
                className="tf-radio style-1 me-2"
                id="set3"
                checked={setting === "Info Required"}
              />
              <span>


                Info Required

              </span>
            </label>
            <label htmlFor="set4" className="d-flex" style={{ marginLeft: "10px" }} onClick={() => setSetting("Principal Confirmation Required")}>
              <input
                type="radio"
                className="tf-radio style-1 me-2"
                id="set4"
                checked={setting === "Principal Confirmation Required"}
              />
              <span>


                Principal Confirmation Required
              </span>
            </label>
          </fieldset>
          <div className="box-info-property mt-30">
            <fieldset className="box box-fieldset">
              <div className="d-flex justify-content-between">
                <label>
                  Broker/Agent CA/NDA
                </label>

                <div>
                  <span>
                    Want to enter your CA or NDA?
                  </span>
                  <div className="btn-upload tf-btn primary cursor-pointer" style={{ marginLeft: "4px" }} onClick={() => setUploadBrokerCA(!uploadBrokerCA)}>
                    {
                      uploadBrokerCA ? "Enter CA/NDA" : "Upload CA/NDA"
                    }
                  </div>
                </div>
              </div>
              {
                !uploadBrokerCA
                  ? (
                    <div>
                      <ReactQuill
                        theme="snow"
                        value={brokerDesc}
                        onChange={setBrokerDesc}
                        placeholder="Type here..."
                        style={{ height: "250px" }}
                      />
                    </div>
                  )
                  : (
                    <div className="box-uploadfile text-center mt-30">
                      {
                        brokerImage &&

                        <div className="box-img-upload d-flex flex-column align-items-center mb-2">
                          <div className="item-upload file-delete">
                            <img src="/assets/images/logo/pdf.png" alt="img" style={{ objectFit: "contain" }} />
                          </div>
                          <span>
                            {brokerImage.name.length > 15 ? brokerImage.name.substring(0, 15) + "..." : brokerImage.name}
                          </span>
                        </div>
                      }
                      <div className="uploadfile p-4">
                        <div className="btn-upload tf-btn primary">
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Add Files
                          <input
                            type="file"
                            className="ip-file"
                            onChange={(e) => setBrokerImage(e.target.files[0])}
                          />
                        </div>
                        <p className="file-name fw-5">
                          Drop File Here Or Click Upload <br />
                        </p>
                      </div>
                    </div>
                  )
              }
            </fieldset>
          </div>
        </div>
      }

      <div className="box-btn mt-30">
        <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
      </div>
    </div>
  );
};

export default ConfidentialAgreement;