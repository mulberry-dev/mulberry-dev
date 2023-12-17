"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import { notifyInfo } from "@/utils/toast"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { links, linksAuth } from "@/data/navegation"

const Navigation = () => {
  const pathname = usePathname()
  const session = useSession()

  const toggleNavbar = () => {
    if (window.innerWidth < 990) {
      document.getElementById("lanzador")?.click()
    }
  }

  const linksAuthenticated = [
    {
      id: 0,
      name: "Profile",
      path: "/dashboard/profile",
      onClick: toggleNavbar,
    },
    /* {
      id: 1,
      name: "Trace",
      path: "/dashboard/trace",
      onClick: toggleNavbar,
    }, */
    {
      id: 2,
      name: "SignOut",
      path: "",
      onClick: () => {
        notifyInfo("Come Back Soon 👋")
        toggleNavbar()

        setTimeout(() => {
          return signOut()
        }, 500)

        return
      },
    },
  ]

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark position-fixed menu'>
        <div className='container-fluid justify-content-end'>
          <div
            className='menu-activador'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <input type='checkbox' id='lanzador' />
            <label htmlFor='lanzador'>
              <span className='menu-activador-linea'></span>
              <span className='menu-activador-linea'></span>
              <span className='menu-activador-linea'></span>
            </label>
          </div>
          <div
            className='collapse navbar-collapse justify-content-around'
            id='navbarNav'
          >
            <ul className='navbar-nav'>
              <li>
                {session.status === "authenticated" ? (
                  <>
                    <div className='logo_container'>
                      <Image
                        src='/images/Icons/MouseArrow.webp'
                        width={30}
                        height={30}
                        alt={"Logo"}
                      />
                      <p>ThisIsSanti.dev</p>
                    </div>
                  </>
                ) : (
                  <Link
                    href='/'
                    style={{ textDecoration: "none" }}
                    onClick={toggleNavbar}
                  >
                    <div className='logo_container'>
                      <Image
                        src='/images/Icons/MouseArrow.webp'
                        width={30}
                        height={30}
                        alt={"Logo"}
                      />
                      <p>ThisIsSanti.dev</p>
                    </div>
                  </Link>
                )}
              </li>
            </ul>
            <ul className='navbar-nav'>
              {session.status === "authenticated" ? (
                <></>
              ) : (
                <>
                  {" "}
                  {links.map((link) => (
                    <li
                      key={link.id}
                      className='nav-item d-flex justify-content-center '
                    >
                      <Link
                        className={
                          pathname === link.path
                            ? "nav-link activo"
                            : "nav-link "
                        }
                        aria-current='page'
                        href={link.path}
                        onClick={toggleNavbar}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <ul className='navbar-nav flex-row justify-content-center'>
              {session.status === "authenticated" ? (
                <>
                  {linksAuthenticated.map((link) => (
                    <li
                      key={link.id}
                      className='nav-item d-flex justify-content-center p-1'
                    >
                      <Link
                        className={
                          pathname === link.path
                            ? "nav-link activo"
                            : "nav-link "
                        }
                        aria-current='page'
                        href={link.path}
                        onClick={link.onClick}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {linksAuth.map((link) => (
                    <li
                      key={link.id}
                      className='nav-item d-flex justify-content-center p-1'
                    >
                      <Link
                        className={
                          pathname === link.path
                            ? "nav-link activo"
                            : "nav-link "
                        }
                        aria-current='page'
                        href={link.path}
                        onClick={toggleNavbar}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
