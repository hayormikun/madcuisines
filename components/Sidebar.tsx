import Link from "next/link"

type SidebarProps = {
  view: string
  create: string
  createLink: string
  viewLink: string 
}

export const Sidebar = ({view, create, viewLink, createLink}: SidebarProps) => {
  return (
    <aside className="mt-5 h-auto lg:h-[80] bg-teal-700 shadow-md w-full lg:w-2/12">
      <ul className="text-center lg:text-left mt-10 p-5">
        <Link href="/">
        <a className="hidden md:inline lg:block mb-5 text-gray-100 font-semibold text-md p-3 lg:border-b-2 border-gray-200">Dashboard</a>
        </Link>
        <Link href={viewLink}>
        <a className="lg:block mb-5 text-gray-100 font-semibold text-md p-3 lg:border-b-2 border-gray-200">All {view}</a>
        </Link>
        <Link href={createLink}>
        <a className="lg:block mb-5 text-gray-100 font-semibold text-md p-3 lg:border-b-2 border-gray-200">Create {create}</a>
        </Link>
      </ul>
    </aside>
  )
}
