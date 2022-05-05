import React from 'react'
import Svg, { G, Path } from "react-native-svg"

const BackIcons = ({ color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={10.456}
      height={14.589}
      viewBox="0 0 10.456 14.589"
    >
      <Path
        data-name="Path 2180"
        d="M9.053 1.391L1 6.963l8.053 6.223"
        fill="none"
        stroke={color ? color : "#fff"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default BackIcons