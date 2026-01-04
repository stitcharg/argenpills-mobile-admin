import { Edit, SimpleForm, TextInput, BooleanInput, required } from 'react-admin';

export const FactEdit = props => {

	const transform = data => {
		let transformedData = {
			fact: data.fact,
			used: data.used ? 1 : 0,
		};
		return transformedData;
	};

	return (
		<Edit {...props} title="Editar Fact" redirect="list" transform={transform}>
			<SimpleForm>
				<TextInput source="id" disabled />
				<TextInput source="fact" label="Fact" validate={required()} autoComplete="off" multiline fullWidth />
				<BooleanInput source="used" label="Utilizado" />
			</SimpleForm>
		</Edit>
	);
};
