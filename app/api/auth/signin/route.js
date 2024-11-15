import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ message: 'Please provide both email and password' }, { status: 400 });
    }

    // Find the user in the database by email
    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // If successful, return a success message or token
    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }

}
