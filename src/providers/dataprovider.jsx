import httpClient from '../tools/httpClient';
import restServerProvider from 'ra-data-json-server';
import { fetchUtils } from 'react-admin';

const URL = import.meta.env.VITE_ENDPOINT;
const dataProvider = restServerProvider(URL, httpClient);
const CDN_IMAGES = import.meta.env.VITE_CDN_IMAGES;
const STORAGE_LASTEVALKEY = "LastEvaluatedKey";

export const apPillProvider = {
	...dataProvider,
	getOne: (resource, params) => dataProvider.getOne(resource, params).then(response => {
		return response;
	}),
	getList: async (resource, params) => {
		const { page, perPage } = params.pagination;

		//We check if we have a lastEvaluatedKey in storage
		let url = `${URL}/${resource}?pageSize=${perPage}`;

		const lastKey = localStorage.getItem(STORAGE_LASTEVALKEY);
		if (lastKey != null && page > 1)
			url += `&lastKey=${lastKey}`;

		const { json, headers } = await fetchUtils.fetchJson(url);
		const data = json.data;

		// Store the lastId in local storage
		if (data.length > 0 && json.LastEvaluatedKey != null) {
			const lastIdKey = json.LastEvaluatedKey;
			localStorage.setItem(STORAGE_LASTEVALKEY, lastIdKey);
		}

		const total = parseInt(headers.get('x-total-count'));

		return { data, total };
	},
	create: (resource, params) => {
		if (resource !== 'items' && (!params.data.upl_image || !params.data.upl_lab_image)) {
			// fallback to the default implementation
			return dataProvider.create(resource, params);
		}

		if (params.data.upl_image) {
			const rawFile = params.data.upl_image.rawFile;
			//const fileName = rawFile.path;  //will be used to know the extension for the upload  
			const pill_image_raw = params.data.upl_image;

			if (!(pill_image_raw.rawFile instanceof File)) {
				return Promise.reject('Error: Not a file...'); // Didn't test this...
			}
		}

		if (params.data.upl_lab_image) {
			//Lab image
			const rawFile = params.data.upl_lab_image.rawFile;
			const lab_image_raw = params.data.upl_lab_image;
			//const fileName = rawFile.path;  //will be used to know the extension for the upload  

			if (!(lab_image_raw.rawFile instanceof File)) {
				return Promise.reject('Error: Not a file...'); // Didn't test this...
			}
		}

		if (params.data.image)
			params.data.image = params.data.image.replace(CDN_IMAGES, '');
		if (params.data.lab_image)
			params.data.lab_image = params.data.lab_image.replace(CDN_IMAGES, '');

		const existingData = {
			...params,
			data: {
				...params.data
			}
		}

		//console.log(convertToFormData(existingData));

		return httpClient(`${URL}/${resource}`, {
			method: 'POST',
			body: convertToFormData(existingData),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		}));

	},
	update: (resource, params) => {
		if (resource !== 'items' && (!params.data.upl_image || !params.data.upl_lab_image)) {
			// fallback to the default implementation
			return dataProvider.update(resource, params);
		}

		if (params.data.upl_image) {
			const rawFile = params.data.upl_image.rawFile;
			//const fileName = rawFile.path;  //will be used to know the extension for the upload  
			const pill_image_raw = params.data.upl_image;

			if (!(pill_image_raw.rawFile instanceof File)) {
				return Promise.reject('Error: Not a file...'); // Didn't test this...
			}
		}

		if (params.data.upl_lab_image) {
			//Lab image
			const rawFile = params.data.upl_lab_image.rawFile;
			const lab_image_raw = params.data.upl_lab_image;
			//const fileName = rawFile.path;  //will be used to know the extension for the upload  

			if (!(lab_image_raw.rawFile instanceof File)) {
				return Promise.reject('Error: Not a file...'); // Didn't test this...
			}
		}

		if (params.data.image)
			params.data.image = params.data.image.replace(CDN_IMAGES, '');
		if (params.data.lab_image)
			params.data.lab_image = params.data.lab_image.replace(CDN_IMAGES, '');

		const existingData = {
			...params,
			data: {
				...params.data
			}
		}

		const id = existingData.data.id;

		//console.log(existingData, convertToFormData(existingData));

		return httpClient(`${URL}/${resource}/${id}`, {
			method: 'PUT',
			body: convertToFormData(existingData),
		}).then(({ json }) => ({
			data: { ...params.data, id: json.id },
		}));

	},
};

/**
* Convert a `File` object returned by the upload input into a base 64 string.
* That's not the most optimized way to store images in production, but it's
* enough to illustrate the idea of data provider decoration.
*/
const convertFileToBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;

		reader.readAsDataURL(file.rawFile);
	});

const convertToFormData = (params) => {
	let formData = new FormData();

	const NEW_IMAGE_UPLOADED = params.data.newImageUploaded;
	const NEW_LAB_IMAGE_UPLOADED = params.data.newLabImageUploaded;

	if (!NEW_IMAGE_UPLOADED) {
		formData.delete('upl_image');
	}

	if (!NEW_LAB_IMAGE_UPLOADED) {
		formData.delete('upl_lab_image');
	}

	//console.log(params.data);

	formData.append('name', params.data.name);
	if (params.data.color) formData.append('color', params.data.color);
	formData.append('multiple_batchs', params.data.multiple_batchs);
	formData.append('posted_date', params.data.posted_date);

	if (params.data.substance) formData.append('substance', params.data.substance);
	if (params.data.load) formData.append('load', params.data.load);
	if (params.data.warning) formData.append('warning', params.data.warning);

	if (params.data.lab_url) formData.append('lab_url', params.data.lab_url);
	if (params.data.notes) formData.append('notes', params.data.notes);
	formData.append('ap_url', params.data.ap_url);

	if (NEW_IMAGE_UPLOADED && params.data.upl_image)
		formData.append('upl_image', params.data.upl_image.rawFile, params.data.upl_image.rawFile.path);
	else
		if (params.data.image) formData.append('image', params.data.image);

	if (NEW_LAB_IMAGE_UPLOADED && params.data.upl_lab_image)
		formData.append('upl_lab', params.data.upl_lab_image.rawFile, params.data.upl_lab_image.rawFile.path);
	else
		if (params.data.lab_image) formData.append('lab_image', params.data.lab_image);

	formData.append('published', (params.data.published ? 'x' : '-'));

	return formData;
}
