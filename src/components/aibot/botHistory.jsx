import { List, Datagrid, TextField, DateField, Pagination, Filter, DateInput, Button, useRecordContext } from 'react-admin';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, useTheme } from '@mui/material';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const getArgentinaDate = () => {
	const date = new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });
	const [month, day, year] = date.split(',')[0].split('/');
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const AiBotHistoryFilter = (props) => (
	<Filter {...props} alwaysOn={true} defaultExpanded={true} variant="outlined">
		<DateInput source="createdAtDate" label="Created Date" />
	</Filter>
);

const JsonViewer = ({ source }) => {
	const [open, setOpen] = useState(false);
	const record = useRecordContext();
	const theme = useTheme();
	let jsonData = null;

	if (!record) return null;

	try {
		jsonData = JSON.parse(record[source]);
	} catch (e) {
		return <TextField source={source} />;
	}

	return (
		<>
			<Button onClick={() => setOpen(true)} label="Resultados" />
			<Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
				<DialogTitle>Respuesta</DialogTitle>
				<DialogContent>
					<Typography component="pre" style={{
						whiteSpace: 'pre-wrap',
						wordBreak: 'break-word',
						backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
						color: theme.palette.text.primary,
						padding: '16px',
						borderRadius: '4px',
						overflow: 'auto',
						fontFamily: 'monospace'
					}}>
						{JSON.stringify(jsonData, null, 2)}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} label="Close" />
				</DialogActions>
			</Dialog>
		</>
	);
};

export const aiBotHistoryList = props => (
	<List {...props}
		filters={<AiBotHistoryFilter />}
		pagination={false}
		resource='aibot'
		exporter={false}
		title="Argenpills AI Bot history"
		storeKey={false}
		empty={false}
		filterDefaultValues={{ createdAtDate: getArgentinaDate() }}>
		<Datagrid>
			<TextField source="username" />
			<TextField source="chat_id" />
			<DateField source="created_at" showTime={true}
				options={{
					timeZone: 'UTC',  // Set to your server's timezone
					hour12: false     // Use 24-hour format
				}} />
			<TextField source="question" />
			<JsonViewer source="answer" />
		</Datagrid>
	</List>
);