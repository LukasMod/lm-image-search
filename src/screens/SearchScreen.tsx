import { useCallback, useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextField } from "../components"
import { api } from "../services/api"
import { colors, spacing } from "../theme"
import { UnsplashImage } from "../types"
import { Image } from "expo-image"

export const SearchScreen = () => {
  const [images, setImages] = useState<UnsplashImage[]>([])

  const fetchImages = async (query: string) => {
    const response = await api.getImages({ query })

    if (response.kind === "ok") {
      setImages(response.images)
    } else {
      console.error(`[ERROR] fetchImages: ${JSON.stringify(response)}`)
    }
  }

  useEffect(() => {
    fetchImages("tree")
  }, [])

  const renderItem = useCallback(({ item }: { item: UnsplashImage }) => {
    return (
      <View>
        <Image
          source={{ uri: item.urls.small }}
          style={styles.image}
          contentFit="contain"
        />
        <Text>{item.id}</Text>
      </View>
    )
  }, [])

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={images}
        renderItem={renderItem}
        ListHeaderComponent={
          <TextField
            placeholder="Search image"
            containerStyle={styles.textFieldContainer}
          />
        }
      ></FlatList>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.error,
  },
  image: {
    width: "100%",
    height: 250,
  },
  textFieldContainer: {
    margin: spacing.sm,
  },
})

