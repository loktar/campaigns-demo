(function ($) {

    window.app = window.app || {};

    var $el;

    app.CampaignsController = {
        init: function (el, searchEl) {
            var self = this;

            $el = $(el);
            var $searchEl = $(searchEl);

            $searchEl.on('input', function (e) {
                self.searchUpdated($searchEl.val());
            });

            $.get('/api/v1/campaigns.html')
                .done(function (data) {
                    console.log('got some campaigns');
                    $el.html(data)
                })
                .fail(function () {
                    console.log('FAILED to get campaigns :(');
                });
        },

        searchUpdated: function (query) {
            var insensitiveQuery = query.toLowerCase();

            var HIDDEN_CLASS = 'hidden';
            var $campaigns = $el.find('.campaign');

            if (insensitiveQuery.length === 0) {
                $campaigns.removeClass(HIDDEN_CLASS);
            }
            else {
                for (var i = 0; i < $campaigns.length; i++) {
                    var $c = $($campaigns[i]);

                    var titleMatches = $c.find('.title').text().toLowerCase().indexOf(insensitiveQuery) > -1;
                    var taglineMatches = $c.find('.tagline').text().toLowerCase().indexOf(insensitiveQuery) > -1;

                    if (titleMatches || taglineMatches) {
                        $c.removeClass(HIDDEN_CLASS);
                    }
                    else {
                        $c.addClass(HIDDEN_CLASS);
                    }
                }
            }
        }
    }

})(jQuery);