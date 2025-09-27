import React, { useState, useEffect } from 'react'
import { isAuthenticated, GET_API, MEDIA_URL } from "../Auth/Define"
import axios from 'axios';
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";

DataTable.use(DT);

const MyListings = () => {

    const [listingData, setListingData] = useState([]);

    const fetchListings = () => {
        const formData = new FormData();
        formData.append("cuid", isAuthenticated);
        axios.post(`${GET_API}/list-details.php`, formData).then(resp => {
            console.log(resp.data.data);

            if (resp.data.status === 100) {
                setListingData(resp.data.data);
            }
        })
    }

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchListings();
    }, [])

const editModal = (PID) => {
console.log(PID);

}

    return (

        <div id="wrapper">
            <div id="page" class="clearfix">
                <div class="layout-wrap">
                    <div class="main-content pl-0">
                        <div class="main-content-inner">
                            <div class="wrapper-content row">
                                <div class="col-12">
                                    <div class="widget-box-2 wd-listing shadow">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div className="">
                                                <h5 class="title">My Listing</h5>
                                                <div class="d-flex gap-4"><span class="text-primary fw-7">{listingData.length}</span><span class="fw-6">Results found</span></div>
                                            </div>
                                            <div class="">
                                                <div class="wd-chart">
                                                    <div class="wd-filter-date">
                                                        <div class="left">
                                                            {/* <div class="dates active">Sale</div>
                                        <div class="dates">Lease</div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="wrap-table">
                                            <div className="table-responsive" style={{ overflowX: "hidden" }}>
                                                <DataTable
                                                    // Columns
                                                    columns={[
                                                        // { title: "Sr.", data: "sr", className: "text-left" },
                                                        { title: "Listing", data: "listing", className: "text-left" },
                                                        { title: "Status", data: "status", className: "text-left" },
                                                        { title: "Action", data: "action", className: "text-center" }
                                                    ]}

                                                    // Row Data
                                                    data={listingData.map((item, index) => {
                                                        const mediaStr = typeof item.media?.photos === "string" ? item.media?.photos : "";
                                                        const getFirstImage = mediaStr.includes("@@")
                                                            ? mediaStr.split("@@")[0]
                                                            : mediaStr;


                                                        return {
                                                            id: item.id,
                                                            // sr: index + 1,
                                                            listing: `<div class="d-flex align-items-center">
                                                    <div><img src="${MEDIA_URL}/${getFirstImage}" style="height: 60px; border-radius: 4px" /></div>
                                                    <div class="content ml-3">
                                                        <h6 class="title mb-0"><a href="/view-property?pid=${item.basic.pid}">${item.basic.project_name}</a></h6>
                                                        <div class="text-date">Posting date: ${item.basic.date}</div>
                                                        <div class="text-btn text-primary">${item.transaction ? ('$' + ' ' + item.transaction.asking_price) : "Unpriced"}</div> 
                                                    </div>
                                                    </div>
                                                    `,
                                                            // Show badges in table
                                                            status: `<div class="status-wrap"><a href="#" class="btn-status ${item.basic.status === 1 ? "pending" : item.basic.status === 2 ? "sold" : ""}">${item.basic.status === 1
                                                                ? "Pending"
                                                                : item.basic.status === 2
                                                                    ? "Sold"
                                                                    : "In Review"
                                                                }</a></div>`,

                                                            action: `
                                               <ul class="list-action">
                                                    <li><a href="#" class="item edit-role" >
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016" stroke="#A3ABB0" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg> 
                                                        Edit</a>
                                                    </li>
                                                    <li><a class="item">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.2427 12.2427C13.3679 11.1175 14.0001 9.59135 14.0001 8.00004C14.0001 6.40873 13.3679 4.8826 12.2427 3.75737C11.1175 2.63214 9.59135 2 8.00004 2C6.40873 2 4.8826 2.63214 3.75737 3.75737M12.2427 12.2427C11.1175 13.3679 9.59135 14.0001 8.00004 14.0001C6.40873 14.0001 4.8826 13.3679 3.75737 12.2427C2.63214 11.1175 2 9.59135 2 8.00004C2 6.40873 2.63214 4.8826 3.75737 3.75737M12.2427 12.2427L3.75737 3.75737" stroke="#A3ABB0" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                            
                                                        Sold</a>
                                                    </li>
                                                    <li><a class="remove-file item">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>  
                                                        Delete</a>
                                                    </li>
                                                </ul>
        `
                                                        }
                                                    })}


                                                    // Settings And onClick Funtions

                                                    options={{
                                                        pageLength: 10,
                                                        lengthMenu: [10, 25, 50, 100],
                                                        pagingType: "simple_numbers",
                                                        language: {
                                                            lengthMenu: `<span>Show</span> _MENU_ <span>listings</span>`,
                                                            paginate: {
                                                                previous: `<span class="page-num"><i class="icon icon-arr-l"></i></span>`,
                                                                next: `<span class="page-num"><i class="icon icon-arr-r"></i></span>`
                                                            },
                                                            emptyTable: `<div class="text-center text-danger">
                          <div class="mt-3">There is no data to show you at the moment.</div>
                         </div>`
                                                        },
                                                        createdRow: (row, data, dataIndex) => {
                                                            // Bind click for delete button
                                                            $(row).find(".status-role").on("click", () => {
                                                                status_n_deleteRole(data.id, "status");
                                                            });
                                                            $(row).find(".edit-role").on("click", () => {
                                                                editModal(data.id);
                                                            });
                                                            $(row).find(".delete-role").on("click", () => {
                                                                status_n_deleteRole(data.id, "delete");
                                                            });
                                                        },
                                                    }}

                                                />
                                            </div>
                                        </div>
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

