"use client"

import Link from "next/link"
import { useEffect } from "react"

const IndexPage = () => {

  useEffect(() => {
    document.title = "Home | ThisIsSanti.dev"

    document.body.classList.add('home');
  
    return () => {
      document.body.classList.remove('home');
    };
  }, [])
  
  return (
    <>
      <section id='index'>
        <div className='mainPage-container animate__animated animate__fadeIn'>
          <h1 className='color_title rainbow_bg'> Hi! I am Santiago</h1>
          <p className='full_stack_title'>
            <span> &lt; </span>Full Stack Developer<span> /&gt; </span>
          </p>
          <p className='javascript_title'>Java Script</p>
          <Link className='button-generic button_animation' href='/about'>
            About
          </Link>
        </div>
      </section>
    </>
  )
}

export default IndexPage
