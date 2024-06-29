export interface HTMLContent {
  __html: string;
}

export type NavbarLinkProps = {
  name: string;
  path: string;
};

export interface SearchParamsProps {
  search: string;
  minPrice: number;
  maxPrice: number;
  page: number;
  category: string;
  sort: string;
  limit: number;
}
