'use client'

import * as React from 'react'
import {
  DayPicker,
  DayButton,
  DateRange,
  getDefaultClassNames,
  type DayPickerProps,
} from 'react-day-picker'

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/* ------------------------------- Types ------------------------------- */

type Mode = 'single' | 'multiple' | 'range'

type SelectedValue = Date | Date[] | DateRange | undefined

export interface CalendarProps
  extends Omit<Partial<DayPickerProps>, 'selected' | 'onSelect' | 'mode'> {
  mode?: Mode
  selected?: SelectedValue
  onSelect?: (value: SelectedValue) => void
  showOutsideDays?: boolean
}

/* ---------------------- Safe date conversion ------------------------- */

function toDate(value: unknown): Date {
  if (value instanceof Date) return value
  const n = Number(value)
  if (!isNaN(n)) return new Date(n)
  return new Date(String(value))
}

/* --------------------------- Calendar -------------------------------- */

export function Calendar({
  mode = 'single',
  selected,
  onSelect,
  showOutsideDays = true,
  className,
  classNames,
  components,
  ...props
}: CalendarProps) {
  const defaultClasses = getDefaultClassNames()

  return (
    <DayPicker
      mode={mode as any}
      selected={selected as any}
      onSelect={onSelect as any}
      showOutsideDays={showOutsideDays}
      className={cn('p-3 bg-background', className)}
      classNames={{
        root: cn('w-fit', defaultClasses.root),
        month: cn('space-y-4', defaultClasses.month),
        months: cn('inline-flex gap-4', defaultClasses.months),
        day: cn('text-center select-none', defaultClasses.day),
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <Button variant="ghost" size="icon">
            <ChevronLeftIcon className="size-4" />
          </Button>
        ),
        IconRight: () => (
          <Button variant="ghost" size="icon">
            <ChevronRightIcon className="size-4" />
          </Button>
        ),
        IconDown: () => (
          <Button variant="ghost" size="icon">
            <ChevronDownIcon className="size-4" />
          </Button>
        ),
        DayButton: CalendarDayButton,
        ...components,
      }}
      {...props}
    />
  )
}

/* ---------------------- Custom Day Button ---------------------------- */

const CalendarDayButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof DayButton>
>(function CalendarDayButton({ day, modifiers, className, ...props }, ref) {
  const d = day?.date ? toDate((day as any).date) : new Date()

  return (
    <Button
      ref={ref}
      variant={modifiers?.selected ? 'default' : 'ghost'}
      size="icon"
      data-day={d.toISOString()}
      className={cn('w-full aspect-square', className)}
      {...props}
    />
  )
})
