import Link from 'next/link'

// import { deleteSnippet } from '@/lib/serverActions'
import DeleteButton from './DeleteButton'

interface IProps {
  id: string
}

const SnippetControlButtons = ({ id }: IProps): JSX.Element => {
  // const formAction = deleteSnippet.bind(null, id)

  return (
    <>
      <Link
        href={`/snippets/${id}/edit`}
        className=" border border-orange-800 bg-orange-500 hover:bg-orange-600 text-center px-2 py-1 min-w-[100px] rounded"
      >
        edit
      </Link>

      {/* This can be an alternative if we want to use delete button directly from server component */}
      {/* <form action={formAction}>
        <button
          type="submit"
          className="border border-red-800 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-center px-2 py-1 min-w-[100px] rounded"
        >
          delete
        </button>
      </form> */}

      <DeleteButton id={id} />
    </>
  )
}

export default SnippetControlButtons
