import { Image } from "expo-image"
import { useCallback, useState } from "react"
import { FlatList, RefreshControl, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useInfiniteQuery } from "react-query"
import { EmptyState, Loader, Text, TextField } from "../../components"
import { useDebounce } from "../../hooks"
import { getImages } from "../../services"
import { colors } from "../../theme"
import { UnsplashImage } from "../../types"
import styles from "./styles"

export const SearchScreen = () => {
  const [query, setQuery] = useState("")
  const debounceQuery = useDebounce(query)

  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    refetch,
    isRefetching,
  } = useInfiniteQuery(
    ["images", debounceQuery],
    ({ pageParam = 1 }) => getImages({ query: debounceQuery, page: pageParam }),
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

  const renderFooter = useCallback(() => {
    if (isFetching) {
      return <Loader />
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
  }, [isFetching, isError, error])

  const renderEmpty = useCallback(() => {
    if (isFetching) return null

    return <EmptyState />
  }, [isFetching])

  const onChangeHandler = (text: string) => {
    setQuery(text)
  }

  const onEndReached = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }

  const onCancelPress = () => {
    setQuery("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextField
        placeholder="Search image"
        containerStyle={styles.textFieldContainer}
        onChangeText={onChangeHandler}
        value={query}
        onCancelPress={onCancelPress}
      />
      {debounceQuery ? (
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={data?.pages?.flatMap((page) => page.images)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.8}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              colors={[colors.tint]}
            />
          }
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      ) : (
        <View style={styles.emptyQueryContainer}>
          <Text
            text="Enter above the image you're looking for!"
            style={styles.emptyQueryText}
            preset="header"
          />
        </View>
      )}
    </SafeAreaView>
  )
}

