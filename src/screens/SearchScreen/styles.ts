import { StyleSheet } from "react-native"
import { colors, spacing } from "../../theme"

export default StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
  },
  textFieldContainer: {
    margin: spacing.sm,
  },
  errorText: {
    margin: spacing.sm,
    textAlign: "center",
  },
})

