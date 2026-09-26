import * as page from "@/views/services";
import { bind } from "@/i18n/bind";

const view = bind(page, "es");
export const generateMetadata = view.generateMetadata;
export default view.Page;
