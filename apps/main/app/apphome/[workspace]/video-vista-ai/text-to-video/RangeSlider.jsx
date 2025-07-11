import React, { useState } from 'react';

function RangeSlider() {
    const [value, setValue] = useState(5);

    // Function to handle range slider change
    const rangeSlide = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    return (
        <div className='w-full'>
            
            <input
                className="range w-full mt-2"
                type="range"
                name=""
                value={value}
                min="0"
                max="25"
                onChange={rangeSlide}
                onMouseMove={rangeSlide}
            />
            <div className='flex justify-between items-center'>
                <p className='text-[#8297BD] text-xs font-medium' id="rangeValue">{value} Sec</p>
                <p className='text-[#8297BD] text-xs font-medium'>25 Sec</p>
            </div>
           
        </div>
    );
}

export default RangeSlider;
