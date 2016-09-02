angular.module('stripeDemo', [])
.directive('stripePayment', function($http) {
  return {
    restrict: 'E',
    template: '<button id="customButton">Purchase</button>',
    link: function(scope, elem, attrs) {
      var handler = StripeCheckout.configure({
        key: 'pk_test_eyNiXHE1momxCbPVWZseWG9Y',
        image: 'http://pre10.deviantart.net/1fb0/th/pre/f/2012/217/7/7/pre_cut_cat_stock_png_by_juleesan-d59yut3.png',
        locale: 'auto',
        token: function(token) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          $http.post('/api/charge', {
            stripeToken: token.id,
            price: {{price}},
            email: token.email,
            stripeTokenCard: token.card
          })
        }
      });

      $('#customButton').on('click', function(e) {
        // Open Checkout with further options:
        handler.open({
          name: 'Stripe Demo',
          description: 'This is just a dream',
          amount: scope.price
        });
        e.preventDefault();
      });

      // Close Checkout on page navigation:
      $(window).on('popstate', function() {
        handler.close();
      });
    }
  }
})
