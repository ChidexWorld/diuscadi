// /app/api/upload/route.ts
import cloudinary from "@/config/cloundinary";
import { UploadApiErrorResponse } from "cloudinary";
import { UploadApiResponse } from "cloudinary";
import { NextResponse } from "next/server";

export const runtime = "edge" in globalThis ? "edge" : undefined; // ok to run in server

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // convert blob to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // upload using cloudinary.uploader.upload_stream
    const streamUpload = () =>
      new Promise<UploadApiResponse>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "speakers" },
          (
            error: UploadApiErrorResponse | undefined,
            result: UploadApiResponse | undefined
          ) => {
            if (error) {
              reject(error);
              return;
            }
            if (!result) {
              reject(new Error("No response from Cloudinary"));
              return;
            }
            resolve(result);
          }
        );

        stream.end(buffer);
      });

    const result = await streamUpload();

    return NextResponse.json({ url: result.secure_url });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Upload error", err);
      return NextResponse.json(
        { error: err.message || "Upload failed" },
        { status: 500 }
      );
    } else {
      console.error("Upload error", err);
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
