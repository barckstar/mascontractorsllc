import { pageImage } from "@/views/og";

const og = pageImage("es", "about");
export const alt = og.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default og.Image;
