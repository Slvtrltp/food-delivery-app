import Link from "next/link";
import { AuthFooter, AuthHeader } from "../../components/auth-layout";
import {
  PasswordField,
  SubmitButton,
  TextField,
} from "../../components/auth-form";

export const metadata = {
  title: "Log in — NomNom",
};

export default function LoginPage() {
  return (
    <>
      <AuthHeader
        title="Welcome back"
        subtitle="Log in to keep ordering your favorite dishes."
      />

      <form
        className="flex flex-col gap-4"
        action="/api/auth/login"
        method="post"
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="email"
          required
        />
        <PasswordField
          id="password"
          label="Password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-sm text-[#2563eb] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <SubmitButton>{"Let's Go"}</SubmitButton>
      </form>

      <AuthFooter
        prompt="Don't have an account?"
        linkText="Sign up"
        linkHref="/signup"
      />
    </>
  );
}
