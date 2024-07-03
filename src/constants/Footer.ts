import { ABOUT_GREEN_LINE, ABOUT_US, MORE } from "./AboutUs";
import { CONTACT_US } from "./ContactUs";
import { FAQS } from "./Faqs";
import { MAINTENANCE } from "./Maintenance";
import { REFUND } from "./Refund";
import { WARRANTY } from "./Warranty";

export const HAVE_A_PROBLEM = "لديك مشكلة";
export const CUSTOMERS_SERVICE = "خدمة العملاء";

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

export const COPY_RIGHT = "جميع الحقوق محفوظة لموقع";
