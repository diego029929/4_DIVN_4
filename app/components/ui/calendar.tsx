'use client'

import * as React from 'react'
import {
  DayPicker,
  DayButton,
  getDefaultClassNames,
} from 'react-day-picker'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CalendarProps extends React.ComponentProps<typeof DayPicker> {
  buttonVariant?: 'default' | 'ghost' | 'primary'
}

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  components,
  formatters,
  ...props
}: CalendarProps) => {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn(
        'bg-background p-3 [--cell-size:2rem]',
        className
      )}
      formatters={{
        formatMonthDropdown: (date: Date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        ...defaultClassNames,
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className, ...props }) => {
          if (orientation === 'left')
            return <ChevronLeftIcon className={cn('h-4 w-4', className)} {...props} />
          if (orientation === 'right')
            return <ChevronRightIcon className={cn('h-4 w-4', className)} {...props} />
          return <ChevronDownIcon className={cn('h-4 w-4', className)} {...props} />
        },
        DayButton: ({ className, day, modifiers, ...props }) => {
          const ref = React.useRef<HTMLButtonElement>(null)
          React.useEffect(() => {
            if (modifiers.focused) ref.current?.focus()
          }, [modifiers.focused])

          return (
            <Button
              ref={ref}
              variant={buttonVariant}
              size="icon"
              data-day={new Date(day.date).toLocaleDateString()}
              data-selected={modifiers.selected}
              className={cn(className)}
              {...props}
            />
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

export { Calendar }
