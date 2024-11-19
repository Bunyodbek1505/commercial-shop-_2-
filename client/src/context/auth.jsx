import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: '',
	})

	// default axios - bu orqali amalga oshiriladigan barcha HTTP so'rovlariga avtomatik ravishda Authorization sarlavhasini qo'shadi. Shu tariqa, har bir API so'rov foydalanuvchi tokeni bilan yuboriladi va server token asosida foydalanuvchining tizimga kirganini tekshiradi.
	axios.defaults.headers.common['Authorization'] = auth?.token

	useEffect(() => {
		const data = localStorage.getItem('auth')
		if (data) {
			const parseData = JSON.parse(data)
			setAuth({
				...auth,
				user: parseData.user,
				token: parseData.token,
			})
		}
	}, [])
	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	)
}

// custom hook
const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
