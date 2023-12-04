import Image, { StaticImageData } from 'next/image'

interface IProps {
  imgData: StaticImageData
  imgAlt: string
  title: string
}

const Hero = ({ imgData, imgAlt, title }: IProps): JSX.Element => {
  return (
    <div className="relative h-screen">
      <div className="absolute -z-10 inset-0">
        <Image src={imgData} alt={imgAlt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 " />
      </div>
      <div className="pt-48 flex justify-center items-center">
        <h1 className="text-white text-6xl capitalize">{title}</h1>
      </div>
    </div>
  )
}

export default Hero
