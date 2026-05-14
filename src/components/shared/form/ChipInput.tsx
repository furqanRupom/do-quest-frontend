import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type ChipInputProps = {
  label: string
  items: string[]
  setItems: React.Dispatch<React.SetStateAction<string[]>>
  inputVal: string
  setInputVal: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

const ChipInput = ({
  label,
  items,
  setItems,
  inputVal,
  setInputVal,
  placeholder = "Add item...",
}: ChipInputProps) => {
  
  const addItem = () => {
    const trimmed = inputVal.trim()
    if (trimmed) {
      setItems((prev) => [...prev, trimmed])
      setInputVal("")
    }
  }

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold">{label}</label>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <Badge key={i} variant="default" className="gap-1 pr-1 py-1 text-sm">
              {item}
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="ml-1 hover:text-destructive transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault()
              addItem()
            }
          }}
          placeholder={placeholder}
          className="h-12"
        />
        <Button
          type="button"
          size="icon"
          className="h-12 w-12 cursor-pointer shrink-0"
          onClick={addItem}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

export default ChipInput
