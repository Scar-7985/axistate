import React, { useContext, useState } from "react";
import { swalMsg } from "../SweetAlert2";
import { UserContext } from "../../Context/UserProvider";
import { useNavigate } from "react-router-dom";

const ListingTeam = () => {

  const { userData } = useContext(UserContext);
  const uName = userData?.fname + " " + userData?.lname;
  const userName = uName.length > 20 ? uName.substring(0, 20) + "..." : uName;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (!showModal) {
      setShowModal(true); // show modal when typing starts
    }
  };

  const handleSubmit = () => {
    if (isLoading) return;
    setIsLoading(true);
    swalMsg("success", "Listing added successfully", 2000);
    window.localStorage.removeItem("gtpnum");
    window.localStorage.removeItem("gtchngpg");
    window.localStorage.removeItem("gtpid");
    setTimeout(() => {
      navigate("/my-listings");
    }, 2000);
    setIsLoading(false);
  }

  return (
    <div>
      <div className="widget-box-2 mb-4">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="title m-0">Listing Team</h6>

          <button
            href="/#addmember"
            data-bs-toggle="modal"
            className="btn mb-3"
            style={{ background: "#0E49A6", color: "white" }}
          >
            Add Member
          </button>
        </div>

        <div className="box-info-property">
          {/* Listing Broker Section */}
          <fieldset className="box box-fieldset mb-4">
            <label className="fw-bold mb-2">Listing Broker/Agents</label>
            <div
              className="border rounded d-flex justify-content-between align-items-center p-4"
              style={{ background: "#F7DED2" }}
            >
              <p className="m-0 fw-semibold text-danger">
                At least 1 Listing Broker/Agent is Required!
              </p>

              <button
                className="btn mb-3"
                style={{ background: "#0E49A6", color: "white" }}
              >
                Add Broker/Agent
              </button>
            </div>
          </fieldset>


          <fieldset className="box box-fieldset">
            <label className="fw-bold mb-2">Coordinators & Support</label>


            <div className="d-flex px-3 py-2">
              <div style={{ flex: 3 }}>Contact</div>
              <div style={{ flex: 2 }}>Role</div>
              <div style={{ flex: 2 }}>Licence</div>
              <div style={{ flex: 2 }}>Company/Logo</div>
            </div>


            <div className="border rounded px-3 py-3">
              <div
                className="d-flex align-items-center"
                style={{ gap: "20px" }}
              >

                <div
                  className="d-flex  align-items-center"
                  style={{ flex: 3, gap: "10px" }}
                >
                  <div
                    className="btn rounded-pill fs-5 m-0"
                    style={{
                      cursor: "default",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    SM
                  </div>
                  <div>
                    <p className="fw-semibold m-0">{userName}</p>
                    <p className="m-0">224.466.8800</p>
                  </div>
                </div>


                <div style={{ flex: 2 }}>
                  <p className="fw-semibold m-0">PRINCIPAL INVESTOR</p>
                </div>


                <div style={{ flex: 2 }}>
                  <p className="m-0">N/A</p>
                </div>


                <div style={{ flex: 2 }}>
                  <p className="m-0">N/A</p>
                </div>
              </div>
            </div>

            <div className="border rounded px-3 py-3 mt-3">
              Virtual Tours
              <hr />
              <div className="d-flex justify-content-between">
                Allow buyers to contact me for scheduled, live video tours over
                Facetime, Zoom or other digital calls.
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="checkNativeSwitch"
                    switch
                  />
                </div>
              </div>
            </div>
          </fieldset>


          <hr />
          <div className="d-flex align-items-center" style={{ gap: "10px" }}>
            <p className="m-0">Need to add a Broker/Agent of Record?</p>
            <p className="text-primary m-0" style={{ cursor: "pointer" }}>
              Add Now
            </p>
          </div>
        </div>
      </div>

      <div
        className="box-btn center bg-white border w-100 p-2"
        style={{ position: "fixed", bottom: "0px" }}
      >
        <button
          className="btn mx-3"
          style={{ background: "#0E49A6", color: "white" }}
          onClick={handleSubmit}
        >
          Save Changes
        </button>
        <button
          className="btn btn-secondar"
          tyle={{ background: "#0E49A6", color: "white" }}
        >
          Activate Listing
        </button>
      </div>

      <div className="modal modal-account fade" id="addmember">
        <div
          className="modal-dialog modal-dialog-centered"

        >
          <div className="modal-content">
            <span
              className="close-modal icon-close2 mx-3 mt-3"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></span>
            <div className="mb-2 p-4 mess-box">
              <h5 className="title">Add Member</h5>
              <fieldset className="box-fieldset mt-2">
                <label className="">Search for Broker/Agents or Coordinators</label>
                <input
                  type="text"
                  className="form-control"

                  value={inputValue}
                  onChange={handleChange}
                  placeholder="Enter name, email or licence number"
                />
              </fieldset>
              {showModal && (
                <ul className="list-mess mt-3">
                  <li className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <img
                          src="assets/images/avatar/avt-png9.png"
                          alt="avt"
                        />
                      </div>
                      <div className="content">
                        <div>
                          <div className="name fw-6">Marty Kotis</div>
                          <div className="">
                            Listing Broker/Agent, Principal,
                            <br />
                            Lender, Third Party Service, Listing Rep
                          </div>
                        </div>
                        <span className="caption-2 fw-8 text-primary fs-6">
                          Add
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <img
                          src="assets/images/avatar/avt-png10.png"
                          alt="avt"
                        />
                      </div>
                      <div className="content">
                        <div>
                          <div className="name fw-6">Marty Kotis</div>
                          <div className="">
                            Listing Broker/Agent, Principal,
                            <br />
                            Lender, Third Party Service, Listing Rep
                          </div>
                        </div>
                        <span className="caption-2 fw-8 text-primary fs-6">
                          Add
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <img
                          src="assets/images/avatar/avt-png11.png"
                          alt="avt"
                        />
                      </div>
                      <div className="content">
                        <div>
                          <div className="name fw-6">Marty Kotis</div>
                          <div className="">
                            Listing Broker/Agent, Principal,
                            <br />
                            Lender, Third Party Service, Listing Rep
                          </div>
                        </div>
                        <span className="caption-2 fw-8 text-primary fs-6 icon">
                          Add
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="mess-item">
                    <div className="user-box">
                      <div className="avatar">
                        <img
                          src="assets/images/avatar/avt-png12.png"
                          alt="avt"
                        />
                      </div>
                      <div className="content">
                        <div>
                          <div className="name fw-6">Marty Kotis</div>
                          <div className="">
                            Listing Broker/Agent, Principal,
                            <br />
                            Lender, Third Party Service, Listing Rep
                          </div>
                        </div>
                        <span className="caption-2 fw-8 text-primary fs-6">
                          Add
                        </span>
                      </div>
                    </div>
                  </li>
                  <div className="text-center">
                    <p className="text-center">
                      Didn't find the broker/agent or coordinator you were
                      looking for?{" "}
                    </p>
                    <button
                      className="btn mx-3 mt-2"
                      style={{ background: "#0E49A6", color: "white" }}
                    >
                      Create Member
                    </button>
                  </div>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ListingTeam;