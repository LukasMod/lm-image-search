import { StyleSheet } from "react-native"
import { spacing } from "../../theme"

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentContainerStyle: {
    gap: spacing.xxs,
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
  initialContainer: {
    flex: 1,
    justifyContent: "center",
  },
  initialText: {
    textAlign: "center",
  },
})

