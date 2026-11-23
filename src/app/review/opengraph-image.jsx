import { reviewImage } from "@/views/og";

export const alt = "MAS Contractors — Leave us a review";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return reviewImage();
}
