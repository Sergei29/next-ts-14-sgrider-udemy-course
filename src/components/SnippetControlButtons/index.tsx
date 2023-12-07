import Link from 'next/link'

interface IProps {
  id: string
}

const SnippetControlButtons = ({ id }: IProps): JSX.Element => {
  return (
    <>
      <Link
        href={`/snippets/${id}/edit`}
        className=" border border-orange-800 bg-orange-500 hover:bg-orange-600 text-center px-2 py-1 min-w-[100px] rounded"
      >
        edit
      </Link>
      <button className=" border border-red-800 bg-red-500 hover:bg-red-600 text-center px-2 py-1 min-w-[100px] rounded">
        delete
      </button>
    </>
  )
}

export default SnippetControlButtons
