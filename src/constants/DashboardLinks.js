import {
  addProductIcon,
  listAllProductsIcon,
  messagesIcon,
  profileIcon,
} from "./../components/Icons";
import { DASHBOARD_LINKS } from "./arabic";

export const dashboardLinks = [
  {
    name: DASHBOARD_LINKS.ADD_PRODUCT,
    icon: addProductIcon,
    url: "add-product",
  },
  {
    name: DASHBOARD_LINKS.ALL_PRODUCTS,
    icon: listAllProductsIcon,
    url: "all-products",
  },
  {
    name: DASHBOARD_LINKS.MESSAGES,
    icon: messagesIcon,
    url: "messages",
  },
  {
    name: DASHBOARD_LINKS.SETTINGS,
    icon: profileIcon,
    url: "profile",
  },
];
