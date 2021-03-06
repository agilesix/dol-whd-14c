describe('wageDataPayTypeForm', function() {

    beforeEach(module('14c'));

    var element, rootScope;
    beforeEach(function () {
        element = angular.element('<wage-data-pay-type-form/>');
    	inject(function ($rootScope, $compile, _$q_, responsesService) {
            $q = _$q_;
            rootScope = $rootScope;
            responses = $q.defer();
            mockResponsesService = responsesService;
            spyOn(mockResponsesService, 'getQuestionResponses').and.returnValue(responses.promise);
            $compile(element)(rootScope);
        });
    });

    it('invoke directive', function() {
        rootScope.$digest();
        expect(element).toBeDefined();
    });
});