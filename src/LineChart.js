import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

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

	return (
		<div>
			<Line data={data} />
		</div>
	);
};

export default LineChart;
