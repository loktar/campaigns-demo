describe('app.CampaignsController', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    describe('init', function () {
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

    describe('when the search value changes', function () {
        it('should show campaigns where the title matches the query', function () {
            var $el = $('<div>');
            var $searchEl = $('<input>');

            app.CampaignsController.init($el, $searchEl);

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                contentType: 'text/html;charset=utf-8',
                responseText: '<ul><li class="campaign"><div class="title">Foo</div></li></ul>'
            });

            $searchEl.val('foo');
            $searchEl.trigger('change');

            expect($el.find('.campaign:not(.hidden)').length).toEqual(1);
        });

        it('should show campaigns where the tagline matches the query', function () {
            var $el = $('<div>');
            var $searchEl = $('<input>');

            app.CampaignsController.init($el, $searchEl);

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                contentType: 'text/html;charset=utf-8',
                responseText: '<ul><li class="campaign"><div class="tagline">Foo</div></li></ul>'
            });

            $searchEl.val('foo');
            $searchEl.trigger('change');

            expect($el.find('.campaign:not(.hidden)').length).toEqual(1);
        });

        it('should not be case sensitive', function () {
            var $el = $('<div>');
            var $searchEl = $('<input>');

            app.CampaignsController.init($el, $searchEl);

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                contentType: 'text/html;charset=utf-8',
                responseText: '<ul><li class="campaign"><div class="tagline">Foo</div></li></ul>'
            });

            $searchEl.val('FOO');
            $searchEl.trigger('change');

            expect($el.find('.campaign:not(.hidden)').length).toEqual(1);
        });

        it('should hide campaigns where neither the title nor tagline matche the query', function () {
            var $el = $('<div>');
            var $searchEl = $('<input>');

            app.CampaignsController.init($el, $searchEl);

            jasmine.Ajax.requests.mostRecent().respondWith({
                status: 200,
                contentType: 'text/html;charset=utf-8',
                responseText: '<ul><li class="campaign"><div class="title">Foo</div><div class="tagline">Bar</div></li></ul>'
            });

            $searchEl.val('does not match');
            $searchEl.trigger('change');

            expect($el.find('.campaign:not(.hidden)').length).toEqual(0);
        });

        describe('when the query changes and becomes a match', function () {
            it('should show the previously hidden campaign', function () {
                var $el = $('<div>');
                var $searchEl = $('<input>');

                app.CampaignsController.init($el, $searchEl);

                jasmine.Ajax.requests.mostRecent().respondWith({
                    status: 200,
                    contentType: 'text/html;charset=utf-8',
                    responseText: '<ul><li class="campaign"><div class="title">Foo</div><div class="tagline">Bar</div></li></ul>'
                });

                $searchEl.val('does not match');
                $searchEl.trigger('change');

                $searchEl.val('foo');
                $searchEl.trigger('change');

                expect($el.find('.campaign:not(.hidden)').length).toEqual(1);
            });
        });

        describe('when the query is blank', function () {
            it('should show all campaigns', function () {
                var $el = $('<div>');
                var $searchEl = $('<input>');

                app.CampaignsController.init($el, $searchEl);

                jasmine.Ajax.requests.mostRecent().respondWith({
                    status: 200,
                    contentType: 'text/html;charset=utf-8',
                    responseText: '<ul><li class="campaign"><div class="title">Foo</div><div class="tagline">Bar</div></li></ul>'
                });

                $searchEl.val('first query did not match');
                $searchEl.trigger('change');

                $searchEl.val('');
                $searchEl.trigger('change');

                expect($el.find('.campaign:not(.hidden)').length).toEqual(1);
            });
        });
    })
});