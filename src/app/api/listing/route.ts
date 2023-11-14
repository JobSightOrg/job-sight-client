import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
  try {
    const jobListings = await prisma.jobListing?.findMany();
    return NextResponse.json(jobListings ?? []);
  } catch (err) {
    console.error("Failed GET /api/listing\n", err);
    return NextResponse.json([]);
  }
}

export async function POST() {}
