import React, { useState, useRef, useEffect } from 'react';
import "./SelectOption.css";

const SelectOption = ({ Options = [], value = [], onChange, onClear, placeholder = 'Select options' }) => {
    const [tempSelected, setTempSelected] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [expandedGroups, setExpandedGroups] = useState({});
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) setTempSelected(value);
    }, [isOpen, value]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const toggleGroup = (label) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const applySelection = () => {
        const selectedChildren = new Set(); // use Set to avoid duplicates
        const selectedParents = [];

        Options.forEach((group) => {
            let groupSelected = false;
            group.options.forEach((option) => {
                if (tempSelected.includes(option.value)) {
                    selectedChildren.add(option.value); // store only value
                    groupSelected = true;
                }
            });
            if (groupSelected && !selectedParents.includes(group.label)) {
                selectedParents.push(group.label);
            }
        });

        onChange(Array.from(selectedChildren), selectedParents);
        setIsOpen(false);
    };


    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
            setTempSelected(value);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCheckboxChange = (val) => {
        setTempSelected((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );
    };

    const handleGroupCheckboxChange = (groupOptions) => {
        const allSelected = groupOptions.every((opt) => tempSelected.includes(opt.value));
        if (allSelected) {
            setTempSelected((prev) =>
                prev.filter((val) => !groupOptions.find((opt) => opt.value === val))
            );
        } else {
            const toAdd = groupOptions
                .map((opt) => opt.value)
                .filter((val) => !tempSelected.includes(val));
            setTempSelected((prev) => [...prev, ...toAdd]);
        }
    };

    const isGroupChecked = (groupOptions) =>
        groupOptions.every((opt) => tempSelected.includes(opt.value));

    const isGroupIndeterminate = (groupOptions) => {
        const selectedCount = groupOptions.filter((opt) => tempSelected.includes(opt.value)).length;
        return selectedCount > 0 && selectedCount < groupOptions.length;
    };

    return (
        <div id='searchMultiChk' ref={dropdownRef}>
            <div className='divBox' onClick={toggleDropdown}>
                <span>
                    {value.length > 0
                        ? value.length > 2
                            ? `${value[0]} +${value.length - 1}` // ✅ subtract 1 from count
                            : value.join(', ')
                        : placeholder}
                </span>

                <svg
                    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    viewBox="0 0 20 20">
                    <path d="M5.5 7.5L10 12l4.5-4.5h-9z" />
                </svg>
            </div>

            {isOpen && (
                <div className='optionBox'>
                    {Options.map((group, index) => (
                        <div key={index} className='parentChk'>
                            <div
                                className='parentLabel'
                                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                                onClick={() => toggleGroup(group.label)}
                            >
                                <input
                                    type="checkbox"
                                    checked={isGroupChecked(group.options)}
                                    ref={(input) => {
                                        if (input) input.indeterminate = isGroupIndeterminate(group.options);
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={() => handleGroupCheckboxChange(group.options)}
                                />{' '}
                                <span style={{ marginLeft: "6px" }}>
                                    {group.label}
                                </span>
                                <svg
                                    style={{
                                        marginLeft: "auto",
                                        transform: expandedGroups[group.label] ? "rotate(90deg)" : "rotate(0deg)",
                                        transition: "transform 0.2s"
                                    }}
                                    width="12"
                                    height="12"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M7 5l6 5-6 5V5z" />
                                </svg>
                            </div>

                            {expandedGroups[group.label] && (
                                <div className='childLabel' style={{ marginLeft: '20px', paddingTop: '5px' }}>
                                    {group.options.map((option, idx) => (
                                        <div className='box'
                                            key={idx}
                                            style={{ display: 'block', padding: '2px 0' }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={tempSelected.includes(option.value)}
                                                onChange={() => handleCheckboxChange(option.value)}
                                            />{' '}
                                            <span>
                                                {option.value} {/* ✅ use value as label */}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <div style={{
                        position: "sticky", bottom: '0',
                        padding: '10px 10px', display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "#fff"
                    }}>
                        <button
                            type='button'
                            onClick={onClear}
                            style={{
                                marginTop: '10px',
                                padding: '5px 10px',
                                background: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}>Clear</button>
                        <button
                            type='button'
                            onClick={applySelection}
                            style={{
                                marginTop: '10px',
                                padding: '5px 10px',
                                background: '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectOption;