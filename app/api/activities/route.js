import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET all activities for a trip
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('tripId');

  if (!tripId) {
    return NextResponse.json({ error: 'Trip ID is required' }, { status: 400 });
  }

  const activities = await prisma.activity.findMany({ where: { tripId } });
  return NextResponse.json(activities, { status: 200 });
}

// POST - Add an activity to a trip
export async function POST(req) {
  const { name, time, location, tripId } = await req.json();
  const newActivity = await prisma.activity.create({
    data: { name, time, location, tripId },
  });
  return NextResponse.json(newActivity, { status: 201 });
}