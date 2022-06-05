import React, { useState } from 'react';
import { Avatar, Button, Box, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import httpService, { setAuthorizationToken } from '../../services/httpService';
import { v4 as uuid } from 'uuid';

interface LoginProps {
	loginHandler: (value: boolean) => void;
}

export default function Login({ loginHandler }: LoginProps) {
	const [usernameControl, setUsernameControl] =
		useState<string>('test@bsgroup.eu');
	const [passwordControl, setPasswordControl] = useState<string>('Test12!@');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { data } = await httpService.post('/Authorization/SignIn', {
			username: usernameControl,
			password: passwordControl,
			Device: {
				PlatformCode: 'WEB',
				Name: uuid()
			}
		});
		const accessToken = data.AuthorizationToken.Token;

		localStorage.setItem('accessToken', accessToken);
		setAuthorizationToken(accessToken);

		if (accessToken) {
			loginHandler(!!accessToken);
		}
	};

	return (
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
	);
}
