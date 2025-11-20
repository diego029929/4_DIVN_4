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

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

/**
 * Types for our Calendar API (keeps it simple and robust)
 */
type Mode = 'single' | 'range' | 'multiple'

type Selected =
  | Date
  | Date[]
  | DateRange
  | undefined

export type CalendarProps = {
  mode?: Mode
  selected?: Selected
  onSelect?: (value: Selected) => void
  showOutsideDays?: boolean
  captionLayout?: 'dropdown' | 'select' | 'buttons' | 'label'
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  className?: string
  classNames?: Partial<Record<string, string>>
  formatters?: Partial<DayPickerProps['formatters']>
  components?: Partial<DayPickerProps['components']>
} & Partial<Omit<DayPickerProps, 'selected' | 'onSelect' | 'mode'>

/**
 * Utility: safe converter for value that might be number | Date
 */
function toDate(value: unknown): Date {
  // react-day-picker sometimes passes timestamps; accept Date or number
  if (value instanceof Date) return value
  const n = Number(value)
  return Number.isNaN(n) ? new Date(String(value)) : new Date(n)
}

/**
 * Calendar component (single file, full features)
 */
export function Calendar({
  mode = 'single',
  selected,
  onSelect,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  className,
  classNames,
  formatters,
  components,
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  // formatMonthDropdown: react-day-picker sometimes passes number or Date
  const formatMonthDropdown = (d: unknown) =>
    toDate(d).toLocaleDateString(undefined, { month: 'short' })

  return (
    <DayPicker
      // explicit mode to avoid TypeScript inferring a DateRange when you want single
      mode={mode as any}
      // the library's types are sometimes strict — cast as any for selected/onSelect
      selected={selected as any}
      onSelect={onSelect as any}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout as any}
      formatters={{
        formatMonthDropdown,
        ...formatters,
      }}
      className={cn(
        'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      classNames={{
        // merge react-day-picker defaults with any overrides
        root: cn('w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn('flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between', defaultClassNames.nav),
        button_previous: cn('aria-disabled:opacity-50 p-0 select-none', defaultClassNames.button_previous),
        button_next: cn('aria-disabled:opacity-50 p-0 select-none', defaultClassNames.button_next),
        month_caption: cn('flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)', defaultClassNames.month_caption),
        dropdowns: cn('w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5', defaultClassNames.dropdowns),
        dropdown_root: cn('relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md', defaultClassNames.dropdown_root),
        dropdown: cn('absolute bg-popover inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn('text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none', defaultClassNames.weekday),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn('select-none w-(--cell-size)', defaultClassNames.week_number_header),
        week_number: cn('text-[0.8rem] select-none text-muted-foreground', defaultClassNames.week_number),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn('bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none', defaultClassNames.today),
        outside: cn('text-muted-foreground aria-selected:text-muted-foreground', defaultClassNames.outside),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        // Root: simple wrapper so DayPicker markup gets a data-slot for styling
        Root: ({ className: rootClassName, ...p }) => (
          <div data-slot="calendar" className={cn(rootClassName)} {...p} />
        ),

        // Chevron icons replaced with lucide icons wrapped by Button
        IconLeft: ({ className: iconClassName, ...p }) => (
          <Button variant={buttonVariant} size="icon" className={cn(iconClassName)} {...p}>
            <ChevronLeftIcon className="size-4" />
          </Button>
        ),
        IconRight: ({ className: iconClassName, ...p }) => (
          <Button variant={buttonVariant} size="icon" className={cn(iconClassName)} {...p}>
            <ChevronRightIcon className="size-4" />
          </Button>
        ),
        IconDown: ({ className: iconClassName, ...p }) => (
          <Button variant={buttonVariant} size="icon" className={cn(iconClassName)} {...p}>
            <ChevronDownIcon className="size-4" />
          </Button>
        ),

        // Day button — use our CalendarDayButton component (defined below)
        DayButton: CalendarDayButton,

        // WeekNumber cell rendering
        WeekNumber: ({ children, ...p }) => (
          <td {...p}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),

        ...components,
      }}
      {...(props as any)}
    />
  )
}

/**
 * CalendarDayButton: custom DayButton that uses your Button component,
 * handles focusing when modifiers.focused is true and maps day.date safely.
 */
const CalendarDayButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof DayButton>>(
  ({ className, day, modifiers, ...props }, forwardedRef) => {
    const defaultClassNames = getDefaultClassNames()
    const localRef = React.useRef<HTMLButtonElement | null>(null)

    // combine refs (forwarded + local)
    const setRefs = (instance: HTMLButtonElement | null) => {
      localRef.current = instance
      if (typeof forwardedRef === 'function') forwardedRef(instance)
      else if (forwardedRef && typeof forwardedRef === 'object') {
        ;(forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = instance
      }
    }

    React.useEffect(() => {
      if (modifiers?.focused) localRef.current?.focus()
    }, [modifiers?.focused])

    // day.date may be Date or number depending on context; normalize
    const dayTimestamp = (day?.date ? toDate((day as any).date) : new Date()).toLocaleDateString()

    return (
      <Button
        ref={setRefs}
        variant="ghost"
        size="icon"
        data-day={dayTimestamp}
        data-selected-single={
          Boolean(modifiers?.selected && !modifiers?.range_start && !modifiers?.range_end && !modifiers?.range_middle)
        }
        data-range-start={Boolean(modifiers?.range_start)}
        data-range-end={Boolean(modifiers?.range_end)}
        data-range-middle={Boolean(modifiers?.range_middle)}
        className={cn(
          'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70',
          defaultClassNames.day,
          className,
        )}
        {...(props as any)}
      />
    )
  }
)

CalendarDayButton.displayName = 'CalendarDayButton'

export { Calendar, CalendarDayButton }
