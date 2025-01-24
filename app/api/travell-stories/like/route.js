import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { id } = req.body;

    const updatedStory = await prisma.travelStory.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    res.status(200).json(updatedStory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating likes' });
  }
}
