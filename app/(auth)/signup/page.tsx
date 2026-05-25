import { AuthFooter, AuthHeader } from "@/app/components/auth-layout";
import {
  PasswordField,
  SubmitButton,
  TextField,
} from "@/app/components/auth-form";

export const metadata = {
  title: "Sign up — NomNom",
};

export default function SignupPage() {
  return (
    <>
      <AuthHeader
        title="Create your account"
        subtitle="Sign up to explore your favorite dishes"
      />
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
        autoComplete="new-password"
        placeholder="Password"
      />
      <PasswordField
        id="confirm"
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Confirm password"
      />
      <SubmitButton>{"Let's Go"}</SubmitButton>
      <AuthFooter
        prompt="Already have an account?"
        linkHref="/login"
        linkText="log in"
      />
    </>
  );
}
