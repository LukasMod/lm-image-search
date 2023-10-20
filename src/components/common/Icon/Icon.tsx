import React, { ComponentType } from "react"
import {
  View,
  ImageStyle,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { Image } from "expo-image"
import styles from "./styles"
import { hitslop } from "../../../utils"

export interface ImageProps extends TouchableOpacityProps {
  icon: IconTypes
  style?: StyleProp<ImageStyle>
  containerStyle?: StyleProp<ViewStyle>
  size?: number
}

export function Icon(props: ImageProps) {
  const { icon, size = 16, style, containerStyle, ...WrapperProps } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : (View as ComponentType<TouchableOpacityProps>)

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      hitSlop={hitslop.medium}
      {...WrapperProps}
      style={[styles.container, containerStyle]}
    >
      <Image
        style={[!!size && { width: size, height: size }, style]}
        source={icons[icon]}
      />
    </Wrapper>
  )
}

export const icons = {
  cancel: require("../../../../assets/icons/x.png"),
}

export type IconTypes = keyof typeof icons

