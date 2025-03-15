export const apAiBotHistoryProvider = {
	getList: async (resource, params) => {
		const URL = import.meta.env.VITE_ENDPOINT + "/aibothistory";
		const token = localStorage.getItem('token') ?? null;

		const { filter } = params || {};
		let queryParams = '';

		if (filter && filter.createdAtDate) {
			queryParams = `?date=${filter.createdAtDate}`;
		}

		const response = await fetch(`${URL}${queryParams}`, {
			method: 'GET',
			headers: new Headers(
				{ 'authorization': `Bearer ${token}` }
			),
		});

		const { data } = await response.json();

		// Transform the data to add required id field if not present
		const historyData = data.map((item, index) => ({
			id: item.id || index, // Use existing id or index as fallback
			...item
		}));

		return {
			data: historyData,
			total: data.length,
		};
	},

	getOne: async (resource, { id }) => ({
		data: { id, /* other fields */ },
	}),

	getMany: async (resource, { ids }) => ({
		data: ids.map(id => ({ id, /* other fields */ })),
	}),

	getManyReference: async (resource, { target, id, pagination, filters, sort }) => ({
		data: [],
		total: 0,
	}),

	create: async (resource, { data }) => ({
		data: { ...data, id: 123 },
	}),

	update: async (resource, { id, data }) => ({
		data: { ...data, id },
	}),

	updateMany: async (resource, { ids, data }) => ({
		data: ids,
	}),

	delete: async (resource, { id }) => ({
		data: { id },
	}),

	deleteMany: async (resource, { ids }) => ({
		data: ids,
	}),
};
