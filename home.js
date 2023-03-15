import './style.css';
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
      position: 'absolute', backgroundImage: `url(${background})`}} >
    <div className="App" sx={{":hover":{boxShadow:"5px 5px 20px #ccc",}}}>
      <Typography fontSize={100} color="white" style= {{minHeight:"40vh"}} fontFamily="Stick No Bills" margin="normal" textAlign="center">Space Invaders</Typography>
      <Stack justifyContent="center" alignItems="center" >
      <Button style={{maxWidth:"150px"}} textAlign='center' endIcon = {<RocketLaunchRoundedIcon/>} sx= {{ borderRadius:3}} margin="normal" color= "success"variant="contained" >Play </Button>
      </Stack>
      <Stack justifyContent="center" alignItems="center" >
      <Button style={{maxWidth:"150px"}}  textAlign='center' endIcon={<AccountBoxRoundedIcon/>} sx= {{marginTop:3, borderRadius:3}} margin="normal" color="secondary" variant="contained" >Profile</Button>
      </Stack>
      {/*<Stack justifyContent="center" alignItems="center" >
      <Button style={{maxWidth:"150px"}} textAlign='center' endIcon={<LeaderboardRoundedIcon />} sx= {{marginTop:3, borderRadius:3}} margin="normal" variant="contained" >Leaderboard</Button>
  </Stack>*/}
      <Stack justifyContent="center" alignItems="center" >
      <Button style={{maxWidth:"150px"}}  textAlign='center' endIcon={<LogoutRoundedIcon/>} sx= {{ marginTop:3, borderRadius:3, minHeight: "5vh"}} width={"200%"} color="error" variant="contained" >Logout</Button>
      </Stack>
    </div>
    </div>
  );
}

export default App;
