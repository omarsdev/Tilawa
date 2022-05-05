import { Platform } from "react-native";

export default fonts = {
  regular: Platform.OS === "ios" ? 'prompt-regular' : 'Prompt-Regular',
  medium: Platform.OS === "ios" ? 'prompt-medium' : 'Prompt-Medium',
  light: Platform.OS === "ios" ? 'prompt-light' : 'Prompt-Light',
  thin: Platform.OS === "ios" ? 'prompt-thin' : 'Prompt-Thin',
  black: Platform.OS === "ios" ? 'prompt-black' : 'Prompt-Black',
  bold: Platform.OS === "ios" ? 'prompt-bold' : 'Prompt-Bold',
  extraBold: Platform.OS === "ios" ? 'prompt-extraBold' : 'Prompt-ExtraBold',
  extraLight: Platform.OS === "ios" ? 'prompt-extraLight' : 'Prompt-ExtraLight',
  semibold: Platform.OS === "ios" ? 'prompt-semibold' : 'Prompt-SemiBold',
  hafs: Platform.OS === "ios" ? 'KFGQPC HAFS Uthmanic Script' : "Uthmanic",
  title: Platform.OS === 'ios' ? 'AQF_BSML' : 'titles'
}