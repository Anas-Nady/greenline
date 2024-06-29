export const navbarHeight = "88px";
import {
  addressIcon,
  landLineIcon,
  mobilesIcon,
  technicalSupportIcon,
} from "@/components/Icons";
import {
  ABOUT_GREEN_LINE,
  ABOUT_US,
  ADDRESS,
  CATEGORIES_DESCRIPTIONS,
  CATEGORIES_OPTIONS,
  CONTACT_US,
  FAQS,
  HOME_PAGE,
  LAND_LINE,
  MAINTENANCE,
  MOBILES,
  MORE,
  PRODUCTS,
  REFUND,
  TECHNICAL_SUPPORT,
  WARRANTY,
} from "./arabic";

export const categoriesOptions = [
  {
    value: "wall-mounted",
    label: CATEGORIES_OPTIONS.WALL_MOUNTED,
    description: CATEGORIES_DESCRIPTIONS.WALL_MOUNTED,
  },
  {
    value: "concealed",
    label: CATEGORIES_OPTIONS.CONCEALED,
    description: CATEGORIES_DESCRIPTIONS.CONCEALED,
  },
  {
    value: "cassette-type",
    label: CATEGORIES_OPTIONS.CASSETTE_TYPE,
    description: CATEGORIES_DESCRIPTIONS.CASSETTE_TYPE,
  },
];
export const NavbarLinks = [
  {
    name: HOME_PAGE,
    path: "/",
  },
  {
    name: PRODUCTS,
    path: "products",
  },
  {
    name: ABOUT_US,
    path: "about-us",
  },
  {
    name: CONTACT_US,
    path: "contact-us",
  },
];

export const CONTACT_US_INFO = [
  {
    id: 3,
    icon: technicalSupportIcon,
    label: TECHNICAL_SUPPORT,
    data: [
      { id: 20, name: "example@gmail.com" },
      { id: 21, name: "1-600-890-4567" },
    ],
  },
  {
    id: 1,
    icon: addressIcon,
    label: ADDRESS,
    data: [{ id: 22, name: "XXXX - Saudi Arabia" }],
  },
  {
    id: 2,
    icon: landLineIcon,
    label: LAND_LINE,
    data: [{ id: 23, name: "(0421) 431 2030" }],
  },
  {
    id: 4,
    icon: mobilesIcon,
    label: MOBILES,
    data: [{ id: 24, name: "+91 123456789" }],
  },
];

export const FOOTER_LINKS = [
  {
    id: 2,
    title: ABOUT_GREEN_LINE,
    links: [
      { name: ABOUT_US, path: "/about-us" },
      { name: CONTACT_US, path: "/contact-us" },
      { name: FAQS, path: "/faqs" },
    ],
  },
  {
    id: 3,
    title: MORE,
    links: [
      { name: WARRANTY, path: "/warranty" },
      { name: REFUND, path: "/refund" },
      { name: MAINTENANCE, path: "/maintenance" },
    ],
  },
  {
    id: 4,
    title: CONTACT_US,
    links: [
      { name: "support@greenline.com", path: "mailto:eng.anas.nady@gmail.com" },
    ],
  },
];

export const FOOTER_SOCIAL_MEDIA = [
  {
    id: 1,
    icon: "icon",
    name: "facebook",
    path: "https://www.facebook.com/greenline/",
  },
  {
    id: 2,
    icon: "icon",
    name: "twitter",
    path: "https://twitter.com/greenline",
  },
  {
    id: 3,
    icon: "icon",
    name: "instagram",
    path: "https://www.instagram.com/greenline/",
  },
  {
    id: 4,
    icon: "icon",
    name: "linkedin",
    path: "https://www.linkedin.com/company/greenline/",
  },
  {
    id: 5,
    icon: "icon",
    name: "youtube",
    path: "https://www.youtube.com/channel/UCL-22222222222222222",
  },
];
