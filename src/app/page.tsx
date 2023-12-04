import Image from 'next/image'

import homeImage from 'public/images/home.jpg'

const HomePage = () => {
  return (
    <>
      Home Page
      <div className="absolute -z-10 inset-0">
        <Image
          src={homeImage}
          alt="car factory"
          fill
          className="object-cover"
        />
      </div>
    </>
  )
}

export default HomePage
