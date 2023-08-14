"use client";

import axios, { AxiosError } from "axios";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = ({ onLogin }: any) => {
  const [error, setError] = useState();
  const [showPass, setShowPass] = useState(true);
  const router = useRouter();

  const notify = (message: string) =>
    toast.warn(`${message}`, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const onChange = () => {
    setShowPass(false);
  };

  const handdleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const signupResponse = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullName: formData.get("fullName"),
      });

      const res = await signIn("credentials", {
        email: signupResponse.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/dashboard/profile");
    } catch (error) {
      if (error instanceof AxiosError) {
        /* setError(error.response?.data.message); */
        notify(error.response?.data.message);
      }
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-center align-items-center animate__animated animate__fadeIn z-3 position-absolute p-5 rounded-3">
        <form onSubmit={handdleSubmit}>
          <h2>Sign Up</h2>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6799/6799093.png"
            className="arrow"
            alt="image"
            width={100}
            height={100}
          />

          <input className="m-1" placeholder="Name" name="fullName" required />
          <input
            className="m-1"
            placeholder="Email"
            name="email"
            required
            type="email"
          />

          <div className="password-row">
            <input
              placeholder="Password"
              name="password"
              required
              type={!showPass ? "text" : "password"}
              id="password"
              className="m-1"
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
            Sign Up
          </button>
        </form>
        {/*  {error && <div className=" text-white p-2 ">{error}</div>} */}
      </div>
      <ToastContainer />
    </section>
  );
};

export default SignUpForm;
