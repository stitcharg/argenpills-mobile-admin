import { List, Datagrid, TextField, DateField, Pagination } from 'react-admin';

export const aiBotTrainingData = props => (
	<List {...props}
		//pagination={<PostPagination />}
		resource='trainingdata'
		exporter={false}
		pagination={false}
		title="Argenpills AI Training Data"
		storeKey={false}>
		<Datagrid>
			<TextField source="id" />
			<TextField source="input" />
			<TextField source="output" />
		</Datagrid>
	</List>
); 