import React, { useState } from 'react';
import { swalMsg } from '../SweetAlert2';
import axios from 'axios';
import { POST_API } from '../../Auth/Define';
import { useNavigate } from 'react-router-dom';

const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB

const DueDiligence = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [totalSize, setTotalSize] = useState(0);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newTotalSize = newFiles.reduce((acc, file) => acc + file.size, 0) + totalSize;

    if (newTotalSize > MAX_TOTAL_SIZE) {
      showToast({
        title: "Total upload size cannot exceed 100MB",
        icon: 'error',
        textColor: "#DC3545",
      });
      return;
    }

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setTotalSize(newTotalSize);
  };

  const removeFile = (index) => {
    const removedFileSize = uploadedFiles[index].size;
    setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setTotalSize((prevSize) => prevSize - removedFileSize);
  };

  const renderFilePreview = (file, index) => {
    const fileType = file.type;
    let preview;

    if (fileType.startsWith('image/')) {
      preview = <img src={URL.createObjectURL(file)} alt="preview" style={{ objectFit: "contain" }} />;
    } else if (fileType === 'application/pdf') {
      preview = <img src="/assets/images/logo/pdf.png" alt="pdf" style={{ objectFit: "contain" }} />;
    } else if (
      fileType === 'application/zip' ||
      file.name.endsWith('.zip') ||
      file.name.endsWith('.rar')
    ) {
      preview = <img src="/assets/images/logo/zip.png" alt="zip" style={{ objectFit: "contain" }} />;
    } else {
      preview = <div className="file-name-preview">{file.name}</div>;
    }

    return (
      <>
        {preview}
        <p className="text-muted mt-2" style={{ fontSize: "13px" }}>{file.name}</p>
      </>
    );
  };


  const handleSubmit = () => {
    if (isLoading) return;
    const dueData = new FormData();
    const getPid = window.localStorage.getItem("gtpid") || null;
    dueData.append("pid", getPid);
    uploadedFiles.forEach((file, index) => {
      dueData.append("iligence[]", file);

    })
    axios.post(`${POST_API}/due-iligence.php`, dueData).then(resp => {
      const jsonData = resp.data;
      if (jsonData.status === 100) {
        swalMsg("success", resp.data.msg, 2000);
        window.localStorage.setItem("gtpnum", 7);
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
        <h5 className="title">
          Upload Media: <span className="text-muted fs-6">CA Required</span>
        </h5>
        <p className="text-muted">
          Usually contains files accessible to buyers once a confidentiality agreement is executed. You can attach a CA in the next step.
        </p>

        <div className="box-uploadfile text-center mt-30">
          <div className="uploadfile" style={{ padding: '30px' }}>
            <label className="btn-upload tf-btn primary">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.625 14.375V17.1875C13.625 17.705 13.205 18.125 12.6875 18.125H4.5625C4.31386 18.125 4.0754 18.0262 3.89959 17.8504C3.72377 17.6746 3.625 17.4361 3.625 17.1875V6.5625C3.625 6.045 4.045 5.625 4.5625 5.625H6.125C6.54381 5.62472 6.96192 5.65928 7.375 5.72834M13.625 14.375H16.4375C16.955 14.375 17.375 13.955 17.375 13.4375V9.375C17.375 5.65834 14.6725 2.57417 11.125 1.97834C10.7119 1.90928 10.2938 1.87472 9.875 1.875H8.3125C7.795 1.875 7.375 2.295 7.375 2.8125V5.72834M13.625 14.375H8.3125C8.06386 14.375 7.8254 14.2762 7.64959 14.1004C7.47377 13.9246 7.375 13.6861 7.375 13.4375V5.72834M17.375 11.25V9.6875C17.375 8.94158 17.0787 8.22621 16.5512 7.69876C16.0238 7.17132 15.3084 6.875 14.5625 6.875H13.3125C13.0639 6.875 12.8254 6.77623 12.6496 6.60041C12.4738 6.4246 12.375 6.18614 12.375 5.9375V4.6875C12.375 4.31816 12.3023 3.95243 12.1609 3.6112C12.0196 3.26998 11.8124 2.95993 11.5512 2.69876C11.2901 2.4376 10.98 2.23043 10.6388 2.08909C10.2976 1.94775 9.93184 1.875 9.5625 1.875H8.625"
                  stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              Upload Files
              <input type="file" multiple className="ip-file" onChange={handleFileChange} hidden />
            </label>
            <p className="file-nam fw-5">
              <span>(Upload up to 100 MB)</span>
            </p>
          </div>
        </div>

        <div className="box-img-upload">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="item-upload file-delete">
              {renderFilePreview(file, index)}
              <span className="icon icon-trash remove-file" onClick={() => removeFile(index)}></span>
            </div>
          ))}
        </div>


      </div>

      <div className="box-btn mt-30">
        <a className="tf-btn primary" onClick={handleSubmit}>Submit</a>
      </div>
    </div>
  );
};

export default DueDiligence;
