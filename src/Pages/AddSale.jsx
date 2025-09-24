import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PropertyDetails } from "../Components/SaleListing/PropertyDetails";
import { UserContext } from "../Context/UserProvider"
import TransactionDetails from "../Components/SaleListing/TransactionDetails";
import PropertyFeatures from "../Components/SaleListing/PropertyFeatures";
import LocationHighlights from "../Components/SaleListing/LocationHighlights";
import FinancialTenencyInformation from "../Components/SaleListing/FinancialTenencyInformation";
import AttachmentsMedia from "../Components/SaleListing/AttachmentsMedia";
import ContactInformation from "../Components/SaleListing/ContactInformation";
import axios from "axios";
import { GET_API, POST_API } from "../Auth/Define";

const sideMenu = [
  { id: 1, title: "Property Details" },
  { id: 2, title: "Transaction Details" },
  { id: 3, title: "Property Features" },
  { id: 4, title: "Location Highlights" },
  { id: 5, title: "Financial / Tenancy Information" },
  { id: 6, title: "Attachments / Media" },
  { id: 7, title: "Contact Information" },
];


const AddSale = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [currentPid, setCurrentPid] = useState(null);

  const getPageNum = window.localStorage.getItem("gtpnum") || null;
  const getChangePage = window.localStorage.getItem("gtchngpg") || null;


  const { userData } = useContext(UserContext);
  const uName = userData?.fname + " " + userData?.lname;
  const userName = uName.length > 10 ? uName.substring(0, 10) + "..." : uName;

  const [pageNumber, setPageNumber] = useState(1);
  const [canChangePage, setCanChangePage] = useState(false);



  useEffect(() => {
    if (getPageNum) {
      setPageNumber(Number(getPageNum));
    }
    if (getChangePage) {
      setCanChangePage(true);
    }


  }, [getPageNum]);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageNum = params.get("pageNum");
    const pid = params.get("pid");

    if (pid) {
      setCurrentPid(pid);
    }

    if (pageNum) {
      setPageNumber(Number(pageNum));
    }

  }, [location]);


  // complete-list.php PID

  const [checkList, setCheckList] = useState({
    status1: 0,
    status2: 0,
    status3: 0,
    status4: 0,
    status5: 0,
    status6: 0,
    status7: 0,
  });

  const completedList = () => {
    const listData = new FormData();
    listData.append("pid", currentPid);
    axios.post(`${GET_API}/complete-list.php`, listData).then(resp => {
      // console.log(resp.data);
      setCheckList(resp.data);
    })
  }

  useEffect(() => {
    if (!currentPid) return;
    completedList();
  }, [currentPid]);


  return (
    <React.Fragment>
      <div className="layout-wrap">
        <div className="sidebar-menu-dashboard d-flex shadow ">
          <div className="menu-box">
            {/* <div className="title fw-6">Menu</div> */}
            <ul className="box-menu-dashboard">
              {
                sideMenu.map((item, index) => {
                  const statusKey = `status${item.id}`;
                  const isCompleted = (Number(checkList[statusKey]) !== 101) && (Number(checkList[statusKey]) !== 0);

                  return (
                    <li className={`nav-menu-item ${pageNumber === item.id ? 'active' : ''}`} key={index}>
                      <a className="d-flex justify-content-between align-items-center nav-menu-link"
                        onClick={() => { canChangePage ? setPageNumber(item.id) : null }}>
                        <span>{index + 1}. {" "} {item.title}</span>
                        <span
                          className="material-symbols-outlined"
                          style={{
                            fontSize: "40px",
                            color: !isCompleted ? "#ccc" : "green",
                          }}
                        >
                          check_circle
                        </span>
                      </a>
                    </li>
                  )
                })
              }

            </ul>
          </div>
        </div>

        <div className="main-content">
          {
            pageNumber === 7
              ? <ContactInformation chkStatus={checkList.status7} />
              : pageNumber === 6
                ? <AttachmentsMedia chkStatus={checkList.status6} />
                : pageNumber === 5
                  ? <FinancialTenencyInformation chkStatus={checkList.status5} />
                  : pageNumber === 4
                    ? <LocationHighlights chkStatus={checkList.status4} />
                    : pageNumber === 3
                      ? <PropertyFeatures chkStatus={checkList.status3} />
                      : pageNumber === 2
                        ? <TransactionDetails chkStatus={checkList.status2} />
                        : <PropertyDetails chkStatus={checkList.status1} />
          }

        </div>
      </div>
    </React.Fragment>
  );
};

export default AddSale;