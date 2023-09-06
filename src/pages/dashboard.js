import * as React from "react";
import { Title } from 'react-admin';
import { Card, CardContent } from '@mui/material';

const Dashboard = ({ permissions }) => {
	return (
		<Card>
			<Title title="Bienvenido a la administracion" />
			<CardContent>Desde aca se van a poder editar las pastillas, podemos subir fotos tambien. Cualquier cosa me avisan :)</CardContent>
		</Card>);
};

export default Dashboard;
