import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import Layout from '../../components/layout/layout'
import { useAuth } from '../../context/auth'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [auth, setAuth] = useAuth()

	const navigate = useNavigate()
	const location = useLocation()

	const handeSubmit = async e => {
		e.preventDefault()
		try {
			const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
				email,
				password,
			})

			if (res && res.data.success) {
				toast.success(res.data && res.data.message) -
					navigate(location.state || '/')
				setAuth({
					...auth,
					user: res.data.user,
					token: res.data.token,
				})
				localStorage.setItem('auth', JSON.stringify(res.data))
			} else {
				toast.error(res.data.message)
			}
		} catch (error) {
			console.log('ERROR:', error)
			toast.error('Something went wrong')
		}
	}

	return (
		<Layout title={'Register'}>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<h1>Login</h1>
				<form
					onSubmit={handeSubmit}
					style={{
						width: '400px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<div className='mb-3'>
						<label htmlFor='exampleInputEmail' className='form-label'>
							Email
						</label>
						<input
							type='email'
							className='form-control'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='exampleInputPassword1' className='form-label'>
							Password
						</label>
						<input
							type='password'
							className='form-control'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className='mb-3 w-full'>
						<button
							type='button'
							className='btn btn-primary w-full'
							onClick={() => {
								navigate('/forgot-password')
							}}
						>
							Forgot Password
						</button>
					</div>
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</form>
			</div>
		</Layout>
	)
}

export default Login
