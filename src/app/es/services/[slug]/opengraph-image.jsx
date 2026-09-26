import { serviceImage } from "@/views/og";
export { generateStaticParams } from "@/views/service";

export const alt = "MAS Contractors";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image({ params }) {
    return serviceImage("es", params);
}
