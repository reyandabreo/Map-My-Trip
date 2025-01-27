import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const stories = await prisma.travelStory.findMany();
    return Response.json(stories, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Error fetching travel stories' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, location, date, experience, tips, category, rating, budget, duration, images } = body;
    const newStory = await prisma.travelStory.create({
      data: { name, location, date, experience, tips, category, rating, budget, duration, images },
    });
    return Response.json(newStory, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ message: 'Error creating travel story' }, { status: 500 });
  }
}
