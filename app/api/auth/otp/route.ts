import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

resend.emails.send({
  from: "onboarding@resend.dev",
  to: "gnomin200408@gmail.com",
  subject: "Hello World",
  html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
});
const generateOtp = () => {
  return Math.floor(Math.random() * 9000) + 1000;
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(body.email)) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }
  if (!body.otp) {
    return NextResponse.json({ message: "OTP is required" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { email: body.email } });
  const otpRegex = /\d{4}/;
  if (!regex.test(body.otp)) {
    return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
  }
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }
  try {
    const payload = jwt.verify(user.otp!, "SIGNING-OTP") as { otp: string };
    if (payload.otp !== body.otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ message: "OTP Expired" }, { status: 404 });
  }
  const accessToken = jwt.sign(user, "My-JWT-Secret", { expiresIn: "1d" });
  return NextResponse.json({ message: "Succuss!", accessToken });
};
