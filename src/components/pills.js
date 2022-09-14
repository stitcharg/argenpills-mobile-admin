import React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';

export const PillList = props => (
	<List {...props} pagination={false} >
		<Datagrid rowClick="edit">
			<TextField source="name" />
			<TextField source="color" />
			<DateField source="posted_date" />
		</Datagrid>
	</List>
); 