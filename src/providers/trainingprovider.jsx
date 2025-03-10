const URL = import.meta.env.VITE_ENDPOINT + "/trainingdata";
const token = localStorage.getItem('token') ?? null;

export const apAiTrainingProvider = {
	getList: async ({ resource }) => {

		const response = await fetch(URL, {
			method: 'GET',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
		});

		const { data } = await response.json();

		const trainingData = data.map((item, index) => ({
			id: item.id || index,
			...item
		}));

		return {
			data: trainingData,
			total: data.length,
		};
	},

	getOne: async (resource, { id }) => {
		const response = await fetch(`${URL}/${id}`, {
			method: 'GET',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			)
		});

		const apiResponse = await response.json();

		return {
			data: apiResponse.data
		};
	},

	getMany: async (resource, { ids }) => ({
		data: ids.map(id => ({ id, /* other fields */ })),
	}),

	getManyReference: async (resource, { target, id, pagination, filters, sort }) => ({
		data: [],
		total: 0,
	}),

	create: async (resource, { data }) => {
		const body = {
			input: data.input,
			output: data.output
		}

		const response = await fetch(URL, {
			method: 'POST',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
			body: JSON.stringify(body)
		});

		const apiResponse = await response.json();

		return {
			data: apiResponse.data,
			id: apiResponse.data.id
		};
	},

	update: async (resource, { id, data }) => {

		const body = {
			input: data.input,
			output: data.output
		}

		const response = await fetch(URL + "/" + id, {
			method: 'PUT',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
			body: JSON.stringify(body)
		});

		const apiResponse = await response.json();

		return {
			data: apiResponse.data,
			id: apiResponse.data.id
		};

		return { ...data, id }
	},

	updateMany: async (resource, { ids, data }) => ({
		data: ids,
	}),

	delete: async (resource, { id }) => {
		const response = await fetch(`${URL}/${id}`, {
			method: 'DELETE',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			)
		});

		const apiResponse = response.status;

		if (apiResponse == 200) {
			return {
				data: { id }
			}
		} else {
			return {
				data: 0
			}
		}
	},

	deleteMany: async (resource, { ids }) => {
		await Promise.all(ids.map(id => apAiTrainingProvider.delete(resource, { id })));
		return {
			data: ids,
		};
	},
};
