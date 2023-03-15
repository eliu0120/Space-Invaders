import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {Stack ,Button, Typography} from "@mui/material";
import './fonts.css'

export default function Test() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      }
    })
  }, [user]);

  return (
    <div style={{ 
      backgroundImage: "url(/background.jpg)",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh'
    }}>
      <div className="App" sx={{":hover":{boxShadow:"5px 5px 20px #ccc",}}}>
        <Typography fontSize={100} color="white" style= {{minHeight:"40vh"}} fontFamily="Stick No Bills" margin="normal" textAlign="center">Space Invaders</Typography>
        <Stack justifyContent="center" alignItems="center" >
          <Button style={{maxWidth:"150px"}} textAlign='center' endIcon = {<RocketLaunchRoundedIcon/>} sx= {{ borderRadius:3}} margin="normal" 
          color= "success"variant="contained" onClick = { () => {
            window.location.href ="game.html"
          }}> Play </Button>
        </Stack>
        <Stack justifyContent="center" alignItems="center" >
          <Button style={{maxWidth:"150px"}}  textAlign='center' endIcon={<AccountBoxRoundedIcon/>} sx= {{marginTop:3, borderRadius:3}} 
          margin="normal" color="secondary" variant="contained" onClick = { () => {
            navigate("/profile");
          }}>Profile</Button>
        </Stack>
        <Stack justifyContent="center" alignItems="center" >
          <Button style={{maxWidth:"150px"}}  textAlign='center' endIcon={<LogoutRoundedIcon/>} 
          sx= {{ marginTop:3, borderRadius:3, minHeight: "5vh"}} width={"200%"} color="error" variant="contained" onClick = { () => {
            logout();
            navigate("/");
          }}>Logout</Button>
        </Stack>
      </div>
    </div>
  );
}