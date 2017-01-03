export default class HomeController {

	constructor(NewsService) {
		this.newsService = NewsService;
		this.lastNews = [];
		this.featuredPrimary = [];
		this.featuredSecondary = [];
		this.fetchLastNews();
	}

	fetchLastNews() {
		const newsPromise = this.newsService.fetchNews({'order':'createdAt'});
		newsPromise.then(result => {
			const articles = result.results;
			this.featuredPrimary.push(articles.shift(0));
			this.featuredSecondary.push(articles.shift(1),articles.shift(2));
			this.lastNews = articles;
		});
	}

}
