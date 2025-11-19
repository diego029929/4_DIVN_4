'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

// Définition des variantes de boutons
export const buttonVariants = ({
  variant = 'default',
  size = 'default',
}: {
  variant?: 'default' | 'ghost' | 'primary' | 'outline'
  size?: 'default' | 'icon' | 'sm'
} = {}) => {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses: Record<string, string> = {
    default: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent hover:bg-gray-100',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50',
  }
  const sizeClasses: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10 p-0',
    sm: 'h-8 px-3',
  }
  return cn(base, variantClasses[variant], sizeClasses[size])
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'ghost' | 'primary' | 'outline'
  size?: 'default' | 'icon' | 'sm'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
  
