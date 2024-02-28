import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { email: string } = await req.json();

    const jobListings = await prisma.job_listing?.findMany({
      where: {
        email: body.email ?? null,
      },
    });
    console.log("here", body.email);

    return NextResponse.json(jobListings);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}
