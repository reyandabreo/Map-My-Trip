import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { id } = await request.json();

    const updatedStory = await prisma.travelStory.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return new Response(JSON.stringify(updatedStory), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Error updating likes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}