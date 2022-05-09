import React from 'react'
import { Text, View, I18nManager } from "react-native"
import Svg, { G, Path, TSpan } from "react-native-svg"
import colors from '../../colors'
import fonts from '../fonts'

const SoraListIcon = ({ number, isBlack }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={30}
      viewBox="0 0 32 30"
    >
      <G data-name="Path 1381" fill="none">
        <Path d="M18.326 0l1.935 4.586 5.065.379-1.2 4.821L28 13l-3.87 3.214 1.2 4.821-5.065.379L18.326 26 14 23.4 9.674 26l-1.935-4.586-5.065-.379 1.2-4.821L0 13l3.87-3.214-1.2-4.821 5.065-.379L9.674 0 14 2.6z" />
        <Path
          d="M10.147 1.451L8.423 5.538l-4.494.336 1.062 4.28L1.565 13l3.426 2.845-1.062 4.28 4.494.337 1.724 4.087L14 22.233l3.853 2.316 1.724-4.087 4.494-.336-1.062-4.28L26.435 13l-3.426-2.845 1.062-4.28-4.494-.337-1.724-4.087L14 3.767 10.147 1.45M9.674 0L14 2.6 18.326 0l1.935 4.586 5.065.38-1.196 4.82L28 13l-3.87 3.214 1.196 4.82-5.065.38L18.326 26 14 23.4 9.674 26l-1.935-4.586-5.065-.38 1.195-4.82L0 13l3.87-3.214-1.196-4.82 5.065-.38L9.674 0z"
          fill="#d9a15b"
        />
      </G>
      <View style={[{ width: 32, height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 3 }, !I18nManager.isRTL ? { paddingRight: 3 } : { paddingLeft: 3 }]}>
        <Text style={{
          color: isBlack ? colors.black : colors.white,
          fontSize: 9,
          fontFamily: fonts.regular,
        }}>{number}</Text>
      </View>
    </Svg>
  )
}

export default SoraListIcon