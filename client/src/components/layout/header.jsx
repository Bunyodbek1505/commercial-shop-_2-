import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import SearchInput from '../Form/SearchInput'

const Header = () => {
	const [auth, setAuth] = useAuth()

	const handleLogout = () => {
		setAuth({
			...auth,
			user: null,
			token: '',
		})
		localStorage.removeItem('auth')
		toast.success('Logout Successfully')
	}

	return (
		<>
			<Navbar expand='lg' className='navbar bg-body-tertiary'>
				<Container fluid>
					<Navbar.Brand href='#'>Online Shop</Navbar.Brand>
					<Navbar.Toggle aria-controls='navbarScroll' />
					<Navbar.Collapse id='navbarScroll'>
						<Nav
							className='ms-auto my-2 my-lg-0'
							style={{ maxHeight: '100px' }}
							navbarScroll
						>
							<SearchInput/>
							<Nav.Link as={NavLink} to={'/'}>
								Home
							</Nav.Link>
							<Nav.Link as={NavLink} to={'/category'}>
								Category
							</Nav.Link>
							{!auth.user ? (
								<>
									<Nav.Link as={NavLink} to={'/register'}>
										Register
									</Nav.Link>
									<Nav.Link as={NavLink} to={'/login'}>
										Login
									</Nav.Link>
								</>
							) : (
								<NavDropdown
									title={auth?.user?.name}
									id='navbarScrollingDropdown'
								>
									<NavDropdown.Item as={NavLink} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
										}`}>
										Dashboard
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										onClick={handleLogout}
										as={NavLink}
										to={'/login'}
									>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							)}
							<Nav.Link as={NavLink} to={'/cart'}>
								Cart (0)
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default Header
