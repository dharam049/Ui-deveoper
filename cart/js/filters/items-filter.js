/* angular */
'use strict';

var cart = angular.module('filters', ['utils']);

cart.filter('ItemsFilter', function (utils) {

    return function (input, query) {
        var result = [];
        if (!query) {
            return input;
        }

        angular.forEach(input, function (item) {
            if (utils.compareStr(item.label, query) ||
                    utils.compareStr(item.brand, query)) {
                result.push(item);
            }
        });
        return result;
    };
});

angular.module('utils', [])
    .factory('utils', function () {
        return {
            compareStr: function (stra, strb) {
                stra = ("" + stra).toLowerCase();
                strb = ("" + strb).toLowerCase();
                return stra.indexOf(strb) !== -1;
            }
        };
    });