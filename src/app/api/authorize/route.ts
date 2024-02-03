import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    prisma.accounts;
  } catch (err) {
    console.error(err);
  }
}
