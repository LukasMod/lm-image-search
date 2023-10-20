import { Image } from "expo-image"
import { useCallback, useState } from "react"
import { ActivityIndicator, FlatList } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useInfiniteQuery } from "react-query"
import { Text, TextField } from "../../components"
import { useDebounce } from "../../hooks"
import { api } from "../../services/api"
import { UnsplashImage } from "../../types"
import styles from "./styles"

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
    console.log("TEST fetchImage START") //TODO:
    const response = await api.getImages({ query, page })
    if (response.kind === "ok") {
      return {
        images: response.images,
        page: response.page,
        totalPages: response.totalPages,
      }
    } else {
      console.log(`[ERROR] fetchImages: ${JSON.stringify(response)}`)
      throw Error(response.kind)
    }
  }

  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery(
    ["images", debounceQuery],
    ({ pageParam = 1 }) =>
      fetchImages({ query: debounceQuery, page: pageParam }),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : null,
      retry: 1,
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
    if (isFetching) {
      return <ActivityIndicator />
    }
    if (isError) {
      const errorMessage = `Something went wrong. Please try again later.\nError type: ${
        error instanceof Error ? error?.message : ""
      }`
      return (
        <Text text={errorMessage} preset="error" style={styles.errorText} />
      )
    }
    return null
  }

  const onChangeHandler = (text: string) => {
    setQuery(text)
  }

  const onEndReached = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }

  return (
    <SafeAreaView>
      <TextField
        placeholder="Search image"
        containerStyle={styles.textFieldContainer}
        onChangeText={onChangeHandler}
      />
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={data?.pages?.flatMap((page) => page.images)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.8}
        // onRefresh={} //TODO:
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  )
}

