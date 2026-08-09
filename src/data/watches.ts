import abyssAqua from "@/assets/w-abyss-aqua.jpg";
import abyssRose from "@/assets/w-abyss-rose.jpg";
import abyssSilver from "@/assets/w-abyss-silver.jpg";
import regaliaCarbon from "@/assets/w-regalia-carbon.jpg";
import regaliaEmerald from "@/assets/w-regalia-emerald.jpg";
import regaliaPearl from "@/assets/w-regalia-pearl.png";
import regaliaSapphire from "@/assets/w-regalia-sapphire.png";
import apexOnyx from "@/assets/w-apex-onyx.png";
import apexFury from "@/assets/w-apex-fury.png";
import apexCerulean from "@/assets/w-apex-cerulean.png";
import collectionAbyss from "@/assets/collection-abyss.jpg";
import collectionRegalia from "@/assets/collection-regalia.jpg";
import collectionApex from "@/assets/collection-apex.jpg";

export type CollectionId = "abyss" | "regalia" | "apex";

export interface Collection {
  id: CollectionId;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface Watch {
  slug: string;
  name: string;
  collection: CollectionId;
  price: number;
  available: boolean;
  short: string;
  description: string;
  image: string;
  caseMaterial: string;
  strap: string;
  movementType: "Automatic" | "Manual" | "Chronograph";
  specs: {
    case: string;
    diameter: string;
    thickness: string;
    crystal: string;
    waterResistance: string;
    movement: string;
    powerReserve: string;
    bracelet: string;
    dial: string;
    functions: string;
    clasp: string;
    reference: string;
  };
}

export const collections: Collection[] = [
  {
    id: "abyss",
    name: "Abyss",
    tagline: "Born beneath the surface.",
    description:
      "A collection inspired by the silence, pressure, and mystery of the deep. Instruments built to remain composed where light does not reach.",
    image: collectionAbyss,
  },
  {
    id: "regalia",
    name: "Regalia",
    tagline: "The architecture of prestige.",
    description:
      "A refined expression of craftsmanship, material, and timeless sophistication. Proportion studied until nothing remains to remove.",
    image: collectionRegalia,
  },
  {
    id: "apex",
    name: "Apex",
    tagline: "Precision at its limit.",
    description:
      "Engineered for those who demand performance without compromise. Structure, tolerance, and speed rendered in metal.",
    image: collectionApex,
  },
];

export const watches: Watch[] = [
  {
    slug: "abyss-aqua-diver",
    name: "Abyss Aqua Diver",
    collection: "abyss",
    price: 14800,
    available: true,
    short: "Professional diving instrument with a lacquered emerald depth dial.",
    description:
      "Conceived for saturation depth and read at a glance in total darkness. The Aqua Diver pairs a unidirectional ceramic bezel with a lacquered emerald dial that deepens toward its edge, mirroring the loss of light beneath the surface.",
    image: abyssAqua,
    caseMaterial: "Steel",
    strap: "Bracelet",
    movementType: "Automatic",
    specs: {
      case: "Brushed and polished stainless steel",
      diameter: "41 mm",
      thickness: "12.4 mm",
      crystal: "Domed sapphire, double anti-reflective",
      waterResistance: "300 m",
      movement: "EM-21 automatic, 28,800 vph",
      powerReserve: "72 hours",
      bracelet: "Steel three-link with dive extension",
      dial: "Lacquered emerald gradient, applied indices",
      functions: "Hours, minutes, seconds, date",
      clasp: "Folding steel clasp with micro-adjust",
      reference: "EM-AB-01-300",
    },
  },
  {
    slug: "abyss-rose-current",
    name: "Abyss Rose Current",
    collection: "abyss",
    price: 21400,
    available: true,
    short: "Rose-metal ocean timepiece with a soft-gradient forest dial.",
    description:
      "Warmth against cold water. Rose metal frames a deep green gradient dial, softened by a vulcanised strap chosen for its silence against the skin.",
    image: abyssRose,
    caseMaterial: "Rose Gold",
    strap: "Rubber",
    movementType: "Automatic",
    specs: {
      case: "18k rose gold, satin-finished flanks",
      diameter: "40 mm",
      thickness: "11.8 mm",
      crystal: "Flat sapphire, anti-reflective",
      waterResistance: "200 m",
      movement: "EM-21 automatic, 28,800 vph",
      powerReserve: "72 hours",
      bracelet: "Vulcanised rubber, integrated lugs",
      dial: "Graduated emerald lacquer, gilt indices",
      functions: "Hours, minutes, seconds",
      clasp: "Rose gold pin buckle",
      reference: "EM-AB-02-200",
    },
  },
  {
    slug: "abyss-silver-tide",
    name: "Abyss Silver Tide",
    collection: "abyss",
    price: 12600,
    available: false,
    short: "Silver marine timepiece with a wave-textured guilloché dial.",
    description:
      "A study of surface. The Silver Tide's dial is engine-turned into a slow wave pattern that shifts with the angle of light, held within an emerald-rimmed bezel.",
    image: abyssSilver,
    caseMaterial: "Steel",
    strap: "Bracelet",
    movementType: "Automatic",
    specs: {
      case: "Polished stainless steel",
      diameter: "39 mm",
      thickness: "10.9 mm",
      crystal: "Box sapphire, anti-reflective",
      waterResistance: "150 m",
      movement: "EM-18 automatic, 28,800 vph",
      powerReserve: "60 hours",
      bracelet: "Tapered steel bracelet",
      dial: "Silver guilloché wave, rhodium indices",
      functions: "Hours, minutes, seconds",
      clasp: "Concealed butterfly clasp",
      reference: "EM-AB-03-150",
    },
  },
  {
    slug: "regalia-carbon-legacy",
    name: "Regalia Carbon Legacy",
    collection: "regalia",
    price: 32900,
    available: true,
    short: "Carbon-cased chronograph with an open-worked charcoal dial.",
    description:
      "Prestige without weight. Forged carbon gives the Legacy its structure while the open dial exposes the chronograph architecture beneath a thin emerald flange.",
    image: regaliaCarbon,
    caseMaterial: "Carbon",
    strap: "Leather",
    movementType: "Chronograph",
    specs: {
      case: "Forged carbon composite with steel core",
      diameter: "42 mm",
      thickness: "13.1 mm",
      crystal: "Sapphire, double anti-reflective",
      waterResistance: "100 m",
      movement: "EM-34 integrated chronograph, 36,000 vph",
      powerReserve: "65 hours",
      bracelet: "Black calfskin, emerald stitching",
      dial: "Open-worked charcoal, emerald flange",
      functions: "Hours, minutes, chronograph, date",
      clasp: "Carbon folding clasp",
      reference: "EM-RG-01-100",
    },
  },
  {
    slug: "regalia-emerald-torque",
    name: "Regalia Emerald Torque",
    collection: "regalia",
    price: 48500,
    available: true,
    short: "The signature maison model, in gemstone emerald lacquer.",
    description:
      "The reference by which the maison is measured. Twelve layers of emerald lacquer are applied and polished by hand until the dial reads as a single cut stone.",
    image: regaliaEmerald,
    caseMaterial: "White Gold",
    strap: "Leather",
    movementType: "Manual",
    specs: {
      case: "18k white gold, mirror-polished",
      diameter: "38.5 mm",
      thickness: "9.2 mm",
      crystal: "Flat sapphire, anti-reflective",
      waterResistance: "50 m",
      movement: "EM-09 manual winding, 21,600 vph",
      powerReserve: "80 hours",
      bracelet: "Dark green alligator leather",
      dial: "Hand-lacquered emerald, gold indices",
      functions: "Hours, minutes",
      clasp: "White gold pin buckle",
      reference: "EM-RG-02-050",
    },
  },
  {
    slug: "regalia-pearl-aura",
    name: "Regalia Pearl Aura",
    collection: "regalia",
    price: 27300,
    available: true,
    short: "Slim dress watch with a natural mother-of-pearl dial.",
    description:
      "Each dial is cut from a single shell, so no two are identical. The case is drawn thin enough to disappear beneath a cuff.",
    image: regaliaPearl,
    caseMaterial: "Platinum",
    strap: "Leather",
    movementType: "Manual",
    specs: {
      case: "950 platinum, polished",
      diameter: "37 mm",
      thickness: "7.9 mm",
      crystal: "Flat sapphire, anti-reflective",
      waterResistance: "30 m",
      movement: "EM-09 manual winding, 21,600 vph",
      powerReserve: "80 hours",
      bracelet: "Black satin-finish leather",
      dial: "Natural mother-of-pearl, blackened indices",
      functions: "Hours, minutes",
      clasp: "Platinum pin buckle",
      reference: "EM-RG-03-030",
    },
  },
  {
    slug: "regalia-sapphire-muse",
    name: "Regalia Sapphire Muse",
    collection: "regalia",
    price: 24900,
    available: true,
    short: "Sunburst sapphire-blue dial framed in warm polished steel.",
    description:
      "A quieter register of the Regalia language. The blue sunburst dial holds emerald in its reflections rather than its pigment.",
    image: regaliaSapphire,
    caseMaterial: "Steel",
    strap: "Leather",
    movementType: "Automatic",
    specs: {
      case: "Polished stainless steel",
      diameter: "39 mm",
      thickness: "9.6 mm",
      crystal: "Domed sapphire, anti-reflective",
      waterResistance: "50 m",
      movement: "EM-18 automatic, 28,800 vph",
      powerReserve: "60 hours",
      bracelet: "Navy calfskin leather",
      dial: "Sunburst sapphire blue, rhodium indices",
      functions: "Hours, minutes, seconds",
      clasp: "Steel folding clasp",
      reference: "EM-RG-04-050",
    },
  },
  {
    slug: "apex-onyx-emerald",
    name: "Apex Onyx Emerald",
    collection: "apex",
    price: 19800,
    available: true,
    short: "Blackened titanium instrument with emerald luminous indices.",
    description:
      "Matte through and through, so the only light it returns is emerald. Built around a shock-mounted movement carrier for daily hard use.",
    image: apexOnyx,
    caseMaterial: "Titanium",
    strap: "Bracelet",
    movementType: "Automatic",
    specs: {
      case: "DLC-coated grade 5 titanium",
      diameter: "42 mm",
      thickness: "12.0 mm",
      crystal: "Sapphire, internal anti-reflective",
      waterResistance: "200 m",
      movement: "EM-27 automatic, 28,800 vph",
      powerReserve: "70 hours",
      bracelet: "Integrated blackened titanium bracelet",
      dial: "Matte black, emerald luminous indices",
      functions: "Hours, minutes, seconds, day-date",
      clasp: "Titanium folding clasp",
      reference: "EM-AP-01-200",
    },
  },
  {
    slug: "apex-emerald-fury",
    name: "Apex Emerald Fury",
    collection: "apex",
    price: 38700,
    available: true,
    short: "Skeleton chronograph engineered for sustained high frequency.",
    description:
      "A performance chronograph with an exposed movement, high-frequency escapement, and a case machined for rigidity rather than ornament.",
    image: apexFury,
    caseMaterial: "Titanium",
    strap: "Rubber",
    movementType: "Chronograph",
    specs: {
      case: "Grade 5 titanium with ceramic bezel",
      diameter: "44 mm",
      thickness: "14.2 mm",
      crystal: "Sapphire, double anti-reflective",
      waterResistance: "100 m",
      movement: "EM-34 integrated chronograph, 36,000 vph",
      powerReserve: "65 hours",
      bracelet: "Emerald vulcanised rubber",
      dial: "Skeletonised, emerald bridges",
      functions: "Hours, minutes, chronograph, tachymeter",
      clasp: "Titanium deployant clasp",
      reference: "EM-AP-02-100",
    },
  },
  {
    slug: "apex-cerulean-emerald",
    name: "Apex Cerulean Emerald",
    collection: "apex",
    price: 17400,
    available: false,
    short: "Cerulean sport dial with emerald-tipped luminous hands.",
    description:
      "Legibility as a discipline. Wide luminous hands over a deep cerulean dial, brushed titanium throughout, nothing added.",
    image: apexCerulean,
    caseMaterial: "Titanium",
    strap: "Rubber",
    movementType: "Automatic",
    specs: {
      case: "Brushed grade 5 titanium",
      diameter: "41 mm",
      thickness: "11.5 mm",
      crystal: "Flat sapphire, anti-reflective",
      waterResistance: "200 m",
      movement: "EM-27 automatic, 28,800 vph",
      powerReserve: "70 hours",
      bracelet: "Cerulean vulcanised rubber",
      dial: "Sunburst cerulean, emerald-tipped hands",
      functions: "Hours, minutes, seconds",
      clasp: "Titanium pin buckle",
      reference: "EM-AP-03-200",
    },
  },
];

export const caseMaterials = [...new Set(watches.map((w) => w.caseMaterial))].sort();
export const strapTypes = [...new Set(watches.map((w) => w.strap))].sort();
export const movementTypes = [...new Set(watches.map((w) => w.movementType))].sort();

export const getWatch = (slug: string) => watches.find((w) => w.slug === slug);
export const getCollection = (id: CollectionId) => collections.find((c) => c.id === id)!;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
