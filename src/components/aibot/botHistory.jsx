import { List, Datagrid, TextField, DateField, Pagination, Filter, DateInput } from 'react-admin';

const PostPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const AiBotHistoryFilter = (props) => (
	<Filter {...props} alwaysOn={true} defaultExpanded={true} >
		<DateInput source="createdAtDate" label="Created Date" defaultValue={new Date().toISOString().split('T')[0]} />
	</Filter>
);

export const aiBotHistoryList = props => (
	<List {...props}
		filters={<AiBotHistoryFilter />}
		pagination={false}
		resource='aibot'
		exporter={false}
		title="Argenpills AI Bot history"
		storeKey={false}>
		<Datagrid>
			<TextField source="username" />
			<DateField source="created_at" showTime={true}
				options={{
					timeZone: 'UTC',  // Set to your server's timezone
					hour12: false     // Use 24-hour format
				}} />
			<TextField source="question" />
			<TextField source="answer" />
		</Datagrid>
	</List>
); 