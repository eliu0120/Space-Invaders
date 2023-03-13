import { useState } from "react";
import './App.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import LineChart from './LineChart.js';
import ProfileInfo from './ProfileInfo.js';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from "@mui/material";

function Profile() {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [photoURL, setPhotoURL] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");



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
                                    <IconButton size="small" color="primary" aria-label="upload picture" component="label">
                                        <input hidden accept="image/*" type="file" />
                                        Choose File
                                    </IconButton>
                                    <Button variant="contained" size="small" disabled={loading || !photo} 
                                    >Upload</Button>
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





