import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="list-group">
      <h4>Admin panel</h4>
      <Link
        to={"/dashboard/admin/create-category"}
        className="list-group-item list-group-item-action active"
        aria-current="true"
      >
        Create Category
      </Link>
      <Link
        to={"/dashboard/admin/create-product"}
        className="list-group-item list-group-item-action"
      >
        Create Product
      </Link>
      <Link
        to={"/dashboard/admin/products"}
        className="list-group-item list-group-item-action"
      >
        Products
      </Link>
      <Link
        to={"/dashboard/admin/users"}
        className="list-group-item list-group-item-action"
      >
        Users
      </Link>
    </div>
  );
};

export default AdminMenu;
