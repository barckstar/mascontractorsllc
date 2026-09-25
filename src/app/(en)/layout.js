import SiteLayout, { generateMetadata as siteMetadata } from "@/views/site-layout";
import { bind } from "@/i18n/bind";

const view = bind({ default: SiteLayout, generateMetadata: siteMetadata }, "en");
export const generateMetadata = view.generateMetadata;
export default view.Page;
