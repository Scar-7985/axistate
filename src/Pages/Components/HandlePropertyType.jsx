import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
const HandlePropertyType = (propSubTypes, propType) => {

    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);


    params.delete("ptype[]");
    params.delete("subtypes[]");

    console.log(propType);
    propType.forEach(type => {
        const existingOptions = groupedOptions.find(g => g.label === type);

        if (existingOptions) {
            const allSubtypes = existingOptions.options.map(opt => opt.value);
            const selectedSubs = propSubTypes.filter(sub => allSubtypes.includes(sub));

            if (selectedSubs.length === allSubtypes.length) {
                params.append("ptype[]", type);
            } else if (selectedSubs.length > 0) {
                params.append("ptype[]", type);
                selectedSubs.forEach(sub => {
                    params.append("subtypes[]", sub);
                });
            } else {
                // if no subtypes picked, default to all
                params.append("ptype[]", type);
            }
        }
    });

    const queryString = params.toString().replace(/\+/g, "%20");

    console.log(queryString);

    navigate(`${location.pathname}?${queryString}`);


    return null
}

export default HandlePropertyType;