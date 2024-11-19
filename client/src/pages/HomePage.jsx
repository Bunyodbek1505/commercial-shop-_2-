import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data.category); // "category" is expected to be an array
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Get all products
  //  productlar sahifada qanch korinishi boyicha belgilaymiz.

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
    }
  };

  // const getAllProducts = async () => {
  //   try {
  //     setLoading(true)
  //     const { data } = await axios.get(
  //       "http://localhost:8080/api/v1/product/get-product"
  //     );
  //     setProducts(data.products);
  //     setLoading(false)
  //   } catch (error) {
  //     setLoading(false)
  //     console.error("Error fetching products:", error);
  //   }
  // };

  // Effect to fetch products on initial load

  useEffect(() => {
    getAllCategory();
    getAllProducts();
    getTotalCount();
  }, []);

  // Effect to filter products whenever filters change
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  // Handle category filter change
  const handleCategoryFilter = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  // Apply product filters
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  //  get total count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
      // console.log(data?.total)
    } catch (error) {
      console.log(error);
    }
  };

  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadMore();
  }, [page]);

  return (
    <Layout title="All Products - Best offers">
      <div className="row">
        <div className="col-md-2">
          <h4 className="text-center mt-3">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((category) => (
              <Checkbox
                key={category._id}
                onChange={(e) =>
                  handleCategoryFilter(e.target.checked, category._id)
                }
                checked={checked.includes(category._id)} // checkboxni checked qilamiz, agar checked state mavjud bo'lsa
              >
                {category.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-3">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio} // value orqali radio state-ni uzatamiz, agar radio state bo'sh bo'lsa, radio tozalanadi
            >
              {Prices.map((price) => (
                <div key={price._id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => {
                setChecked([]); // Filter by category ni tozalash
                setRadio([]); // Filter by price ni tozalash
              }}
            >
              Reset Filter
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((product) => (
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
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
