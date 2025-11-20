"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"


/* ============================
   NAV BUTTON (OK avec forwardRef)
   ============================ */
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


/* ============================
   DAY BUTTON (SANS forwardRef)
   FIX DEFINITIF
   ============================ */
function CalendarDayButton(props: any) {
  const { modifiers, className, ...rest } = props

  return (
    <button
      {...rest}
      className={cn(
        "relative flex h-8 w-8 items-center justify-center rounded-md text-sm transition",
        modifiers?.selected && "bg-primary text-primary-foreground",
        modifiers?.today && "font-semibold underline",
        modifiers?.disabled && "opacity-50 pointer-events-none",
        className
      )}
    />
  )
}


/* ============================
   CALENDAR AVEC HEADER CUSTOM
   ============================ */
function Calendar({ className, classNames, ...props }: any) {
  const [month, setMonth] = React.useState(props.month ?? new Date())

  const prev = () => setMonth(new Date(month.getFullYear(), month.getMonth() - 1))
  const next = () => setMonth(new Date(month.getFullYear(), month.getMonth() + 1))

  return (
    <div className={cn("p-3", className)}>
      
      {/* HEADER CUSTOM */}
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

      {/* DAYPICKER */}
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays
        components={{
          DayButton: CalendarDayButton,  // 🔥 FIX ICI
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
    
