import { JobListings } from "@/app/context/GlobalStateProvider";
import prisma from "@/db/prisma";
import redis from "@/db/redis";
import publishMessage from "@/lib/rabbitmq-publisher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: { email: string } = await req.json();
    const redisClient = await redis;
    let cachedJobListings = await redisClient.get(body.email);
    let jobListings: JobListings[];

    if (!cachedJobListings) {
      jobListings = await prisma.job_listing?.findMany({
        where: {
          email: body.email ?? null,
        },
      });

      await redisClient.set(body.email, JSON.stringify(jobListings));
    } else {
      jobListings = JSON.parse(cachedJobListings);
    }

    return NextResponse.json(jobListings);
  } catch (err) {
    console.error(err);
    return NextResponse.json([]);
  }
}
