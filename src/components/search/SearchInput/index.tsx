'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@nextui-org/react'

import * as actions from '@/lib/serverActions'

interface IProps {}

const SearchInput = ({}: IProps): JSX.Element => {
  const searchParams = useSearchParams()
  const term = searchParams.get('term')

  return (
    <form action={actions.search}>
      <Input defaultValue={term || ''} name="term" />
    </form>
  )
}

export default SearchInput
