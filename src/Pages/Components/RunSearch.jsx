
import { useNavigate, useLocation } from "react-router-dom";

const RunSearch = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (searchValue) => {
        const params = new URLSearchParams(location.search);

        if (searchValue.trim() !== "") {
            params.set("search", searchValue.trim());
        } else {
            params.delete("search");
        }

        navigate(`?${params.toString()}`);
    };
};

export default RunSearch;
