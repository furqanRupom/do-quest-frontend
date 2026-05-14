import { useState } from "react"

export const useArrayField = (initial: string[] = []) => {
  const [items, setItems] = useState<string[]>(initial)
  const [input, setInput] = useState("")

  const add = () => {
    const trimmed = input.trim()

    if (!trimmed) return

    setItems((prev) => [...prev, trimmed])
    setInput("")
  }

  const remove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  return {
    items,
    input,

    add,
    remove,

    setInput,
    setItems,
  }
}
