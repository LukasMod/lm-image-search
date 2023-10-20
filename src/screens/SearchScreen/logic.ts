import { useMemo, useState } from "react"
import { useDebounce } from "../../hooks"
import { useInfiniteQuery } from "react-query"
import { getImages } from "../../services"

export const useLogic = () => {
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
      enabled: !!debounceQuery,
    }
  )

  const imagesData = useMemo(
    () => data?.pages?.flatMap((page) => page.images),
    [data]
  )

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

  return {
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
  }
}

