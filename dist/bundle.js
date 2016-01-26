/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _navigation = __webpack_require__(2);

	var _navigation2 = _interopRequireDefault(_navigation);

	var _home = __webpack_require__(3);

	var _home2 = _interopRequireDefault(_home);

	var _articleDetails = __webpack_require__(4);

	var _articleDetails2 = _interopRequireDefault(_articleDetails);

	var _articlesByCategory = __webpack_require__(5);

	var _articlesByCategory2 = _interopRequireDefault(_articlesByCategory);

	var _news = __webpack_require__(6);

	var _news2 = _interopRequireDefault(_news);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('app', ['ngAnimate', 'angular-loading-bar', 'ui.router', 'ngRetina']);

	//making angular aware of the controllers and services ( es6 )
	angular.module('app').controller('NavigationController', _navigation2.default);
	angular.module('app').controller('HomeController', _home2.default);
	angular.module('app').controller('ArticleDetailsController', _articleDetails2.default);
	angular.module('app').controller('ArticlesByCategoryController', _articlesByCategory2.default);
	angular.module('app').service('NewsService', _news2.default);

	//routes (ui-router)
	angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		var states = {
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
		angular.forEach(states, function (stateConfig, stateName) {
			$stateProvider.state(stateName, stateConfig);
		});
	}]);

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NavigationController = function () {
		function NavigationController(NewsService) {
			_classCallCheck(this, NavigationController);

			this.newsService = NewsService;
			this.categories = [];
			this.fetchCategories();
		}

		_createClass(NavigationController, [{
			key: "fetchCategories",
			value: function fetchCategories() {
				var _this = this;

				var categoriesPromise = this.newsService.fetchCategories();
				categoriesPromise.then(function (result) {
					_this.categories = result.results;
				});
			}
		}]);

		return NavigationController;
	}();

	exports.default = NavigationController;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var HomeController = function () {
		function HomeController(NewsService) {
			_classCallCheck(this, HomeController);

			this.newsService = NewsService;
			this.lastNews = [];
			this.featuredPrimary = [];
			this.featuredSecondary = [];
			this.fetchLastNews();
		}

		_createClass(HomeController, [{
			key: 'fetchLastNews',
			value: function fetchLastNews() {
				var _this = this;

				var newsPromise = this.newsService.fetchNews({ 'order': 'createdAt' });
				newsPromise.then(function (result) {
					var articles = result.results;
					_this.featuredPrimary.push(articles.shift(0));
					_this.featuredSecondary.push(articles.shift(1), articles.shift(2));
					_this.lastNews = articles;
				});
			}
		}]);

		return HomeController;
	}();

	exports.default = HomeController;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ArticleDetailsController = function ArticleDetailsController($stateParams, NewsService) {
		var _this = this;

		_classCallCheck(this, ArticleDetailsController);

		this.article_id = $stateParams.article_id;
		this.newsService = NewsService;

		this.article = null;
		var fetchArticlePromise = this.newsService.fetchNews({ where: { 'objectId': this.article_id } });
		fetchArticlePromise.then(function (result) {
			_this.article = result.results[0];
		});
	};

	exports.default = ArticleDetailsController;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ArticlesByCategoryController = function () {
		function ArticlesByCategoryController(NewsService, $stateParams) {
			_classCallCheck(this, ArticlesByCategoryController);

			this.categoryName = $stateParams.category_name;
			this.newsService = NewsService;
			this.articles = [];
			this.fetchArticles();
		}

		_createClass(ArticlesByCategoryController, [{
			key: 'fetchArticles',
			value: function fetchArticles() {
				var _this = this;

				var fetchArticlesPromise = this.newsService.fetchNews({ where: { 'category': this.categoryName } });
				fetchArticlesPromise.then(function (result) {
					_this.articles = result.results;
				});
			}
		}]);

		return ArticlesByCategoryController;
	}();

	exports.default = ArticlesByCategoryController;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var APP_ID = 'WWZD99wsehc5HeLTjFL2J37RPz93BxVFEXxc23pJ';
	var REST_API_KEY = 'rQaxR3wFUi67QcrEyXt3oD5hnP8L1DQiOCUHbYvt';
	var PARSE_BASE_URL = 'https://api.parse.com/1/classes';

	var NewsService = function () {
		function NewsService($q, $http) {
			_classCallCheck(this, NewsService);

			this.$q = $q;
			this.$http = $http;
		}

		_createClass(NewsService, [{
			key: 'prepareRequest',
			value: function prepareRequest() {
				var method = arguments.length <= 0 || arguments[0] === undefined ? 'GET' : arguments[0];
				var className = arguments.length <= 1 || arguments[1] === undefined ? 'Article' : arguments[1];
				var params = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

				var url = PARSE_BASE_URL + '/' + className;
				var req = {
					method: 'GET',
					url: url,
					headers: {
						'X-Parse-Application-Id': APP_ID,
						'X-Parse-REST-API-Key': REST_API_KEY
					}
				};
				if (params) {
					req.params = params;
				}
				return req;
			}
		}, {
			key: 'fetchCategories',
			value: function fetchCategories() {
				var defered = this.$q.defer();
				var req = this.prepareRequest('GET', 'Category');
				this.$http(req).then(function (response) {
					defered.resolve(response.data);
				}, function (error) {
					defered.reject(error);
				});

				return defered.promise;
			}
		}, {
			key: 'fetchNews',
			value: function fetchNews() {
				var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

				var defered = this.$q.defer();
				var req = this.prepareRequest('GET', 'Article', params);
				this.$http(req).then(function (response) {
					defered.resolve(response.data);
				}, function (error) {
					defered.reject(error);
				});

				return defered.promise;
			}
		}]);

		return NewsService;
	}();

	exports.default = NewsService;

/***/ }
/******/ ]);