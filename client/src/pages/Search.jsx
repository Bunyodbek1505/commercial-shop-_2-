import React from "react";
import Layout from "../components/layout/layout";
import { useSearch } from "../context/SearchContext";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title="Search - Rezults">
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-3">
            {values?.results.map((product) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={product._id}
              >
                <img
                  style={{ width: "100%", height: "200px" }}
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  className="card-img-top"
                  alt={`${product.name} photo`}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">
                    {product.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
