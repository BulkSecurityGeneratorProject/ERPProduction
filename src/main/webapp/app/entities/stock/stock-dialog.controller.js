(function() {
    'use strict';

    angular
        .module('erpproductionApp')
        .controller('StockDialogController', StockDialogController);

    StockDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Stock', 'Product'];

    function StockDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Stock, Product) {
        var vm = this;

        vm.stock = entity;
        vm.clear = clear;
        vm.save = save;
        vm.products = Product.query({filter: 'stock-is-null'});
        $q.all([vm.stock.$promise, vm.products.$promise]).then(function() {
            if (!vm.stock.product || !vm.stock.product.id) {
                return $q.reject();
            }
            return Product.get({id : vm.stock.product.id}).$promise;
        }).then(function(product) {
            vm.products.push(product);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.stock.id !== null) {
                Stock.update(vm.stock, onSaveSuccess, onSaveError);
            } else {
                Stock.save(vm.stock, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('erpproductionApp:stockUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
