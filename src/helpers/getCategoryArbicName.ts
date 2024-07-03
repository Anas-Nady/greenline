import { CATEGORIES_OPTIONS } from "@/constants/Categories";

export const getCategoryArabicName = (category: string): string => {
  if (category === "wall-mounted") {
    return CATEGORIES_OPTIONS.WALL_MOUNTED;
  } else if (category === "concealed") {
    return CATEGORIES_OPTIONS.CONCEALED;
  } else if (category === "cassette-type") {
    return CATEGORIES_OPTIONS.CASSETTE_TYPE;
  } else {
    return category;
  }
};
