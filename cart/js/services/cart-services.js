
'use strict';

var cart = angular.module('services.cart', []);
cart.service('Items', [
    function () {
        this.get = function () {
            return {
                '1': {
                    id: 1,
                    brand: 'Nike',
                    label: "Lunargato",
                    img: "lunargato.jpg",
                    price: 500
                },
                '2': {
                    id: 2,
                    brand: 'adidas',
                    label: "Nitro",
                    img: "nitrocharge.jpg",
                    price: 600
                },
                '3': {
                    id: 3,
                    brand: 'Puma',
                    label: "Xenon",
                    img: "xenon.jpg",
                    price: 700
                }
            };
        };
    }
]);

cart.service('Reviewer', [ '$q', '$timeout',
    function ($q, $timeout) {
        this.review = function (cart) {
            var deferred = $q.defer();

            $timeout(function() {
              deferred.resolve(true);
            }, 2000);

            return deferred.promise;
        };
    }
]);

cart.service('CartStorage', ['$rootScope', 'Reviewer',
    function ($rootScope, Reviewer) {
        var STORAGE_ID = "cart";

        this.getCart = function () {
            return JSON.parse(localStorage.getItem(STORAGE_ID) || '{}');
        };

        this.addItem = function (item, noPersist) {
            var cart = this.getCart();
            if (cart[item.id]) {
                cart[item.id].quantity += parseInt(item.quantity, 10);
            } else {
                cart[item.id] = item;
            }
            if (noPersist) {
                return;
            }
            this.save(cart);
        };

        this.save = function (cart) {
            var self = this;
            Reviewer.review(cart).then(function(){
                self.persist(cart);
            });
        };

        this.addItems = function (items) {
            var id, cart = this.getCart();

            for (id in items) {
                if (items.hasOwnProperty(id)) {
                    this.addItem(items[id], true);
                }
            }
            this.save(cart);
        };

        this.remove = function (id) {
            var cart = this.getCart();
            delete cart[id];
            this.save(cart);
        };

        this.clear = function () {
            this.save({});
        };

        this.persist = function (cart) {
            localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
        };

        this.changeQuantity = function (id, quantity) {
            var cart = this.getCart();
            if (cart[id]) {
                cart[id].quantity = parseInt(quantity, 10);
                this.persist(cart);
            }
        };

        this.getTotalItems = function () {
            var key, sum = 0, cart = this.getCart();
            for (key in cart) {
                if (cart.hasOwnProperty(key)) {
                    sum += parseInt(cart[key].quantity, 10);
                }
            }
            return sum;
        };

        this.refresh = function () {
            $rootScope.$broadcast('storageUpdate');
        };

        if (window.addEventListener) {
            window.addEventListener("storage", this.refresh, false);
        } else {
            window.attachEvent("onstorage", this.refresh);
        }
    }]);
