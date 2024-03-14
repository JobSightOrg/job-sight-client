import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";
import CustomError from "@/lib/custom-error";
import { JobListings } from "@/app/context/GlobalStateProvider";
import { getServerSession } from "next-auth";
import redis from "@/db/redis";

interface RequestBody {
  id: number;
  email: string;
  url: string;
  companyName: string;
  applicationStatus: string;
  jobType: string;
  location: string;
  positionTitle: string;
  createdAt: Date;
  updatedAt: Date;
}

const isValidBody = (body: any, requestType: string): body is RequestBody => {
  switch (requestType) {
    case "post":
      return (
        (body as RequestBody).url !== undefined &&
        (body as RequestBody).email !== undefined &&
        (body as RequestBody).companyName !== undefined &&
        (body as RequestBody).applicationStatus !== undefined &&
        (body as RequestBody).jobType !== undefined
      );
    case "patch":
      return (
        (body as RequestBody).id !== undefined &&
        (body as RequestBody).url !== undefined
      );
    case "delete":
      return (body as RequestBody).id !== undefined;
    default:
      return false;
  }
};

const invalidateCache = async () => {
  const redisClient = await redis;
  const session = await getServerSession();

  await redisClient.del(session?.user?.email as string);
};

export async function GET() {
  try {
    const session = await getServerSession();
    const redisClient = await redis;
    const userEmail = session?.user?.email;
    const cachedJobListings = userEmail && (await redisClient.get(userEmail));

    let jobListings: JobListings[];

    if (!cachedJobListings) {
      jobListings = await prisma.job_listing?.findMany({
        where: {
          email: (userEmail as string) ?? null,
        },
      });

      await redisClient.set(userEmail as string, JSON.stringify(jobListings));
    } else {
      jobListings = JSON.parse(cachedJobListings);
    }

    return NextResponse.json(jobListings);
  } catch (err) {
    console.error("Failed GET /api/listings\n", err);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!isValidBody(body, "post")) throw new CustomError("Invalid Body", 400);

    await prisma.job_listing?.create({ data: body });
    await invalidateCache();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed POST /api/listings\n", err);

    if (err instanceof CustomError)
      return NextResponse.json({ status: err.statusCode });

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const redisClient = await redis;

    if (!isValidBody(body, "patch")) throw new CustomError("Invalid Body", 400);

    const { id, companyName, url } = body;

    await prisma.job_listing?.update({
      where: { id },
      data: { companyName, url },
    });
    await invalidateCache();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed PATCH /api/listings\n", err);

    if (err instanceof CustomError)
      return NextResponse.json({ status: err.statusCode });

    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    if (!isValidBody(body, "delete"))
      throw new CustomError("Invalid Body", 400);

    await prisma.job_listing?.delete({ where: body });
    await invalidateCache();

    return NextResponse.json({ status: 200 });
  } catch (err) {
    console.error("Failed DELETE /api/listings\n", err);

    if (err instanceof CustomError)
      return NextResponse.json({ status: err.statusCode || 500 });

    return new NextResponse("Internal Error", { status: 500 });
  }
}
