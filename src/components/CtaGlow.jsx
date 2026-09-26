// The traveling light on "get a quote" / "free estimate" buttons.
// Two layers, not one — that's the step a single masked ::before was missing:
//   .cta-glow-mask  sits over the whole button and uses a content-box vs.
//                   border-box CSS mask (exclude/xor) to punch a thin ring
//                   out of whatever it contains, exposing only a few px at
//                   the very edge.
//   .cta-glow-beam  is the light itself — deliberately huge (500x500) and
//                   centered on the button, not sized to it. A conic-gradient
//                   that big has almost no visible curvature across the
//                   button's small window, so what shows through the ring
//                   reads as a straight streak sweeping past, not a curved
//                   blob. Sizing the gradient to the button itself (the
//                   first attempt) is what made it look like a floating
//                   cloud instead of a line on the border.
// Both spans are inert (aria-hidden) and sit before the button's real label
// in the markup, so the label still paints on top without any z-index games.
export default function CtaGlow() {
    return (
        <span className="cta-glow-mask" aria-hidden="true">
            <span className="cta-glow-beam" />
        </span>
    );
}
