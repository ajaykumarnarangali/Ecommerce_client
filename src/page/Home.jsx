import React from 'react'
import CategoryList from '../component/CategoryList'
import Banner from '../component/Banner'
import HorizontalCards from '../component/HorizontalCards'
import VerticalProducts from '../component/VerticalProducts'

function Home() {
  return (
    <div className='min-h-screen h-full'>
      <CategoryList />
      <Banner />
      <HorizontalCards category={'Airpodes'} heading={"Top's Airpodes"} />
      <HorizontalCards category={'watches'} heading={"Top's Watches"} />
      <VerticalProducts category={'Mouse'} heading={"Mouses"} />
      <VerticalProducts category={"speakers"} heading={"Bluetooth Speakers"} />
      <VerticalProducts category={"mobiles"} heading={"Mobiles"} />
      <VerticalProducts category={"televisions"} heading={"Televisions"} />
      <VerticalProducts category={"camera"} heading={"Camera & Photography"} />
      <VerticalProducts category={"earphones"} heading={"Wired Earphones"} />
      {/* <VerticalProducts category={"refrigerator"} heading={"Refrigerator"}/> */}
      {/* <VerticalProducts category={"trimmers"} heading={"Trimmers"}/> */}
    </div>
  )
}

export default Home
