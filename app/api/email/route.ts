import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log(process.env.CONTACT_EMAIL);
    return NextResponse.json({ email: process.env.CONTACT_EMAIL });
}