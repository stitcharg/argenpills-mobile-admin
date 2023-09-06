import React from "react";
import { Edit, SelectInput, SimpleForm, ImageField, ImageInput, FormDataConsumer, Labeled, BooleanInput } from 'react-admin';
import { DateInput, TextInput, required } from 'react-admin';

export const PillEdit = props => {

	return (
		<Edit {...props} title="Editar informacion" >
			<SimpleForm label="Test">
				<TextInput source="name" label="Nombre" validate={required()} autoComplete="false" />
				<TextInput source="color" label="Color" validate={required()} autoComplete="false" />

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

				<ImageInput source="upl_image" maxSize={1024000} accept="image/*" fullWidth={false} label="Foto de la pastilla">
					<ImageField source="image"></ImageField>
				</ImageInput>

				<FormDataConsumer>
					{({ formData, dispatch, ...rest }) => {
						if (!formData.upl_image && formData.image) {
							const { getSource, ...rest } = props;
							return (
								<div>
									<Labeled label="Foto existente">
										<ImageField source="image" {...props} />
									</Labeled>
								</div>
							);
						}
					}}
				</FormDataConsumer>

				<ImageInput source="upl_lab_image" maxSize={1024000} accept="image/*" fullWidth={false} label="Foto del test" >
					<ImageField source="lab_image"></ImageField>
				</ImageInput>

				<FormDataConsumer>
					{({ formData, dispatch, ...rest }) => {
						if (!formData.upl_lab_image && formData.lab_image) {
							const { getSource, ...rest } = props;
							return (
								<div>
									<Labeled label="Foto existente">
										<ImageField source="lab_image" {...props} />
									</Labeled>
								</div>
							);
						}
					}}
				</FormDataConsumer>

				<TextInput source="lab_url" fullWidth={true} label="URL del test" autoComplete="false" />

				<TextInput source="notes" fullWidth={true} label="Notas" multiline={true} maxRows={3} autoComplete="false" />

				<TextInput source="ap_url" label="Argenpills URL" fullWidth={true} validate={required()} autoComplete="false" />

			</SimpleForm>
		</Edit>);
};