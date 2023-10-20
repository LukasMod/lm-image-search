import { StyleSheet } from "react-native"
import { colors, spacing } from "../../../theme"

export default StyleSheet.create({
  labelStyle: {
    marginBottom: spacing.md,
  },
  inputWrapperStyle: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: colors.palette.neutral200,
    borderColor: colors.palette.neutral400,
    overflow: "hidden",
  },
  inputStyle: {
    flex: 1,
    alignSelf: "stretch",
    color: colors.text,
    fontSize: 16,
    height: 24,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.sm,
  },
  iconContainer: {
    marginHorizontal: spacing.xs,
  },
})

