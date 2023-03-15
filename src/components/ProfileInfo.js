import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { auth, db } from "../firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { async } from '@firebase/util';

/*
let dates = [];
let scores = [];

async function testdb() {
	
	let info = {};
	const usersDef = collection(db, "users");
	const q1 = query(usersDef, where("uid", "==", "1j6jDxI4Vradc3zHLpY9M85r7W43"));
	const querySnapshot = await getDocs(q1);
				querySnapshot.forEach((doc) => {
					console.log("Doc = " + doc);
					info = doc.data();
					console.log("Username = " + info.username);
				});
	
	dates.length = 0;
	const q2 = query(collection(db, "users", "1j6jDxI4Vradc3zHLpY9M85r7W43", "dates"));
	const snapshot = await getDocs(q2);

	console.log("Snapshot = " + snapshot);

	snapshot.forEach((rec) => {
		console.log("Rec.id = " + rec.id);
		dates.push(rec.id);
	});
	dates.sort();
	
}



async function getScores() {
	console.log(dates);
	for(let i = 0; i < dates.length; i++)
	{
		const q2 = query(collection(db, "users", "1j6jDxI4Vradc3zHLpY9M85r7W43", "dates", dates[i], "scores"));
		const snapshot = await getDocs(q2);
		snapshot.forEach((rec) => {
			scores.push(parseInt(rec.data().score));
			console.log("Scores.id = " + rec.data().score);
		});
		
		console.log("Date = " + dates[i] + " : " + "Max val = " + Math.max(...scores));
	}
}
*/



function ProfileInfo() {

	const defaultData = {
		"username": "John Doe",
		"email": "johndoe@somecompany.com",
	};

	const [data, setData] = useState(defaultData);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				let info = {};
				const usersRef = collection(db, "users");
				const q = query(usersRef, where("uid", "==", user.uid));

				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc) => {
					info = doc.data();
				});
				setData(info);
			}
		});
		}, []);	

	return (
		<Typography variant="p" component="p">
				<font size="20"><b>{data.username}</b></font>
			<br /><br />
				{data.email}
			<br /><br />
				<em>Who's record will you beat?</em>
		</Typography>
	);
}

export default ProfileInfo;