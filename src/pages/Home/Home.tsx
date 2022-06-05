import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import httpService from '../../services/httpService';
import { setAuthorizationToken } from '../../services/httpService';
import { Card, CardActions, CardContent, CardMedia, Grid } from '@mui/material';
import { Video } from './types/Video';
import DialogPlayer from '../../components/DialogPlayer/DialogPlayer';

interface HomeProps {
	loginHandle: (key: boolean) => void;
}

function Home({ loginHandle }: HomeProps) {
	const [videos, setVideos] = useState<Video[]>([]);
	const [videoId, setVideoId] = useState<number>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>();

	useEffect(() => {
		const fetchData = async () => {
			const { data }: any = await httpService.post(
				'https://thebetter.bsgroup.eu/Media/GetMediaList',
				{
					MediaListId: 2,
					IncludeCategories: false,
					IncludeImages: true,
					IncludeMedia: false,
					PageNumber: 1,
					PageSize: 15
				}
			);

			setVideos(data.Entities);
		};

		fetchData();
	}, []);

	const logout = () => {
		localStorage.removeItem('accessToken');
		setAuthorizationToken();
		loginHandle(false);
	};

	const onVideoPlay = (id: number) => {
		setVideoId(id);
		setIsModalOpen(true);
	};

	return (
		<React.Fragment>
			<GlobalStyles
				styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
			/>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
				<Toolbar sx={{ flexWrap: 'wrap' }}>
					<Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						Company name
					</Typography>
					<Button
						href="#"
						variant="outlined"
						sx={{ my: 1, mx: 1.5 }}
						onClick={logout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			{/* Hero unit */}
			<Container
				disableGutters
				maxWidth="sm"
				component="main"
				sx={{ pt: 8, pb: 6 }}>
				<Typography
					component="h1"
					variant="h2"
					align="center"
					color="text.primary"
					gutterBottom>
					Videos
				</Typography>
			</Container>
			{/* End hero unit */}
			<Container sx={{ py: 8 }} maxWidth="md">
				{/* End hero unit */}
				<Grid container spacing={4}>
					{videos.length ? (
						videos.map((video) => (
							<Grid item key={video.Id} xs={12} sm={6} md={4}>
								<Card
									sx={{
										height: '100%',
										display: 'flex',
										flexDirection: 'column'
									}}>
									<CardMedia
										component="img"
										image={video.Images[0].Url}
										alt={video.Title}
									/>
									<CardContent sx={{ flexGrow: 1 }}>
										<Typography gutterBottom variant="h5" component="h2">
											{video.Title}
										</Typography>
										<Typography>{video.Description}</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" onClick={() => onVideoPlay(video.Id)}>
											View
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))
					) : (
						<div>No content!</div>
					)}
				</Grid>
			</Container>
			{isModalOpen && (
				<DialogPlayer videoId={videoId} handleModalOpen={setIsModalOpen} />
			)}
		</React.Fragment>
	);
}

export default Home;
