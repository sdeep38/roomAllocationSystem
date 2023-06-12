import React, { useEffect, useState } from 'react'
import { useRef } from 'react'

export default function SelectDropdown({placeHolder, Options, isMulti, isSearchable, onChange, name}) {

    const [showMenu, setShowMenu] = useState(false)
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null)
    const [searchValue, setSearchValue] = useState('')

    const searchRef = useRef()

    useEffect(() => {
        setSearchValue('')
        if(showMenu && searchRef.current){
            searchRef.current.focus()
        }
    }, [showMenu])

    //search
    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const getOptions = () => {
        if (!searchValue) {
            return Options
        }
        return Options.filter((option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0)
    }

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder
        }

        if(isMulti) {
            return (
                <div className="dropdown-tags">
                    {selectedValue.map((option, index) => {
                        return <div key={index} className="dropdown-tag-item">
                            {option.label}
                            <span className="fa fa-xmark dropdown-tag-close" onClick={(e) =>  onTagRemove(e,option)}></span>
                        </div>
                    })}
                </div>
            )
        }

        return selectedValue.label
    }

    //mutiple-select-option
    const removeOption = (option) => {
        return selectedValue.filter((o) => o.value !== option.value)
    }

    const onTagRemove = (e,option) => {
        e.stopPropagation()
        const newValue = removeOption(option)
        setSelectedValue(newValue)
        onChange(newValue.value)
    }

    const onItemClick = (option) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option)
            }else{
                newValue = [...selectedValue, option]
            }
        }else{
            newValue = option
        }
        setSelectedValue(newValue)
        onChange(newValue.value)
    }

    //single-select-option
    const isSelected = (option) => {
        if (isMulti) {
            return selectedValue.filter((o) => o.value === option.value).length > 0
        }
        if (!selectedValue) {
            return false
        }

        return selectedValue.value === option.value
    }

    useEffect(() => {
        const handler = () => setShowMenu(false)

        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler)
        }
    })

    const handleInputClick = (e) => {
        e.stopPropagation()
        setShowMenu(!showMenu)
    }


    return (
        <div className="dropdown-Container" id='form-select' name = {name}>
            <div className="dropdown-input" onClick={handleInputClick}>
                <div className="dropdown-selected-value">{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <span className={`fa ${showMenu ? 'fa-angle-up' : 'fa-angle-down'}`}></span>
                    </div>
                </div>
            </div>
            {showMenu && <div className="dropdown-Menu">
                {isSearchable && <div className="search-box">
                    <input type="text" value={searchValue} onChange={onSearch} ref={searchRef} />
                </div>}
                {getOptions().map((option) => {
                    return <div key={option.value} onClick={() => onItemClick(option)} className={`dropdown-Item ${isSelected(option) ? 'selected' : ''}`}>
                        {option.label}
                    </div>
                })}
            </div>}
        </div>
    )
}
