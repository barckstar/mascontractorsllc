import { NextResponse } from "next/server";
import { writeReviewUrl } from "@/lib/googleReviews";

// mascontractors.com/review → Google's "write a review" box.
// This is the link for the QR card and the text sent when a job is handed over:
// short, on our own domain, and it keeps working if the Place ID ever changes.
export function GET() {
    return NextResponse.redirect(writeReviewUrl(), 307);
}
