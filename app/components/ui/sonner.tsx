"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import * as React from "react"

type FixedToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: FixedToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as "light" | "dark" | "system"}
      richColors
      closeButton
      {...props}
    />
  )
}

export { Toaster }
        
