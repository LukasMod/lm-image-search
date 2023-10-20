import { TextStyle } from "react-native"
import { colors } from "../../../theme"

const BASE: TextStyle = {
  color: colors.text,
  fontSize: 16,
}

export const presets = {
  default: BASE,
  bold: { ...BASE, fontWeight: "bold" } as TextStyle,
  error: { ...BASE, fontSize: 14, color: colors.error } as TextStyle,
}

export type TextPresets = keyof typeof presets

