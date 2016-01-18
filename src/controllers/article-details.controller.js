export default class ArticleDetailsController {

	constructor($stateParams, NewsService) {
		this.article_id = $stateParams.article_id;
		this.newsService = NewsService;

		this.article = null;
		const fetchArticlePromise = this.newsService.fetchNews({where:{'objectId':this.article_id}});
		fetchArticlePromise.then(result => {
			this.article = result.results[0];
		});
	}


}
