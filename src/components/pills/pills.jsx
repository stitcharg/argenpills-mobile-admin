import { List, Datagrid, TextField, DateField, Pagination, ListBase } from 'react-admin';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const PillList = props => (
	<List {...props} pagination={<PostPagination />} resource='items' exporter={false} title="Pastillas">
		<Datagrid rowClick="edit">
			<TextField source="name" />
			<TextField source="color" />
			<DateField source="posted_date" />
		</Datagrid>
	</List>
); 