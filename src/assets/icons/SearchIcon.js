import React from 'react'
import Svg, { G, Circle, Path } from "react-native-svg"

const SearchIcon = (props) => {
  const color = props.color ? props.color : "#444"
  return (
    <Svg
      data-name="Group 555"
      xmlns="http://www.w3.org/2000/svg"
      width={16.216}
      height={20.32}
      viewBox="0 0 16.216 20.32"
      {...props}
    >
      <G data-name="Ellipse 61" fill="none" stroke={color} strokeWidth={1.5}>
        <Circle cx={6.624} cy={6.624} r={6.624} stroke="none" />
        <Circle cx={6.624} cy={6.624} r={5.874} />
      </G>
      <Path
        data-name="Path 1795"
        d="M9.944 11.924l5.068 6.362"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.5007800000000002}
      />
    </Svg>
  )
}

export default SearchIcon