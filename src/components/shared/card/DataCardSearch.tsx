"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DataCardSearchProps {
  initialValue?: string;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  onDebouncedChange: (value: string) => void;
}

const DataCardSearch = ({
  initialValue = "",
  placeholder = "Search...",
  debounceMs = 700,
  isLoading,
  onDebouncedChange,
}: DataCardSearchProps) => {
  const [value, setValue] = useState(initialValue);
  const skipNextDebounceRef = useRef(false);

  useEffect(() => {
    if (skipNextDebounceRef.current) {
      skipNextDebounceRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      onDebouncedChange(value.trim());
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onDebouncedChange]);

  const handleClear = () => {
    skipNextDebounceRef.current = true;
    setValue("");
    onDebouncedChange("");
  };

  return (
    <div className="relative w-full">
      <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="h-12 pl-12 pr-10 text-sm rounded-xl shadow-sm border-border/60 bg-background transition-shadow focus-visible:shadow-md focus-visible:ring-1 focus-visible:ring-primary/20"
        disabled={isLoading}
      />

      {value.length > 0 && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 rounded-full hover:bg-muted"
          onClick={handleClear}
          aria-label="Clear search"
          disabled={isLoading}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default DataCardSearch;
