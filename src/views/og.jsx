import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionary } from "@/i18n/dictionaries";
import { getServiceBySlug, getPostBySlug } from "@/content";

// The picture WhatsApp, Facebook, LinkedIn and iMessage show when someone
// shares a link. One per page and language, drawn at build time.
//
// Why not a project photo: the old og:image was /img-1.jpg, a 3.6 MB
// 7621×5083 JPEG declared as 1200×630. WhatsApp gives up on anything over
// ~300 KB, so shares arrived with no picture at all. A flat card with the
// brand and the page title stays ~60 KB and reads at thumbnail size.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ASSETS = join(process.cwd(), "src/views/og-assets");
const GREEN = "#9fe300";

let assets;
function loadAssets() {
    assets ??= Promise.all([
        readFile(join(ASSETS, "Sora-400.woff")),
        readFile(join(ASSETS, "Sora-700.woff")),
        readFile(join(ASSETS, "Conthrax-SemiBold.otf")),
        readFile(join(ASSETS, "logo.png")),
    ]).then(([sora400, sora700, conthrax, logo]) => ({
        fonts: [
            { name: "Sora", data: sora400, weight: 400, style: "normal" },
            { name: "Sora", data: sora700, weight: 700, style: "normal" },
            { name: "Conthrax", data: conthrax, weight: 600, style: "normal" },
        ],
        logo: `data:image/png;base64,${logo.toString("base64")}`,
    }));
    return assets;
}

function titleSize(title) {
    if (title.length <= 32) return 76;
    if (title.length <= 60) return 62;
    return 50;
}

async function card({ lang, eyebrow, title }) {
    const { fonts, logo } = await loadAssets();
    const og = getDictionary(lang).meta.og;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "64px 72px 56px",
                    background: "radial-gradient(circle at 88% 12%, rgba(159,227,0,0.18), rgba(30,30,30,0) 55%), #1e1e1e",
                    borderLeft: `14px solid ${GREEN}`,
                    fontFamily: "Sora",
                    color: "white",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img src={logo} width={450} height={80} style={{ objectFit: "contain", objectPosition: "left" }} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontFamily: "Conthrax",
                            fontSize: 24,
                            letterSpacing: 5,
                            textTransform: "uppercase",
                            color: GREEN,
                            marginBottom: 22,
                        }}
                    >
                        {eyebrow}
                    </div>
                    <div style={{ display: "flex", fontSize: titleSize(title), fontWeight: 700, lineHeight: 1.12, maxWidth: 1000 }}>
                        {title}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        paddingTop: 26,
                        borderTop: "2px solid rgba(255,255,255,0.12)",
                        fontSize: 21,
                        whiteSpace: "nowrap",
                        color: "#b5b5b5",
                    }}
                >
                    <span style={{ color: "white", fontWeight: 700 }}>mascontractors.com</span>
                    <span style={{ color: GREEN }}>•</span>
                    <span>(804) 833-4600</span>
                    <span style={{ color: GREEN }}>•</span>
                    <span>{og.licensed}</span>
                    <span style={{ color: GREEN }}>•</span>
                    <span>{og.estimates}</span>
                </div>
            </div>
        ),
        { ...size, fonts },
    );
}

// Static pages: eyebrow and headline come from meta.og in the dictionary.
export function pageImage(lang, key) {
    const og = getDictionary(lang).meta.og;
    const EYEBROW = { home: og.tagline, services: og.servicesEyebrow, blog: og.blogEyebrow, card: og.cardEyebrow };
    const TITLE = { home: og.homeTitle };
    return {
        alt: `MAS Contractors — ${TITLE[key] ?? og[key]}`,
        Image: () => card({ lang, eyebrow: EYEBROW[key] ?? og.tagline, title: TITLE[key] ?? og[key] }),
    };
}

export async function serviceImage(lang, params) {
    const { slug } = await params;
    const service = getServiceBySlug(lang, slug);
    return card({ lang, eyebrow: getDictionary(lang).meta.og.servicesEyebrow, title: service?.title ?? "MAS Contractors" });
}

export async function postImage(lang, params) {
    const { slug } = await params;
    const post = getPostBySlug(lang, slug);
    return card({ lang, eyebrow: post?.category ?? "Blog", title: post?.title ?? "MAS Contractors" });
}
