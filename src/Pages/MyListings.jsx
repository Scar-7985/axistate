import React, { useState, useEffect } from 'react'
import { isAuthenticated, GET_API, MEDIA_URL, POST_API } from "../Auth/Define"
import axios from 'axios';
import { DataTable } from "../Components/Datatable/Datatable";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { swalMsg } from '../Components/SweetAlert2';


const MyListings = () => {

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
            // console.log(resp.data.data);

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
    }, [])

    const editModal = (getPid) => {
        // console.log(PID);
        navigate("/property-details", { state: { PID: getPid } });
    }

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

                <div className="layout-wrap">
                    <div className="main-content pl-0">
                        <div className="main-content-inner">
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
                                            <div className="table-responsive" >
                                                <DataTable
                                                    loadingState={isLoading}
                                                    children={
                                                        <React.Fragment>
                                                            <thead>
                                                                <tr>
                                                                    <th>Listing</th>
                                                                    <th className='text-center'>Price</th>
                                                                    <th className='text-center'>Score</th>
                                                                    <th className='text-center'>Status</th>
                                                                    <th className='text-center'>Action</th>
                                                                </tr>
                                                            </thead>

                                                            <tbody>
                                                                {listingData.map((item, index) => {

                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                <div className="d-flex align-items-center">
                                                                                    <div>
                                                                                        <img src={`${MEDIA_URL}/${item.banner}`}
                                                                                            style={{ height: "40px", borderRadius: "4px" }} />
                                                                                    </div>
                                                                                    <div className="content ml-3">
                                                                                        <h6 className="title mb-0">
                                                                                            <span className='cursor-pointer' onClick={() => navigate("/view-property", { state: { PID: item.pid } })} >{item.project_name}</span></h6>
                                                                                        {/* <div className="text-date">Posting date: {item.date}</div> */}

                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <h6>
                                                                                    {item.asking_price ? ('$' + ' ' + item.asking_price) : "Unpriced"}
                                                                                </h6>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                <span style={{ fontWeight: "600" }}>{item.complete_score}</span>
                                                                            </td>
                                                                            <td className='text-center'>
                                                                                {
                                                                                    Number(item.a_status) === 0
                                                                                        ? (
                                                                                            <div className="status-wrap">
                                                                                                <a className="btn-status pending"> Pending</a>
                                                                                            </div>
                                                                                        )
                                                                                        : Number(item.a_status) === 2
                                                                                            ? (
                                                                                                <div className="status-wrap">
                                                                                                    <a className="btn-status bg-danger">Rejected</a>
                                                                                                </div>
                                                                                            )
                                                                                            : (
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
                                                                                            )
                                                                                }


                                                                            </td>
                                                                            <td>
                                                                                <div className='d-flex justify-content-center align-items-center gap-1'>

                                                                                    <div className='btn' onClick={() => navigate("/view-dashboard", { state: { PID: item.pid } })}>
                                                                                        View Dashboard
                                                                                    </div>
                                                                                    <div className='btn btn-success' onClick={() => navigate("/property-details", { state: { PID: item.pid } })}>
                                                                                        <span className="material-symbols-outlined">
                                                                                            edit_square
                                                                                        </span>
                                                                                    </div>

                                                                                    <div className='btn btn-danger' onClick={() => deleteProperty(item.pid)}>
                                                                                        <span className="material-symbols-outlined">
                                                                                            delete
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

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
                    </div>
                </div>

    )


}

export default MyListings;


export const UserPropStatus = [
    { id: 1, title: "Active/Live" },
    { id: 3, title: "Mark as sold out" },
    { id: 4, title: "No Longer for Sale" },
];