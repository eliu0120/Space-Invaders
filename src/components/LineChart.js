import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";
import { auth, db } from "../firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function monthNum(month) {
	switch (month) {
		case 'Jan':
			return '01';
		case 'Feb':
			return '02';
		case 'Mar':
			return '03';
		case 'Apr':
			return '04';
		case 'May':
			return '05';
		case 'Jun':
			return '06';
		case 'Jul':
			return '07';
		case 'Aug':
			return '08';
		case 'Sep':
			return '09';
		case 'Oct':
			return '10';
		case 'Nov':
			return '11';
		default:
			return '12';
	}
}

function dateToNum(date) {
	return Number(date.substring(11, 15) + monthNum(date.substring(4, 7)) + date.substring(8, 10));
}




const LineChart = (props) => {
	const emptyData = {
		labels: [],
		datasets: [
			{
				label: "Points",
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
				const q = query(collection(db, "users", user.uid, "dates"));
				const snapshot = await getDocs(q);


				let fb_dates_num = [];
				snapshot.forEach((rec) => {
					fb_dates_num.push(dateToNum(rec.id));
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
					let index = fb_dates_num.indexOf(dateToNum(rec.id));
					fb_dates[index] = rec.id;
					fb_scores[index] = rec.data().score;
				});

				const newData = {
					labels: fb_dates,
					datasets: [
						{
							label: "Scores",
							backgroundColor: "rgb(255, 99, 132)",
							borderColor: "rgb(255, 99, 132)",
							data: fb_scores,
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
