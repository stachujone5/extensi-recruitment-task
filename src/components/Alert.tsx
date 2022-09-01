import clsx from 'clsx'

import type { ReactNode } from 'react'

interface Props {
  readonly children: ReactNode
  readonly className?: string
  readonly variant?: 'error' | 'success'
}

export const Alert = ({ children, className, variant = 'success' }: Props) => {
  const classes = clsx(
    'alert shadow-lg',
    variant === 'success' && 'alert-success',
    variant === 'error' && 'alert-error',
    className
  )

  return (
    <div className={classes}>
      <strong>{children}</strong>
    </div>
  )
}
