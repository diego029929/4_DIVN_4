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

const CalendarDayButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    day: CalendarDay
    modifiers: Modifiers
  }
>(function CalendarDayButton({ modifiers, className, ...props }, ref) {
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
 * Calendar avec header custom car ta version ne supporte PAS Navbar/Caption
 */
function Calendar({ className, classNames, ...props }: DayPickerProps) {
  const [month, setMonth] = React.useState(props.month ?? new Date())

  const prev = () => {
    const d = new Date(month)
    d.setMonth(d.getMonth() - 1)
    setMonth(d)
  }

  const next = () => {
    const d = new Date(month)
    d.setMonth(d.getMonth() + 1)
    setMonth(d)
  }

  return (
    <div className={cn("p-3", className)}>
      
      {/* 🔥 Header entièrement custom */}
      <div className="flex items-center justify-between mb-2">
        <CalendarNavButton onClick={prev}>
          <ChevronLeft className="h-4 w-4" />
        </CalendarNavButton>

        <p className="text-sm font-medium capitalize">
          {month.toLocaleString("fr-FR", { month: "long", year: "numeric" })}
        </p>

        <CalendarNavButton onClick={next}>
          <ChevronRight className="h-4 w-4" />
        </CalendarNavButton>
      </div>

      {/* Le DayPicker *sans* Header car impossible de le customiser */}
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        components={{
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
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
    
