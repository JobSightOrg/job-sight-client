import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db/prisma";

interface RequestBody {
  email: String;
  password: String;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { email, password } = body;
    console.log(body);

    if (!email || !password)
      return new NextResponse("Incorrect email or password", { status: 400 });

    const userExist = prisma.accounts.findUnique({
      where: {
        email,
      },
    });
  } catch (err) {
    console.error(err);
  }
}
