'use client'

import { NextUIProvider as Provider } from '@nextui-org/react'

import { IParentProps } from '@/types'

const NextUIProvider = ({ children }: IParentProps): JSX.Element => {
  return <Provider>{children}</Provider>
}

export default NextUIProvider
