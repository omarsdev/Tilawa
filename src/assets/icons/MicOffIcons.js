import React from 'react'
import Svg, { Path } from "react-native-svg"

const MicOffIcons = (props) => {
  return (
    <Svg
      width="48px"
      height="48px"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#fff" fillOpacity={0.01} d="M0 0H48V48H0z" />
      <Path
        d="M31 24V11a7 7 0 10-14 0v13a7 7 0 1014 0z"
        stroke="#000"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <Path
        d="M9 23c0 8.284 6.716 15 15 15 1.753 0 3.436-.3 5-.853M39 23a14.95 14.95 0 01-1.248 6M24 38v6M42 42L6 6"
        stroke="#000"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default MicOffIcons