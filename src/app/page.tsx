import Link from "next/link";

const IndexPage = async () => {
  return (
    <>
      <section id="index">
        <div className="mainPage-container animate__animated animate__fadeInUp">
          <h1 className="color_title rainbow_bg"> Hi!, Iam Santiago</h1>
          <p className="full_stack_title">
            <span> &lt; </span>Full Stack Developer<span> /&gt; </span>
          </p>
          <p className="javascript_title">Java Script</p>
          <Link className="button-generic" href="/about">
            About
          </Link>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
