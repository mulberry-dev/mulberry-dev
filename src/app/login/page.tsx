"use client";

/* import { mostrarContrasena } from "@/app/utils/alerts"; */
import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notifyWarn, notifySuccess } from "../utils/toast";

const LoginPage = ({ onLogin }: any) => {
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const onChange = () => {
    setShowPass(true);
  };

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: body.get("email"),
      password: body.get("password"),

      redirect: false,
    });

    if (res?.error) return notifyWarn(res.error as string);

    if (res?.ok) {
      notifySuccess("Login Success");
      return router.push("/dashboard/profile");
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn z-3 position-absolute p-5 rounded-3">
        <form onSubmit={handdleSubmit}>
          <h2>Login</h2>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/8043/8043665.png"
            className="arrow"
            width={100}
            height={100}
            alt={"Image"}
          />
          <input className="m-1" placeholder="Email" name="email" required />
          <div className="password-row">
            <input
              placeholder="Password"
              name="password"
              className="m-1"
              required
              type={showPass ? "text" : "password"}
              id="password"
            />
            <button className="btn" type="button" onClick={() => onChange}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/6642/6642206.png"
                className="eye"
                width={25}
                height={25}
                alt="eye"
              />{" "}
            </button>
          </div>
          <button className="button-generic m-2" type="submit">
            Log In
          </button>
          {error && <div className=" text-white p-2 ">{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
