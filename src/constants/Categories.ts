export const CHOOSE_CATEGORY = "اختر الفئة";
export const CATEGORIES = "الفئات";

export const CATEGORIES_OPTIONS = {
  ALL_CATEGORIES: "جميع الفئات",
  WALL_MOUNTED: "مكيف جداري",
  CONCEALED: "مكيف مخفي",
  CASSETTE_TYPE: "مكيف كاسيت",
};

export const CATEGORIES_DESCRIPTIONS = {
  WALL_MOUNTED:
    "يتم تثبيته هذا النوع من المكيفات على الجدار. يُعدّ خيارًا شائعًا للمنازل والمكاتب بفضل تصميمه الأنيق وكفاءته في توزيع الهواء بشكل متساوٍ في الغرفة.",
  CONCEALED:
    "يتم تثبيت هذا النوع من المكيفات داخل السقف أو الحائط، بحيث تكون الوحدة الداخلية غير مرئية. يُستخدم غالبًا في الأماكن التي تتطلب ديكورًا متميزًا وشكلًا جماليًا أنيقًا.",
  CASSETTE_TYPE:
    "يتم تثبيت هذا النوع من المكيفات في السقف، ويتميز بوجود وحدة داخلية مخفية داخل السقف الظاهر منها فقط اللوحة الأمامية. يُعتبر خيارًا مثاليًا للمساحات التجارية والمكاتب الكبيرة",
};

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
