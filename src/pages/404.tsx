import Link from "next/link";

import "@/styles/css/styles.css";

export default function Custom404() {
  return (
    <>
      <section>
        <div className="generic_container">
          <h2>Error 404</h2>
          <p>Page not existe</p>
          <Link className="button-generic" href="/">
            Back Home
          </Link>
        </div>
      </section>
    </>
  );
}
