import secureLocalStorage from "react-secure-storage";

// FILE PATH AND API URL
export const SITE_URL = "https://nikhil.westonik.com/axis";

export const IMAGE_URL = `${SITE_URL}/upload/images`;
export const POST_API = `${SITE_URL}/api/post-api`;
export const GET_API = `${SITE_URL}/api/get-api`;
export const FILE_URL = `${SITE_URL}/upload`;

// SetIsAuthenticated
export const SetIsAuthenticated = (title, val) => {
    secureLocalStorage.setItem(title, val);
};

// GetIsAuthenticated
const stored = secureLocalStorage.getItem("AXID");
export const isAuthenticated = stored || null;


export const SITE_LOGO = "https://equalengineers.com/wp-content/uploads/2024/04/dummy-logo-5b.png";