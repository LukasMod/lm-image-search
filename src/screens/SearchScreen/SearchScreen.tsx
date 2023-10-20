import { Image } from "expo-image"
import { useCallback } from "react"
import { FlatList, RefreshControl, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { EmptyState, Loader, Text, TextField } from "../../components"
import { colors } from "../../theme"
import { UnsplashImage } from "../../types"
import { useLogic } from "./logic"
import styles from "./styles"

const keyExtractor = (item: UnsplashImage) => item.id

export const SearchScreen = () => {
  const {
    imagesData,
    isFetching,
    isError,
    error,
    refetch,
    isRefetching,
    onChangeHandler,
    onEndReached,
    onCancelPress,
    query,
    debounceQuery,
  } = useLogic()

  const renderItem = useCallback(
    ({ item, index }: { item: UnsplashImage; index: number }) => {
      return (
        <Image
          source={{ uri: item.urls.small }}
          style={[styles.image, { aspectRatio: item.aspectRatio }]}
          contentFit="contain"
          testID={`image-${index}`}
        />
      )
    },
    []
  )

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
          data={imagesData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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
        <View style={styles.initialContainer}>
          <Text
            text="Enter above the image you're looking for!"
            style={styles.initialText}
            preset="header"
          />
        </View>
      )}
    </SafeAreaView>
  )
}

