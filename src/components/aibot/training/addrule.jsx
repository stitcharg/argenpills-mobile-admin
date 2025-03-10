import { Create, SimpleForm, TextInput, required } from 'react-admin';

export const RuleAdd = props => {

	const transform = data => {
		let transformedData = {
			input: data.input,
			output: data.output,
		};
		return transformedData;
	};

	return (
		<Create {...props} title="Agregar Regla" redirect="list" transform={transform}>
			<SimpleForm>
				<TextInput source="input" label="Input" validate={required()} autoComplete="off" />
				<TextInput source="output" label="Output" validate={required()} autoComplete="off" multiline={false} fullWidth />
			</SimpleForm>
		</Create>
	);
};
