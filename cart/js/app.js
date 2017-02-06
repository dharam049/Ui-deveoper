/*angular */
'use strict';

var cartified = angular.module('cartified', ['ngRoute', 'cartCtrl', 'services.cart', 'filters']);

cartified.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/list.html',
            controller: 'ListCtrl'
        }).when('/checkout', {
            templateUrl: 'views/checkout.html',
            controller: 'CheckoutCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    }]);
