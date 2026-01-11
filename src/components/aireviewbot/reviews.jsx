import { List, Datagrid, TextField, Pagination, Filter, DateInput, Button, useRecordContext, BooleanInput, BooleanField, ImageField, useDataProvider, useNotify, useRefresh } from 'react-admin';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button as MuiButton } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const getArgentinaDate = () => {
	const date = new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });
	const [month, day, year] = date.split(',')[0].split('/');
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const PostToForumButton = () => {
	const record = useRecordContext();
	const dataProvider = useDataProvider();
	const notify = useNotify();
	const refresh = useRefresh();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	if (!record) return null;

	const handleClick = (e) => {
		e.stopPropagation();
		setOpen(true);
	};

	const handleConfirm = async () => {
		setLoading(true);
		try {
			await dataProvider.postforum('aireviewsbot', { photoId: record.photoId });
			notify('Posted to forum successfully');
			refresh();
		} catch (error) {
			notify('Error posting to forum: ' + (error.message || 'Unknown error'), { type: 'error' });
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				label="Publicar en el Foro"
				onClick={handleClick}
				disabled={record.posted}
			>
				<ForumIcon />
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Confirmar el posteo</DialogTitle>
				<DialogContent>
					<Typography>¿Estás seguro de que quieres publicar esta reseña para "{record.name}" en el foro?</Typography>
				</DialogContent>
				<DialogActions>
					<MuiButton onClick={handleClose} disabled={loading}>Cancelar</MuiButton>
					<MuiButton onClick={handleConfirm} color="primary" disabled={loading} autoFocus>
						{loading ? 'Publicando...' : 'Confirmar'}
					</MuiButton>
				</DialogActions>
			</Dialog>
		</>
	);
};

const AiBotReviewFilter = (props) => (
	<Filter {...props} variant="outlined" defaultExpanded={true}>
		<DateInput source="createdAtDate" label="Created Date" />
		<BooleanInput source="posted" label="Posted to the Forum" defaultValue={false} />
	</Filter>
);

export const aiBotReviewList = props => (
	<List {...props}
		filters={<AiBotReviewFilter />}
		pagination={false}
		resource='aireviewsbot'
		exporter={false}
		title="Argenpills AI Reviews"
		storeKey={false}
		empty={false}
		filterDefaultValues={{ createdAtDate: getArgentinaDate(), posted: false }}
		initialValues={{ posted: true }}>
		<Datagrid bulkActionButtons={false}>
			<TextField source="photoId" />
			<TextField source="name" />
			<TextField source="color" />
			<ImageField source="fullImage" />
			<BooleanField source="posted" />
			<PostToForumButton />
		</Datagrid>
	</List>
);