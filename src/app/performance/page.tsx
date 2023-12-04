import perfImage from 'public/images/performance.jpg'
import Hero from '@/components/Hero'

const PerformancePage = () => {
  return (
    <>
      <Hero
        imgData={perfImage}
        imgAlt="iron cutting machine"
        title="We serve high performance applications"
      />
    </>
  )
}

export default PerformancePage
