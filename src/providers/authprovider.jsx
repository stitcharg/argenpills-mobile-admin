import jwt from 'jsonwebtoken';

const authProvider = {
	login: ({ username, password }) => {
		const URL = import.meta.env.VITE_ENDPOINT + "/authenticate";

		const request = new Request(URL, {
			method: 'POST',
			body: JSON.stringify({ username, password }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		return fetch(request)
			.then(response => {
				if (response.status < 200 || response.status >= 300) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(auth => {
				const token = auth.token;
				const refreshtoken = auth.refreshToken;

				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', refreshtoken);
			})
			.catch((err) => {
				throw err;
			});
	},

	// called when the user clicks on the logout button
	logout: () => {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		return Promise.resolve();
	},
	// called when the API returns an error
	checkError: ({ status }) => {
		if (status === 401 || status === 403) {
			console.log("CHECKERROR", status);
			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
			return Promise.reject();
		}
		return Promise.resolve();
	},
	// called when the user navigates to a new location, to check for authentication
	checkAuth: () => {
		const token = localStorage.getItem('token') ?? null;
		const refreshToken = localStorage.getItem('refreshToken') ?? null;

		if (token == null || refreshToken == null) {
			console.log("checkAuth no token");
			return Promise.reject("Please login")
		}

		const decodedToken = jwt.decode(token);

		if (decodedToken && decodedToken.exp) {
			const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Current time in seconds
			const expirationTimeInSeconds = decodedToken.exp; // Expiration

			if (currentTimeInSeconds >= expirationTimeInSeconds) {
				localStorage.removeItem('token');
				localStorage.removeItem('refreshToken');
				return Promise.reject("Token expired");
			} else {
				// Time remaining for the token to expire
				const timeRemaining = expirationTimeInSeconds - currentTimeInSeconds;

				if (timeRemaining <= 360) {
					//Less than 5 minutes, refresh the token
					console.log("LESS THAN 5 MINS");

					return callRefreshToken(token, refreshToken);
				}

				return Promise.resolve();
			}
		}
		return Promise.reject();

	},
	// called when the user navigates to a new location, to check for permissions / roles
	getPermissions: () => Promise.resolve(),
};

function callRefreshToken(existingToken, refreshToken) {
	const URL = import.meta.env.VITE_ENDPOINT + "/refreshtoken";

	const request = new Request(URL, {
		method: 'POST',
		body: JSON.stringify({ refreshToken: refreshToken }),
		headers: new Headers(
			{ 'authorization': `Bearer ${existingToken}` }
		),
	});

	return fetch(request)
		.then(response => {
			if (response.status < 200 || response.status >= 300) {
				return Promise.reject("unable to refresh token");
			}
			return response.json();
		})
		.then(auth => {
			localStorage.setItem('token', auth.token);
			return Promise.resolve();
		})
		.catch((err) => {
			return Promise.reject("ERROR:" + err);
		});
}


export default authProvider;