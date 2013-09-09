var App = Ember.Application.create();

App.Router.map(function() {
    this.route('about');
    this.resource('products', function() {
        this.route('new');
        this.route('view', { path: '/:product_id' });
    });
});

App.ProductsIndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        $.get('/data.json', function(result) {
            controller.set('content', result);
        });
    }
});

App.ProductsViewRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('isProcessing', true);
        setTimeout(function() {
            controller.set('isProcessing', false);
            $.get('/product.json', function(result) {
                controller.set('content', result);
            });
        }, 1000);
    },
    model: function(params) {
        return { id: params.product_id };
        //return $.getJSON('/product.json').then(function(result) { return result; });
    }
});

App.ProductsIndexController = Ember.ArrayController.extend();
App.ProductsViewController = Ember.ObjectController.extend({
    isProcessing: false
});

Ember.Handlebars.registerBoundHelper('formatPrice', function(value) {
    var price = parseInt(value, 10);
    var dplaces = price == parseInt(price, 10) ? 0 : 2;
    price = '$' + price.toFixed(dplaces);
    return price;
});
