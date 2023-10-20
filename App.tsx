import { SafeAreaProvider } from "react-native-safe-area-context"
import { SearchScreen } from "./src/screens"
import { colors } from "./src/theme"
import { StyleSheet } from "react-native"
import { QueryClient, QueryClientProvider } from "react-query"
import { useConnectionStatus } from "./src/hooks/useConnectionStatus"
import { Toasts } from "@backpackapp-io/react-native-toast"
import "react-native-gesture-handler"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 120000 /* 2 min cache*/,
    },
  },
})

export default function App() {
  useConnectionStatus()

  return (
    <GestureHandlerRootView style={styles.container}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SearchScreen />
          <Toasts />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
})

