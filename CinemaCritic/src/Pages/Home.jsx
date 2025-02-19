import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Oscar from '../Components/Oscar/Oscar'
import Blockbuster from '../Components/BlockBluster/Blockbuster'

const Home = () => {
  return (
    <>
        <Hero/>
        <Popular/>
        <Oscar/>
        <Blockbuster/>
    </>
  )
}

export default Home