import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
     
    const body = await req.json();
    console.log("📌 Received Data:", body);

    const { name, location, experience, tips, category, rating, budget, duration, images } = body;

    const locationStr = typeof location === 'object' && location.href ? location.href : location;

    const newStory = await prisma.travelStory.create({
      data: {
        name,
        location: locationStr,
        experience,
        tips,
        category,
        rating,
        budget,
        duration,
        images,
      },
    });

    return NextResponse.json({ message: 'Travel story created successfully!', story: newStory }, { status: 201 });
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json({ message: 'Error creating travel story', error: error.message }, { status: 500 });
  }
}
