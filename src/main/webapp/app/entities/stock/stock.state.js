(function() {
    'use strict';

    angular
        .module('erpproductionApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('stock', {
            parent: 'entity',
            url: '/stock',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Stocks'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/stock/stocks.html',
                    controller: 'StockController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('stock-detail', {
            parent: 'entity',
            url: '/stock/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Stock'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/stock/stock-detail.html',
                    controller: 'StockDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Stock', function($stateParams, Stock) {
                    return Stock.get({id : $stateParams.id}).$promise;
                }]
            }
        })
        .state('stock.new', {
            parent: 'stock',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-dialog.html',
                    controller: 'StockDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                quantity: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('stock', null, { reload: true });
                }, function() {
                    $state.go('stock');
                });
            }]
        })
        .state('stock.edit', {
            parent: 'stock',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-dialog.html',
                    controller: 'StockDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Stock', function(Stock) {
                            return Stock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('stock', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('stock.delete', {
            parent: 'stock',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/stock/stock-delete-dialog.html',
                    controller: 'StockDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Stock', function(Stock) {
                            return Stock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('stock', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
