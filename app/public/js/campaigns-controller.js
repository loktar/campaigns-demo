(function ($) {

    window.app = window.app || {};

    app.CampaignsController = {
        init: function (el) {
            var $el = $(el);

            $.get('/api/v1/campaigns.html')
                .done(function (data) {
                    console.log('got some campaigns');
                    $el.html(data)
                })
                .fail(function () {
                    console.log('FAILED to get campaigns :(');
                });
        }
    }

})(jQuery);