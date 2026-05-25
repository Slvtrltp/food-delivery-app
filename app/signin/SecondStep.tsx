import React, { FormEvent, useContext, useEffect, useState } from "react";
import { TextField } from "../components/TextFieldd";
import { StepProps } from "./page";
import Link from "next/link";
import { useRouter } from "next/router";

export const SecondStep = ({
  handlePrevStep,
  form,
  error,
  setForm,
  setError,
}: StepProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
  const isConfirmPasswordValid = (confirmPassword: string) => {
    if (confirmPassword !== form.password) return "Нууц үг таарахгүй байна.";
    if (confirmPassword === "") return "Нууц үгээ оруулна уу!";
    return "";
  };

  const errorStep = () => {
    const hasPasswordError = isPasswordValid(form.password) !== "";
    const hasConfirmError = isConfirmPasswordValid(form.confirmPassword) !== "";

    return hasPasswordError || hasConfirmError;
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
  }
  return (
    <div className=" container ">
      <form onSubmit={handleSubmit} className=" flex items-center mt-20 gap-10">
        <div className="w-104 space-y-6">
          <button
            type="submit"
            onClick={handlePrevStep}
            className="w-9 h-9 border border-[#E4E4E7] rounded-md flex justify-center items-center"
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
          </button>
          <ul>
            <h1 className="text-[24px] font-semibold">
              Create a strong password
            </h1>
            <p className="text-[16px] text-[#71717A] font-normal">
              Create a strong password with letters, numbers.
            </p>
          </ul>
          <div className="space-y-4">
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
            <TextField
              placeholder="Confirm"
              type={showPassword ? "text" : "password"}
              id="password"
              error={error.confirmPassword}
              required={true}
              value={form.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setForm({ ...form, confirmPassword: e.target.value });
                setError({
                  ...error,
                  confirmPassword: isConfirmPasswordValid(e.target.value),
                });
              }}
            />
            <ul className="flex items-center gap-1">
              <input
                type="checkbox"
                className="outline-0 border border-[#848485] opacity-50"
                checked={showPassword}
                onChange={() => {
                  setShowPassword((prev) => !prev);
                }}
              ></input>
              <p className="text-[#848485] text-[14px] ">Show password</p>
            </ul>
          </div>
          <Link href="/">
            <button
              type="button"
              className="w-full rounded-md  bg-[#50c878] h-9 text-white disabled:opacity-50"
              disabled={errorStep()}
              onClick={handlePrevStep}
            >
              Let&apos;s Go
            </button>
          </Link>
          <p className="text-[#71717A] text-[16px] text-center">
            Already have an account?{" "}
            <span className="text-[#50c878]">Log in</span>
          </p>
        </div>
        <div className="">
          <img src="/image.png" alt="poster" className="rounded-lg" />
        </div>
      </form>
    </div>
  );
};
