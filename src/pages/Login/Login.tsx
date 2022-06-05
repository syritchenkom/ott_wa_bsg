import * as React from 'react';
import {
	Avatar,
	Button,
	Box,
	CssBaseline,
	TextField,
	Container,
	Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import httpService, { setAuthorizationToken } from '../../services/httpService';

function Login({ isLoginHandler: string }) {
	const [usernameControl, setUsernameControl] =
		React.useState<string>('test@bsgroup.eu');
	const [passwordControl, setPasswordControl] =
		React.useState<string>('Test12!@');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// const data = new FormData(event.currentTarget);
		// console.log({
		// 	userName: data.get('username'),
		// 	password: data.get('password')
		// });

		// const { data } = await httpService.post('/user/login', { //????
		const { data } = await httpService.post(
			'https://thebetter.bsgroup.eu/Authorization/SignIn',
			{
				username: usernameControl,
				password: passwordControl
			}
		);

		localStorage.setItem('loginToken', data.key);
		setAuthorizationToken(data.key);

		if (data.key) {
			isLoginHandler(!!data.key);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="User Name"
						name="username"
						value={usernameControl}
						onChange={(e) => setUsernameControl(e.target.value)}
						autoComplete="username"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						value={passwordControl}
						onChange={(e) => setPasswordControl(e.target.value)}
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
}

export default Login;
