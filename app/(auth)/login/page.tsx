"use client";
import { AuthFooter, AuthHeader } from "@/app/components/auth-layout";
import { SubmitButton, TextField } from "@/app/components/auth-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isEmailValid = (email: string) => {
    if (email === "") return "И-мэйлээ оруулна уу!";
    if (!regex.test(email)) {
      return "И-мэйл буруу форматтай байна.";
    }
    return "";
  };
  const handleSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const emailError = isEmailValid(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    setError("");
    setLoading(true);
    axios
      .post("/api/auth", { email })
      .then((res) => {
        setLoading(false);
        alert(res.data.message);
        router.push(`/login/otp?email=${email}`);
      })
      .catch(({ response }) => {
        alert(response.message);
      });
  };
  return (
    <>
      <AuthHeader
        title="Create your account"
        subtitle="Sign up to explore your favorite dishes"
      />
      <form className=" space-y-4" onSubmit={handleSubmitForm}>
        <TextField
          id="email"
          type="email"
          placeholder="Enter your email address"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          error={error}
        />

        <SubmitButton loading={loading}>{"Let's Go"}</SubmitButton>
      </form>
      <AuthFooter
        prompt="Already have an account?"
        linkHref="/login"
        linkText="log in"
      />
    </>
  );
}
