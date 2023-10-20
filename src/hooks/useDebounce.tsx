import { useEffect, useState } from "react"
/**
 * Use to avoid unnecessary requests while typing
 * @param value any kind of value to delay, generic type
 * @param delay ms, default 750 ms
 * @returns
 */
export function useDebounce<T>(value: T, delay = 750) {
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

