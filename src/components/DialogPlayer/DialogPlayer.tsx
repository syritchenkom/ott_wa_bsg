import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import httpService from '../../services/httpService';
import ReactPlayer from 'react-player';

interface DialogPlayerProps {
	videoId?: number;
	handleModalOpen: (isOpen: boolean) => void;
}

export default function DialogPlayer({
	videoId,
	handleModalOpen
}: DialogPlayerProps) {
	const [videoContent, setVideoContent] = useState<any>();

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await httpService.post('/Media/GetMediaPlayInfo', {
				MediaId: videoId,
				StreamType: 'Trial'
			});

			setVideoContent(data);
		};

		fetchData();
	}, [videoId]);

	const handleClose = () => {
		handleModalOpen(false);
	};

	return (
		<>
			<Dialog fullWidth={true} maxWidth="md" open={true} onClose={handleClose}>
				<DialogTitle>Optional sizes</DialogTitle>
				<DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
					{videoContent?.ContentUrl ? (
						<ReactPlayer
							url={videoContent.ContentUrl}
							playing
							config={{
								file: {
									attributes: {
										autoPlay: true,
										controls: true
									}
								}
							}}
						/>
					) : (
						<div>No video!</div>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
