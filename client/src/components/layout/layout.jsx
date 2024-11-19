/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet'
// import { ToastContainer } from 'react-toastify'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './footer'
import Header from './header'

const Layout = ({
	children,
	title = 'Ecommerce app - shop now',
	description = 'mern stack project',
	keywords = 'mern,react,node,mongodb',
	author = 'Techinfoyt',
}) => {
	return (
		<div
			style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
		>
			<Helmet>
				<meta charSet='utf-8' />
				<meta name='description' content={description} />
				<meta name='keywords' content={keywords} />
				<meta name='author' content={author} />
				<title>{title}</title>
				<link rel='canonical' href='http://mysite.com/example' />
			</Helmet>
			<Header />
			<main style={{ flex: 1 }}>
				{/* <ToastContainer /> */}
				<Toaster />
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default Layout
