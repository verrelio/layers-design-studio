// ALL editable content lives here. Replace /public/images/* to swap photos.
const img = (n: number) => `/images/p${n}.jpg`;
export const heroImages = [1, 2, 3, 4, 5, 6, 7, 8, 6, 4, 8, 1].map((n) => ({ src: img(n), alt: "Landscape by Layers Design Studio" }));
export const sections = ["home", "about", "services", "projects", "process", "contact"] as const;
export const sectionNames = ["Home", "Philosophy", "Services", "Projects", "Process", "Contact"];
export const contact = {
  email: "hello@example.com", // PLACEHOLDER: replace
  phone: "+91 00000 00000", // PLACEHOLDER: replace
  whatsapp: "https://wa.me/910000000000", // PLACEHOLDER: replace
  instagram: "https://www.instagram.com/layers_design_", handle: "@layers_design_",
  address: "Kolkata, West Bengal, India",
};
export const services = [
  { title: "Landscape Design", image: img(6), text: "Gardens, courtyards and podiums composed around planting, water and daily use." },
  { title: "Site Planning", image: img(5), text: "Organising buildings, movement and open ground so a site works before it is built." },
  { title: "Environmental Design", image: img(8), text: "Drainage, ecology and microclimate shaping places that stay cool and resilient." },
  { title: "Open Space Planning", image: img(3), text: "Parks, plazas and shared greens planned for communities and campuses." },
];
export type Project = { title: string; location: string; type: string; category: "Residential" | "Commercial" | "Institutional" | "Hospitality"; text: string; images: string[] };
// Titles/locations marked (editable) are placeholders.
export const projects: Project[] = [
  { title: "Orbit Lumiere", location: "Kolkata", type: "Landscape Strategy", category: "Residential", text: "Landscape strategy for a residential tower complex with shared greens and terraces.", images: [img(5), img(3)] },
  { title: "Southern Vista", location: "Kolkata (editable)", type: "Townhouse community", category: "Residential", text: "A brick-and-white townhouse community with lawns, a pool and a play area.", images: [img(3)] },
  { title: "AIPH University", location: "Odisha", type: "Campus entrance and site works", category: "Institutional", text: "Entrance landscape and site works for a university campus.", images: [img(6), img(7)] },
  { title: "Court & Terrace Residences", location: "Kolkata (editable)", type: "Tower complex", category: "Residential", text: "A tower complex with a tennis court and rooftop terraces.", images: [img(2)] },
  { title: "Lotus Pond Retreat", location: "India (editable)", type: "Tropical resort", category: "Hospitality", text: "Timber bridges, lily ponds and thatched cottages in a tropical resort.", images: [img(4), img(8), img(1)] },
  { title: "Terracotta Villas", location: "India (editable)", type: "Resort villas", category: "Hospitality", text: "Terracotta-roofed villas set around an organic freeform pool.", images: [img(6), img(1)] },
  { title: "Amphitheatre Gardens", location: "Kolkata (editable)", type: "High-rise garden", category: "Residential", text: "A high-rise residential garden with stepped amphitheatre seating.", images: [img(5)] },
  { title: "Sculpture Plaza", location: "Kolkata (editable)", type: "Commercial plaza", category: "Commercial", text: "A commercial plaza anchored by a sculpture garden.", images: [img(2)] },
  { title: "Twilight Lakefront", location: "India (editable)", type: "Lake-front residential", category: "Residential", text: "A lake-front residential complex designed for twilight.", images: [img(7), img(4)] },
  { title: "Rooftop Terrace Garden", location: "Kolkata (editable)", type: "Terrace garden", category: "Commercial", text: "A layered rooftop garden with pergola, lawn and planters above the city.", images: [img(2)] },
];
export const layers = [
  { t: "Land and Context", d: "We read topography, climate, neighbours and the history of the site." },
  { t: "Water and Drainage", d: "Water is guided, stored and celebrated, from swales to lily ponds." },
  { t: "Soil and Planting", d: "Healthy soil and layered planting give structure, shade and seasons." },
  { t: "Structure and Materials", d: "Pergolas, paving, brick and timber chosen to age well." },
  { t: "People and Life", d: "Finally the place is tuned for the people who will use it every day." },
];
