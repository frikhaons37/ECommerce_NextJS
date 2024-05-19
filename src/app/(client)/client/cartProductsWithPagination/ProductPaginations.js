'use client';
import React from "react";
import CartProductItem from "@/Components/Client/shoppingCart/cartProductItem";
import TablePagination from "@mui/material/TablePagination";
import SelectCategory from "./SelectCategory";
import { fetchArticlesPaginationFilter } from "@/services/ArticleService";

async function getProducts(page, rowsPerPage, searchTerm, prixMax, scategorieID) {
  page++;
  const data = await fetchArticlesPaginationFilter(page, rowsPerPage, searchTerm, prixMax, scategorieID);
  return data;
}

const ProductPaginations = ({ Categories }) => {
  const [category, setCategory] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [tot, setTot] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [prixMax, setPrixMax] = React.useState("");
  const [maxValuePrix, setMaxValuePrix] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    getProducts(page, rowsPerPage, searchTerm, prixMax, category).then((res) => {
      setTot(res.tot);
      setProducts(res.articles);
      setMaxValuePrix(res.maxValuePrix);
    });
  }, [page, rowsPerPage, searchTerm, prixMax, category]);

  return (
    <div className="row">
      <div className="col-sm-3 mt-5">
        <div className="relative">
          <label htmlFor="Search" className="sr-only">Search</label>
          <input
            type="text"
            id="Search"
            placeholder="Cherchez la désignation ..."
            className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
            <button type="button" className="text-gray-600 hover:text-gray-700">
              <span className="sr-only">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </span>
        </div>
        <SelectCategory Categories={Categories} onSelect={(value) => setCategory(value)} />
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon2">Prix Max {prixMax}</span>
          </div>
          <input
            type="range"
            className="form-range"
            min="0"
            max={maxValuePrix}
            step="1"
            value={prixMax}
            onChange={(event) => setPrixMax(event.target.value)}
          />
        </div>
      </div>
      <div className="col-sm">
        <div className="row">
          {products && products.map((product) => (
            <CartProductItem key={product?._id} product={product} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TablePagination
            component="div"
            count={tot}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPaginations;
