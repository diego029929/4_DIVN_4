import * as React from "react"
import { cn } from "@/lib/utils"

export const Breadcrumb = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <nav
    aria-label="breadcrumb"
    className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
    {...props}
  />
)

export const BreadcrumbList = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <ol
    className={cn("flex items-center space-x-1", className)}
    {...props}
  />
)

export const BreadcrumbItem = ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn("flex items-center", className)}
    {...props}
  />
)

export const BreadcrumbSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    className={cn("mx-1", className)}
    {...props}
  />
)

export const BreadcrumbLink = ({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
}

export const BreadcrumbPage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      aria-current="page"
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  )
                                    }
  
