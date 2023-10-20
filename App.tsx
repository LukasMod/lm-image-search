import { SafeAreaProvider } from "react-native-safe-area-context"
import { SearchScreen } from "./src/screens"
import { colors } from "./src/theme"
import { StyleSheet } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000 /* 2 min cache*/,
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={styles.container}>
        <SearchScreen />
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
})

