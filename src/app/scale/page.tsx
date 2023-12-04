import scaleImage from 'public/images/scale.jpg'
import Hero from '@/components/Hero'

const ScalePage = () => {
  return (
    <>
      <Hero
        imgData={scaleImage}
        imgAlt="steel factory cranes"
        title="Scale your app to infinity"
      />
    </>
  )
}

export default ScalePage
