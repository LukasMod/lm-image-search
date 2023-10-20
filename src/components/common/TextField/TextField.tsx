import React from "react"
import {
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native"
import { colors } from "../../../theme"
import styles from "./styles"
import { Icon } from "../Icon/Icon"

export interface TextFieldProps extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>
  onCancelPress?: () => void
}

export const TextField = ({
  containerStyle,
  onCancelPress,
  ...rest
}: TextFieldProps) => {
  return (
    <View style={[styles.inputWrapperStyle, containerStyle]}>
      <TextInput
        placeholderTextColor={colors.textDim}
        autoCapitalize="none"
        returnKeyType="search"
        style={styles.inputStyle}
        {...rest}
      />
      {rest.value && onCancelPress && (
        <Icon
          icon="cancel"
          onPress={onCancelPress}
          containerStyle={styles.iconContainer}
        />
      )}
    </View>
  )
}

