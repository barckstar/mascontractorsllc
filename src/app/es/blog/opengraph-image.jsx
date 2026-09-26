import { blogImage } from "@/views/og";

export const alt = "MAS Contractors — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return blogImage("es");
}
