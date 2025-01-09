import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ min: 1, max: 100 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
