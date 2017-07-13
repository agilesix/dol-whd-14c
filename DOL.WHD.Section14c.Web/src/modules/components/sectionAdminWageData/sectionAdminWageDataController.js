'use strict';

module.exports = function(ngModule) {
    ngModule.controller('sectionAdminWageDataController', function($scope, $location, _constants, stateService) {
        $scope.constants = _constants;
        $scope.appData = stateService.appData;

        let query = $location.search();

        var vm = this;
        vm.activeTab = query.t ? query.t : 1;

        vm.onTabClick = function(id) {
            vm.activeTab = id;
        }

        $scope.$on('$routeUpdate', function(){
            query = $location.search();
            vm.activeTab = query.t ? query.t : 1;
        });
    });
};
