import NavigationController from './controllers/navigation.controller';
import HomeController from './controllers/home.controller';
import ArticleDetailsController from './controllers/article-details.controller';
import ArticlesByCategoryController from './controllers/articles-by-category.controller';
import NewsService from './services/news.service';

angular.module('app', [
	'ngAnimate',
	'angular-loading-bar',
	'ui.router'
]);

//making angular aware of the controllers and services ( es6 )
angular.module('app').controller('NavigationController', NavigationController);
angular.module('app').controller('HomeController', HomeController);
angular.module('app').controller('ArticleDetailsController', ArticleDetailsController);
angular.module('app').controller('ArticlesByCategoryController', ArticlesByCategoryController);
angular.module('app').service('NewsService', NewsService);

//routes (ui-router)
angular.module('app').config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
	const states = {
		'home': {
			url: '',
			controller: 'HomeController',
			controllerAs: 'home',
			templateUrl: 'views/home.html'
		},
		'article-details': {
			url: '/article/:article_id',
			controller: 'ArticleDetailsController',
			controllerAs: 'details',
			templateUrl: 'views/article-details.html'
		},
		'articles-by-category': {
			url: '/category/:category_name',
			controller: 'ArticlesByCategoryController',
			controllerAs: 'bycategory',
			templateUrl: 'views/articles-by-category.html'
		}
	};
	angular.forEach(states, (stateConfig, stateName) => {
		$stateProvider.state(stateName, stateConfig);
	});
}]);
