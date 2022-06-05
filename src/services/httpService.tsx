import axios from 'axios';

const httpService = axios.create({
	withCredentials: true
});

// export function setAuthorizationToken(params:type) {
export function setAuthorizationToken(token: string) {
	if (token) {
		//set token to every request
		httpService.defaults.headers.common['Authorization'] = `Token ${token}`;
	} else {
		//delete token to every request
		delete httpService.defaults.headers.common['Authorization'];
	}
}

export default httpService;
