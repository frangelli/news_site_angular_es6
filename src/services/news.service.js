const APP_ID = 'WWZD99wsehc5HeLTjFL2J37RPz93BxVFEXxc23pJ';
const REST_API_KEY = 'rQaxR3wFUi67QcrEyXt3oD5hnP8L1DQiOCUHbYvt';
const PARSE_BASE_URL = 'https://api.parse.com/1/classes';

export default class NewsService {

	constructor($q, $http) {
		this.$q = $q;
		this.$http = $http;
	}

	prepareRequest(method = 'GET', className = 'Article', params = null) {
		let url = `${PARSE_BASE_URL}/${className}`;
		let req = {
			method: 'GET',
			url: url,
			headers: {
				'X-Parse-Application-Id': APP_ID,
				'X-Parse-REST-API-Key': REST_API_KEY
			}
		}
		if (params) {
			req.params = params;
		}
		return req;
	}

	fetchCategories() {
		const defered = this.$q.defer();
		const req = this.prepareRequest('GET', 'Category');
		this.$http(req).then(response => {
			defered.resolve(response.data);
		}, error => {
			defered.reject(error);
		});

		return defered.promise;
	}

	fetchNews(params = null) {
		const defered = this.$q.defer();
		const req = this.prepareRequest('GET', 'Article', params);
		this.$http(req).then(response => {
			defered.resolve(response.data);
		}, error => {
			defered.reject(error);
		});

		return defered.promise;
	}
}
