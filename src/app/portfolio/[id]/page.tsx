"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { data as projects } from "@/data/projects"
import { Tooltip } from "antd"

const ProjectDetails = ({ params }: any) => {
  const project = projects.find((project) => project.id == params.id)

  useEffect(() => {
    document.title = `${project?.name}  | ThisIsSanti.dev`

    document.body.classList.add('portfolio');
  
    return () => {
      document.body.classList.remove('portfolio');
    };
  }, [project?.name])

  const loaded = (img: any) => {
    const previewImage = document.getElementById("loader")
    previewImage?.classList.add("display-none")
    img.currentTarget.classList.remove("display-none")
    img.currentTarget.classList.remove("opacity-0")
  }

  return (
    <section id='portfolio'>
      <div className='main-container animate__animated animate__fadeIn'>
        <h2>{project?.name}</h2>
        <div className='project-detail-container'>
          <div className='project-row'>
            {
              <Image
                src={`/images/svg-loaders/grid.svg`}
                alt='loader'
                width={300}
                height={250}
                id={"loader"}
                style={{
                  position: "absolute",
                  opacity: ".5",
                  transform: "scale(.6)",
                  marginBottom: "140px"
                }}
              />
            }
            <Image
              className='project-thumbnail transition-opacity duration-2s opacity-0'
              onLoad={(image) => loaded(image)}
              src={`${project?.img}`}
              alt={`${project?.name}-img`}
              placeholder={"blur"}
              blurDataURL={"data:image/webp..."}
              priority={true}
              quality={100}
              width={project?.width || 300}
              height={project?.height || 250}
              id={"previewProject"}
            />
            <h3>Technology stack:</h3>
            <div className='tech_container'>
              {project?.tech.map((e, index) => (
                <Tooltip
                  key={`${index}-key`}
                  title={e?.tech}
                  placement='bottom'
                  trigger='hover'
                >
                  <Image
                    src={e?.icon}
                    width={40}
                    height={40}
                    className='tech_ico'
                    style={{ objectFit: "contain" }}
                    alt='thumbnail'
                  />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className='project-row'>
            <div className='project-card'>
              <div className='tech-box'>
                <h3>Description:</h3>
                <p>{project?.description}</p>

                <div className='buttons_container'>
                  <Link className='button smallest' href={"/portfolio"}>
                    <Image
                      src='/images/Icons/arrow-right-rounded.svg'
                      alt='go-back'
                      className='go_back'
                      width={40}
                      height={40}
                      title='Go back'
                    />
                  </Link>
                  {project?.url === null ? (
                    <div
                      className='button-generic'
                      title={`Private deployment`}
                    >
                      Private deployment
                    </div>
                  ) : (
                    <Link
                      className='button-generic'
                      href={`${project?.url}`}
                      title={`Go to ${project?.name} site`}
                    >
                      Visit
                    </Link>
                  )}
                  {/* Boton de al repocitorio de Github */}
                  {/* {project?.github === undefined ? undefined : (
                    <Link
                      href={`${project?.github}`}
                      title={`Go to ${project?.name} Github`}
                    >
                      <Image
                        src='/images/Icons/github.svg'
                        alt='go-back'
                        className='github-icon'
                        width={35}
                        height={35}
                        title={`Go to Github ${project?.name} repository`}
                      />
                    </Link>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetails
