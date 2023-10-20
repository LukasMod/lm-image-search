import { useEffect, useState } from "react"
/**
 *
 * @param value any kind of value to delay, generic type
 * @param delay ms, default 500 ms
 * @returns
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

