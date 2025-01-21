import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// ✅ Handle POST request to create a review
export async function POST(req) {
  try {
    const { name, review, date, time, images } = await req.json();

    const newReview = await prisma.review.create({
      data: { name, review, date, time, images },
    });

    return NextResponse.json(newReview, { status: 200 });
  } catch (error) {
    console.error('Error saving review:', error);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

// ✅ Handle GET request to fetch reviews
export async function GET() {
  try {
    const reviews = await prisma.review.findMany();
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
