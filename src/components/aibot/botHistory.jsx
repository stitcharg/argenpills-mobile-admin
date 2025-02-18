import { List, Datagrid, TextField, DateField, Pagination } from 'react-admin';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const aiBotHistoryList = props => (
	<List {...props}
		//pagination={<PostPagination />}
		resource='aibot'
		exporter={false}
		pagination={false}
		title="Argenpills AI Bot history"
		storeKey={false}>
		<Datagrid>
			<TextField source="username" />
			<DateField source="created_at" showTime={true} />
			<TextField source="question" />
			<TextField source="answer" />
		</Datagrid>
	</List>
); 