import { useState } from 'react';
import { Create, SelectInput, SimpleForm } from 'react-admin';
import { DateInput, TextInput, ImageInput, ImageField, required, BooleanInput } from 'react-admin';

export const PillAdd = props => {
	const today = new Date().toISOString().slice(0, 10);
	const [newImageUploaded, setNewImageUploaded] = useState(false);
	const [newLabImageUploaded, setNewLabImageUploaded] = useState(false);


	const transform = data => {
		let transformedData = {
			...data,
			published: true,
			newImageUploaded: newImageUploaded,
			newLabImageUploaded: newLabImageUploaded
		};

		if (transformedData.upl_image === null) delete transformedData.upl_image;
		else if (newImageUploaded) delete transformedData.image;

		if (transformedData.upl_lab_image === null) delete transformedData.upl_lab_image;
		else if (newLabImageUploaded) delete transformedData.lab_image;

		return transformedData;
	};

	return (
		<Create {...props} title="Agregar Pastilla" redirect="list" transform={transform}>
			<SimpleForm>
				<TextInput source="name" label="Nombre" validate={required()} autoComplete="off" />
				<TextInput source="color" label="Color" validate={required()} autoComplete="off" />

				<BooleanInput label="Multiples tandas" source="multiple_batchs" />

				<DateInput source="posted_date" label="Fecha aproximada de publicacion" validate={required()} defaultValue={today} />

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

				<ImageInput
					autoComplete="off"
					source="upl_image"
					maxSize={1024000}
					accept="image/*"
					fullWidth={false}
					label="Foto de la pastilla"
					onChange={() => setNewImageUploaded(true)}>
					<ImageField source="src"></ImageField>
				</ImageInput>

				<ImageInput
					autoComplete="off"
					source="upl_lab_image"
					maxSize={1024000}
					accept="image/*"
					fullWidth={false}
					label="Foto del test"
					onChange={() => setNewLabImageUploaded(true)}>
					<ImageField source="src"></ImageField>
				</ImageInput>

				<TextInput source="lab_url" fullWidth={true} label="URL del test" autoComplete="off" />

				<TextInput source="notes" fullWidth={true} label="Notas" multiline={true} maxRows={3} autoComplete="off" />

				<TextInput source="ap_url" label="Argenpills URL" fullWidth={true} validate={required()} autoComplete="off" />

				<BooleanInput label="Publicada" source="published" defaultValue={true} disabled={true} />

			</SimpleForm>
		</Create>);
};