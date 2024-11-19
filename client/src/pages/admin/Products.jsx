import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  console.log(product);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Somthing went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="">
      <div className="contaier-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All products List</h1>
            <div className="d-flex flex-wrap">
              {product.map((value) => {
                // console.log(value)
                return (
                  <Link
                    to={`/dashboard/admin/update-product/${value.slug}`}
                    className="product-link"
                    key={value._id}
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        style={{ width: "100%", height: "200px" }}
                        src={`http://localhost:8080/api/v1/product/product-photo/${value._id}`}
                        className="card-img-top"
                        alt="product foto"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{value.name}</h5>
                        <p className="card-text">{value.description}</p>
                        <button className="btn btn-primary">
                          Update Product
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
