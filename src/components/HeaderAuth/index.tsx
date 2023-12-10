'use client'

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react'
import { useSession, signIn, signOut } from 'next-auth/react'

const HeaderAuth = (): JSX.Element | null => {
  const { data: session, status } = useSession()

  const handleSignin = () => {
    signIn('github')
  }

  if (status === 'loading') return null

  if (!!session?.user) {
    return (
      <Popover placement="left">
        <PopoverTrigger className="cursor-pointer">
          <Avatar src={session.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <Button
              onClick={() => signOut()}
              color="warning"
              variant="bordered"
            >
              Sign Out
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <>
      <NavbarItem>
        <Button onClick={handleSignin} color="secondary" variant="bordered">
          Sign In
        </Button>
      </NavbarItem>
      <NavbarItem>
        <Button onClick={handleSignin} color="primary" variant="flat">
          Sign Up
        </Button>
      </NavbarItem>
    </>
  )
}

export default HeaderAuth
