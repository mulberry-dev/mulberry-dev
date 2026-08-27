import ProjectDetails from "@/components/sections/ProjectDetails"
import { data as projects } from "@/data/projects"
import { SITE_NAME, SITE_URL } from "@/data/site"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

type PageProps = {
  params: { id: string }
}

export function generateStaticParams() {
  return projects.map(project => ({ id: String(project.id) }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find(item => String(item.id) === params.id)

  if (!project) {
    return { title: "Project" }
  }

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `${SITE_URL}/portfolio/${project.id}`
    },
    openGraph: {
      title: `${project.name} | ${SITE_NAME}`,
      description: project.description,
      url: `${SITE_URL}/portfolio/${project.id}`,
      images: [{ url: project.img }]
    }
  }
}

const Page = ({ params }: PageProps) => {
  const exists = projects.some(item => String(item.id) === params.id)

  if (!exists) {
    notFound()
  }

  return <ProjectDetails id={params.id} />
}

export default Page
