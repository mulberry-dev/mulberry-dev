"use client";

import { notifyInfo, notifyWarn } from "@/utils/toast";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPage = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();

  const onChange = () => {
    setShowPass(!showPass);
  };

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    notifyInfo("Loading... ⏳");
    e.preventDefault();
    const body = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: body.get("email"),
      password: body.get("password"),

      redirect: false,
    });

    if (res?.error) return notifyWarn(res.error as string);

    if (res?.ok) {
      return router.push("/dashboard/profile");
    }
  };

  return (
    <section>
      <div className="generic_container  animate__animated animate__fadeIn">
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
            <div onClick={onChange}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/6642/6642206.png"
                className="eye"
                width={25}
                height={25}
                alt="eye"
                onClick={() => onChange}
              />
            </div>
          </div>
          <button className="button-generic m-2" type="submit">
            Log In
          </button>
        </form>
        <div className="register_link_container">
          <p>Don´t you have an account yet? </p>
          <Link className="register_link" href={"/signup"}>
            Signup
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
