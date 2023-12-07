import Link from 'next/link'

import { db } from '@/lib/db'

const HomePage = async () => {
  const snippets = await db.snippet.findMany()

  return (
    <>
      <div className="flex gap-4 items-center my-8">
        <h1 className="my-4 text-3xl font-bold text-center underline">
          Snippets
        </h1>
        <Link
          href="/snippets/new"
          className="border border-green-700 bg-green-400 hover:bg-green-500 px-1 py-2 w-[100px] h-[50px] flex justify-center items-center font-bold rounded-full"
        >
          <span>new</span>
        </Link>
      </div>
      <div className="flex gap-4">
        {(!snippets || snippets.length === 0) && <p>No snippets</p>}
        {snippets.map(({ id, title }) => (
          <Link
            href={`/snippets/${id}`}
            key={id}
            className="border border-green-700 bg-green-400 hover:bg-green-500 rounded px-1 py-2 min-w-[200px]"
          >
            <h3 className="font-semibold text-xl capitalize">{title}</h3>
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage
