describe('apitest section', function () {
    beforeEach(module('pushmeBaby.apitest'));

    it('should have a dummy test', inject(function() {
        expect(true).toBeTruthy();
    }));
});