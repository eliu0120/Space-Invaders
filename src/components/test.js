import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {Stack ,Button, Typography} from "@mui/material";

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
      <div className="App" sx={{ ":hover": { boxShadow: "10px 10px 20px #ccc", } }}>
        <Typography fontSize={100} color="white" style={{ minHeight: "40vh" }} margin="normal" textAlign="center">Space Invaders</Typography>
        <Stack>
          <Button sx={{ borderRadius: 3 }} margin="normal" color="success" varient="contained" onClick = { () => {
            window.location.href ="game.html"
          }}> Play </Button>
        </Stack>
        <Stack>
          <Button sx={{ marginTop: 3, borderRadius: 3 }} margin="normal" color="secondary" varient="contained" onClick = { () => {
            navigate("/profile");
          }}>Profile</Button>
        </Stack>
        <Stack>
          <Button sx={{ marginTop: 3, borderRadius: 3, minHeight: "5vh" }} width={"200%"} color="error" varient="contained" onClick = { () => {
            logout();
            navigate("/");
          }}>Logout</Button>
        </Stack>
      </div>
    </div>
  );
}