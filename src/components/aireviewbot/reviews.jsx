import { List, Datagrid, TextField, DateField, Pagination, Filter, DateInput, Button, useRecordContext, BooleanInput, BooleanField, ImageField } from 'react-admin';
import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, useTheme } from '@mui/material';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const getArgentinaDate = () => {
	const date = new Date().toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' });
	const [month, day, year] = date.split(',')[0].split('/');
	return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const AiBotReviewFilter = (props) => (
	<Filter {...props} variant="outlined" defaultExpanded={true}>
		<DateInput source="createdAtDate" label="Created Date" />
		<BooleanInput source="posted" label="Posted on the Forum" defaultValue={false} />
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
		</Datagrid>
	</List>
);