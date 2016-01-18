export default class ArticlesByCategoryController {

	constructor(NewsService, $stateParams) {
		this.categoryName = $stateParams.category_name;
		this.newsService = NewsService;
		this.articles = [];
		this.fetchArticles();
	}

	fetchArticles() {
		const fetchArticlesPromise = this.newsService.fetchNews({where:{'category':this.categoryName}});
		fetchArticlesPromise.then(result => {
			this.articles = result.results;
		});
	}

}
