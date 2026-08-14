"use client"

import { alertInfo } from "@/utils/alerts"
import Image from "next/image"

const Info = () => {
  return (
    <>
      <Image
        src={"/images/Icons/informacion.svg"}
        alt={"info"}
        width={40}
        height={40}
        className='info_icon rueda'
        title='Site info'
        onClick={() => alertInfo("info")}
      ></Image>
    </>
  )
}

export default Info
