import { useEffect } from 'react';
import axios from 'axios';
import sha1 from "sha1";
import { SITE_URL } from './Define';
import { showToast } from '../Components/Swal';
import { useLocation } from 'react-router-dom';

const Locallogin = () => {

    const location = useLocation();

    useEffect(() => {
        const registerData = new FormData();
        registerData.append("fname", formData.fName);
        axios.post(`${SITE_URL}/api/get-api/local_login.php`, registerData).then(resp => {
            const jsonData = resp.data;
            if (jsonData.status === 100) {
                const UID = sha1(jsonData.cuid);
                window.localStorage.setItem("axid", UID);
                window.localStorage.setItem("axname", jsonData.name);
                window.localStorage.setItem("axemail", jsonData.email);
            } else {
                showToast({
                    title: "You have been banned by admin. Please contact with admin for more info.",
                    icon: 'error'
                });
                // setTimeout(() => {
                //     window.localStorage.clear();
                //     window.location.reload();
                // }, 2000);
            }
        });
    }, [location.state]);

    return null;
}

export default Locallogin
