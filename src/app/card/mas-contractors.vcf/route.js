import { readFile } from "node:fs/promises";
import { join } from "node:path";
import business from "@/content/business.json";

// "Save contact" on /card. Built once at build time; phones open a .vcf
// straight into "New contact" with the logo, phone, email and address filled.
export const dynamic = "force-static";

// vCard lines must be ≤75 octets; longer ones continue on a line starting with a space.
const fold = (line) => line.match(/.{1,74}/g).join("\r\n ");
const esc = (s) => s.replace(/[\\,;]/g, (c) => `\\${c}`);

export async function GET() {
    const photo = await readFile(join(process.cwd(), "src/views/og-assets/avatar.jpg"));
    const a = business.address;
    const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:;;;;",
        `FN:${esc(business.name)}`,
        `ORG:${esc(business.name)}`,
        "X-ABShowAs:COMPANY",
        "TITLE:Class A General Contractor",
        `TEL;TYPE=WORK,VOICE,pref:${business.phone}`,
        `EMAIL;TYPE=INTERNET,WORK:${business.email}`,
        `ADR;TYPE=WORK:;${esc(a.extended)};${esc(a.street)};${esc(a.city)};${a.region};${a.postalCode};${a.country}`,
        `URL:${business.website}`,
        ...business.social.map((s) => `X-SOCIALPROFILE;TYPE=${s.name.toLowerCase()}:${s.url}`),
        `NOTE:${esc("Kitchens, bathrooms, additions, roofing, siding, windows, decks and commercial construction in Richmond, VA. Free estimates.")}`,
        `PHOTO;ENCODING=b;TYPE=JPEG:${photo.toString("base64")}`,
        "END:VCARD",
    ];

    return new Response(lines.map(fold).join("\r\n") + "\r\n", {
        headers: {
            "Content-Type": "text/vcard; charset=utf-8",
            "Content-Disposition": 'attachment; filename="MAS Contractors.vcf"',
        },
    });
}
