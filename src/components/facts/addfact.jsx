import { Create, SimpleForm, TextInput, BooleanInput, required } from 'react-admin';

export const FactAdd = props => {

	const transform = data => {
		let transformedData = {
			fact: data.fact,
			used: data.used ? 1 : 0,
		};
		return transformedData;
	};

	return (
		<Create {...props} title="Agregar Fact" redirect="list" transform={transform}>
			<SimpleForm>
				<TextInput source="fact" label="Fact" validate={required()} autoComplete="off" multiline fullWidth />
				<BooleanInput source="used" label="Utilizado" defaultValue={false} />
			</SimpleForm>
		</Create>
	);
};
