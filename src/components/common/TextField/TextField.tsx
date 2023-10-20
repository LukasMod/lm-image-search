import React, { useRef } from "react"
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
  const inputRef = useRef<TextInput>(null)

  const onPressCancelIcon = () => {
    onCancelPress?.()
    inputRef.current?.blur()
  }

  return (
    <View style={[styles.inputWrapperStyle, containerStyle]}>
      <TextInput
        ref={inputRef}
        placeholderTextColor={colors.textDim}
        autoCapitalize="none"
        returnKeyType="search"
        style={styles.inputStyle}
        {...rest}
      />
      {rest.value && onCancelPress && (
        <Icon
          icon="cancel"
          onPress={onPressCancelIcon}
          containerStyle={styles.iconContainer}
        />
      )}
    </View>
  )
}

