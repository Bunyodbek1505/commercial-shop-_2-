import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import Spinner from '../spinner'

const PrivateRoute = () => {
	const [ok, setOk] = useState(false)
	const [auth, setAuth] = useAuth()

	useEffect(() => {
		const authCheck = async () => {
			const res = await axios.get(
				'http://localhost:8080/api/v1/auth/user-auth'
				// bu yerda headerni
				// {
				// 	headers: {
				// 		Authorization: auth?.token,
				// 	},
				// }
			)
			if (res.data.ok) {
				setOk(true)
			} else {
				setOk(false)
			}
		}
		if (auth?.token) authCheck()
	}, [auth?.token])

	return ok ? <Outlet /> : <Spinner />
}

export default PrivateRoute
