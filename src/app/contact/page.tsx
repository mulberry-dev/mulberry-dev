import Image from "next/image";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <section id="contacto">
        <div className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn z-3  p-5 rounded-3">
          <Link
            href="https://www.linkedin.com/in/santidev/"
            className="link-top"
            target="_black"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/512/1384/1384072.png"
              alt="Linkedin logo animate__animated animate__rubberBand"
              width={50}
              height={50}
              title="Linkedin"
            />
          </Link>

          <Link href="/" className="button-generic back-home">
            🔙 Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;
