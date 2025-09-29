import React, { useState } from 'react'
import { createContext } from 'react'
import { isAuthenticated, GET_API } from '../Auth/Define';
import axios from 'axios';
import { useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {


  const [userData, setUserData] = useState(null);

  const getProfile = () => {
    const formData = new FormData();
    formData.append("cuid", isAuthenticated);
    axios.post(`${GET_API}/get-profile.php`, formData).then(resp => {
      
      if (resp.data.status === 100) {
        setUserData(resp.data.user_data);
      }
    })
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    getProfile();
  }, []);

  return (
    <UserContext.Provider value={{ userData, getProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;