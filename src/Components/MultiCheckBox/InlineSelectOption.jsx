
import React, { useState, useEffect } from 'react';
import "./InlineSelectOption.css";

const InlineSelectOption = ({ Options = [], value = [], onChange, onClear }) => {
    const [tempSelected, setTempSelected] = useState([]);
    const [expandedGroups, setExpandedGroups] = useState({});

    useEffect(() => {
        setTempSelected(value);
    }, [value]);

    const toggleGroup = (label) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

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

    const applySelection = () => {
        const selectedChildren = new Set();
        const selectedParents = [];

        Options.forEach((group) => {
            let groupSelected = false;
            group.options.forEach((option) => {
                if (tempSelected.includes(option.value)) {
                    selectedChildren.add(option.value);
                    groupSelected = true;
                }
            });
            if (groupSelected && !selectedParents.includes(group.label)) {
                selectedParents.push(group.label);
            }
        });

        onChange(Array.from(selectedChildren), selectedParents);
    };

    const isGroupChecked = (groupOptions) =>
        groupOptions.every((opt) => tempSelected.includes(opt.value));

    const isGroupIndeterminate = (groupOptions) => {
        const selectedCount = groupOptions.filter((opt) => tempSelected.includes(opt.value)).length;
        return selectedCount > 0 && selectedCount < groupOptions.length;
    };

    return (
        <div id='optionBox'>
            <h4 style={{ marginBottom: "10px" }}>Property Type(s)</h4>
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
                        <div style={{fontSize: "14px", fontWeight: "800px"}}>{group.label}</div>
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
                        <span class="material-symbols-outlined">
keyboard_arrow_up
</span>
                    </div>

                    {expandedGroups[group.label] && (
                        <div className='childLabel' style={{ marginLeft: '20px', paddingTop: '5px' }}>
                            {group.options.map((option, idx) => (
                                <div className='box' key={idx} style={{ display: 'block', padding: '2px 0' }}>
                                    <input
                                        type="checkbox"
                                        checked={tempSelected.includes(option.value)}
                                        onChange={() => handleCheckboxChange(option.value)}
                                    />{' '}
                                    <span>{option.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <div style={{
                marginTop: '15px', display: "flex",
                justifyContent: "space-between"
            }}>
                <button type='button' onClick={onClear}>Clear</button>
                <button type='button' onClick={applySelection}>Apply</button>
            </div>
        </div>
    );
};

export default InlineSelectOption;
