import Image from 'next/image'

import homeImage from 'public/images/home.jpg'
import Hero from '@/components/Hero'

const HomePage = () => {
  return (
    <>
      <Hero
        imgData={homeImage}
        imgAlt="car factory"
        title="Professional Cloud Hosting"
      />
    </>
  )
}

export default HomePage
