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

  let user = await prisma.user.findUnique({ where: { email: body.email } });
  const otp = generateOtp();
  const token = jwt.sign({ otp }, "SIGNING-OTP", { expiresIn: "1d" });
  if (!user) {
    user = await prisma.user.create({
      data: {
        email: body.email,
        otp: token,
      },
    });
  } else {
    user = await prisma.user.update({
      where: {
        email: body.email,
      },
      data: {
        otp: token,
      },
    });
  }
  resend.emails.send({
    from: "noreply@resend.dev",
    to: body.email,
    subject: "Таны нэг удаагийн нэвтрэх код",
    html: `<p>Код: <strong>${otp}</strong>!</p>`,
  });
  return NextResponse.json({ message: "Succussfully send" });
};
