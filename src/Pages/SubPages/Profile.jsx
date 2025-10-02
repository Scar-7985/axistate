import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserProvider'
import { useEffect } from 'react';
import axios from 'axios';
import { isAuthenticated, POST_API } from '../../Auth/Define';
import { swalMsg } from '../../Components/SweetAlert2';

const Profile = () => {

    const { userData, getProfile } = useContext(UserContext);

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }



    useEffect(() => {
        if (userData) {
            setFormData({
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
                phone: userData.phone,
            });
        }
    }, [userData]);


    const UpdateProfile = () => {
        if (isLoading) return;
        setIsLoading(true);
        const profileData = new FormData();
        profileData.append("cuid", isAuthenticated);
        profileData.append("fname", formData.fname);
        profileData.append("lname", formData.lname);
        profileData.append("phone", formData.phone);

        axios.post(`${POST_API}/update-profile.php`, profileData).then(resp => {
            if (resp.data.status === 100) {
                swalMsg("success", resp.data.msg, 2000);
            } else {
                swalMsg("error", resp.data.msg, 2000);
            }
            setTimeout(() => {
                getProfile();
            }, 2000);
            setIsLoading(false);
        })
    }




    return (
        <div className="main-content-inner wrap-dashboard-content-2" style={{ minHeight: "calc(100vh - 100px)" }}>
            {/* <div className="button-show-hide show-mb">
                <span className="body-1">Show Dashboard</span>
            </div> */}
            <div className="widget-box-2 shadow">

                <h5 className="title">Profile</h5>

                <div className="box box-fieldset">
                    <label>Email:</label>
                    <input type="text" name='email' value={formData.email} onChange={handleChange} disabled className="form-control style-1" />
                </div>
                <div className="box grid-2 gap-30 mb-0">
                    <div className="box box-fieldset">
                        <label>First name:<span className='text-danger'>*</span></label>
                        <input type="text" name='fname' value={formData.fname} onChange={handleChange} className="form-control style-1" />
                    </div>
                    <div className="box box-fieldset">
                        <label>Last name:<span className='text-danger'>*</span></label>
                        <input type="text" name='lname' value={formData.lname} onChange={handleChange} className="form-control style-1" />
                    </div>
                </div>

                <div className="box box-fieldset">
                    <label>Phone:<span className='text-danger'>*</span></label>
                    <input type="text" name='phone' value={formData.phone} onChange={handleChange} className="form-control style-1" />
                </div>


                <div className="box">
                    <a href="#" className="tf-btn primary" onClick={UpdateProfile}>Save & Update</a>
                </div>

            </div>
        </div>
    )
}

export default Profile