import { useState, useEffect } from "react"

const useLocalStorage = (key: string) => {
  const [value, setValue] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) || "")
      : null
  )

  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.removeItem(key)
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
