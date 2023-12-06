import { db } from '@/lib/db'

const HomePage = async () => {
  const snippets = await db.snippet.findMany()

  return (
    <>
      <h1 className="my-4 text-3xl font-bold text-center underline">
        Home page
      </h1>
      <ul className="flex gap-4 justify-center">
        {(!snippets || snippets.length === 0) && <li>No snippets</li>}
        {snippets.map(({ id, title, code }) => (
          <li
            key={id}
            className="border border-green-700 bg-green-400 rounded px-2 py-4"
          >
            <h3 className="my-2 font-semibold text-xl capitalize">{title}</h3>
            <code className="p-2 bg-slate-200 rounded">{code}</code>
          </li>
        ))}
      </ul>
    </>
  )
}

export default HomePage
