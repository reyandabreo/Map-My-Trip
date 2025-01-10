import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"; // For generating unique tokens
import sendEmail from "@/lib/email"; // Your email utility function

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("Email to send reset link:", email);

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Generate a unique reset token and expiration time
    const resetToken = uuidv4();
    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 1); // Token valid for 1 hour

    // Save the token and expiration time in the database
    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: tokenExpires,
      },
    });

    // Send the reset token via email
    const resetUrl = `${process.env.BASE_URL}/user-auth/ResetPassword?token=${resetToken}`;
    console.log("Reset URL:", resetUrl);

    await sendEmail(
      email,
      "Password Reset Request",
      `<p>Hi ${user.name},</p>
       <p>You requested to reset your password. Click the link below:</p>
       <a href="${resetUrl}">Reset Password</a>
       <p>If you didn't request this, you can ignore this email.</p>`
    );

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
