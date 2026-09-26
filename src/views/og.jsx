import { ImageResponse } from "next/og";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getDictionary } from "@/i18n/dictionaries";
import { getServiceBySlug, getPostBySlug, getPosts } from "@/content";

// The picture WhatsApp, Facebook, LinkedIn and iMessage show when someone
// shares a link. One per page and language, drawn at build time.
//
// Why not the raw project photo: the old og:image was /img-1.jpg, a 3.6 MB
// 7621×5083 JPEG declared as 1200×630. WhatsApp gives up on anything over
// ~300 KB, so shares arrived with no picture at all. This card uses a real
// project photo as a backdrop but redraws it flat, at ~1200×630, ~110-160 KB.
//
// Why everything is centered, not left-aligned like a normal poster: link
// apps don't show the full 1200×630 canvas as a thumbnail. WhatsApp's chat
// bubble crops a centered square out of it — full height, only the middle
// ~630 px of width survives. A left-aligned logo or headline gets its start
// sliced off. Centering the logo, eyebrow and title keeps them inside that
// square regardless of what the surrounding chrome crops away.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ASSETS = join(process.cwd(), "src/views/og-assets");
const PUBLIC = join(process.cwd(), "public");
const GREEN = "#9fe300";

let assets;
function loadAssets() {
    assets ??= Promise.all([
        readFile(join(ASSETS, "Sora-400.woff")),
        readFile(join(ASSETS, "Sora-700.woff")),
        readFile(join(ASSETS, "Conthrax-SemiBold.otf")),
        readFile(join(ASSETS, "mark-3d.png")),
    ]).then(([sora400, sora700, conthrax, mark]) => ({
        fonts: [
            { name: "Sora", data: sora400, weight: 400, style: "normal" },
            { name: "Sora", data: sora700, weight: 700, style: "normal" },
            { name: "Conthrax", data: conthrax, weight: 600, style: "normal" },
        ],
        mark: `data:image/png;base64,${mark.toString("base64")}`,
    }));
    return assets;
}

// Real project photos load once per build and get reused across languages.
// Blurred and cropped to the card's exact canvas: it reads as a soft, out-of-
// focus backdrop rather than a crisp photo (the text sits on top either way),
// and — the actual reason — a blurred photo has far less detail for PNG to
// encode. A sharp 1200x630 photo alone can be 1-2 MB as a lossless PNG (the
// only format next/og can output); blurred, it's a few hundred KB before the
// dark overlay and palette step below take it under WhatsApp's ~300 KB limit.
const photos = new Map();
function loadPhoto(publicPath) {
    if (!photos.has(publicPath)) {
        photos.set(
            publicPath,
            readFile(join(PUBLIC, publicPath))
                .then((buf) => sharp(buf).resize(size.width, size.height, { fit: "cover" }).blur(11).png().toBuffer())
                .then((buf) => `data:image/png;base64,${buf.toString("base64")}`),
        );
    }
    return photos.get(publicPath);
}

// Column width for the eyebrow/title/contact block. Deliberately narrower
// than the 1200px canvas — WhatsApp's chat-bubble thumbnail crops a centered
// SQUARE out of the image (full height, ~630px of width), so anything wider
// than that gets its edges sliced off in the one place most people actually
// see this card. The logo lockup above is centered too, for the same reason.
const SAFE_WIDTH = 560;

function titleSize(title) {
    if (title.length <= 26) return 54;
    if (title.length <= 48) return 44;
    return 36;
}

async function card({ lang, eyebrow, title, photo }) {
    const { fonts, mark } = await loadAssets();
    const og = getDictionary(lang).meta.og;
    const background = await loadPhoto(photo);

    const rendered = new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    position: "relative",
                    fontFamily: "Sora",
                    color: "white",
                    backgroundColor: "#1e1e1e",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img
                    src={background}
                    width={1200}
                    height={630}
                    style={{ position: "absolute", inset: 0, objectFit: "cover" }}
                />
                {/* Darkest at the bottom, where the text sits; a light scrim over
                    the whole photo everywhere else so it never fights the text. */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        background:
                            "linear-gradient(180deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.35) 26%, rgba(10,10,10,0.72) 60%, rgba(10,10,10,0.94) 100%)",
                    }}
                />

                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        padding: "46px 90px 42px",
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                        <img src={mark} width={92} height={90} style={{ objectFit: "contain" }} />
                        <div
                            style={{
                                display: "flex",
                                fontFamily: "Conthrax",
                                fontSize: 28,
                                letterSpacing: 4,
                                marginTop: 14,
                                color: "white",
                            }}
                        >
                            MAS CONTRACTORS
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "auto" }}>
                        <div
                            style={{
                                display: "flex",
                                width: SAFE_WIDTH,
                                fontFamily: "Conthrax",
                                fontSize: 18,
                                letterSpacing: 3,
                                textTransform: "uppercase",
                                textAlign: "center",
                                color: GREEN,
                                marginBottom: 14,
                            }}
                        >
                            {eyebrow}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                width: SAFE_WIDTH,
                                fontSize: titleSize(title),
                                fontWeight: 700,
                                lineHeight: 1.18,
                                textAlign: "center",
                            }}
                        >
                            {title}
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 24,
                                paddingTop: 20,
                                borderTop: "2px solid rgba(255,255,255,0.25)",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 19, whiteSpace: "nowrap" }}>
                                <span style={{ color: "white", fontWeight: 700 }}>mascontractors.com</span>
                                <span style={{ color: GREEN }}>•</span>
                                <span style={{ color: "#e4e4e4" }}>(804) 833-4600</span>
                            </div>
                            <div style={{ display: "flex", marginTop: 8, fontSize: 15, color: "#b5b5b5", whiteSpace: "nowrap" }}>
                                {og.licensed}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...size, fonts },
    );

    // Re-encode with an indexed palette: with a photo behind flat-color text
    // and a gradient, this is a ~2x extra shrink on top of the blur above,
    // for no visible banding at thumbnail size.
    const optimized = await sharp(Buffer.from(await rendered.arrayBuffer()))
        .png({ palette: true, colors: 128, compressionLevel: 9 })
        .toBuffer();
    return new Response(optimized, {
        headers: { "content-type": "image/png", "cache-control": "public, immutable, no-transform, max-age=31536000" },
    });
}

// Real project photo behind each static page. Picked to match what the page
// is about, not just "a house": the client specifically liked the bathroom
// shot used here for the home page.
const PHOTO = {
    home: "/gallery/BathroomRemodel-FreestandingTub.jpeg",
    about: "/gallery/the_haven.jpg",
    contact: "/gallery/Deck.jpeg",
    gallery: "/gallery/FR1.jpg",
    services: "/gallery/CustomRoomAdditions1.png",
};

// Static pages: eyebrow and headline come from meta.og in the dictionary.
export function pageImage(lang, key) {
    const og = getDictionary(lang).meta.og;
    const EYEBROW = { home: og.tagline, services: og.servicesEyebrow };
    const TITLE = { home: og.homeTitle };
    return {
        alt: `MAS Contractors — ${TITLE[key] ?? og[key]}`,
        Image: () => card({ lang, eyebrow: EYEBROW[key] ?? og.tagline, title: TITLE[key] ?? og[key], photo: PHOTO[key] }),
    };
}

// Blog index: uses the newest post's own photo and category, so it stays
// current as the blog grows instead of freezing on whatever shipped first.
export function blogImage(lang) {
    const [latest] = getPosts(lang);
    const og = getDictionary(lang).meta.og;
    return card({ lang, eyebrow: og.blogEyebrow, title: og.blog, photo: latest?.image ?? PHOTO.gallery });
}

export async function serviceImage(lang, params) {
    const { slug } = await params;
    const service = getServiceBySlug(lang, slug);
    return card({
        lang,
        eyebrow: getDictionary(lang).meta.og.servicesEyebrow,
        title: service?.title ?? "MAS Contractors",
        photo: service?.img ?? PHOTO.services,
    });
}

export async function postImage(lang, params) {
    const { slug } = await params;
    const post = getPostBySlug(lang, slug);
    return card({
        lang,
        eyebrow: post?.category ?? "Blog",
        title: post?.title ?? "MAS Contractors",
        photo: post?.image ?? PHOTO.gallery,
    });
}
