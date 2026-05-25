"use client";
import React, { useState } from "react";
import { TextField } from "../components/TextFieldd";
import Link from "next/link";
import { StepProps } from "./page";

export const Firststep = ({
  handleNextStep,
  form,
  setForm,
  error,
  setError,
}: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isEmailValid = (email: string) => {
    if (email === "") return "И-мэйлээ оруулна уу!";
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      return "И-мэйл буруу форматтай байна.";
    return "";
  };
  const isPasswordValid = (password: string) => {
    if (password === "") return "Нууц үгээ оруулна уу!";
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
    ) {
      const errors = [];
      if (password.length < 8) errors.push("•8 тэмдэгт байх ёстой.");
      if (!/[A-Z]/.test(password)) errors.push("•1 том үсэг агуулах ёстой.");
      if (!/[a-z]/.test(password))
        errors.push("•1 жижиг үсэн агуулагдах ёстой.");
      if (!/[0-9]/.test(password)) errors.push("•1 тоо агуулах ёстой.");
      if (!/[!@#$%^&*]/.test(password))
        errors.push("•1 тусгай тэмдэгт агуулах ёстой.");
      const PassErr =
        "Нууц үг нь дараах шаардлагуудыг хангасан байх ёстой. \n " +
        errors.join("\n");
      return PassErr;
    }
    return "";
  };
  const errorStep = () => {
    const hasPasswordError = isPasswordValid(form.password) !== "";
    const hasEmailError = isEmailValid(form.email) !== "";

    return hasPasswordError || hasEmailError;
  };
  return (
    <div className=" container ">
      <div className=" flex items-center gap-10">
        <div className="w-104 space-y-6">
          <Link
            href="/"
            className="w-9 h-[36px] border border-[#E4E4E7] rounded-md flex justify-center items-center"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <ul>
            <h1 className="text-[26px] font-semibold">Log in </h1>
            <p className="text-[18px] text-[#71717A] font">
              Log in to enjoy your favorite dishes.
            </p>
          </ul>
          <TextField
            id="email"
            value={form.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, email: e.target.value });
              setError({ ...error, email: isEmailValid(e.target.value) });
            }}
            placeholder="Enter your email address"
            type="email"
            error={error.email}
            required={true}
          />
          <TextField
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={form.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({ ...form, password: e.target.value });
              setError({
                ...error,
                password: isPasswordValid(e.target.value),
              });
            }}
            error={error.password}
            required={true}
          />
          <li className="">Forgot password</li>
          <button
            disabled={errorStep()}
            onClick={handleNextStep}
            type="button"
            className="w-full rounded-md  bg-[#50c878] h-[36px] text-white disabled:opacity-50"
          >
            Let&apos;s Go
          </button>
          <p className="text-[#71717A] text-[16px] text-center">
            Already have an account?{" "}
            <span className="text-[#50c878]">Log in</span>
          </p>
        </div>
        <div className="">
          <img src="/image.png" alt="poster" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};
