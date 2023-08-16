"use client";

import { alertInfo } from "@/utils/alerts";
import { notifyInfo, notifySuccess } from "@/utils/toast";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();

  const session = useSession();

  const links = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "About",
      path: "/about",
    },
    {
      id: 3,
      name: "Education",
      path: "/education",
    },
    {
      id: 4,
      name: "Skills",
      path: "/skills",
    },
    {
      id: 5,
      name: "Portfolio",
      path: "/portfolio",
    },
    {
      id: 6,
      name: "Contact",
      path: "/contact",
    },
  ];
  const linksAuth = [
    {
      id: 1,
      name: "Login",
      path: "/login",
    },
    {
      id: 2,
      name: "SignUp",
      path: "/signup",
    },
  ];
  const linksAuthenticated = [
    {
      id: 4,
      name: "Profile",
      path: "/dashboard/profile",
    },
    {
      id: 3,
      name: "SignOut",
      path: "",
      onClick: () => {
        notifyInfo("Come Back Soon 👋");

        setTimeout(() => {
          return signOut();
        }, 500);

        return;
      },
    },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark position-fixed menu">
        <div className="container-fluid justify-content-end">
          <div
            className="menu-activador "
            /* type="button" */
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <input type="checkbox" id="lanzador" />
            <label htmlFor="lanzador">
              <span className="menu-activador-linea"></span>
              <span className="menu-activador-linea"></span>
              <span className="menu-activador-linea"></span>
            </label>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li>
                <Link href="/">
                  <div className="logo_container">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/7914/7914802.png"
                      width={30}
                      height={30}
                      alt={"Logo"}
                    />
                    <p>ThisIsSanti.dev</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {session.status === "unauthenticated" ? (
                <>
                  {links.map((link) => (
                    <li
                      key={link.id}
                      className="nav-item d-flex justify-content-center "
                    >
                      <Link
                        className={
                          pathname === link.path
                            ? "nav-link activo"
                            : "nav-link "
                        }
                        aria-current="page"
                        href={link.path}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <> </>
              )}
            </ul>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {session.status === "unauthenticated" ? (
                <>
                  {linksAuth.map((link) => (
                    <li
                      key={link.id}
                      className="nav-item d-flex justify-content-center"
                    >
                      <Link
                        className={
                          pathname === link.path
                            ? "nav-link activo"
                            : "nav-link "
                        }
                        aria-current="page"
                        href={link.path}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {linksAuthenticated.map((link) => (
                    <li
                      key={link.id}
                      className="nav-item d-flex justify-content-center"
                    >
                      <Link
                        className={
                          pathname === link.path
                            ? "nav-link activo"
                            : "nav-link "
                        }
                        aria-current="page"
                        href={link.path}
                        onClick={link.onClick}
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
  );
};

export default Navigation;
