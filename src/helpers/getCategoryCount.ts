import { CategoryCountsProps } from "@/types/Product";

export const getCategoryCount = (
  categoryCounts: CategoryCountsProps[],
  categoryValue: string
): number => {
  const foundCategory = categoryCounts.find(
    (categoryCount) => categoryCount.category === categoryValue
  );
  return foundCategory ? foundCategory.count : 0;
};
