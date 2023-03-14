import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { auth, logout, addImage } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";

export default function Test() {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [selectedImage, setSelectedImage] = useState("");

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

      <Button type="button" onClick={() => {
        logout();
        navigate("/")
      }}>Log Out</Button>

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }}
      />
      <img src={selectedImage} alt="something"></img>

      <Button type="button" onClick={() => {
        addImage(selectedImage);
      }}>upload</Button>

      <a href="game.html">Gameing</a>
    </div>
  )
}