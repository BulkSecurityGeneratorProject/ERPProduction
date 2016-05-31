(function() {
    'use strict';

    angular
        .module('erpproductionApp')
        .controller('StockController', StockController);

    StockController.$inject = ['$scope', '$state', 'Stock'];

    function StockController ($scope, $state, Stock) {
        var vm = this;
        
        vm.stocks = [];

        loadAll();

        function loadAll() {
            Stock.query(function(result) {
                vm.stocks = result;
            });
        }
    }
})();
