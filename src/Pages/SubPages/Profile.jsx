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
        profileData.append("email", formData.email);
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
        <div class="main-content-inner wrap-dashboard-content-2" style={{ minHeight: "calc(100vh - 100px)" }}>
            {/* <div class="button-show-hide show-mb">
                <span class="body-1">Show Dashboard</span>
            </div> */}
            <div class="widget-box-2 shadow">

                <h5 class="title">Profile</h5>

                <div class="box grid-2 gap-30 mb-0">
                    <div class="box box-fieldset">
                        <label>First name:<span>*</span></label>
                        <input type="text" name='fname' value={formData.fname} onChange={handleChange} class="form-control style-1" />
                    </div>
                    <div class="box box-fieldset">
                        <label>Last name:<span>*</span></label>
                        <input type="text" name='lname' value={formData.lname} onChange={handleChange} class="form-control style-1" />
                    </div>
                </div>

                <div class="box box-fieldset">
                    <label>Email:<span>*</span></label>
                    <input type="text" name='email' value={formData.email} onChange={handleChange} class="form-control style-1" />
                </div>
                <div class="box box-fieldset">
                    <label>Phone:<span>*</span></label>
                    <input type="text" name='phone' value={formData.phone} onChange={handleChange} class="form-control style-1" />
                </div>


                <div class="box">
                    <a href="#" class="tf-btn primary" onClick={UpdateProfile}>Save & Update</a>
                </div>

            </div>
        </div>
    )
}

export default Profile