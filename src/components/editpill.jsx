
import { useState } from 'react';
import { Edit, SelectInput, SimpleForm, ImageField, ImageInput, FormDataConsumer, Labeled, BooleanInput } from 'react-admin';
import { DateInput, TextInput, required, Button } from 'react-admin';

import { useWatch, useFormContext } from 'react-hook-form';

const IMAGE_TYPE = {
	PILL: 0,
	LAB :1
}

const ClearImageButton = ({...formDataProps}) => {
    const formContext = useFormContext();
	const existingImage = formDataProps.formData.image;
    const handleClearImage = () => {
        formContext.setValue('image', null);
    };

	console.log(existingImage);
    return (
		(existingImage != null ? 
        <Button type="button" onClick={handleClearImage}>
            Borrar
        </Button> : <></>)
    );
};

const FormValuesDisplay = () => (
	
    <FormDataConsumer>
        {({ formData }) => <pre>{JSON.stringify(formData, null, 2)}</pre>}
    </FormDataConsumer>
);

export const PillEdit = props => {
	const [newImageUploaded, setNewImageUploaded] = useState(false);
	const [newLabImageUploaded, setNewLabImageUploaded] = useState(false);		
    
	const transform = data => ({
		...data,
		newImageUploaded: newImageUploaded,
		newLabImageUploaded: newLabImageUploaded,
		published: true
	});

	const ImageDisplay = () => {
		const formContext = useFormContext();
		const imageValue = useWatch({
			name: 'image',
			control: formContext.control,
		});

		console.log(imageValue);
	
		if (imageValue === null) return <></> 

		return (<Labeled label="Foto existente">
				<ImageField source="image" />
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
                        	<ImageDisplay {...formDataProps} />
                        	<ClearImageButton {...formDataProps} />
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
					{({ formData, dispatch, ...rest }) => {
						if (!formData.upl_lab_image && formData.lab_image) {
							return (
								<div>
									<Labeled label="Foto existente">
										<ImageField source="lab_image" {...rest} />
									</Labeled>
								</div>
							);
						}
					}}
				</FormDataConsumer>

				<TextInput source="lab_url" fullWidth={true} label="URL del test" autoComplete="off" />

				<TextInput source="notes" fullWidth={true} label="Notas" multiline={true} maxRows={3} autoComplete="off" />

				<TextInput source="ap_url" label="Argenpills URL" fullWidth={true} validate={required()} autoComplete="off" />

				<BooleanInput label="Publicada" source="published" disabled={true} />

				<FormValuesDisplay />
			</SimpleForm>
		</Edit>);
};