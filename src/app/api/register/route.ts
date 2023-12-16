import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/db/prisma";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { name, email, password } = body;

    const userExist = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (userExist)
      return new NextResponse("Email already registered.", {
        headers: {
          "Content-Type": "text/plain",
        },
        status: 400,
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
  }
}
