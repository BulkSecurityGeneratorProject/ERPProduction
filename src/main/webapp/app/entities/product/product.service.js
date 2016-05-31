(function() {
    'use strict';
    angular
        .module('erpproductionApp')
        .factory('Product', Product);

    Product.$inject = ['$resource', 'DateUtils'];

    function Product ($resource, DateUtils) {
        var resourceUrl =  'api/products/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.manufacturingDate = DateUtils.convertDateTimeFromServer(data.manufacturingDate);
                        data.expirationDate = DateUtils.convertDateTimeFromServer(data.expirationDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
