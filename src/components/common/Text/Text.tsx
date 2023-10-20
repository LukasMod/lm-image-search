import React from "react"
import { Text as RNText, TextProps as RNTextProps } from "react-native"
import { TextPresets, presets } from "./Text.presets"

export interface TextProps extends RNTextProps {
  text?: string
  preset?: TextPresets
}

export const Text = (props: TextProps) => {
  const {
    preset = "default",
    text,
    children,
    style: styleOverride,
    ...rest
  } = props

  const content = text || children

  const style = presets[preset] || presets.default
  const styles = [style, styleOverride]

  return (
    <RNText {...rest} style={styles}>
      {content}
    </RNText>
  )
}

