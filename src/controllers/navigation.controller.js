export default class NavigationController {

	constructor(NewsService) {
		this.newsService = NewsService;
		this.categories = [];
		this.fetchCategories();
	}

	fetchCategories() {
		const categoriesPromise = this.newsService.fetchCategories();
		categoriesPromise.then(result => {
			this.categories = result.results;
		});
	}

}
