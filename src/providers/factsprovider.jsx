const URL = import.meta.env.VITE_ENDPOINT + "/facts";

export const apFactsProvider = {
	getList: async ({ resource }) => {
		const token = localStorage.getItem('token') ?? null;

		const response = await fetch(URL, {
			method: 'GET',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
		});

		const json = await response.json();
		// The API returns the array directly
		const rawData = Array.isArray(json) ? json : (json.data || []);

		const factsData = rawData.map((item, index) => ({
			...item,
			id: item.Id || item.id || index,
			fact: item.text || item.fact,
			used: item.used === 1 || item.used === "1"
		}));

		return {
			data: factsData,
			total: factsData.length,
		};
	},

	getOne: async (resource, { id }) => {
		const token = localStorage.getItem('token') ?? null;

		const response = await fetch(`${URL}/${id}`, {
			method: 'GET',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			)
		});

		const apiResponse = await response.json();
		const item = apiResponse.data || apiResponse;

		return {
			data: {
				...item,
				id: item.Id || item.id,
				fact: item.text || item.fact,
				used: item.used === 1 || item.used === "1",
			}
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
		const token = localStorage.getItem('token') ?? null;

		const body = {
			text: data.fact,
			used: data.used ? 1 : 0
		}

		const response = await fetch(URL, {
			method: 'POST',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
			body: JSON.stringify(body)
		});

		const apiResponse = await response.json();
		const item = apiResponse.data || apiResponse;

		return {
			data: {
				...item,
				id: item.Id || item.id,
				fact: item.text || item.fact,
				used: item.used === 1 || item.used === "1",
			},
			id: item.Id || item.id
		};
	},

	update: async (resource, { id, data }) => {
		const token = localStorage.getItem('token') ?? null;

		const body = {
			text: data.fact,
			used: data.used ? 1 : 0
		}

		const response = await fetch(URL + "/" + id, {
			method: 'PUT',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
			body: JSON.stringify(body)
		});

		const apiResponse = await response.json();
		const item = apiResponse.data || apiResponse;

		return {
			data: {
				...item,
				id: item.Id || item.id,
				fact: item.text || item.fact,
				used: item.used === 1 || item.used === "1",
			},
			id: item.Id || item.id
		};
	},

	updateMany: async (resource, { ids, data }) => ({
		data: ids,
	}),

	delete: async (resource, { id }) => {
		const token = localStorage.getItem('token') ?? null;

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
		await Promise.all(ids.map(id => apFactsProvider.delete(resource, { id })));
		return {
			data: ids,
		};
	},
};
