import { GREEN_LINE } from "@/constants/Global";
import icon from "@/assets/imgs/icon.svg";
import { ABOUT_US_DESCRIPTIONS } from "@/constants/AboutUs";

const rootMetadata = {
  title: {
    default: GREEN_LINE,
    template: `%s | ${GREEN_LINE}`,
  },
  description: ABOUT_US_DESCRIPTIONS.DESCRIPTION_ONE,
  authors: [{ name: `${GREEN_LINE}` }],
  creator: "Anas Abdallah Nady",
  applicationName: GREEN_LINE,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(`${process.env.CLIENT_URL}`),

  icons: {
    icon,
    apple: icon,
  },
};

export default rootMetadata;
