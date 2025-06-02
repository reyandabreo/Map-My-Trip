import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all trips
export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      include: { activities: true },
    });
    return NextResponse.json(trips, { status: 200 });
  } catch (error) {
    alert(error);
    return NextResponse.json({ error: 'Error fetching trips' }, { status: 500 });
  }
}

// POST - Create a new trip
export async function POST(req) {
  try {
    const { name, startDate, endDate, destination, travelers, tripStyle, budget } = await req.json();
    const newTrip = await prisma.trip.create({
      data: { name, startDate, endDate, destination, travelers, tripStyle, budget },
    });
    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    alert(error);
    return NextResponse.json({ error: 'Error creating trip' }, { status: 500 });
  }
}

// DELETE - Delete a trip by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await prisma.trip.delete({ where: { id } });
    return NextResponse.json({ message: 'Trip deleted successfully' }, { status: 200 });
  } catch (error) {
    alert(error);
    return NextResponse.json({ error: 'Error deleting trip' }, { status: 500 });
  }
}
