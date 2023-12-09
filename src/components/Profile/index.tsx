'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

interface IProps {}

const Profile = ({}: IProps): JSX.Element => {
  const { data: session } = useSession()

  return <div>{session ? <div>Logged in</div> : <div>Logged out</div>}</div>
}

export default Profile
