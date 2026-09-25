import * as page from "@/views/home";
import { bind } from "@/i18n/bind";

const view = bind(page, "en");
export const generateMetadata = view.generateMetadata;
export default view.Page;
