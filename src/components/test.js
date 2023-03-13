import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";

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
        <div>
            <p>Hello World!!!</p>
            <Button type="button" onClick= {() => {
                logout();
                navigate("/")
            }}>Log Out</Button>
        </div>
    )
}