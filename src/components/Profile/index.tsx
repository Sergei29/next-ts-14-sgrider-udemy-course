'use client'

import React from 'react'
import { useSession } from 'next-auth/react'

interface IProps {}

const Profile = ({}: IProps): JSX.Element => {
  const { data: session } = useSession()

  return (
    <div>
      {session?.user ? (
        <div>
          <h2>Hi {session.user.name}! </h2>
        </div>
      ) : (
        <div>
          <h2>Hi Guest! </h2>
        </div>
      )}
    </div>
  )
}

export default Profile
