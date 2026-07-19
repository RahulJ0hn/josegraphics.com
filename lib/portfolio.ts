export type PortfolioItem = {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  before: string | null;
  wireframe: string | null;
  after: string;
  /** width / height of the `after` image, so cards can be sized to it exactly */
  ratio: number;
};

export const portfolioItems: PortfolioItem[] = [
  {
    slug: "hot-rod",
    title: "Flame Hot Rod Illustration",
    client: "Motorsports Apparel",
    category: "Illustration",
    description:
      "A race-day photograph hand-redrawn into layered vector artwork, built for large-format printing without losing a single flame highlight.",
    before: "/portfolio/hot-rod-before-full.jpg",
    wireframe: "/portfolio/hot-rod-wireframe-full.jpg",
    after: "/portfolio/hot-rod-after-full.jpg",
    ratio: 904 / 418,
  },
  {
    slug: "heritage-building",
    title: "Heritage Building Line Art",
    client: "University Campus",
    category: "Illustration",
    description:
      "Full architectural detail — brickwork, palms, and all — traced into clean scalable line art for campus print and signage use.",
    before: "/portfolio/heritage-building-before.jpg",
    wireframe: "/portfolio/heritage-building-wireframe.jpg",
    after: "/portfolio/heritage-building-after.jpg",
    ratio: 724 / 420,
  },
  {
    slug: "coat-of-arms",
    title: "Collegiate Coat of Arms",
    client: "Athletics Program",
    category: "Vector Conversion",
    description:
      "A crest redrawn stroke-for-stroke in vector, holding its detail from a jersey patch to a stadium banner.",
    before: "/portfolio/coat-of-arms-before.jpg",
    wireframe: "/portfolio/coat-of-arms-wireframe.jpg",
    after: "/portfolio/coat-of-arms-after.jpg",
    ratio: 460 / 500,
  },
  {
    slug: "wheel-loader",
    title: "Heavy Equipment Illustration",
    client: "Mining & Construction",
    category: "Illustration",
    description:
      "Technical, parts-accurate line art of a wheel loader, redrawn for parts catalogs and dealership marketing.",
    before: "/portfolio/wheel-loader-before.jpg",
    wireframe: "/portfolio/wheel-loader-wireframe.jpg",
    after: "/portfolio/wheel-loader-after.jpg",
    ratio: 609 / 428,
  },
  {
    slug: "nutriday",
    title: "NutriDay Packaging Vectorization",
    client: "Dannon",
    category: "Vector Conversion",
    description:
      "Retail packaging rebuilt as production-ready vector art, matched precisely for die-line and print accuracy.",
    before: "/portfolio/nutriday-before.jpg",
    wireframe: "/portfolio/nutriday-wireframe.jpg",
    after: "/portfolio/nutriday-after.jpg",
    ratio: 409 / 530,
  },
  {
    slug: "johns-transporting",
    title: "Johns Transporting Logo Digitizing",
    client: "Johns Transporting Inc.",
    category: "Embroidery Digitizing",
    description:
      "A fleet logo digitized stitch-by-stitch for embroidery, holding its sharp geometry at cap and jacket scale.",
    before: "/portfolio/johns-transporting-before.jpg",
    wireframe: null,
    after: "/portfolio/johns-transporting-after.jpg",
    ratio: 978 / 679,
  },
  {
    slug: "bold-city-brass",
    title: "Bold City Brass Logo Digitizing",
    client: "Bold City Brass, Jacksonville",
    category: "Embroidery Digitizing",
    description:
      "Fine instrument linework and lettering digitized for embroidery without the detail clogging at small sizes.",
    before: "/portfolio/bold-city-brass-before.jpg",
    wireframe: null,
    after: "/portfolio/bold-city-brass-after.jpg",
    ratio: 720 / 679,
  },
  {
    slug: "allatoona-njrotc",
    title: "Allatoona NJROTC Emblem",
    client: "Allatoona High School NJROTC",
    category: "Logo Design",
    description:
      "A crest built clean in vector from the first sketch, ready for patches, banners, and web use alike.",
    before: null,
    wireframe: null,
    after: "/portfolio/allatoona-njrotc-after.jpg",
    ratio: 188 / 189,
  },
  {
    slug: "flame-lion",
    title: "Flame Lion Illustration",
    client: "Apparel Graphics",
    category: "Illustration",
    description:
      "A full-detail lion illustration built entirely in vector, holding every strand of mane at any print size.",
    before: null,
    wireframe: null,
    after: "/portfolio/flame-lion-after.png",
    ratio: 1000 / 1750,
  },
  {
    slug: "great-western-motorcycles",
    title: "Great Western Motorcycles Logo",
    client: "Great Western Motorcycles",
    category: "Logo Design",
    description:
      "A full-color scene logo — rider, terrain, and mountains — redrawn in vector for print, patches, and web.",
    before: null,
    wireframe: null,
    after: "/portfolio/great-western-motorcycles-after.png",
    ratio: 1200 / 1172,
  },
];

export function getPortfolioItem(slug: string) {
  return portfolioItems.find((item) => item.slug === slug);
}
