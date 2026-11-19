// Datos de contacto del negocio: UNA sola fuente. Footer, navbar, páginas,
// JSON-LD y la imagen OG leen de aquí. Si cambia el teléfono o la dirección,
// se cambia solo este archivo (y public/llms.txt, que es texto plano).
export const BUSINESS = {
  name: "MAS Contractors LLC",
  url: "https://mascontractors.com",
  phone: "(804) 833-4600",
  phoneE164: "+18048334600",
  phoneHref: "tel:+18048334600",
  email: "info@mascontractors.com",
  emailHref: "mailto:info@mascontractors.com",
  // Primero la oficina central; los otros dos son líneas directas del equipo.
  phones: [
    { display: "(804) 833-4600", href: "tel:+18048334600", kind: "office" },
    { display: "(540) 376-4453", href: "tel:+15403764453", kind: "direct" },
    { display: "(804) 593-9468", href: "tel:+18045939468", kind: "direct" },
  ],
  address: {
    street: "411 Branchway Rd Suite 107",
    city: "North Chesterfield",
    region: "VA",
    postalCode: "23236",
    country: "US",
  },
};

export const ADDRESS_LINE = `${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;
export const CITY_LINE = `${BUSINESS.address.city}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;
