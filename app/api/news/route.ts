import { getNachrichten, getSpartipps } from "@/lib/articles";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const typ = url.searchParams.get("typ"); // "news", "spartipps", oder alles

  let data;
  if (typ === "spartipps") {
    data = getSpartipps();
  } else if (typ === "news") {
    data = getNachrichten();
  } else {
    data = {
      nachrichten: getNachrichten(),
      spartipps: getSpartipps(),
    };
  }

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
