(function() {
    'use strict';

    angular
        .module('erpproductionApp')
        .controller('ProductDetailController', ProductDetailController);

    ProductDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Product'];

    function ProductDetailController($scope, $rootScope, $stateParams, entity, Product) {
        var vm = this;

        vm.product = entity;

        var unsubscribe = $rootScope.$on('erpproductionApp:productUpdate', function(event, result) {
            vm.product = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
