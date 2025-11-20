"use client"

import * as React from "react"
import {
  DayPicker,
  type DayPickerProps,
  type CalendarDay,
  type Modifiers
} from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
  import { ChevronLeft, ChevronRight } from "lucide-react"

/**
 * Bouton navigation mois
 */
const CalendarNavButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function CalendarNavButton(props, ref) {
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "h-7 w-7 p-0 opacity-70 hover:opacity-100"
      )}
    />
  )
})

/**
 * Bouton de jour
 */
const CalendarDayButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    day: CalendarDay
    modifiers: Modifiers
  }
>(function CalendarDayButton({ day, modifiers, className, ...props }, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-md text-sm transition",
        modifiers.selected && "bg-primary text-primary-foreground",
        modifiers.today && "font-semibold underline",
        modifiers.disabled && "opacity-50 pointer-events-none",
        className
      )}
    />
  )
})

/**
 * Calendar principal
 */
function Calendar({ className, classNames, ...props }: DayPickerProps) {
  return (
    <DayPicker
      className={cn("p-3", className)}
      showOutsideDays
      components={{
        /**
         * ⚠️ Ta version n'utilise PAS displayMonth → mais "date"
         */
        CaptionLabel: ({ date }) => (
          <p className="text-sm font-medium capitalize">
            {date.toLocaleString("fr-FR", {
              month: "long",
              year: "numeric",
            })}
          </p>
        ),

        Nav: ({ children }) => (
          <div className="flex items-center justify-between mb-2">
            {children}
          </div>
        ),

        PreviousMonthButton: (p) => (
          <CalendarNavButton {...p} aria-label="Précédent">
            <ChevronLeft className="h-4 w-4" />
          </CalendarNavButton>
        ),

        NextMonthButton: (p) => (
          <CalendarNavButton {...p} aria-label="Suivant">
            <ChevronRight className="h-4 w-4" />
          </CalendarNavButton>
        ),

        DayButton: (p) => <CalendarDayButton {...p} />,
      }}
      classNames={{
        months: "flex flex-col gap-4",
        month: "space-y-4",
        weekdays: "grid grid-cols-7 text-center text-sm text-muted-foreground",
        weekday: "text-xs",
        weeks: "grid grid-cols-7 gap-1",
        week: "contents",
        day: "h-8 w-8",
        ...classNames,
      }}
      {...props}
    />
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
        
