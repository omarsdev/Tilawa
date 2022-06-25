import React from 'react'
import Svg, { Path } from "react-native-svg"

const MicOffIcons = (props) => {
  return (
    <Svg
      data-name="Group 1"
      xmlns="http://www.w3.org/2000/svg"
      width={48}
      height={48}
      viewBox="0 0 48 48"
      {...props}
    >
      <Path
        data-name="Rectangle 1"
        fill="rgba(255,255,255,0.01)"
        d="M0 0H48V48H0z"
      />
      <Path
        data-name="Path 3"
        d="M31 24V11a7 7 0 00-14 0v13a7 7 0 0014 0z"
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth={4}
      />
      <Path
        data-name="Path 4"
        d="M9 23a15 15 0 0015 15c1.753 0 8.1-1.011 9.759-3.132M39 23c0 1.694-1.739 6.755-3.864 10.16a8.586 8.586 0 01-1.377 1.708"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      />
      <Path
        data-name="Path 5"
        d="M24 38v6"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      />
    </Svg>
  )
}

export default MicOffIcons