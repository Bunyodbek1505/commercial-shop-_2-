import React from "react";
import { useSearch } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate()

  const handeSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/search/${values.keyword}`
      );
      console.log(data)
      setValues({ ...values, results: data });
      navigate('/search')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form className="d-flex" onSubmit={handeSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeHolder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
