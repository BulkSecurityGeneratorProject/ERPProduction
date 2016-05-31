(function() {
    'use strict';

    angular
        .module('erpproductionApp')
        .controller('StockDetailController', StockDetailController);

    StockDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Stock', 'Product'];

    function StockDetailController($scope, $rootScope, $stateParams, entity, Stock, Product) {
        var vm = this;

        vm.stock = entity;

        var unsubscribe = $rootScope.$on('erpproductionApp:stockUpdate', function(event, result) {
            vm.stock = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
