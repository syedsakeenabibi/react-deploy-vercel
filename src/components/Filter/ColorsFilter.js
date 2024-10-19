import React, { useState } from "react";

const colorSelector = {
  Purple: "#8434E1",
  Black: "#252525",
  White: "#FFFFFF",
  Gray: "#808080",
  Blue: "#0000FF",
  Red: "#FF0000",
  Orange: "#FFA500",
  Navy: "#000080",
  Grey: "#808080",
  Yellow: "#FFFF00",
  Pink: "#FFC0CB",
  Green: "#008000",
};

const ColorsFilter = ({ colors }) => {
  const [selectedColors, setSelectedColors] = useState([]);

  // Handle color selection
  const handleColorClick = (color) => {
    if (selectedColors.includes(color)) {
      // Deselect if already selected
      setSelectedColors(selectedColors.filter((item) => item !== color));
    } else {
      // Select if not already selected
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <p className="text-[20px] text-black mt-5 mb-5">Colors</p>
        <div className="flex flex-wrap p-4">
          {colors?.map((item) => (
            <div
              key={item}
              className="flex flex-col items-center mr-4 mb-4 transition-opacity duration-300 ease-in-out"
              onClick={() => handleColorClick(item)} // Handle click event
              style={{ cursor: "pointer" }} // Make cursor pointer to indicate clickability
            >
              <div
                className={`w-8 h-8 border rounded-lg transition-transform duration-300 ease-in-out`}
                style={{
                  backgroundColor: colorSelector[item],
                  transform: selectedColors.includes(item) ? "scale(1.1)" : "scale(1)", // Scale if selected
                  borderColor: selectedColors.includes(item) ? "black" : "transparent", // Black border if selected
                  boxShadow: selectedColors.includes(item)
                    ? "0 0 5px rgba(0, 0, 0, 0.5)"
                    : "none", // Add shadow if selected
                }}
              ></div>
              <p
                className={`text-sm mt-2 transition-colors duration-300 ease-in-out`}
                style={{
                  color: selectedColors.includes(item) ? "#000" : "#808080", // Darken text if selected
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorsFilter;
