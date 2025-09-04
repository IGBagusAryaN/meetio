"use client";

import { useState } from "react";

import { Badge } from "./ui/badge";
import { X } from "lucide-react";
import { Input } from "./ui/input";

export function TagsInput({ value, onChange, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  const addTag = (tag) => {
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
  };

  const removeTag = (tag) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md">
        {value.map((tag, i) => (
          <Badge
            key={i}
            className="px-2 py-1 flex items-center gap-1"
            variant="secondary"
          >
            {tag}
            <X
              className="w-3 h-3 cursor-pointer"
              onClick={() => removeTag(tag)}
            />
          </Badge>
        ))}
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="border-0 shadow-none focus-visible:ring-0 flex-1 min-w-[120px]"
        />
      </div>
    </div>
  );
}
