// Binds a shared view (src/views/*) to one language. Views read the language
// from `params.lang`, exactly as they would under a [lang] segment; the route
// files in app/(en)/ and app/es/ fix it instead:
//
//   const view = bind(await import(...), "es")  → export default view.Page
//
// so each page is written once and the URLs match the file tree, with no
// rewrites for the client router to trip over.
async function withLang(params, lang) {
    return { ...(await params), lang };
}

export function bind(view, lang) {
    return {
        Page: (props) => view.default({ ...props, params: withLang(props.params, lang) }),
        generateMetadata: view.generateMetadata
            ? (props, parent) => view.generateMetadata({ ...props, params: withLang(props.params, lang) }, parent)
            : undefined,
    };
}
