const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mt-4 h-[36px] px-1">
        <div className="font-semibold text-3xl capitalize w-[200px] h-[30px] rounded bg-gray-300" />
        <div className="flex gap-2 items-center w-[250px] bg-gray-300  h-[30px] rounded" />
      </div>
      <div className="bg-gray-300 rounded p-2 h-[30vh] flex justify-center items-center" />
    </div>
  )
}

export default Page
