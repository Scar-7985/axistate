import React from 'react';
import Select from 'react-select';
import { swalMsg } from "../SweetAlert2";

const customStyles = {
    control: (styles) => ({
        ...styles,
        borderRadius: "25px", // rounded input
        padding: "6px 6px",
        borderColor: "#E8E8E8",
        boxShadow: "none",
        ":active": {
            borderColor: "#8AB1EF",
        },
    }),
    multiValue: (styles) => ({
        ...styles,
        backgroundColor: '#e0f7fa',
        borderRadius: '12px',
        padding: '3px',
    }),
    multiValueLabel: (styles) => ({
        ...styles,
        color: '#00796b',
        fontWeight: 'bold',
    }),
    multiValueRemove: (styles) => ({
        ...styles,
        color: '#00796b',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: '#b2dfdb',
            color: '#004d40',
        },
    }),
};

const ChipBox = ({
    options = [],
    value = [],
    onChange = () => { },
    placeholder = 'Select options...',
    limit = 5,
    limitMsg = "Cannot add more"
}) => {

    const handleChange = (selectedOptions) => {
        if (selectedOptions.length <= limit) {
            onChange(selectedOptions);
        } else {
                 swalMsg("error", limitMsg, 2000);
         
        }
    };

    return (
        <div style={{ width: '100%' }}>
            <Select
                isMulti
                options={options}
                value={value}
                onChange={handleChange}
                styles={customStyles}
                placeholder={placeholder}
            />
        </div>
    );
};

export default ChipBox;
