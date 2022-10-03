import React from 'react'
import {Circle} from 'better-react-spinkit'
import whatsapp from '../assets/whatsapp-logo.png'
import Image from 'next/image'

const Loading = () => {
  return (
    <center style={{display:'grid', placeItems:'center', height:'100vh'}}>
      <div>
      <Image src={whatsapp} width={150} height={150} />
        <Circle color='#3CBC28' size={60} />
      </div>
    </center>
  )
}

export default Loading