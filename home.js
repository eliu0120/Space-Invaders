
import './App.css';
import React, { useState } from "react";
import {Stack ,Button, Typography} from "@mui/material";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import background from "./background.jpg";


function App() {
  return (
    <div  style={{height: '100vh',
      width: '162.91vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      position: 'aboslute', backgroundImage: `url(${background})`}} >
    <div className="App" sx={{":hover":{boxShadow:"10px 10px 20px #ccc",}}}>
      <Typography fontSize={100} color="white" style= {{minHeight:"40vh"}} margin="normal" textAlign="center">Space Invaders</Typography>
      <Stack>
      <Button endIcon = {<RocketLaunchRoundedIcon/>} sx= {{ borderRadius:3}} margin="normal" color= "success"variant="contained" >Play </Button>
      </Stack>
      <Stack>
      <Button endIcon={<AccountBoxRoundedIcon/>} sx= {{marginTop:3, borderRadius:3}} margin="normal" color="secondary" variant="contained" >Profile</Button>
      </Stack>
      {/*<Stack>
      <Button endIcon={<LeaderboardRoundedIcon />} sx= {{marginTop:3, borderRadius:3}} margin="normal" varient="contained" >Leaderboard</Button> 
      { </Stack> */}
      <Stack>
      <Button endIcon={<LogoutRoundedIcon/>} sx= {{ marginTop:3, borderRadius:3, minHeight: "5vh"}} width={"200%"} color="error" >Logout</Button>
      </Stack>
    </div>
    </div>
  );
}

export default App;
