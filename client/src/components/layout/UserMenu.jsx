import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div className="list-group">
            <h4>Dashboard</h4>
            <Link to={'/dashboard/user/profile'} className="list-group-item list-group-item-action active" aria-current="true">
                Profile
            </Link>
            <Link to={'/dashboard/user/orders'} className="list-group-item list-group-item-action">Orders</Link>
        </div>
    )
}

export default UserMenu