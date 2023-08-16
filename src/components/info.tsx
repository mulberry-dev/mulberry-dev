import { alertInfo } from "@/utils/alerts";
import Image from "next/image";

const Info = () => {
  return (
    <>
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/1040/1040263.png"}
        alt={"info"}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
        className="info_icon"
        title="Site info"
        onClick={() => alertInfo("info")}
      ></Image>
    </>
  );
};

export default Info;
