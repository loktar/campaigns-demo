describe('app.CampaignsController', function () {
    describe('init', function () {
        beforeEach(function () {
            jasmine.Ajax.install();
        });

        afterEach(function () {
            jasmine.Ajax.uninstall();
        });

        it('should fetch the campaigns markup', function () {
            app.CampaignsController.init();
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v1/campaigns.html');
        });

        describe('when the markup is fetched successfully', function () {
            it('should show the campaigns', function () {
                var $el = $('<div>');
                app.CampaignsController.init($el);
                jasmine.Ajax.requests.mostRecent().respondWith({
                    status: 200,
                    contentType: 'text/html;charset=utf-8',
                    responseText: "<ul><li>My Campaign</li></ul>"
                });

                expect($el.find('li').length).toEqual(1);
            });
        });
    });
});