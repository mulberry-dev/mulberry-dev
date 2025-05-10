"use client"

import Link from "next/link"
import PageTitle from "@/components/PageTitle"

const IndexPage = () => {
  return (
    <section id="index">
      <PageTitle title="Home" bodyClass="home" />
      <div className="mainPage-container animate__animated animate__fadeIn">
        <h1 className="color_title rainbow_bg">Hi! I am Santiago</h1>
        <p className="full_stack_title">
          <span> &lt; </span>Full Stack Developer<span> /&gt; </span>
        </p>
        <p className="javascript_title">Java Script</p>
        <Link className="button-generic button_animation" href="/about">
          About
        </Link>
      </div>
    </section>
  )
}

export default IndexPage
