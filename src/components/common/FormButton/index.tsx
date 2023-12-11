'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from '@nextui-org/react'

const FormButton = ({
  children,
  className,
}: Pick<ButtonProps, 'children' | 'className'>): JSX.Element => {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      isLoading={pending}
      className={`w-full ${className || ''}`}
    >
      {children}
    </Button>
  )
}

export default FormButton
