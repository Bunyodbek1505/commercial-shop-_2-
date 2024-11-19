import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast'
import Layout from '../../components/layout/layout'

const Register = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [answer, setAnswer] = useState('')

	const navigate = useNavigate()

	const handeSubmit = async e => {
		e.preventDefault()
		try {
			const res = await axios.post(
				`http://localhost:8080/api/v1/auth/register`,
				{
					name,
					email,
					password,
					phone,
					address,
					answer,
				}
			)

			if (res && res.data.success) {
				toast.success(res.data && res.data.message)
				navigate('/login')
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
				<h1>Register</h1>
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
						<label htmlFor='exampleInputName' className='form-label'>
							Name
						</label>
						<input
							type='text'
							className='form-control'
							id='exampleInputName'
							value={name}
							onChange={e => setName(e.target.value)}
							required
						/>
					</div>
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
						<label htmlFor='exampleInputPhone' className='form-label'>
							Phone
						</label>
						<input
							type='phone'
							className='form-control'
							value={phone}
							onChange={e => setPhone(e.target.value)}
							required
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='exampleInputAdress' className='form-label'>
							Adress
						</label>
						<input
							type='text'
							className='form-control'
							value={address}
							onChange={e => setAddress(e.target.value)}
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
					<div className='mb-3'>
						<input
							type='text'
							value={answer}
							onChange={e => setAnswer(e.target.value)}
							className='form-control'
							id='exampleInputEmail1'
							placeholder='What is Your Favorite sports'
							required
						/>
					</div>
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</form>
			</div>
		</Layout>
	)
}

export default Register
