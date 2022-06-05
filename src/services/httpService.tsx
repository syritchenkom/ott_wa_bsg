import axios from 'axios';
import { toast } from 'react-toastify';

const httpService = axios.create({
	withCredentials: true
});

const runLoader = () => {
	const element = document.getElementById('js-loader');

	if (element) {
		element.style.display = 'flex';
	}
};

const closeLoader = () => {
	const element = document.getElementById('js-loader');

	if (element) {
		element.style.display = 'none';
	}
};
//Http interceptor for request
httpService.interceptors.request.use(
	(config) => {
		runLoader();
		return config;
	},
	(error) => {
		//finish loading if request has error
		return Promise.reject(error.response.data);
	}
);

//Http interceptor for response
httpService.interceptors.response.use(
	(config) => {
		closeLoader();
		return config;
	},
	(error: any) => {
		const { data } = error.response;

		closeLoader();

		toast.error(data.Message || 'Error!');

		return Promise.reject(data);
	}
);

export function setAuthorizationToken(token?: string) {
	if (token) {
		//set token to every request
		httpService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		//delete token to every request
		delete httpService.defaults.headers.common['Authorization'];
	}
}

export default httpService;
