export type ProductImagesProps = {
  url: string;
  public_id?: string;
  _id?: string;
};

export type ProductProps = {
  name: string;
  _id?: string;
  description?: string;
  cleanDescription?: string;
  images: ProductImagesProps[];
  oldPrice: number;
  price: number;
  photo: string;
  slug: string;
  seller: string;
  category: string;
  productIsNew?: boolean;
};

export type CategoryCountsProps = {
  count: number;
  category: string;
};

export type CategoryCardProps = {
  categoryName: string;
  categoryDescription: string;
  backgroundImg: string;
  categoryValue: string;
};
