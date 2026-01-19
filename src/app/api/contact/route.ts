import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity.client";

const requiredEnv = ["SANITY_WRITE_TOKEN", "NEXT_PUBLIC_SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_DATASET"];

export async function POST(request: Request) {
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing environment variables: ${missing.join(", ")}` },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  try {
    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      status: "new"
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contactSubmission]", error);
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 });
  }
}
