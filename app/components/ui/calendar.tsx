"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  buttonVariant?: "default" | "ghost" | "primary"
}

export function Calendar({
  selected,
  onSelect,
  buttonVariant = "default",
}: CalendarProps) {
  return (
    <DayPicker
      selected={selected}
      onSelect={onSelect}
      className={cn(
        "grid grid-cols-7 gap-1 text-center",
        "bg-white rounded-lg p-4 shadow-sm"
      )}
      components={{
        // Exemple : remplacer le bouton de navigation par ton Button custom
        IconLeft: ({ ...props }) => (
          <Button variant={buttonVariant} size="icon" {...props}>
            {"<"}
          </Button>
        ),
        IconRight: ({ ...props }) => (
          <Button variant={buttonVariant} size="icon" {...props}>
            {">"}
          </Button>
        ),
        Day: ({ date, selected, ...props }) => (
          <Button
            variant={buttonVariant}
            size="icon"
            className={cn(
              selected ? "bg-blue-500 text-white" : "bg-transparent text-black"
            )}
            {...props}
          >
            {date.getDate()}
          </Button>
        ),
      }}
    />
  )
}
