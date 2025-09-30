
import { UserContext } from '../../Context/UserProvider'
import React, { useState, useEffect, useContext } from 'react'
import { isAuthenticated, GET_API, MEDIA_URL } from "../../Auth/Define"
import axios from 'axios';
import { UserPropStatus } from '../MyListings';

import { DataTable } from "../../Components/Datatable/Datatable";
import Swal from 'sweetalert2';
import { swalMsg } from '../../Components/SweetAlert2';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const navigate = useNavigate(); 
    const [listingData, setListingData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchListings = () => {
        if (!isLoading) {
            setIsLoading(true);
        }

        const formData = new FormData();
        formData.append("cuid", isAuthenticated);
        axios.post(`${GET_API}/list-details.php`, formData).then(resp => {
            console.log(resp.data.data);

            if (resp.data.status === 100) {
                setListingData(resp.data.data);
            }

            if (!isLoading) {
                setIsLoading(false);
            }
        })
    }


    useEffect(() => {
        if (!isAuthenticated) return;
        fetchListings();
    }, []);


    const deleteProperty = (getPid) => {

        Swal.fire({
            title: "Delete Property?",
            text: "Are you sure!",
            imageUrl: "/assets/images/logo/logout.png",
            imageWidth: 60,
            imageHeight: 60,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete!",
        }).then((result) => {
            if (result.isConfirmed) {
                const delData = new FormData();
                delData.append("pid", getPid);
                axios.post(`${POST_API}/delete.php`, delData).then(resp => {
                    console.log(resp.data);
                    if (resp.data.status === 100) {
                        swalMsg("success", resp.data.msg, 2000);
                        fetchListings();
                    } else {
                        swalMsg("error", resp.data.msg, 2000);
                    }
                })
            }

        });


    }



    return (
        <div className="main-content-inner">





            {/* <div className="button-show-hide show-mb">
                                    <span className="body-1">Show Dashboard</span>
                                </div> */}
            <div className="flat-counter-v2 tf-counter">
                <div className="counter-box shadow-sm">
                    <div className="box-icon">
                        <span className="icon icon-listing"></span>
                    </div>
                    <div className="content-box">
                        <div className="title-count text-variant-1">Your listing</div>
                        <div className="box-count d-flex align-items-end">
                            {/* <h3 className="number fw-8" data-speed="2000" data-to="17" data-inviewport="yes">3</h3> */}
                            <h3 className="fw-8">{listingData.length}</h3>
                            {/* <span className="text">/50 remaining</span> */}
                        </div>

                    </div>
                </div>
                <div className="counter-box shadow-sm">
                    <div className="box-icon">
                        <span className="icon icon-pending"></span>
                    </div>
                    <div className="content-box">
                        <div className="title-count text-variant-1">Pending</div>
                        <div className="box-count d-flex align-items-end">
                            <h3 className="fw-8">02</h3>
                        </div>
                    </div>
                </div>
                <div className="counter-box shadow-sm">
                    <div className="box-icon">
                        <span className="icon icon-favorite"></span>
                    </div>
                    <div className="content-box">
                        <div className="title-count text-variant-1">Favorites</div>
                        <div className="d-flex align-items-end">
                            <h3 className="fw-8">00</h3>
                        </div>

                    </div>
                </div>
                <div className="counter-box shadow-sm">
                    <div className="box-icon">
                        <span className="icon icon-review"></span>
                    </div>
                    <div className="content-box">
                        <div className="title-count text-variant-1">Reviews</div>
                        <div className="d-flex align-items-end">
                            <h3 className="fw-8">1.483</h3>
                        </div>

                    </div>
                </div>
            </div>

            <div className="wrapper-content row">
                <div className="col-12">
                    <div className="widget-box-2 wd-listing shadow">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="">
                                <h5 className="title">My Listing</h5>
                                <div className="d-flex gap-4"><span className="text-primary fw-7">{listingData.length}</span><span className="fw-6">Results found</span></div>
                            </div>
                            <div className="">
                                <div className="wd-chart">
                                    <div className="wd-filter-date">
                                        <div className="left">
                                            {/* <div className="dates active">Sale</div>
                                        <div className="dates">Lease</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="wrap-table">
                            <div className="table-responsive" style={{ overflowX: "hidden" }}>
                               <DataTable
                                                                                  loadingState={isLoading}
                                                                                  children={
                                                                                      <React.Fragment>
                                                                                          <thead>
                                                                                              <tr className='bg-gre'>
                                                                                                  <th className='text-dark'>Listing</th>
                                                                                                  <th className='text-dark'>Score</th>
                                                                                                  <th className='text-dark'>Status</th>
                                                                                                  <th className='text-dark'>Action</th>
                                                                                              </tr>
                                                                                          </thead>
                              
                                                                                          <tbody>
                                                                                              {listingData.map((item, index) => {
                              
                                                                                                  return (
                                                                                                      <tr key={index}>
                                                                                                          <td>
                                                                                                              <div className="d-flex align-items-center">
                                                                                                                  <div>
                                                                                                                      <img src={`${MEDIA_URL}/${item.banner}`} style={{ height: "60px", borderRadius: "4px" }} />
                                                                                                                  </div>
                                                                                                                  <div className="content ml-3">
                                                                                                                      <h6 className="title mb-0">
                                                                                                                          <span className='cursor-pointer' onClick={() => navigate("/view-property", { state: { PID: item.pid } })} >{item.project_name}</span></h6>
                                                                                                                      <div className="text-date">Posting date: {item.date}</div>
                                                                                                                      <div className="text-btn text-primary">
                                                                                                                          {item.asking_price ? ('$' + ' ' + item.asking_price) : "Unpriced"}
                                                                                                                      </div>
                                                                                                                  </div>
                                                                                                              </div>
                                                                                                          </td>
                                                                                                          <td className='text-capitalize'>{item.complete_score}</td>
                                                                                                          <td className='text-capitalize'>
                              
                                                                                                              <div className="nice-select p-2 rounded-3" tabIndex="0">
                                                                                                                  <span className="current">
                                                                                                                      {
                                                                                                                          UserPropStatus.find(
                                                                                                                              (status) => Number(item.a_status) === status.id
                                                                                                                          )?.title || "Unknown"
                                                                                                                      }
                                                                                                                  </span>
                                                                                                                  <ul className="list">
                                                                                                                      {UserPropStatus.map((status, index) => {
                                                                                                                          const isSelected = Number(item.a_status) === status.id;
                                                                                                                          return (
                                                                                                                              <li
                                                                                                                                  key={index}
                                                                                                                                  data-value={status.id}
                                                                                                                                  className={`option ${isSelected ? "selected focus" : ""}`}
                                                                                                                              >
                                                                                                                                  {status.title}
                                                                                                                              </li>
                                                                                                                          );
                                                                                                                      })}
                                                                                                                  </ul>
                                                                                                              </div>
                              
                                                                                                          </td>
                                                                                                          <td className='text-capitalize'>
                                                                                                              <ul className="list-action">
                                                                                                                  <li>
                                                                                                                      <a className="item" onClick={() => navigate("/property-details", { state: { PID: item.pid } })}>
                                                                                                                          <span className="material-symbols-outlined">
                                                                                                                              edit
                                                                                                                          </span>
                                                                                                                          Edit</a>
                              
                                                                                                                  </li>
                                                                                                                  <li><a className="item">
                                                                                                                      <span className="material-symbols-outlined">
                                                                                                                          edit
                                                                                                                      </span>
                              
                                                                                                                      Sold</a>
                                                                                                                  </li>
                                                                                                                  <li>
                                                                                                                      <a className="remove-file item" onClick={() => deleteProperty(item.pid)}>
                                                                                                                          <span className="material-symbols-outlined">
                                                                                                                              delete
                                                                                                                          </span>
                                                                                                                          Delete</a>
                              
                                                                                                                  </li>
                                                                                                              </ul>
                                                                                                          </td>
                              
                                                                                                      </tr>
                                                                                                  )
                                                                                              })}
                                                                                          </tbody>
                                                                                      </React.Fragment>
                                                                                  } />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard;