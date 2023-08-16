import React from "react";
import Image from "next/image";
import Info from "./info";
import Tracker from "./tracker";
/* import Tracker from "./tracker"; */

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div>{<Tracker />}</div>
        <div></div>
        <div>
          <Info />{" "}
        </div>
      </footer>
    </>
  );
};

export default Footer;
