import React from "react"
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { colors, spacing } from "../../../theme"
import styles from "./styles"

export interface TextFieldProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const TextField = ({ containerStyle, ...rest }: TextFieldProps) => {
  return (
    // <TouchableOpacity
    //   activeOpacity={1}
    //   style={$containerStyles}
    //   onPress={focusInput}
    // >
    <View style={[styles.inputWrapperStyle, containerStyle]}>
      <TextInput
        // underlineColorAndroid={colors.transparent}
        placeholderTextColor={colors.textDim}
        autoCapitalize="none"
        returnKeyType="search"
        style={styles.inputStyle}
        {...rest}
      />
    </View>
    // </TouchableOpacity>
  )
}
