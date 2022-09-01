import clsx from 'clsx'
import { forwardRef } from 'react'

import type { HTMLInputTypeAttribute } from 'react'
import type { FieldError } from 'react-hook-form'
import type { IconType } from 'react-icons'

interface Props {
  readonly error?: FieldError
  readonly icon?: IconType
  readonly id: string
  readonly placeholder: string
  readonly type?: HTMLInputTypeAttribute
}

const iconStyles = { height: '1.5rem', width: '1.5rem' }

export const FormControl = forwardRef<HTMLInputElement, Props>(
  ({ error, icon: Icon, id, placeholder, type = 'text' }, ref) => {
    return (
      <>
        <div className='relative'>
          <label className='sr-only' htmlFor={id}>
            {placeholder}
          </label>

          <input
            className='w-full py-3 pl-3 pr-12 text-sm border-2 border-gray-200 rounded'
            ref={ref}
            type={type}
            placeholder={placeholder}
          />

          {Icon && (
            <span className={clsx('absolute text-gray-500 -translate-y-1/2 top-1/2 right-4')}>
              <Icon style={iconStyles} />
            </span>
          )}
        </div>

        {error && <p className='text-red-800'>{error.message}</p>}
      </>
    )
  }
)
