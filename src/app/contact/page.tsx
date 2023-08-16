import Image from "next/image";
import Link from "next/link";

const Contact = () => {
  return (
    <>
      <section id="contacto">
        <div className="contact_container animate__animated animate__fadeIn">
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
              className="animate__animated animate__jackInTheBox"
              title="Linkedin"
            />
          </Link>

          <div className="buttons_container  back-home">
            <Link className="button smallest " href={"/portfolio"}>
              <Image
                src="https://cdn.shopify.com/s/files/1/0343/2824/8459/files/arrow-right-rounded.svg"
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
