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

  const force = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [value, setValue, force]
}

export default useLocalStorage
