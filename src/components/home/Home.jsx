import React from 'react'
import { useDonorStore } from '../../zustand/store'
import Hero from './Hero'
import Stats from './Stats'
import Services from './Services'
import Testimonials from './Testimonials'
import Footer from './Footer'


const Home = () => {
  const loggedDonor = useDonorStore(state => state.loggedDonor)
  console.log("### loggedDonor", loggedDonor)

  return (
    <div className='min-h-screen bg-gray-50 w-full'>
      <Hero />
      <Stats />
      <Services />
      <Testimonials />
      <Footer />
      {/* <h1 className='text-2xl font-bold'>
        Welcome To The {" "}&nbsp;
        <span className='text-3xl font-extrabold text-red-500'>Red Vault</span>
      </h1>
      <h1 className='text-5xl font-extrabold'>{loggedDonor?.data?.name || loggedDonor?.Name}</h1> */}
    </div>
  )
}

export default Home
