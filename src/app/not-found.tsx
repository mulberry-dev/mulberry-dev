import Link from "next/link"

import "@/styles/scss/styles.scss"
import Image from "next/image"
import { useEffect } from "react"



export default function NotFound() {





  return (
    <>
      <section>
        <div className='generic_container'>
          <h2>Error 404</h2>
          <Image
            src='https://cdn-icons-png.flaticon.com/512/4826/4826313.png'
            width={100}
            height={100}
            alt={"image"}
            style={{ margin: "20px" }}
          />
          <p>Page not found</p>
          <Link className='button-generic' href='/'>
            Back Home
          </Link>
        </div>
      </section>
    </>
  )
}
