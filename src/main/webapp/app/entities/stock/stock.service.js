(function() {
    'use strict';
    angular
        .module('erpproductionApp')
        .factory('Stock', Stock);

    Stock.$inject = ['$resource'];

    function Stock ($resource) {
        var resourceUrl =  'api/stocks/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
