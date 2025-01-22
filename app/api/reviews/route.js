import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST request (Save review)
export async function POST(req) {
  try {
    const body = await req.json(); //Parse JSON body
    console.log('Received data:', body); // Debug log

    const { name, review, date, time, images } = body;

    if (!name || !review) {
      return Response.json({ error: 'Name and review are required' }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: { name, review, date, time, images },
    });

    return Response.json(newReview, { status: 200 });
  } catch (error) {
    console.error('Error saving review:', error);
    return Response.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

// GET request (Fetch all reviews)
export async function GET() {
  try {
    const reviews = await prisma.review.findMany();
    return Response.json(reviews, { status: 200 });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return Response.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
