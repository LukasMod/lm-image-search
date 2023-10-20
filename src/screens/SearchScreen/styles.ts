import { StyleSheet } from "react-native"
import { colors, spacing } from "../../theme"

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
  emptyQueryContainer: {
    flex: 1,
    justifyContent: "center",
  },
  emptyQueryText: {
    textAlign: "center",
  },
})

