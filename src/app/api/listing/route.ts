import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

interface RequestBody {
  url: string;
  companyName: string;
}

const isValidBody = (body: any): body is RequestBody =>
  (body as RequestBody).url !== undefined &&
  (body as RequestBody).companyName !== undefined;

export async function GET() {
  try {
    const jobListings = await prisma.jobListing?.findMany();
    return NextResponse.json(jobListings ?? []);
  } catch (err) {
    console.error("Failed GET /api/listing\n", err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidBody(body)) throw new Error("Invalid Body");

    await prisma.jobListing?.create({ data: body });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed POST /api/listing\n", err);
    return NextResponse.json({ status: 400 });
  }
}
