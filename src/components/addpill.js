import React from "react";
import { Create, SelectInput, SimpleForm, useNotify, useRefresh, useRedirect } from 'react-admin';
import { DateInput, TextInput, ImageInput, ImageField, required, BooleanInput } from 'react-admin';

export const PillAdd = props => {

	const notify = useNotify();
	const refresh = useRefresh();
	const redirect = useRedirect();


	const onSuccess = ({ data }) => {
		notify(`Cambios guardados`);
		redirect('/items');
		refresh();
	};

	const today = new Date().toISOString().slice(0, 10);
	const defaultValues = () => ({ date: today });

	return (
		<Create {...props} title="Agregar Pastilla" onSuccess={onSuccess}>
			<SimpleForm initialValues={defaultValues}>
				<TextInput source="name" label="Nombre" validate={required()} />
				<TextInput source="color" label="Color" validate={required()} />

				<BooleanInput label="Multiples tandas" source="multiple_batchs" />

				<DateInput source="posted_date" label="Fecha aproximada de publicacion" validate={required()} />

				<SelectInput source="substance" label="Sustancia" choices={[
					{ id: null, name: 'Desconocida' },
					{ id: 1, name: 'MDMA' },
					{ id: 2, name: 'Catinona' },
				]} helperText="Si no se sabe, dejar desconocida" />

				<SelectInput source="load" label="Carga" choices={[
					{ id: null, name: "Desconocida" },
					{ id: 1, name: 'Baja' },
					{ id: 2, name: 'Media' },
					{ id: 3, name: 'Alta' },
				]} helperText="Si no se sabe, dejar desconocida" />

				<SelectInput source="warning" label="Advertencia" choices={[
					{ id: null, name: 'Sin alerta' },
					{ id: 1, name: 'Cuidado' },
					{ id: 2, name: 'Peligrosa' },
				]} helperText="Si no tiene advertencias, elegir Sin alerta" />

				<ImageInput source="upl_image" maxSize={1024000} accept="image/*" fullWidth={false} label="Foto de la pastilla">
					<ImageField source="image"></ImageField>
				</ImageInput>

				<ImageInput source="upl_lab_image" maxSize={1024000} accept="image/*" fullWidth={false} label="Foto del test" >
					<ImageField source="lab_image"></ImageField>
				</ImageInput>

				<TextInput source="lab_url" fullWidth={true} label="URL del test" />

				<TextInput source="notes" fullWidth={true} label="Notas" multiline={true} maxRows={3} />

				<TextInput source="ap_url" label="Argenpills URL" fullWidth={true} validate={required()} />

			</SimpleForm>
		</Create>);
};