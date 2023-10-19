import { SafeAreaProvider } from "react-native-safe-area-context"
import { SearchScreen } from "./src/screens"
import { colors } from "./src/theme"
import { StyleSheet } from "react-native"

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SearchScreen />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
})

