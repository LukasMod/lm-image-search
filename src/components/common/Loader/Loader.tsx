import React from "react"
import { ActivityIndicator, ActivityIndicatorProps } from "react-native"
import { colors } from "../../../theme"
import styles from "./styles"

export interface LoaderProps extends ActivityIndicatorProps {}

export const Loader = (props: LoaderProps) => {
  const { style: styleOverride, ...rest } = props

  const style = [styles.loader, styleOverride]

  return (
    <ActivityIndicator
      color={colors.tint}
      size="large"
      {...rest}
      style={style}
    />
  )
}

