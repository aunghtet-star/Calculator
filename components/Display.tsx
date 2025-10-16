
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  let displayString = value;

  // Use scientific notation for very large or small numbers
  if (displayString.length > 9 && !displayString.includes('e')) {
      const num = parseFloat(displayString);
      if (Math.abs(num) > 999999999 || (Math.abs(num) < 0.0000001 && num !== 0)) {
        displayString = num.toExponential(2);
      }
  }

  const fontSizeClass = displayString.length > 9 ? 'text-6xl' : displayString.length > 6 ? 'text-7xl' : 'text-8xl';
  
  return (
    <div className="text-white text-right w-full flex items-end justify-end overflow-hidden pb-2">
      <span
        className={`px-2 ${fontSizeClass} font-light break-all transition-all duration-200`}
        style={{lineHeight: '1.1'}}
      >
        {displayString}
      </span>
    </div>
  );
};

export default Display;
