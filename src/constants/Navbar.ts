import { ABOUT_US } from "./AboutUs";
import { CONTACT_US } from "./ContactUs";
import { PRODUCTS } from "./Product";
const HOME_PAGE = "الرئيسية";

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
