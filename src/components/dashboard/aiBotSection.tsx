import { LineChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

export const AIBotSection = ({ data: dashboardData }) => {
	const [charX, setCharX] = useState(null);
	const [charY, setCharY] = useState(null);

	useEffect(() => {
		if (dashboardData != null) {
			const aiBotData = dashboardData.ai;

			// Extract the dates and values into their own arrays
			const xAxisData = aiBotData.map(item => item.date);
			const seriesData = aiBotData.map(item => item.value);

			setCharX(xAxisData);
			setCharY(seriesData);

		}
	}, [dashboardData]);

	if (dashboardData == null) return;

	return (
		<>{charY &&
			<LineChart
				series={[
					{
						data: charY,
						color: "#ffcc00",
						label: 'Chats'
					},
				]}
				xAxis={[{ scaleType: 'point', data: charX }]}
				width={500}
				height={300}
			/>
		}</>
	);


};

export default AIBotSection;
