import { Box } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Title } from 'react-admin';
import httpClient from '../tools/httpClient';
import { useEffect, useState } from 'react';
import { ColorsSection as ChartColors } from '../components/dashboard/ColorsSection';
import ChartDates from '../components/dashboard/DateSection';
import { useAuthenticated, useAuthState } from 'react-admin';

const URL = import.meta.env.VITE_ENDPOINT;
const DASHBOARD_URL = `${URL}/dashboard`;

const Dashboard = () => {
	const { isLoading, authenticated } = useAuthState();
	const [chartData, setChartData] = useState(null);

	useAuthenticated();

	useEffect(() => {
		if (!isLoading && authenticated) {
			// Fetch data from your endpoint

			httpClient(DASHBOARD_URL)
				.then(({ json }) => {
					setChartData(json);
				});
		}
	}, [isLoading, authenticated]);

	return (
		<Card>
			<Title title="Dashboard" />
			<CardContent>
				<Box>
					<h1>Dashboard</h1>
					Aca tenemos un dashboard basico para ver la cantidad y frecuencia de actualizaciones
				</Box>
				<Stack
					direction="row"
					spacing={2}
				>
					<Box>
						<h2>Por colores</h2>
						<ChartColors data={chartData} />
					</Box>
					<Box>
						<h2>Por fecha</h2>
						<ChartDates data={chartData} />
					</Box>
				</Stack>
			</CardContent>
		</Card>);
};

export default Dashboard;
