import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import CustomError from "@/lib/custom-error";

interface RequestBody {
  id: number;
  url: string;
  companyName: string;
  createdAt: Date;
  updatedAt: Date;
}

const isValidBody = (body: any, requestType: string): body is RequestBody => {
  switch (requestType) {
    case "post":
      return (
        (body as RequestBody).url !== undefined &&
        (body as RequestBody).companyName !== undefined
      );
    case "patch":
      return (
        (body as RequestBody).id !== undefined &&
        (body as RequestBody).url !== undefined &&
        (body as RequestBody).companyName !== undefined
      );
    case "delete":
      return (body as RequestBody).id !== undefined;
    default:
      return false;
  }
};

export async function GET() {
  try {
    const jobListings = await prisma.job_listing?.findMany();
    return NextResponse.json(jobListings ?? []);
  } catch (err) {
    console.error("Failed GET /api/listing\n", err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidBody(body, "post")) throw new CustomError("Invalid Body", 400);

    await prisma.job_listing?.create({ data: body });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed POST /api/listing\n", err);

    if (err instanceof CustomError)
      return NextResponse.json({ status: err.statusCode || 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidBody(body, "patch")) throw new CustomError("Invalid Body", 400);

    const { id, companyName, url } = body;

    await prisma.job_listing?.update({
      where: { id },
      data: { companyName, url },
    });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed PATCH /api/listing\n", err);

    if (err instanceof CustomError)
      return NextResponse.json({ status: err.statusCode || 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidBody(body, "delete"))
      throw new CustomError("Invalid Body", 400);

    await prisma.job_listing?.delete({ where: body });
    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed DELETE /api/listing\n", err);

    if (err instanceof CustomError)
      return NextResponse.json({ status: err.statusCode || 500 });
  }
}
