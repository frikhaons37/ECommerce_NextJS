import React from "react";
import ProductPaginations from "./ProductPaginations";
import { fetchSCategories } from "@/services/ScategorieService";

const getscategories = async () => {
  const data = await fetchSCategories();
  return data;
};
export default async function CartProductsWithPaginationPage() {
  const sCategories = await getscategories();

  return (
    <ProductPaginations Categories={sCategories} />
  );
}
