import { NextResponse } from "next/server";
import { getSessionToken, laravelFetch } from "@/lib/auth";

export async function GET() {
  try {
    const token = await getSessionToken();

    if (!token) {
      return NextResponse.json({ message: "Unauthenticated." }, { status: 401 });
    }

    const { response, data } = await laravelFetch("/customer/profile", { token });
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch user." },
      { status: 500 }
    );
  }
}
