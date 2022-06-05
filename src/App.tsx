import React, { useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { setAuthorizationToken } from './services/httpService';
import Loader from './components/Loader/Loader';

const theme = createTheme();

function App() {
	const token = localStorage.getItem('accessToken');
	const [isLogin, setIsLogin] = useState(!!token);

	token && setAuthorizationToken(token);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{isLogin ? (
				<Home loginHandle={setIsLogin} />
			) : (
				<Container component="main" maxWidth="xs">
					<Login
						loginHandler={(value: any) => {
							setIsLogin(value);
						}}
					/>
				</Container>
			)}
			<ToastContainer />
			<Loader />
		</ThemeProvider>
	);
}
export default App;
