import React from 'react'

const CheckBoxGreen = ({ checkId, checked, onChange }) => {
    return (
        <input
            id={checkId}
            checked={checked}
            onChange={onChange}
            type="checkbox"
            className="w-[13px] h-[13px] appearance-none rounded-[3px] border border-green/50
      checked:bg-green checked:border-green
      checked:after:content-['✓'] checked:after:text-white
      checked:after:text-[8px] checked:after:font-bold
      checked:after:flex checked:after:items-center checked:after:justify-center
      checked:after:w-full checked:after:h-full
      transition-all duration-300 cursor-pointer"
        />
    )
}

export default CheckBoxGreen