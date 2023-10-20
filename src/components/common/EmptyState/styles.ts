import { StyleSheet } from "react-native"
import { spacing } from "../../../theme"

export default StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: spacing.md,
  },
  image: {
    width: 200,
    aspectRatio: 1,
  },
  text: {
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
    textAlign: "center",
  },
})

