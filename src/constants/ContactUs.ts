import {
  addressIcon,
  landLineIcon,
  mobilesIcon,
  technicalSupportIcon,
} from "@/components/Icons";

export const CONTACT_US = "تواصل معنا";

export const TECHNICAL_SUPPORT = "الدعم الفني";
export const ADDRESS = "العنوان";
export const MOBILES = "الهواتف";
export const LAND_LINE = "الخط الارضي";

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
