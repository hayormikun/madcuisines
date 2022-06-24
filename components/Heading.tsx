type HeadingProps = {
    heading: string
}

export const Heading = ({heading}: HeadingProps) => {
  return (
    <h1 className="flex justify-center font-semibold capitalize text-gray-800 text-4xl mb-7">{heading}</h1>
  )
}
