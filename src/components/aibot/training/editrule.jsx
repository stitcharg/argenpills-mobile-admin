import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export const RuleEdit = props => {

	const transform = data => {
		let transformedData = {
			input: data.input,
			output: data.output,
		};
		return transformedData;
	};

	return (
		<Edit {...props} title="Agregar Regla" redirect="list" transform={transform}>
			<SimpleForm>
				<TextInput source="input" label="Input" validate={required()} autoComplete="off" />
				<TextInput source="output" label="Output" validate={required()} autoComplete="off" multiline={false} fullWidth />
			</SimpleForm>
		</Edit>
	);
};
