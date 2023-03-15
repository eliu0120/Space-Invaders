import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { auth, db } from "./firebase.js";
import { query, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

let dates = [];
let maxScores = [];

async function getDates(userid) {
	dates.length = 0;
	//const q2 = query(collection(db, "users", "1j6jDxI4Vradc3zHLpY9M85r7W43", "dates"));
	const q2 = query(collection(db, "users", userid, "dates"));
	const snapshot = await getDocs(q2);

	snapshot.forEach((rec) => {
		console.log("Rec.id = " + rec.id);
		dates.push(rec.id);
	});
	dates.sort();
}

async function getScores(userid) {
	console.log(dates);
	let scores = [];
	for(let i = 0; i < dates.length; i++)
	{
		//const q2 = query(collection(db, "users", "1j6jDxI4Vradc3zHLpY9M85r7W43", "dates", dates[i], "scores"));
		const q2 = query(collection(db, "users", userid, "dates", dates[i], "scores"));
		const snapshot = await getDocs(q2);
		snapshot.forEach((rec) => {
			scores.push(parseInt(rec.data().score));
			console.log("Scores.id = " + rec.data().score);
		});

		maxScores.push(Math.max(...scores));
		
		//console.log("Date = " + dates[i] + " : " + "Max val = " + Math.max(...scores));
	}
}



const LineChart = (props) => {
	const emptyData = {
		labels: [],
		datasets: [
			{
				label: "Scores",
				backgroundColor: "rgb(255, 99, 132)",
				borderColor: "rgb(255, 99, 132)",
				data: [],
			},
		],
	};

	const [data, setData] = useState(emptyData);

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				/*
				const q = query(collection(db, "users", user.uid, "dates"));
				const snapshot = await getDocs(q);

				
				let fb_dates_num = [];
				snapshot.forEach((rec) => {
					fb_dates_num.push(dateToRead(rec.id));
				});

				fb_dates_num.sort();

				let fb_dates = [];
				for (let o = 0; o < fb_dates_num.length; o++) {
					fb_dates.push("c");
				}

				let fb_scores = [];
				for (let q = 0; q < fb_dates_num.length; q++) {
					fb_scores.push(0);
				}

				snapshot.forEach((rec) => {
					let index = fb_dates_num.indexOf(dateToRead(rec.id));
					fb_dates[index] = rec.id;
					fb_scores[index] = rec.data().score;
				});
				*/

				const userid = user.uid;
				//const userid = "1j6jDxI4Vradc3zHLpY9M85r7W43";
				dates = [];
				maxScores = [];
				await getDates(userid);
				await getScores(userid);
				console.log(maxScores);
				const newData = {
					labels: dates,
					datasets: [
						{
							label: "Scores",
							backgroundColor: "rgb(255, 99, 132)",
							borderColor: "rgb(255, 99, 132)",
							data: maxScores,
						},
					],
				};
				setData(newData);
			}
		});
	}, []);

	return (
		<div>
			<Line data={data} />
		</div>
	);
};

export default LineChart;
