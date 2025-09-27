import React, { useState, useRef, useEffect } from 'react';
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { GET_API, MEDIA_URL, POST_API } from '../../Auth/Define';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AttachmentsMedia = ({ chkStatus, prevStatus }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const [photos, setFiles] = useState([]);
    const [prevPhotos, setPrevPhotos] = useState([]);

    const [floor, setFloor] = useState([]);
    const [prevFloor, setPrevFloor] = useState([]);

    const [brochure, setBrochure] = useState(null);
    const [prevBrochure, setPrevBrochure] = useState(null);
    console.log(photos);

    const photoRef = useRef();
    const floorRef = useRef();
    const brochureRef = useRef();


    const handleFiles = (newFiles) => {
        // const totalFiles = [...files, ...newFiles].slice(0, 10); // max 10 files
        const totalFiles = [...photos, ...newFiles];
        setFiles(totalFiles);
    };

    const handleFloor = (newFiles) => {
        // const totalFiles = [...files, ...newFiles].slice(0, 10); // max 10 files
        const totalFiles = [...floor, ...newFiles];
        setFloor(totalFiles);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
        handleFiles(imageFiles);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
        handleFiles(imageFiles);
    };

    const handleFloorChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const imageFiles = selectedFiles.filter(file => file.type.startsWith('image/'));
        handleFloor(imageFiles);
    };


    const removeImage = (index) => {
        const updatedFiles = [...photos];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const removeFloor = (index) => {
        const updatedFiles = [...floor];
        updatedFiles.splice(index, 1);
        setFloor(updatedFiles);
    };


    // xxxxxxxxxxxxxx PDF xxxxxxxxxxxxxx //

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setBrochure(file);
        } else {
            alert("Only PDF files are allowed.");
        }
    };

    const removePdf = () => {
        setBrochure();
    };

    // xxxxxxxxxxxxxx PDF xxxxxxxxxxxxxx //


    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //

    const getArray = (getData) => {
        const newData = getData.split("@@").filter(Boolean);
        return newData;
    }


    const [updateId, setUpdateID] = useState(null);
    const [updatePid, setUpdatePid] = useState(null);

    const getMedia = (currentPid) => {
        const formData = new FormData();
        formData.append("pid", currentPid);
        axios.post(`${GET_API}/media.php`, formData)
            .then(resp => {
                console.log("Return Date ===> ", resp.data.value);


                if (resp.data.status === 100) {
                    const Value = resp.data.value;
                    // console.log("API Response:", resp.data.value);
                    setUpdateID(Value.id);
                    const prevPics = getArray(resp.data.value.photos);
                    setPrevPhotos(prevPics);
                    const prevFloor = getArray(resp.data.value.site_plan);
                    setPrevFloor(prevFloor);
                    setPrevBrochure(resp.data.value.brochure);
                } else {
                    console.log("No Existing Data:", resp.data);
                }
            })

    }


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pid = params.get("pid");

        if (pid) {
            getMedia(pid);
            setUpdatePid(pid);
        }

    }, [location.search]);

    useEffect(() => {
        if (prevStatus === 101) {
            window.history.back();
        }
    }, [prevStatus]);


    // xxxxxxxxxxxxxxxxxx Get Property xxxxxxxxxxxxxxxxxx //


    const handleSubmit = () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        const mediaData = new FormData();
        if (!updateId) {
            mediaData.append("pid", updatePid);
        } else {
            mediaData.append("id", updateId);
        }

        const prevPic = prevPhotos.join("@@");

        mediaData.append("photos", JSON.stringify(prevPhotos)); // send old ones as JSON
        photos.forEach(file => {
            mediaData.append("photo[]", file); // send new uploads
        });


        mediaData.append("site_plan_old", JSON.stringify(prevFloor)); // send old ones
        floor.forEach(file => {
            mediaData.append("site_plan[]", file); // send new ones
        });

        mediaData.append("brochure", brochure);




        axios.post(`${POST_API}/media.php`, mediaData).then(resp => {
            console.log("resp.data => ", resp.data);

            const jsonData = resp.data;
            if (jsonData.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
                setTimeout(() => {
                    if (!updateId) {
                        navigate(`/add-listing?pageNum=7&pid=${jsonData.pid}`);
                    } else {
                        navigate(`/add-listing?pageNum=7&pid=${updatePid}`);
                    }
                }, 1000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }

        })
        setIsLoading(false);
    }


    const deletePhoto = (name) => {
        Swal.fire({
            title: "Delete Photo?",
            text: "Are you sure!",
            imageUrl: "/assets/images/logo/logout.png",
            imageWidth: 60,
            imageHeight: 60,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!",
        }).then((result) => {
            if (result.isConfirmed) {

                const deleteData = new FormData();
                deleteData.append("pid", updatePid);
                deleteData.append("file_name", `${name}`);
                deleteData.append("column", "photos");
                axios.post(`${GET_API}/delete-media.php`, deleteData).then(resp => {
                    console.log(resp.data);
                    if (resp.data.status === 100) {
                        swalMsg("success", "Deleted successfully.", 2000);
                    }
                })


                // setTimeout(() => {
                //     navigate("/");
                //     window.location.reload();
                // }, 2000);

            }
        });
    }


    return (
        <div className='main-content-inner'>
            {/* Photos */}
            <div className="widget-box-2 mb-20 shadow">
                <h5 className="title d-flex justify-content-between">
                    <div>
                        Upload Photos
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <div>
                            <a className="btn-dark d-flex align-items-center gap-3" onClick={() => navigate(`/add-listing?pageNum=5&pid=${updatePid}`)}>
                                <span class="material-symbols-outlined">
                                    arrow_back
                                </span>
                                <div className='text'>Previous</div>

                            </a>
                        </div>
                        <div>
                            {
                                Number(chkStatus) === 1 &&
                                <a className="btn-secondary d-flex align-items-center gap-3" onClick={handleSubmit}>
                                    <div className='text'>Next</div>
                                    <span class="material-symbols-outlined">
                                        arrow_forward
                                    </span>
                                </a>
                            }
                        </div>
                    </div>
                </h5>
                <div
                    className="box-uploadfile text-center"
                // onDrop={handleDrop}
                // onDragOver={handleDragOver}
                >
                    <div className="uploadfile cursor-pointer" style={{ padding: "30px 30px" }} onClick={() => photoRef.current.click()}>
                        <div
                            className="btn-upload tf-btn primary"

                        >
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                                    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                            Select photos
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                ref={photoRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p className="file-nam fw-5">
                            or drag photos here <br />
                            <span>(Up to 10 photos)</span>
                        </p>
                    </div>
                </div>

                <div className="box-img-upload">
                    {prevPhotos.map((file, index) => (
                        <div className="item-upload file-delete" key={index + 1}>
                            <img
                                src={`${MEDIA_URL}/${file}`}
                                alt={`preview-${index}`}
                                style={{ objectFit: 'cover' }}
                            />
                            <span
                                className="icon icon-trash remove-file"
                                onClick={() => deletePhoto(file)}
                                style={{ cursor: 'pointer' }}
                            ></span>
                        </div>
                    ))}

                    {photos.map((file, index) => (
                        <div className="item-upload file-delete" key={index}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                style={{ objectFit: 'cover' }}
                            />
                            <span
                                className="icon icon-trash remove-file"
                                onClick={() => removeImage(index)}
                                style={{ cursor: 'pointer' }}
                            ></span>
                        </div>
                    ))}
                </div>

                {/* Floor / Site Plan */}
                <h5 className="title" style={{ marginTop: "40px" }}>Upload Floor / Site Plan</h5>
                <div
                    className="box-uploadfile text-center"
                // onDrop={handleDrop}
                // onDragOver={handleDragOver}
                >
                    <div className="uploadfile cursor-pointer" style={{ padding: "30px 30px" }} onClick={() => floorRef.current.click()}>
                        <div
                            className="btn-upload tf-btn primary"

                        >
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                                    stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                />
                            </svg>
                            Select photos
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                ref={floorRef}
                                onChange={handleFloorChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p className="file-nam fw-5">
                            or drag photos here <br />
                            <span>(Up to 10 photos)</span>
                        </p>
                    </div>
                </div>

                <div className="box-img-upload">
                    {prevFloor.map((file, index) => (
                        <div className="item-upload file-delete" key={index}>
                            <img
                                src={`${MEDIA_URL}/${file}`}
                                alt={`preview-${index}`}
                                style={{ objectFit: 'cover' }}
                            />
                            <span
                                className="icon icon-trash remove-file"
                                onClick={() => removeFloor(index)}
                                style={{ cursor: 'pointer' }}
                            ></span>
                        </div>
                    ))}
                    {floor.map((file, index) => (
                        <div className="item-upload file-delete" key={index}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`preview-${index}`}
                                style={{ objectFit: 'cover' }}
                            />
                            <span
                                className="icon icon-trash remove-file"
                                onClick={() => removeFloor(index)}
                                style={{ cursor: 'pointer' }}
                            ></span>
                        </div>
                    ))}
                </div>

                <h5 className="title" style={{ marginTop: "40px" }}>Upload Brochure	/ OM</h5>


                <div
                    className="box-uploadfile text-center"
                // onDrop={handleDrop}
                // onDragOver={handleDragOver}
                >
                    <div className="uploadfile cursor-pointer" style={{ padding: "30px 30px" }} >
                        <div className="box-floor-img d-flex flex-column align-items-start mt-20">
                            <div className="btn-upload tf-btn primary mx-auto">
                                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.375 13.125L6.67417 8.82583C6.84828 8.65172 7.05498 8.51361 7.28246 8.41938C7.50995 8.32515 7.75377 8.27665 8 8.27665C8.24623 8.27665 8.49005 8.32515 8.71754 8.41938C8.94502 8.51361 9.15172 8.65172 9.32583 8.82583L13.625 13.125M12.375 11.875L13.5492 10.7008C13.7233 10.5267 13.93 10.3886 14.1575 10.2944C14.385 10.2001 14.6288 10.1516 14.875 10.1516C15.1212 10.1516 15.365 10.2001 15.5925 10.2944C15.82 10.3886 16.0267 10.5267 16.2008 10.7008L18.625 13.125M3.625 16.25H17.375C17.7065 16.25 18.0245 16.1183 18.2589 15.8839C18.4933 15.6495 18.625 15.3315 18.625 15V5C18.625 4.66848 18.4933 4.35054 18.2589 4.11612C18.0245 3.8817 17.7065 3.75 17.375 3.75H3.625C3.29348 3.75 2.97554 3.8817 2.74112 4.11612C2.5067 4.35054 2.375 4.66848 2.375 5V15C2.375 15.3315 2.5067 15.6495 2.74112 15.8839C2.97554 16.1183 3.29348 16.25 3.625 16.25ZM12.375 6.875H12.3817V6.88167H12.375V6.875ZM12.6875 6.875C12.6875 6.95788 12.6546 7.03737 12.596 7.09597C12.5374 7.15458 12.4579 7.1875 12.375 7.1875C12.2921 7.1875 12.2126 7.15458 12.154 7.09597C12.0954 7.03737 12.0625 6.95788 12.0625 6.875C12.0625 6.79212 12.0954 6.71263 12.154 6.65403C12.2126 6.59542 12.2921 6.5625 12.375 6.5625C12.4579 6.5625 12.5374 6.59542 12.596 6.65403C12.6546 6.71263 12.6875 6.79212 12.6875 6.875Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                Choose File
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="ip-file"
                                    onChange={(e) => handlePdfChange(e, 'offering')}
                                />
                            </div>

                            {brochure && (
                                <div className="box-img-upload d-flex flex-column align-items-center">
                                    <div className="item-upload file-delete">
                                        <img
                                            src="/assets/images/logo/pdf.png"
                                            alt="PDF"
                                            style={{ objectFit: "contain" }}
                                        />
                                        <span
                                            className="icon icon-trash remove-file"
                                            onClick={() => removePdf()}
                                            style={{ cursor: "pointer", marginTop: 10 }}
                                        ></span>
                                    </div>
                                    <div className='text-muted'>{brochure.name.length > 14 ? brochure.name.substring(0, 14) + "..." : brochure.name}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <div className="box-btn" style={{ marginTop: "60px" }}>
                    <a className="tf-btn dark" onClick={handleSubmit}>Save</a>
                </div>


            </div>

{
  isLoading &&
      <div className="loading">
        <div className="loader-wrapper">
          <div className="circle"></div>
          <i class="icon-pass icon-home icon-center"></i>
        </div>
      </div>
}

        </div>
    );
};

export default AttachmentsMedia;
