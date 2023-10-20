import { Image } from "expo-image"
import { useCallback, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useInfiniteQuery } from "react-query"
import { TextField } from "../components"
import { useDebounce } from "../hooks"
import { api } from "../services/api"
import { spacing } from "../theme"
import { UnsplashImage } from "../types"

export const SearchScreen = () => {
  const [query, setQuery] = useState("bottle")
  const debounceQuery = useDebounce(query)

  const fetchImages = async ({
    query,
    page,
  }: {
    query: string
    page: number
  }) => {
    console.log("TEST fetchImage START")
    const response = await api.getImages({ query, page })
    if (response.kind === "ok") {
      return {
        images: response.images,
        page: response.page,
        totalPages: response.totalPages,
      }
    } else {
      throw Error(`[ERROR] fetchImages: ${JSON.stringify(response)}`)
    }
  }

  const { data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["images", debounceQuery],
      ({ pageParam = 1 }) =>
        fetchImages({ query: debounceQuery, page: pageParam }),
      {
        getNextPageParam: (lastPage, pages) =>
          lastPage.page < lastPage.totalPages ? lastPage.page + 1 : null,
      }
    )

  const renderItem = useCallback(({ item }: { item: UnsplashImage }) => {
    return (
      <Image
        source={{ uri: item.urls.small }}
        style={[styles.image, { aspectRatio: item.aspectRatio }]}
        contentFit="contain"
      />
    )
  }, [])

  const renderFooter = () => {
    return isFetching ? <ActivityIndicator /> : null
  }

  const onChangeHandler = (text: string) => {
    setQuery(text)
  }

  return (
    <SafeAreaView>
      <TextField
        placeholder="Search image"
        containerStyle={styles.textFieldContainer}
        onChangeText={onChangeHandler}
      />
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
        data={data?.pages?.flatMap((page) => page.images)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.1}
        // onRefresh={}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.error,
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
})

