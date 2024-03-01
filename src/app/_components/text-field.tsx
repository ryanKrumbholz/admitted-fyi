import { forwardRef } from 'react'
import { classNames } from '~/utils/core'

export type TextFieldOwnProps = {
  label?: string
}

type TextFieldProps = TextFieldOwnProps &
  React.ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, id, name, type = 'text', className, ...rest }, forwardedRef) => {
    return (
      <div className='min-w-full'>
      {label && (
        <label htmlFor={id ?? name} className="block mb-2 text-white font-semibold">
          {label}
        </label>
      )}
      <input
        {...rest}
        ref={forwardedRef}
        id={id ?? name}
        name={name}
        type={type}
        className={classNames(
          'block w-full py-1 rounded shadow-sm text-base border-base-200 focus:ring-2 focus:ring-lavender focus:outline-none',
          className,
        )}
      />
    </div>    
    )
  },
)

TextField.displayName = 'TextField'
