
import { useState } from 'react';
import { Edit, SelectInput, SimpleForm, ImageField, ImageInput, FormDataConsumer, Labeled, BooleanInput } from 'react-admin';
import { DateInput, TextInput, required, Button } from 'react-admin';
import { FormValuesDisplay } from './formvaluesdisplay';
import { useWatch, useFormContext } from 'react-hook-form';

const IMAGE_TYPE = {
	PILL: 0,
	LAB: 1
}

export const PillEdit = props => {
	const [newImageUploaded, setNewImageUploaded] = useState(false);
	const [newLabImageUploaded, setNewLabImageUploaded] = useState(false);

	const transform = data => {
		let transformedData = {
			...data,
			newImageUploaded: newImageUploaded,
			newLabImageUploaded: newLabImageUploaded,
			published: true
		};

		if (transformedData.image === null) delete transformedData.image;
		if (transformedData.lab_image === null) delete transformedData.lab_image;

		if (transformedData.upl_image === null) delete transformedData.upl_image;
		else if (newImageUploaded) delete transformedData.image;

		if (transformedData.upl_lab_image === null) delete transformedData.upl_lab_image;
		else if (newLabImageUploaded) delete transformedData.lab_image;

		return transformedData;
	};

	const ClearImageButton = ({ imageType, ...formDataProps }) => {
		const formContext = useFormContext();

		let controlName = '';
		let existingImage = '';
		switch (imageType) {
			case IMAGE_TYPE.PILL: {
				controlName = 'image';
				existingImage = formDataProps.formData.image;
				break;
			}
			case IMAGE_TYPE.LAB: {
				controlName = 'lab_image';
				existingImage = formDataProps.formData.lab_image;
				break;
			}
		}

		const handleClearImage = (field) => {
			formContext.setValue(field, null);
		};

		return (
			(existingImage != null ?
				<Button onClick={() => handleClearImage(controlName)} label='Borrar'></Button> : null)
		);
	};

	const ImageDisplay = ({ imageType }) => {
		const formContext = useFormContext();

		let controlName = '';
		switch (imageType) {
			case IMAGE_TYPE.PILL: {
				controlName = 'image';
				break;
			}
			case IMAGE_TYPE.LAB: {
				controlName = 'lab_image';
				break;
			}
		}

		const imageValue = useWatch({
			name: controlName,
			control: formContext.control,
		});

		if (imageValue === null) return <></>

		return (
			<Labeled label="Foto existente">
				<ImageField source={controlName} />
			</Labeled>);
	};

	return (
		<Edit {...props} title="Editar informacion" redirect="list" transform={transform}>
			<SimpleForm>
				<TextInput source="name" label="Nombre" validate={required()} autoComplete="off" />
				<TextInput source="color" label="Color" validate={required()} autoComplete="off" />

				<BooleanInput label="Multiples tandas" source="multiple_batchs" />

				<DateInput source="posted_date" label="Fecha aproximada de publicacion" validate={required()} />

				<SelectInput source="substance" label="Sustancia" emptyText="Desconocida" choices={[
					{ id: 1, name: 'MDMA' },
					{ id: 2, name: 'Catinona' },
				]} helperText="Si no se sabe, dejar desconocida" />

				<SelectInput source="load" label="Carga" emptyText="Desconocida" choices={[
					{ id: 1, name: 'Baja' },
					{ id: 2, name: 'Media' },
					{ id: 3, name: 'Alta' },
				]} helperText="Si no se sabe, dejar desconocida" />

				<SelectInput source="warning" label="Advertencia" emptyText="Sin alerta" choices={[
					{ id: 1, name: 'Cuidado' },
					{ id: 2, name: 'Peligrosa' },
				]} helperText="Si no tiene advertencias, elegir Sin alerta" />

				<ImageInput
					source="upl_image"
					maxSize={1024000}
					accept="image/*"
					fullWidth={false} label="Foto de la pastilla"
					onChange={() => setNewImageUploaded(true)}>

					<ImageField source="src"></ImageField>
				</ImageInput>

				<FormDataConsumer>
					{formDataProps => (
						<>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<ImageDisplay imageType={IMAGE_TYPE.PILL} />
								<ClearImageButton {...formDataProps} imageType={IMAGE_TYPE.PILL} />
							</div>
						</>
					)}
				</FormDataConsumer>

				<ImageInput
					source="upl_lab_image"
					maxSize={1024000}
					accept="image/*"
					fullWidth={false} label="Foto del test"
					onChange={() => setNewLabImageUploaded(true)}>

					<ImageField source="src"></ImageField>
				</ImageInput>

				<FormDataConsumer>
					{formDataProps => (
						<>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<ImageDisplay imageType={IMAGE_TYPE.LAB} />
								<ClearImageButton {...formDataProps} imageType={IMAGE_TYPE.LAB} />
							</div>
						</>
					)}
				</FormDataConsumer>

				<TextInput source="lab_url" fullWidth={true} label="URL del test" autoComplete="off" />

				<TextInput source="notes" fullWidth={true} label="Notas" multiline={true} maxRows={3} autoComplete="off" />

				<TextInput source="ap_url" label="Argenpills URL" fullWidth={true} validate={required()} autoComplete="off" />

				<BooleanInput label="Publicada" source="published" disabled={true} />

			</SimpleForm>
		</Edit>);
};