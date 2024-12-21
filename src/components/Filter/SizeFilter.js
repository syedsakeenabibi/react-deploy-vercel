import React, { useCallback, useEffect, useState } from "react";

const SizeFilter = ({ sizes, hideTitle, multi = true, onChange }) => {
  const [appliedSize, setAppliedSize] = useState([]);

  const onClickDiv = useCallback(
    (item) => {
      if (appliedSize.includes(item)) {
        setAppliedSize(appliedSize.filter((size) => size !== item)); // Remove size if already selected
      } else {
        if (multi) {
          setAppliedSize([...appliedSize, item]); // Add size for multiple selections
        } else {
          setAppliedSize([item]); // Set only one size for single selection
        }
      }
    },
    [appliedSize, multi]
  );

  // Log sizes to console whenever they are updated
  useEffect(() => {
    console.log("Selected Sizes:", appliedSize); // Log current applied sizes
    if (onChange) {
      onChange(appliedSize); // Trigger parent callback with updated sizes
    }
  }, [appliedSize, onChange]);

  return (
    <div>
      <div className="flex flex-col mb-2">
        {!hideTitle && <p className="text-[20px] text-black mt-1 mb-2">Size</p>}
        <div className="flex flex-wrap gap-3 px-2 mt-1">
          {sizes?.map((item) => {
            const isSelected = appliedSize.includes(item);

            return (
              <div key={item} className="flex flex-col mr-1">
                <div
                  className={`w-8 h-8 border rounded-xl cursor-pointer flex items-center justify-center 
                    ${isSelected ? "bg-black text-white" : "bg-white text-black"} border-black`}
                  onClick={() => onClickDiv(item)}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SizeFilter;
