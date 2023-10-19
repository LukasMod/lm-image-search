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
import { colors, spacing } from "../theme"

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
    <View style={[$inputWrapperStyle, containerStyle]}>
      <TextInput
        // underlineColorAndroid={colors.transparent}
        placeholderTextColor={colors.textDim}
        autoCapitalize="none"
        returnKeyType="search"
        style={$inputStyle}
        {...rest}
      />
    </View>
    // </TouchableOpacity>
  )
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  borderWidth: 1,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral200,
  borderColor: colors.palette.neutral400,
  overflow: "hidden",
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: "stretch",
  color: colors.text,
  fontSize: 16,
  height: 24,
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.xs,
  marginHorizontal: spacing.sm,
}

