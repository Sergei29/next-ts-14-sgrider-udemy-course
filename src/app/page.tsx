import { Button } from '@nextui-org/react'

import Profile from '@/components/Profile'
import * as actions from '@/lib/serverActions'
import { auth } from '@/lib/auth'

const Home = async () => {
  const session = await auth()

  return (
    <>
      <h1 className="text-center text-3xl underline font-bold">
        Hi {session?.user?.name || 'Guest'}
      </h1>

      <div className="flex gap-2">
        {!!session?.user ? (
          <form action={actions.signOutAction}>
            <Button
              type="submit"
              color="success"
              className="px-2 py-1 h-auto rouded"
            >
              Sign out
            </Button>
          </form>
        ) : (
          <form action={actions.signInAction}>
            <Button
              type="submit"
              color="primary"
              className="px-2 py-1 h-auto rouded"
            >
              Sign In
            </Button>
          </form>
        )}
        <Profile />
      </div>
    </>
  )
}

export default Home
