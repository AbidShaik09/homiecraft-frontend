import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import OrangeCard from '../../components/orangeCard/OrangeCard'

const Home = () => {
  return (
    <>
   <div style={{display:'flex',justifyContent:'space-around'}}>
   <OrangeCard/>
   <OrangeCard/>
   <OrangeCard/>
   </div>
    </>
  )
}

export default Home
