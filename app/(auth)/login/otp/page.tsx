"use client";
import { AuthFooter, AuthHeader } from "@/app/components/auth-layout";
import { SubmitButton, TextField } from "@/app/components/auth-form";
import { useState } from "react";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import { useUser } from "@/app/user-provider";
import { useRouter } from "next/navigation";

export default function OtpPage() {
  const router = useRouter();
  const { setAccessToken } = useUser();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      setError("Баталгаажуулах кодоо оруулна уу!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/otp", { email, otp });

      alert(res.data.message || "Амжилттай нэвтэрлэгдлээ!");
      setAccessToken(res.data.accessToken);
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Код буруу байна");
      } else {
        setError("Ямар нэгэн алдаа гарлаа. Дахин оролдоно уу.");
      }
    } finally {
      setLoading(false);
    }
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
          onChange={() => {}}
          value={email}
          error=""
        />
        <TextField
          id="otp"
          type="text"
          placeholder="Enter 4-digit OTP code"
          required
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              if (value < 9999) setOtp(value);
            }
          }}
          value={otp + ""}
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
