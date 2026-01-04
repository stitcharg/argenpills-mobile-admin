import { List, Datagrid, TextField, BooleanField } from 'react-admin';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const FactList = props => (
	<List {...props}
		resource='facts'
		exporter={false}
		pagination={false}
		title="Argenpills Facts"
		storeKey={false}>
		<Datagrid rowClick="edit">
			<TextField source="id" />
			<TextField source="fact" />
			<BooleanField source="used" />
		</Datagrid>
	</List>
);
