import Link from "next/link";

const IndexPage = async () => {
  return (
    <>
      <section id="index">
        <div className="colorTitle ">
          <h2 className="rainbow_bg animate__animated animate__fadeInUp">
            Hi!, Iam Santiago{" "}
          </h2>
        </div>
        <h1 className="animate__animated animate__fadeInUp">
          <span> &lt; </span>Full-stack developer<span> /&gt; </span>
        </h1>
        <p className="JS-title animate__animated animate__fadeInUp">
          Java Script
        </p>

        <Link
          className="button-generic animate__animated animate__fadeInUp"
          href="/about"
        >
          About
        </Link>
      </section>
    </>
  );
};

export default IndexPage;
