"use client";
import React from "react";
import Icons from "../common/Icons";
import { APPOINTMENT_CHECK_DATA } from "../common/Helper";

const ParmentMakeUp = ({ checkedState, setCheckedState }) => {
  const handleCheckboxChange = (index) => {
    const updatedChecked = [...checkedState];
    updatedChecked[index] = !updatedChecked[index];
    setCheckedState(updatedChecked);
  };

  return (
    <div>
      {APPOINTMENT_CHECK_DATA.map((obj, i) => {
        const isChecked = checkedState[i];
        const checkboxId = `appointment-checkbox-${i}`;

        return (
          <div key={i}>
            <p className={`text-sm ${i !== 0 && "mt-[13px]"} md:text-base leading-none duration-300 ${isChecked ? "text-dark-black" : "text-dark-black/65"}`}>
              {obj.title}
            </p>
            <div
              className={`mt-[13px] overflow-clip w-full flex justify-between gap-3 rounded-[5px] border duration-300 ${
                isChecked ? "border-green bg-off-white" : "border-dark-gray bg-light-gray"
              }`}
            >
              <label
                htmlFor={checkboxId}
                className="flex p-3 items-center gap-2 cursor-pointer w-full"
              >
                <input
                  id={checkboxId}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(i)}
                  className="appearance-none w-[17px] min-w-[17px] h-[17px] duration-300 rounded-[2px] border border-dark-black cursor-pointer bg-light-gray checked:bg-white checked:border-green checked:after:content-['✓'] checked:after:block checked:after:text-green checked:after:text-xs checked:after:translate-x-[3px] checked:after:translate-y-[-0.5px]"
                />
                <div>
                  <p className="text-sm text-dark-black font-semibold leading-100">{obj.desOne}</p>
                  <span className="block text-sm font-semibold text-dark-black">{obj.desTwo}</span>
                </div>
              </label>

              <div
                className={`px-3 p-[5px] flex flex-col justify-center items-center max-w-[88px] duration-300 ${
                  isChecked ? "bg-green" : "bg-info-gray"
                }`}
              >
                <p className="text-white text-nowrap leading-none text-sm font-bold">
                  {obj.price} €
                </p>
                <p className="text-white text-nowrap leading-none flex items-center text-[11px] font-normal font-lora">
                  <span className="me-[2px] flex items-center text-sm font-bold font-lora">
                    <Icons icon={"watch"} />
                  </span>
                  {obj.time}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ParmentMakeUp;
