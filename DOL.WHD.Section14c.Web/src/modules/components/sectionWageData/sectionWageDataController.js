'use strict';

module.exports = function(ngModule) {
    ngModule.controller('sectionWageDataController', function($scope, $location, stateService, navService, responsesService, validationService, _constants) {
        'ngInject';
        'use strict';

        $scope.formData = stateService.formData;
        $scope.validate = validationService.getValidationErrors;

        // the Wage Data section should not be completed for Initial applications,
        // so redirect if necessary.
        if ($scope.formData.applicationTypeId === _constants.responses.applicationType.initial) {
            navService.clearNextQuery();
            navService.goNext();
        }

        // multiple choice responses
        let questionKeys = [ 'PayType' ];
        responsesService.getQuestionResponses(questionKeys).then((responses) => { $scope.responses = responses; });

        let query = $location.search();

        var vm = this;
        vm.activeTab = query.t ? query.t : 1;
        vm.showLinks = false;
        vm.showAllHelp = false;

        vm.onTabClick = function(id) {
            vm.activeTab = id;

            vm.setNextTabQuery(id);
        }

        vm.setNextTabQuery = function(id) {
            if (id === 1) {
                navService.setNextQuery({ t: 2 }, "Next: Add Piece Rate", "wagedata_tab_box");
            }
            else {
                navService.clearNextQuery();
            }
        }

        $scope.$on('$routeUpdate', function(){
            query = $location.search();
            vm.activeTab = query.t ? query.t : 1;
            vm.setNextTabQuery(vm.activeTab);
        });

        $scope.$watch('formData.payTypeId', function(value) {
            if (value === 23 && vm.activeTab === 1) {
                vm.setNextTabQuery(1);
            }
            else {
                vm.setNextTabQuery();
            }
        });
  });
}
