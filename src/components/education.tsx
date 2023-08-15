/* import Image from "next/image";
import Link from "next/link";

const certificates = [
  {
    id: 1,
    url: "https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png",
  },
  {
    id: 2,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 3,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
  {
    id: 4,
    url: "https://i.ibb.co/4jPJSMd/carrera-De-Desarrollo-Full-Stack-INGTop10.png",
  },
  {
    id: 5,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 6,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
  {
    id: 7,
    url: "https://i.ibb.co/zN2mLnJ/carrera-Desarrollo-Front-End-ing.png",
  },
  {
    id: 8,
    url: "https://i.ibb.co/GtXjbtc/636bccb78ae889000efd915d-ing.png",
  },
];

function EducationModule() {
  return (
    <>
      <section id="education">
        <h2>Certificates</h2>
        <div className="certificates-container animate__animated animate__fadeIn">
          {certificates.map((e) => (
            <div key={e.id} className="certificate-item">
              <Image src={e.url} height={200} width={300} alt={`alt-${e.id}`} />
            </div>
          ))}
        </div>
        <Link className="button-generic education" href="/skills">
          Skills
        </Link>
      </section>
    </>
  );
}

export default EducationModule; */
