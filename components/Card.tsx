import Image from 'next/image'
import Link from 'next/link'

type Cardprops = {
  image: string
  alt: string
  heading: string
  description: string
  link: string
}

export const Card = ({ image, alt, heading, description, link }: Cardprops) => {
  return (
    <Link href={link}>
      <a>
        <div className="bg-white rounded overflow-hidden shadow-md w-fit">
          <Image
            src={image}
            objectFit="cover"
            height="180px"
            width="350px"
            alt={alt}
            className="w-full"
          />
          <div className="m-5">
            <span className="text-gray-800 font-bold capitalize">
              {heading}
            </span>
            <p className="text-gray-500 font-semibold text-sm h-[40px] overflow-y-hidden">{description}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}
