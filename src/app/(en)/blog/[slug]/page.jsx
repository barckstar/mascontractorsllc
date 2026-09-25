import * as page from "@/views/post";
import { bind } from "@/i18n/bind";

const view = bind(page, "en");
export const generateMetadata = view.generateMetadata;
export const generateStaticParams = page.generateStaticParams;
export default view.Page;
