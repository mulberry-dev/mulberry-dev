import Image from "next/image";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <section id="contacto">
        <div className="contact_container animate__animated animate__fadeIn">
          <div>{""}</div>
          <Link
            href="https://www.linkedin.com/in/santidev/"
            className="transition"
            target="_black"
          >
            <Image
              src="/images/Icons/tech/LinkedIn.webp"
              alt="Linkedin"
              priority={true}
              width={70}
              height={70}
              className="linkedin animate__animated animate__tada"
              title="Linkedin"
            />
          </Link>

          <div className="buttons_container">
            <Link className="button smallest" href={"/portfolio"}>
              <Image
                src="/images/Icons/arrow-right-rounded.svg"
                alt="go-back"
                className="go_back"
                width={40}
                height={40}
                title="Back portfolio"
              />
            </Link>
            <Link href="/" className="button-generic transition">
              Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
