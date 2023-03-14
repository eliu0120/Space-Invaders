import { useState } from "react";
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LineChart from './LineChart.js';
import ProfileInfo from './ProfileInfo.js';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

function Profile() {
    const photoURL = "https://images.squarespace-cdn.com/content/v1/570c331be321403a73df5d4e/1606041549628-TK1D7ZR4518J46ZN184Y/Space+Invader+logo.png?format=1000w";

	return (<div>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'dark'
							? theme.palette.grey[80]
							: theme.palette.grey[900],
						flexGrow: 1,
						height: '100vh',
						overflow: 'auto',
						}}
					>
						
						<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
						<Grid item xs={4}>
								<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
									height: 240,
								}}
								>
									{/* Profile Picture */}
									<center><img src={photoURL} alt="Profile" width="180" height="180"/></center>
								</Paper>
							</Grid>

							{/* Profile Name and Info */}
							<Grid item xs={8}>
								<Paper
								sx={{
									p: 2,
									display: 'flex',
									flexDirection: 'column',
									height: 240,
									alignItems: "center",
									textAlign: "center",
								}}
								>
								<center><ProfileInfo /></center>
								</Paper>
							</Grid>
							
							{/* Chart of Weight */}
							<Grid item xs={12}>
								<Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
									<LineChart />
								</Paper>
							</Grid>
						</Grid>

						</Container>
                        
				</Box>
			</div>);
}

export default Profile;





